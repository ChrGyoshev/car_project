from rest_framework.exceptions import AuthenticationFailed,NotFound
from rest_framework import status
import jwt
from rest_framework.response import Response
from backend.maintenance.models import Maintenance
from backend.cars.models import Car
from backend.users.serializers import UserSerializer
from backend.users.models import User

#check if token
class PermissionMixin:
    def dispatch(self,request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')   
        return super().dispatch(request, *args, **kwargs)
    
#check user from token
class GetUserTokenMixin:
    def get_user_from_token(self,request):
       
        auth_header = request.META.get('HTTP_AUTHORIZATION')
       
        if not auth_header:
            raise NotFound("Error no token")
        try:
            token = auth_header.split(' ')[1]

        except IndexError:
            raise AuthenticationFailed('Token is missing in authorization header')
        
        #decode token
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token is expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Token is invalid')
        
        #get user 
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return serializer.data

class CheckCarOwnerMixin:
    def check_owner(self, user, *args, **kwargs):
        car = Car.objects.filter(id=self.kwargs.get('pk')).first()
        if not car:
            raise NotFound("car not found")
        if car.owner.id == user['id']:
            return car
       
        return False
    

class MaintenanceMixin:
    def get_maintenance(self, request, *args, **kwargs):
        try:
            maintenance_object = Maintenance.objects.get(id=self.kwargs.get('pk'))
        except:
            raise NotFound("maintenance not found")
        
        maintenance_car = maintenance_object
        return maintenance_car

