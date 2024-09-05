from django.urls import path

from backend.cars.views import CreateCar, ListAllCars, ListSpecificCar



urlpatterns = [
    path('create', CreateCar.as_view()),
    path('list', ListAllCars.as_view()),
    path('car/<int:pk>', ListSpecificCar.as_view()),
]