from django.urls import path

from backend.maintenance.views import CreateMaintenanceView, ListCarMaintenancesView, ListSpecificCarMaintenancesView


urlpatterns = [
    path('create/<int:pk>', CreateMaintenanceView.as_view()),
    path('list/<int:pk>', ListCarMaintenancesView.as_view()),
    path('list-specific/<int:pk>', ListSpecificCarMaintenancesView.as_view())
]