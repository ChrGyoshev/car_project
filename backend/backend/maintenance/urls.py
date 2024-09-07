from django.urls import path

from backend.maintenance.views import CreateMaintenanceView, ListCarMaintenancesView


urlpatterns = [
    path('create/<int:pk>', CreateMaintenanceView.as_view()),
    path('list/<int:pk>', ListCarMaintenancesView.as_view()),
]