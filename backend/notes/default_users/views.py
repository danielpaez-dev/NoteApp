from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login, logout
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import DefaultUser
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
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "user": DefaultUserSerializer(user).data},
            status=status.HTTP_200_OK,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def default_user_logout(request):
    logout(request)
    return Response({"status": "success"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def demo_login(request):
    try:
        # Obtener usuario demo
        demo_user, created = DefaultUser.objects.get_or_create_demo_user()

        # Autenticación manual con credenciales demo
        user = authenticate(
            request,
            email=demo_user.email,
            password="TuPasswordSegura123",  # Debe coincidir con el manager
        )

        if not user:
            return Response(
                {"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED
            )

        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                "token": token.key,
                "user": DefaultUserSerializer(user).data,
                "is_demo": True,
            }
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def demo_logout(request):
    try:
        # Eliminar token y cerrar sesión
        request.user.auth_token.delete()
        logout(request)
        return Response({"status": "success"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
