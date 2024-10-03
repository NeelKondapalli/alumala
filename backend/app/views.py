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

# @csrf_exempt
# def submit_to_notion(request):
#     if request.method == 'POST':
#         notion = Client(auth=os.environ.get('secret_cV23rUNHhoqXTlRUA3axEqAzsixrBK6BL1CVPW2014X'))
#         database_id = os.getenv('38dc61208ec0440baebd83dc65d8198c')
#         data = request.POST
#         name = data.get('name')
#         email = data.get('email')

#         try:
#             response = notion.pages.create({
#                 'parent': {'database_id': database_id},
#                 'properties': {
#                     'Name': {
#                         'title': [
#                             {
#                                 'text': {
#                                     'content': name,
#                                 },
#                             },
#                         ],
#                     },
#                     'Email': {
#                         'email': email,
#                     },
#                 },
#             })
#             return JsonResponse({"success": True, "data": response})
#         except Exception as e:
#             return JsonResponse({"success": False, "error": str(e)}, status=500)
#     else:
#         return JsonResponse({"error": "Method not allowed"}, status=405)
