from django.urls import path

from backend.cars.views import CreateCar, DeleteCar, EditCar, ListAllCars, ListSpecificCar



urlpatterns = [
    path('create', CreateCar.as_view()),
    path('list', ListAllCars.as_view()),
    path('car/<int:pk>', ListSpecificCar.as_view()),
    path('delete/<int:pk>', DeleteCar.as_view()),
    path('edit/<int:pk>', EditCar.as_view()),
    
]