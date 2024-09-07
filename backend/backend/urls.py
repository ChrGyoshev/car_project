
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('backend.users.urls')),
    path('api/cars/', include('backend.cars.urls')), 
    path('api/cars/maintenance/', include('backend.maintenance.urls')),
]
