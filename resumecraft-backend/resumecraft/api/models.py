from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images",null=True)
    verified = models.BooleanField(default=False)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


#####################     resume ##############################
class Resume(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='resume')
    full_name = models.CharField(max_length=1000, blank=True, null=True)
    contact_info = models.TextField(blank=True, null=True)
    email_user = models.CharField(max_length=20,blank=True, null = True)
    display_contact_info = models.BooleanField(default=True)

class ImportantLink(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='important_links')
    link_name = models.CharField(max_length = 10, blank = True , null = True)
    url = models.URLField(max_length=500,blank=True,null = True)
    display = models.BooleanField(default=True)

class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='educations')
    school_name = models.CharField(max_length=200, blank=True, null=True)
    degree = models.CharField(max_length=200, blank=True, null=True)
    start_date = models.CharField(max_length=20,blank=True, null=True)
    end_date = models.CharField(max_length=20,blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    marks = models.CharField(max_length=50, blank=True, null=True)
    display = models.BooleanField(default=True)

class Skill(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=200, blank=True, null=True)
    display = models.BooleanField(default=True)

class Coursework(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='courseworks')
    title = models.CharField(max_length=200,blank=True,null = True)
    display = models.BooleanField(default=True)

class Project(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=200,blank=True,null = True)
    description = models.TextField(blank=True, null=True)
    display = models.BooleanField(default=True)

class ProjectBulletPoint(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='bullet_points')
    point = models.TextField(blank=True,null = True)
    display = models.BooleanField(default=True)

class CustomField(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='custom_fields')
    heading = models.CharField(max_length=200, blank=True, null=True)
    link_name = models.CharField(max_length=200, blank=True, null=True)
    url = models.URLField(max_length=500, blank=True, null=True)
    subheading = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    display = models.BooleanField(default=True)