import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def get_token(code):
    token_url = f"https://{settings.SOCIAL_AUTH_AUTH0_DOMAIN}/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": settings.SOCIAL_AUTH_AUTH0_KEY,
        "client_secret": settings.SOCIAL_AUTH_AUTH0_SECRET,
        "code": code,
        "redirect_uri": "http://localhost:8000/api/auth/callback",
    }
    headers = {"content-type": "application/json"}

    try:
        response = requests.post(token_url, json=payload, headers=headers)
        response.raise_for_status()  # Lanza una excepción para errores HTTP (4xx o 5xx)
        token_info = response.json()
        logger.debug("Token recibido de Auth0: %s", token_info)
        return token_info
    except requests.exceptions.RequestException as e:
        logger.error(f"Error al obtener token de Auth0: {e}")
        if hasattr(e, "response") and e.response is not None:
            logger.error(
                f"Respuesta de Auth0: {e.response.status_code} - {e.response.text}"
            )
        return None


def get_user_info(access_token):
    userinfo_url = f"https://{settings.SOCIAL_AUTH_AUTH0_DOMAIN}/userinfo"
    headers = {"Authorization": f"Bearer {access_token}"}

    try:
        response = requests.get(userinfo_url, headers=headers)
        response.raise_for_status()  # Lanza una excepción para errores HTTP
        user_info = response.json()
        logger.debug("Información de usuario recibida de Auth0: %s", user_info)
        return user_info
    except requests.exceptions.RequestException as e:
        logger.error(f"Error al obtener información del usuario de Auth0: {e}")
        if hasattr(e, "response") and e.response is not None:
            logger.error(
                f"Respuesta de Auth0: {e.response.status_code} - {e.response.text}"
            )
        return None
