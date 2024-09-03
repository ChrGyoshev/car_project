from django.contrib import admin

from backend.cars.models import Car

# Register your models here.
@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['make','model','owner']