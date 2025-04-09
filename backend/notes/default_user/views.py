from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import login, logout
from rest_framework.authtoken.models import Token  # si usas TokenAuthentication
from .serializers import (
    DefaultUserRegisterSerializer,
    DefaultUserSerializer,
    DefaultUserLoginSerializer,
)


class DefaultUserRegisterView(generics.CreateAPIView):
    serializer_class = DefaultUserRegisterSerializer
    permission_classes = [AllowAny]


class DefaultUserLoginView(generics.GenericAPIView):
    serializer_class = DefaultUserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)  # Inicia sesión en la request
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "user": DefaultUserSerializer(user).data},
            status=status.HTTP_200_OK,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def default_user_logout(request):
    logout(request)
    return Response({"status": "success"}, status=status.HTTP_200_OK)
