from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)
User = get_user_model()


class Auth0(BaseBackend):
    def authenticate(self, request, code=None, **kwargs):
        if code is None:
            return None

        from auth0login.auth0helper import get_token, get_user_info

        token_info = get_token(code)
        if not token_info:
            return None

        user_info = get_user_info(token_info.get("access_token"))
        if not user_info:
            return None

        auth0_id = user_info.get("sub")
        if not auth0_id:
            logger.error(
                "No se encontró el 'sub' en la información del usuario de Auth0."
            )
            return None

        email = user_info.get("email", "")
        first_name = user_info.get("given_name", "")
        last_name = user_info.get("family_name", "")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create_user(username=email, email=email)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            logger.info(
                f"Usuario creado desde Auth0: {user.username} ({user.email}, Auth0 ID: {auth0_id})"
            )
        else:
            # Actualizar los datos del usuario si es necesario
            if user.first_name != first_name or user.last_name != last_name:
                user.first_name = first_name
                user.last_name = last_name
                user.save()
                logger.info(
                    f"Usuario actualizado desde Auth0: {user.username} ({user.email}, Auth0 ID: {auth0_id})"
                )

        return user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
