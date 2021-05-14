from django.urls import path, include
from rest_framework import routers
# from . import views

router = routers.DefaultRouter()

urlpatterns = [
    # tables
    path('', include(router.urls)),
    path('accounts/', include('apps.accounts.urls')),
   
    # path("request/request_sms", views.request_sms, name="request_sms"),
]