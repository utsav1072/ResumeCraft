# Generated by Django 5.0.6 on 2024-06-13 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_profile_gender'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='gender',
        ),
    ]