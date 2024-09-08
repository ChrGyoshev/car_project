from django.urls import path

from backend.maintenance.views import CreateMaintenanceView, EditMaintenanceView, ListCarMaintenancesView, ListSpecificCarMaintenancesView, DeleteMaintenanceView


urlpatterns = [
    path('create/<int:pk>', CreateMaintenanceView.as_view()),
    path('list/<int:pk>', ListCarMaintenancesView.as_view()),
    path('list-specific/<int:pk>', ListSpecificCarMaintenancesView.as_view()),
    path('delete/<int:pk>', DeleteMaintenanceView.as_view()),
    path('edit/<int:pk>', EditMaintenanceView.as_view()),
]