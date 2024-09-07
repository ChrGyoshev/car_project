from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied

from backend.maintenance.serializers import MaintenanceSerializer
from backend.cars.models import Car
from mixins.mixin import CheckCarOwnerMixin, GetUserTokenMixin


User= get_user_model()

class CreateMaintenanceView(CheckCarOwnerMixin,GetUserTokenMixin,APIView):
    def post(self,request,*args,**kwargs):
        user_from_token = self.get_user_from_token(request)
        car_owned = self.check_owner(user_from_token)
        if car_owned:
            serializer = MaintenanceSerializer(data=request.data, context= {'car':car_owned})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        raise PermissionDenied("You do not have ownership of the car")

