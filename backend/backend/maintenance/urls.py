from django.urls import path

from backend.maintenance.views import CreateMaintenanceView


urlpatterns = [
    path('create/<int:pk>', CreateMaintenanceView.as_view())
]