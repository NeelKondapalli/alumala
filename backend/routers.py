from rest_framework import routers
from app import viewsets

# Creates a router to generated URLS for registered viewsets (handles CRUD operations).
router = routers.SimpleRouter()

# Register the ProfileViewSet so it can be reached via the api/ url.
router.register(r'profile', viewsets.ProfileViewSet, basename = 'profile')

urlpatterns = router.urls

