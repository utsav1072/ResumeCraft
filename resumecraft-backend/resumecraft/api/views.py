from django.shortcuts import render
from django.http import JsonResponse
from api.models import User, Resume
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, ResumeSerializer, ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from dotenv import load_dotenv
import base64
import os
import io
from PIL import Image
import pdf2image
import google.generativeai as genai
from rest_framework.parsers import MultiPartParser, FormParser


########################################################################################
# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Helper function to convert PDF to base64 image format
def input_pdf_setup(uploaded_file):
    try:
        images = pdf2image.convert_from_bytes(uploaded_file.read())
        first_page = images[0]

        # Convert to bytes
        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()  # encode to base64
            }
        ]
        return pdf_parts
    except Exception as e:
        raise Exception(f"Error processing PDF: {str(e)}")

# Helper function to get Gemini response
def get_gemini_response(input_text, pdf_content, prompt):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([input_text, pdf_content[0], prompt])
        return response.text
    except Exception as e:
        raise Exception(f"Error communicating with Gemini API: {str(e)}")

class ResumeAnalyzerView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        try:
            # Get inputs
            input_text = request.data.get("input_text", "")
            input_prompt = request.data.get("input_prompt", "")
            uploaded_file = request.FILES.get("file")

            if not uploaded_file:
                return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

            # Process PDF and get its content
            pdf_content = input_pdf_setup(uploaded_file)

            # Generate response using Gemini
            response = get_gemini_response(input_text, pdf_content, input_prompt)

            # Return the response
            return Response({"response": response}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
###########################################################################################

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Get All Routes
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/resume/',
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        user_profile = request.user.profile
        image = request.FILES.get('image')
        if image:
            user_profile.image = image
            user_profile.save()
            profile = request.user.profile
            serializer = ProfileSerializer(profile)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


class UserResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            resume = Resume.objects.get(user=user)
            serializer = ResumeSerializer(resume)
            return JsonResponse(serializer.data, safe=False)
        except Resume.DoesNotExist:
            return JsonResponse({'error': 'Resume not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        user = request.user
        try:
            resume = Resume.objects.get(user=user)
            serializer = ResumeSerializer(resume, data=request.data, partial=True)
        except Resume.DoesNotExist:
            serializer = ResumeSerializer(data=request.data)

        if serializer.is_valid():
            resume = serializer.save(user=user)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)