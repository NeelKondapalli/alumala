from django.shortcuts import render
from django.core import serializers

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from notion_client import Client
from .models import Profile


def profiles(request):
    profiles_list = Profile.objects.all()
    profiles_json = serializers.serialize('json', profiles_list)
    return JsonResponse({"profiles": profiles_json})

