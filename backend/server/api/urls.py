from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    # tables
    path('', include(router.urls)),
    path('accounts/', include('apps.accounts.urls')),
   
    path("request/user_login", views.user_login, name="user_login"),
    path("request/user_register", views.user_register, name="user_register"),
    path("request/org_register", views.org_register, name="org_register"),
    path("request/get_tests", views.get_tests, name="get_tests"),
    path("request/get_vacancies", views.get_vacancies, name="get_vacancies"),
    path("request/post_test", views.post_test, name="post_test"),
    path("request/post_vacancies", views.post_vacancies, name="post_vacancies"),
    path("request/get_org_vacancies", views.get_org_vacancies, name="get_org_vacancies"),
]
