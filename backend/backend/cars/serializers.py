from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from backend.cars.models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"
        extra_kwargs = {
            'owner':{'required': False, 'allow_null': True}
        }

    def create(self, validated_data):
        user = self.get_user_from_context()
        validated_data['owner'] = user
        car = Car.objects.create(**validated_data)
        return car
    
    def get_user_from_context(self):
        # Retrieve user from context
        user = self.context.get('user')
        if not user:
            raise serializers.ValidationError('User context is missing')
        return user

    
