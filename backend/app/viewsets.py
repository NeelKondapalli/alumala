from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.core import serializers

from supabase import create_client, Client
from .models import Profile

from .serializers import ProfileSerializer

url = "https://tcnkepluqwnvvuwptdrk.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbmtlcGx1cXdudnZ1d3B0ZHJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDUyMTAyOSwiZXhwIjoyMDMwMDk3MDI5fQ.z_0VBtUhQ9NxRBX-umJpXl0ERFUNM94rRTQUoR6o8Ss"

supabase: Client = create_client(url, key)

class ProfileViewSet(viewsets.ModelViewSet): #error when changed to ModelViewSet (more specific subclass of ViewSet)
    """
    Viewset for the Profile model. Handles multiple CRUD operations. 
    """
    print("Getting objects...")
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]


    # def retrieve(self, request, pk=None):
    #     queryset = Profile.objects.all()
    #     profile = get_object_or_404(queryset, pk=pk)
    #     serializer = ProfileSerializer(profile)
    #     return Response(serializer.data)

    def list(self, request, pk = None):
        if pk:
            queryset = Profile.objects.filter(id = pk)
            profiles = self.filter_queryset(queryset)

            serializer = ProfileSerializer(profiles)
            return Response(serializer.data)
        
        queryset = self.filter_queryset(self.get_queryset())

        #Paginates Data
        profiles = self.paginate_queryset(queryset)
        if profiles is not None:
            serializer = ProfileSerializer(profiles, many = True)
            return self.get_paginated_response(serializer.data)
        
        serializer = ProfileSerializer(queryset, many = True)
        return Response(serializer.data)

    def create(self, request):
        video = request.FILES.get('video')
        image = request.FILES.get('image')
        data, count = supabase.table('app_profile').insert({
                "name": request.data["name"],
                "email": request.data["email"],
                "graduation_year": request.data["graduation_year"],
                "university": request.data["university"],
                "major": request.data["major"],
                "linkedin_url": request.data["linkedin_url"],
                "video": video.name,
                "image": image.name,
                "bio": request.data["bio"]
                }).execute()

        user_id = data[1][0]["id"]
        
        video_content_type = video.content_type
        video_bytes = video.read()

        image_content_type = image.content_type
        image_bytes = image.read()

        res = supabase.storage.get_bucket("profile_videos")
        
        supabase.storage.from_("profile_videos").upload(file=video_bytes, path= f"{user_id}/{video.name}", file_options = {"content-type": video_content_type})
        supabase.storage.from_("profile_videos").upload(file=image_bytes, path= f"{user_id}/{image.name}", file_options = {"content-type": image_content_type})


       
        # response = "POST API and you have uploaded a {} file {},,,, {},,,,{}".format(content_type, res, request.data, data, count, user_id)
        response = "POST API and you have uploaded a file ,,,,{},,,,{}".format(data, user_id)
        


        return Response(response)
    


    
