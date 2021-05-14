from django.conf.urls import url, include

urlpatterns = [
    url('', include('djoser.urls')),
    url('', include('djoser.urls.authtoken')),
]