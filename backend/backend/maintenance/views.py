from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView 
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied, NotFound

from backend.maintenance.models import Maintenance
from backend.maintenance.serializers import MaintenanceSerializer
from backend.cars.models import Car
from mixins.mixin import CheckCarOwnerMixin, GetUserTokenMixin, MaintenanceMixin, PermissionMixin


User= get_user_model()

class CreateMaintenanceView(PermissionMixin,CheckCarOwnerMixin,GetUserTokenMixin,APIView):
    def post(self,request,*args,**kwargs):
        user_from_token = self.get_user_from_token(request)
        car_owned = self.check_owner(user_from_token)
        if car_owned:
            serializer = MaintenanceSerializer(data=request.data, context= {'car':car_owned})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        raise PermissionDenied("You do not have ownership of the car")


class ListCarMaintenancesView(PermissionMixin,CheckCarOwnerMixin,GetUserTokenMixin,APIView):
    def get(self,request,*args,**kwargs):
        user_from_token = self.get_user_from_token(request)
        car_owned = self.check_owner(user_from_token)
        if car_owned:
            maintenance = car_owned.maintenance.all()
            serializer = MaintenanceSerializer(maintenance, many=True)
            return Response(serializer.data)
        raise PermissionDenied("You're not a owner of the car!")
    
    
class ListSpecificCarMaintenancesView(MaintenanceMixin,PermissionMixin,CheckCarOwnerMixin,GetUserTokenMixin,APIView):
    def get(self,request, *args, **kwargs):
        maintenance_object = self.get_maintenance(request)
        user_from_token = self.get_user_from_token(request)
        if user_from_token['id'] == maintenance_object.car.owner.id:
            serializer = MaintenanceSerializer(maintenance_object)
            return Response(serializer.data)
        raise PermissionDenied("You're not a owner of the car!")
    
class DeleteMaintenanceView(MaintenanceMixin,PermissionMixin,GetUserTokenMixin,APIView):
    def delete(self, request,*args,**kwargs):
        maintenance_object = self.get_maintenance(request)
        user_from_token= self.get_user_from_token(request)
        if user_from_token['id'] == maintenance_object.car.owner.id:
            maintenance_object.delete()
            return Response("Maintenance deleted successfully")
        raise PermissionDenied("You're not a owner of the car!")
    

class EditMaintenanceView(MaintenanceMixin,CheckCarOwnerMixin,GetUserTokenMixin,APIView):
    def patch(self, request, *args, **kwargs):
        maintenance_object = self.get_maintenance(request)
        user_from_token = self.get_user_from_token(request)
        if user_from_token['id'] == maintenance_object.car.owner.id:
            serializer = MaintenanceSerializer(maintenance_object, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        raise PermissionDenied("You're not a owner of the car!")
       
        
        

       

        