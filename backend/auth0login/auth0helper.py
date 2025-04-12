# auth0login/auth0helper.py

import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def get_token(code):
    """
    Intercambia el código de autorización por un token de acceso llamando
    al endpoint /oauth/token de Auth0.
    """
    token_url = f"https://{settings.SOCIAL_AUTH_AUTH0_DOMAIN}/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": settings.SOCIAL_AUTH_AUTH0_KEY,
        "client_secret": settings.SOCIAL_AUTH_AUTH0_SECRET,  # ¡Necesitas añadir esto a settings!
        "code": code,
        "redirect_uri": "http://localhost:8000/api/auth/callback",  # Asegúrate que coincida exactamente con tu config de Auth0 y la vista de login
    }
    headers = {"content-type": "application/json"}

    try:
        response = requests.post(token_url, json=payload, headers=headers)
        response.raise_for_status()  # Lanza una excepción para errores HTTP (4xx o 5xx)
        token_info = response.json()
        logger.debug("Token recibido de Auth0: %s", token_info)
        # Podrías añadir validaciones aquí (ej: verificar si 'access_token' existe)
        return token_info
    except requests.exceptions.RequestException as e:
        logger.error(f"Error al obtener token de Auth0: {e}")
        if hasattr(e, "response") and e.response is not None:
            logger.error(
                f"Respuesta de Auth0: {e.response.status_code} - {e.response.text}"
            )
        return None


def get_user_info(access_token):
    """
    Obtiene la información del usuario llamando al endpoint /userinfo de Auth0
    usando el token de acceso.
    """
    userinfo_url = f"https://{settings.SOCIAL_AUTH_AUTH0_DOMAIN}/userinfo"
    headers = {"Authorization": f"Bearer {access_token}"}

    try:
        response = requests.get(userinfo_url, headers=headers)
        response.raise_for_status()  # Lanza una excepción para errores HTTP
        user_info = response.json()
        logger.debug("Información de usuario recibida de Auth0: %s", user_info)
        # Podrías añadir validaciones aquí (ej: verificar si 'sub' existe)
        return user_info
    except requests.exceptions.RequestException as e:
        logger.error(f"Error al obtener información del usuario de Auth0: {e}")
        if hasattr(e, "response") and e.response is not None:
            logger.error(
                f"Respuesta de Auth0: {e.response.status_code} - {e.response.text}"
            )
        return None
