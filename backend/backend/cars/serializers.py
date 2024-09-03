from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from backend.cars.models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"
        extra_kwargs = {
            'owner': {'read_only': True}
        }

    def create(self, validated_data):
        user = self.context.get('user')
        validated_data['owner'] = user
        car = Car.objects.create(**validated_data)
        return car
    
    
    
