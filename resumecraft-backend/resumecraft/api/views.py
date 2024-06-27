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