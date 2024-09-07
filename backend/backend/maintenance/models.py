from django.db import models

from backend.cars.models import Car

# Create your models here.

class Maintenance(models.Model):
    date = models.DateField()
    mileage = models.PositiveBigIntegerField()
    next_mileage = models.PositiveIntegerField()
    description = models.CharField(max_length=1500)
    car = models.ForeignKey(Car, related_name = 'maintenance', on_delete=models.CASCADE)