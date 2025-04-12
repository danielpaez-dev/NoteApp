# users/views.py
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
from django.urls import reverse  # Para generar URLs dinámicas

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Asumiendo que auth0helper existe y funciona como se espera
from auth0login.auth0helper import get_token, get_user_info
from .serializers import UserSerializer

# Configuración del logger
logger = logging.getLogger(__name__)

# Obtener el modelo de usuario
User = get_user_model()


class UserProfileView(APIView):
    """
    Vista de API para obtener (GET) el perfil del usuario autenticado.
    """

    permission_classes = [IsAuthenticated]  # Requiere autenticación

    def get(self, request, *args, **kwargs):
        """
        Maneja peticiones GET. Devuelve los datos del usuario autenticado
        utilizando el UserSerializer.
        """
        # ¡CORREGIDO! Usar siempre el serializador
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
        # El código anterior que creaba user_data manualmente ha sido eliminado


def callback(request):
    """
    Vista que maneja el callback de Auth0 después de la autenticación.
    Procesa el código, obtiene tokens/info, crea/actualiza y loguea al usuario.
    """
    code = request.GET.get("code")
    if not code:
        messages.error(request, "No se recibió el código de autorización de Auth0.")
        # Considera redirigir a una página de error específica o a la home
        return redirect(
            getattr(settings, "LOGIN_REDIRECT_URL", "/")
        )  # Usa una URL de settings si existe

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

        # Usar 'sub' (identificador único de Auth0) como 'username' en Django
        # Asegúrate de que el modelo User de Django permite la longitud de 'sub'
        auth0_sub = user_info["sub"]
        user_defaults = {
            "email": user_info.get(
                "email"
            ),  # Permitir email nulo si Auth0 no lo devuelve
            "first_name": user_info.get("given_name", ""),
            "last_name": user_info.get("family_name", ""),
            # Considera si necesitas establecer una contraseña inutilizable
            # "password": User.objects.make_random_password() # O set_unusable_password()
        }

        # Filtrar defaults None para evitar problemas con campos no nullable sin default
        user_defaults = {k: v for k, v in user_defaults.items() if v is not None}

        user, created = User.objects.update_or_create(
            username=auth0_sub, defaults=user_defaults
        )

        # Si no fue creado, igualmente actualizamos por si cambió algo en Auth0
        # update_or_create ya maneja esto si los defaults son diferentes
        # (Aunque un save() explícito no haría daño si quieres asegurar ciertas lógicas)
        # if not created:
        #    user.save() # Opcional, update_or_create ya guarda

        # Iniciar sesión en Django
        # Asegúrate de que tu backend de autenticación está configurado correctamente
        # si no usas el backend por defecto.
        django_login(
            request, user, backend="django.contrib.auth.backends.ModelBackend"
        )  # Especificar backend puede ser más seguro
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

    # Redirigir a la URL 'next' guardada en 'state' o a un dashboard por defecto
    # Asegúrate de que 'state' se esté pasando correctamente en la vista de login
    state = request.GET.get("state", None)
    # Validar que 'state' (si existe) sea una URL segura/local (prevención de Open Redirect)
    # Aquí una validación simple, podrías necesitar algo más robusto:
    next_url = (
        state
        if state and state.startswith("/")
        else getattr(settings, "LOGIN_REDIRECT_URL", "/dashboard/")
    )

    return redirect(next_url)


def login(request):
    """
    Redirige al usuario a la página de inicio de sesión de Auth0.
    """
    # Obtener la URL a la que redirigir después del login exitoso
    next_url = request.GET.get(
        "next", getattr(settings, "LOGIN_REDIRECT_URL", "/dashboard/")
    )

    # ¡MEJORA! Construir la redirect_uri dinámicamente
    # Asumiendo que tu URL de callback se llama 'auth_callback' en tu urls.py
    try:
        callback_url = request.build_absolute_uri(reverse("auth_callback"))
    except Exception as e:
        logger.error(
            f"Error al generar la URL de callback: {e}. Asegúrate de que la URL 'auth_callback' esté definida."
        )
        messages.error(request, "Error de configuración al intentar iniciar sesión.")
        return redirect("/")  # O a una página de error

    # Parámetros para la URL de autorización de Auth0
    auth_params = {
        "client_id": settings.SOCIAL_AUTH_AUTH0_KEY,
        "response_type": "code",
        "scope": "openid profile email",  # Asegúrate que estos scopes están habilitados en Auth0
        "redirect_uri": callback_url,
        "state": next_url,  # Usar 'state' para pasar 'next_url' de forma segura
    }

    # Construir la URL completa
    auth0_domain = settings.SOCIAL_AUTH_AUTH0_DOMAIN
    signin_url = f"https://{auth0_domain}/authorize?{urlencode(auth_params)}"

    return HttpResponseRedirect(signin_url)


def logout(request):
    """
    Cierra la sesión del usuario en Django y redirige a Auth0 para el logout global.
    """
    user_display = request.user.username if request.user.is_authenticated else "Usuario"
    django_logout(request)  # Cierra sesión en Django

    # ¡MEJORA! Construir la returnTo URL dinámicamente
    # Asumiendo que quieres redirigir a la página principal (homepage) llamada 'home' en urls.py
    try:
        # Puedes cambiar 'home' por la URL a la que quieras volver tras el logout
        return_to_url = request.build_absolute_uri(reverse("home"))
    except Exception as e:
        logger.error(
            f"Error al generar la URL de retorno para logout: {e}. Usando fallback '/'."
        )
        return_to_url = request.build_absolute_uri("/")  # Fallback seguro

    # Parámetros para la URL de logout de Auth0 V2
    logout_params = {
        "client_id": settings.SOCIAL_AUTH_AUTH0_KEY,
        "returnTo": return_to_url,
    }

    # Construir la URL de logout
    auth0_domain = settings.SOCIAL_AUTH_AUTH0_DOMAIN
    logout_url = f"https://{auth0_domain}/v2/logout?{urlencode(logout_params)}"

    messages.info(request, f"{user_display} ha cerrado sesión.")
    return HttpResponseRedirect(
        logout_url
    )  # Redirigir a Auth0 para completar el logout
