from django.urls import path

from backend.maintenance.views import CreateMaintenanceView


urlpatterns = [
    path('create', CreateMaintenanceView.as_view())
]