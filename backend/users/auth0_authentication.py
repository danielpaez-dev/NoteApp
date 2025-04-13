from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import requests
from jose import jwt, JWTError
from django.contrib.auth import get_user_model

User = get_user_model()


class Auth0TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return None

        token = parts[1]
        try:
            jwks_url = (
                f"https://{settings.SOCIAL_AUTH_AUTH0_DOMAIN}/.well-known/jwks.json"
            )
            jwks = requests.get(jwks_url).json()
            payload = jwt.decode(
                token,
                jwks,
                algorithms=["RS256"],
                audience=settings.SOCIAL_AUTH_AUTH0_AUDIENCE,
                issuer=f"https://{settings.SOCIAL_AUTH_AUTH0_DOMAIN}/",
            )
            username = payload["sub"]
            user, created = User.objects.get_or_create(username=username)
            return (user, token)
        except JWTError:
            return None
        except Exception as e:
            raise AuthenticationFailed(f"Error de autenticación: {str(e)}")
