from rest_framework import serializers

from backend.maintenance.models import Maintenance

class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = "__all__"
        extra_kwargs = {
            'car': {'read_only':True}
        }


    def create(self, validated_data):
            car = self.context.get('car')
            validated_data['car'] = car
            maintenance = Maintenance.objects.create(**validated_data)
            return maintenance