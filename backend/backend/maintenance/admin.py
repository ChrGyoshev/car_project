from django.contrib import admin

from backend.maintenance.models import Maintenance

# Register your models here.

@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ['date','mileage','next_mileage','description', 'car']
    