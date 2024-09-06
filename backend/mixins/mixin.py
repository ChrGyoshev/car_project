from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
import jwt
from rest_framework.response import Response
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
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token,'secret',algorithms=['HS256'])
        user =User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return serializer.data
