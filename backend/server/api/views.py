from django.shortcuts import render
from apps.accounts.models import UserProfile
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status



@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def register(request):
    result = {}
    user_data = json.loads(request.body)
    if 'password' in user_data and user_data['password']:
        user = User()
        user.password = user_data['password']
    if 'username' in user_data and user_data['username']:
        user.username = user_data['username']
    user.save()
    profile = UserProfile()
    profile.user = user
    profile.name = user_data['username']
    profile.last_name = user_data['last_name']
    profile.middle_name = user_data['middle_name']
    profile.save()
    result["points"] = profile.points
    result["name"] = profile.name
    return Response(result, content_type="application/json")


# @api_view(["POST"])
# @permission_classes([AllowAny])
# @csrf_exempt
# def create_profile(request):
#     result = {}
#     errors = []
#     if request.method == 'POST' and request.body:
#         user_data = json.loads(request.body)
#         if 'user_id' in user_data and user_data['user_id']:
#             user = User.objects.get(pk=user_data['user_id'])
#             profile_result = []
#             profile_json = {}
#             item_json['id'] = item.id
#             item_json['organization'] = quest.organization.short_name
#             item_json['name'] = quest.name
#             item_json['phone'] = quest.phone

#             return Response(profile_json, content_type="application/json")
#     return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

