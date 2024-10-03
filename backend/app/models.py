from django.db import models

# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    graduation_year = models.IntegerField()
    university = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    bio = models.CharField(max_length=300)
    linkedin_url = models.URLField()
    video = models.FileField()
    image = models.FileField()

    # Additional fields to monitor profile activity
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
