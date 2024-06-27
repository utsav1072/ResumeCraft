from django.contrib import admin
from .models import User, Profile, Resume, ImportantLink, Education, Skill, Coursework, Project, ProjectBulletPoint, CustomField

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
    search_fields = ['username', 'email']
    ordering = ['username']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'verified']
    list_editable = ['verified']
    search_fields = ['user__username', 'full_name']
    list_filter = ['verified']

class ImportantLinkInline(admin.TabularInline):
    model = ImportantLink
    extra = 1

class EducationInline(admin.TabularInline):
    model = Education
    extra = 1

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class CourseworkInline(admin.TabularInline):
    model = Coursework
    extra = 1

class ProjectBulletPointInline(admin.TabularInline):
    model = ProjectBulletPoint
    extra = 1

class ProjectInline(admin.TabularInline):
    model = Project
    extra = 1

class CustomFieldInline(admin.TabularInline):
    model = CustomField
    extra = 1




@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'email_user', 'display_contact_info']
    search_fields = ['user__username', 'full_name']
    list_filter = ['user']
    inlines = [ImportantLinkInline, EducationInline, SkillInline, CourseworkInline, ProjectInline, CustomFieldInline]

@admin.register(ImportantLink)
class ImportantLinkAdmin(admin.ModelAdmin):
    list_display = ['resume', 'link_name', 'url', 'display']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['resume', 'school_name', 'degree', 'start_date', 'end_date', 'address', 'marks', 'display']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['resume', 'name', 'display']

@admin.register(Coursework)
class CourseworkAdmin(admin.ModelAdmin):
    list_display = ['resume', 'title', 'display']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['resume', 'name', 'description', 'display']
    inlines = [ProjectBulletPointInline]

@admin.register(ProjectBulletPoint)
class ProjectBulletPointAdmin(admin.ModelAdmin):
    list_display = ['project', 'point', 'display']

@admin.register(CustomField)
class CustomFieldAdmin(admin.ModelAdmin):
    list_display = ['resume', 'heading', 'link_name', 'url', 'subheading', 'description', 'display']
