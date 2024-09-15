from uu import encode
import jwt, datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from mixins.mixin import GetUserTokenMixin, PermissionMixin
from backend.users.models import User
from backend.users.serializers import UserSerializer



class RegisterView(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self,request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc)+ datetime.timedelta(minutes=60),
            'iat': datetime.datetime.now(datetime.timezone.utc),
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        # response.set_cookie(key='jwt', value= token, httponly=True, samesite="None", secure="True")
       
        response.data = {
            'jwt': token,
            
        }
        return response




class UserView(GetUserTokenMixin,APIView):
    def get(self,request):
        user = self.get_user_from_token(request)
        return Response(user)

    
class EditProfileView(APIView):
    def put(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('token not found')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)



class LogOutView(APIView):
    def post(self, request):
        response = Response() 
        # response.delete_cookie('jwt')
       
        response.set_cookie(key='jwt', httponly=True, samesite="None", secure="True", max_age=1)
        
        response.data = {
            'message': 'success logout',
        }
        return response

