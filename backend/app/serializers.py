from rest_framework import serializers

# Create your views here.
from django.http import JsonResponse
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the Profile model. 'id' and 'created' are not allowed to be mutated.
    """
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ["id", 'created']