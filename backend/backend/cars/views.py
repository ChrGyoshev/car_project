from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.contrib.auth import get_user_model

from backend.cars.serializers import CarSerializer


User = get_user_model()

class CreateCar(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('No token provided')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            user_id = payload.get('id')
            user = User.objects.filter(id=user_id).first()
            if not user:
                raise AuthenticationFailed('User not found')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
        
        # Pass the user to the serializer context
        serializer = CarSerializer(data=request.data, context={'request': request, 'user': user})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Car successfully created"}, status=201)
        return Response(serializer.errors, status=400)
