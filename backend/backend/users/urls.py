from django.urls import path

from backend.users.views import index


urlpatterns = [
    path('', index)
]