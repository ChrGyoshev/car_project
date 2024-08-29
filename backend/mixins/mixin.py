from rest_framework.exceptions import PermissionDenied
from rest_framework import status


class PermissionMixin:
    def dispatch(self,request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            raise PermissionDenied('Token is missing or invalid', status.HTTP_403_FORBIDDEN)

     
           
        return super().dispatch(request, *args, **kwargs)