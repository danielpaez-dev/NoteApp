import logging
from urllib.parse import urlencode  # Para construir URLs de forma segura

from django.contrib.auth import (
    get_user_model,
    login as django_login,
    logout as django_logout,
)
from django.contrib import messages
from django.conf import settings
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from auth0login.auth0helper import get_token, get_user_info
from .serializers import UserSerializer

logger = logging.getLogger(__name__)
User = get_user_model()


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


def callback(request):
    """
    Vista que maneja el callback de Auth0 después de la autenticación.
    Procesa el código, obtiene tokens/info, crea/actualiza y loguea al usuario.
    """
    code = request.GET.get("code")
    if not code:
        messages.error(request, "No se recibió el código de autorización de Auth0.")
        return redirect(getattr(settings, "LOGIN_REDIRECT_URL", "/"))

    try:
        token = get_token(code)
        if not token or "access_token" not in token:
            messages.error(request, "Error al obtener el token de acceso de Auth0.")
            logger.warning("Fallo al obtener token de Auth0.")
            return redirect(getattr(settings, "LOGIN_REDIRECT_URL", "/"))

        user_info = get_user_info(token["access_token"])
        if not user_info or "sub" not in user_info:
            messages.error(
                request, "Error al obtener la información del usuario desde Auth0."
            )
            logger.warning("Fallo al obtener user_info de Auth0.")
            return redirect(getattr(settings, "LOGIN_REDIRECT_URL", "/"))

        auth0_sub = user_info["sub"]
        user_defaults = {
            "email": user_info.get("email"),
            "first_name": user_info.get("given_name", ""),
            "last_name": user_info.get("family_name", ""),
        }

        user_defaults = {k: v for k, v in user_defaults.items() if v is not None}

        user, created = User.objects.update_or_create(
            username=auth0_sub, defaults=user_defaults
        )

        django_login(request, user, backend="django.contrib.auth.backends.ModelBackend")
        messages.success(request, f"¡Bienvenido/a, {user.first_name or user.username}!")

    except Exception as e:
        logger.error(
            f"Error crítico durante el callback de Auth0: {str(e)}", exc_info=True
        )
        messages.error(
            request,
            "Ocurrió un error inesperado durante la autenticación. Por favor, inténtalo de nuevo.",
        )
        return redirect(getattr(settings, "LOGIN_REDIRECT_URL", "/"))

    state = request.GET.get("state", None)
    next_url = (
        state
        if state and state.startswith("/")
        else getattr(settings, "LOGIN_REDIRECT_URL", "/dashboard/")
    )

    return redirect(next_url)


def login(request):
    next_url = request.GET.get(
        "next", getattr(settings, "LOGIN_REDIRECT_URL", "/dashboard/")
    )

    try:
        callback_url = request.build_absolute_uri(reverse("auth_callback"))
    except Exception as e:
        logger.error(
            f"Error al generar la URL de callback: {e}. Asegúrate de que la URL 'auth_callback' esté definida."
        )
        messages.error(request, "Error de configuración al intentar iniciar sesión.")
        return redirect("/")

    auth_params = {
        "client_id": settings.SOCIAL_AUTH_AUTH0_KEY,
        "response_type": "code",
        "scope": "openid profile email",
        "redirect_uri": callback_url,
        "state": next_url,
    }

    auth0_domain = settings.SOCIAL_AUTH_AUTH0_DOMAIN
    signin_url = f"https://{auth0_domain}/authorize?{urlencode(auth_params)}"

    return HttpResponseRedirect(signin_url)


def logout(request):
    user_display = request.user.username if request.user.is_authenticated else "Usuario"
    django_logout(request)

    try:
        return_to_url = request.build_absolute_uri(reverse("home"))
    except Exception as e:
        logger.error(
            f"Error al generar la URL de retorno para logout: {e}. Usando fallback '/'."
        )
        return_to_url = request.build_absolute_uri("/")

    logout_params = {
        "client_id": settings.SOCIAL_AUTH_AUTH0_KEY,
        "returnTo": return_to_url,
    }

    auth0_domain = settings.SOCIAL_AUTH_AUTH0_DOMAIN
    logout_url = f"https://{auth0_domain}/v2/logout?{urlencode(logout_params)}"

    messages.info(request, f"{user_display} ha cerrado sesión.")
    return HttpResponseRedirect(logout_url)
