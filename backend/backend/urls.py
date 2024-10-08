
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('backend.users.urls')),
    path('api/cars/', include('backend.cars.urls')), 
    path('api/cars/maintenance/', include('backend.maintenance.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

