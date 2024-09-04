from django.urls import path

from backend.cars.views import CreateCar, ListAllCars



urlpatterns = [
    path('create', CreateCar.as_view()),
    path('list', ListAllCars.as_view()),
]