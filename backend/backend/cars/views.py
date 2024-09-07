from django.core.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.contrib.auth import get_user_model
from backend.cars.models import Car
from backend.cars.serializers import CarSerializer
from mixins.mixin import CheckCarOwnerMixin, GetUserTokenMixin, PermissionMixin
from rest_framework.generics import RetrieveAPIView


User = get_user_model()




class CreateCar(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('No token provided')

        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            
            user = User.objects.filter(id=payload['id']).first()
            if not user:
                raise AuthenticationFailed('User not found')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
        
        # Pass the user to the serializer context
        serializer = CarSerializer(data=request.data, context={'user': user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Car successfully created"}, status=200)
    
class ListAllCars(PermissionMixin,GetUserTokenMixin,APIView):
    def get(self, request):
        user_from_token = self.get_user_from_token(request)
        user_obj = User.objects.filter(id=user_from_token['id']).first()
        cars = user_obj.cars.all()
        if not cars:
            raise Exception('no cars found for this driver')
        serializer = CarSerializer(cars,many=True)
        return Response(serializer.data)
    
class ListSpecificCar(GetUserTokenMixin,CheckCarOwnerMixin,APIView):
    def get(self,request, *args, **kwargs):
        user_id_from_token = self.get_user_from_token(request)
        ownership_car = self.check_owner(user_id_from_token)
        if ownership_car:
            serializer = CarSerializer(ownership_car) 
            return Response(serializer.data)
        raise PermissionDenied("you don't have permission to list this")
        
class DeleteCar(GetUserTokenMixin,CheckCarOwnerMixin,APIView):
    def delete(self, request, *args, **kwargs):
        user_id_from_token = self.get_user_from_token(request)
        ownership_car = self.check_owner(user_id_from_token)
        if ownership_car:
            ownership_car.delete()
            return Response("Car successfully deleted")
        raise PermissionDenied("you don't have permission to delete this")
    
class EditCar(GetUserTokenMixin,CheckCarOwnerMixin,APIView):
    def patch(self, request, *args, **kwargs):
        user_id_from_token = self.get_user_from_token(request)
        ownership_car= self.check_owner(user_id_from_token)
        if ownership_car:
            serializer = CarSerializer(ownership_car, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        raise PermissionDenied('you dont have permission to edit this')
       
        
        
        
        

    

    
        
    
        

