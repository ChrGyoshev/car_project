
from django.contrib.auth import get_user_model
from django.db import models
from django.forms import ValidationError
from django.utils import timezone

User= get_user_model()


# Create your models here.
def validate_year(value):
    current = timezone.now().year
    if value < 1960 or value > current:
        raise ValidationError(f"The year must be between 1960 and {current}")
    
class Car(models.Model):
    make = models.CharField(max_length=500)
    model = models.CharField(max_length=500)
    year = models.IntegerField(validators=[validate_year])
    picture = models.ImageField( upload_to="images/", blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cars')
    mileage = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"


    

