from django.urls import path

from backend.cars.views import CreateCar



urlpatterns = [
    path('create', CreateCar.as_view()),
]