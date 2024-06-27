from api.models import User, Resume, ImportantLink, Education, Skill, Project, ProjectBulletPoint, Coursework, CustomField, Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # These are claims, you can add custom claims
        token['user_id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'full_name', 'image','bio', 'verified']
        read_only_fields = ['user']

##################### resume ################################
class ImportantLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantLink
        fields = ['link_name','url', 'display']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['school_name', 'degree', 'start_date', 'end_date', 'address', 'marks', 'display']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'display']

class CourseworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coursework
        fields = ['title', 'display']

class ProjectBulletPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectBulletPoint
        fields = ['point', 'display']

class ProjectSerializer(serializers.ModelSerializer):
    bullet_points = ProjectBulletPointSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = ['name', 'description', 'bullet_points', 'display']

class CustomFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomField
        fields = ['heading', 'link_name', 'url', 'subheading', 'description', 'display']

class ResumeSerializer(serializers.ModelSerializer):
    important_links = ImportantLinkSerializer(many=True, required=False)
    educations = EducationSerializer(many=True, required=False)
    skills = SkillSerializer(many=True, required=False)
    courseworks = CourseworkSerializer(many=True, required=False)
    projects = ProjectSerializer(many=True, required=False)
    custom_fields = CustomFieldSerializer(many=True, required=False)

    class Meta:
        model = Resume
        fields = ['full_name', 'contact_info','email_user', 'important_links', 'educations', 'skills', 'courseworks', 'projects', 'custom_fields', 'display_contact_info']

    def create(self, validated_data):
        important_links_data = validated_data.pop('important_links', [])
        educations_data = validated_data.pop('educations', [])
        skills_data = validated_data.pop('skills', [])
        courseworks_data = validated_data.pop('courseworks', [])
        projects_data = validated_data.pop('projects', [])
        custom_fields_data = validated_data.pop('custom_fields', [])

        resume = Resume.objects.create(**validated_data)
        
        for link in important_links_data:
            ImportantLink.objects.create(resume=resume, **link)
        for education in educations_data:
            Education.objects.create(resume=resume, **education)
        for skill in skills_data:
            Skill.objects.create(resume=resume, **skill)
        for coursework in courseworks_data:
            Coursework.objects.create(resume=resume, **coursework)
        for project_data in projects_data:
            bullet_points_data = project_data.pop('bullet_points', [])
            project = Project.objects.create(resume=resume, **project_data)
            for point in bullet_points_data:
                ProjectBulletPoint.objects.create(project=project, **point)
        for custom_field in custom_fields_data:
            CustomField.objects.create(resume=resume, **custom_field)
        
        return resume

    def update(self, instance, validated_data):
        important_links_data = validated_data.pop('important_links', [])
        educations_data = validated_data.pop('educations', [])
        skills_data = validated_data.pop('skills', [])
        courseworks_data = validated_data.pop('courseworks', [])
        projects_data = validated_data.pop('projects', [])
        custom_fields_data = validated_data.pop('custom_fields', [])

        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.contact_info = validated_data.get('contact_info', instance.contact_info)
        instance.email_user = validated_data.get('email_user', instance.email_user)
        instance.display_contact_info = validated_data.get('display_contact_info', instance.display_contact_info)
        instance.save()

        instance.important_links.all().delete()
        for link in important_links_data:
            ImportantLink.objects.create(resume=instance, **link)
        
        instance.educations.all().delete()
        for education in educations_data:
            Education.objects.create(resume=instance, **education)
        
        instance.skills.all().delete()
        for skill in skills_data:
            Skill.objects.create(resume=instance, **skill)
        
        instance.courseworks.all().delete()
        for coursework in courseworks_data:
            Coursework.objects.create(resume=instance, **coursework)
        
        instance.projects.all().delete()
        for project_data in projects_data:
            bullet_points_data = project_data.pop('bullet_points', [])
            project = Project.objects.create(resume=instance, **project_data)
            for point in bullet_points_data:
                ProjectBulletPoint.objects.create(project=project, **point)
        
        instance.custom_fields.all().delete()
        for custom_field in custom_fields_data:
            CustomField.objects.create(resume=instance, **custom_field)

        return instance
