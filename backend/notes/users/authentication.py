from jose import jwt
from urllib.request import urlopen
import json
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed


class Auth0Authentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get("Authorization", "").split(" ")[-1]
        if not token:
            return None

        try:
            # 1. Obtener JWKS desde Auth0
            jwks_url = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
            jwks = json.loads(urlopen(jwks_url).read())

            # 2. Buscar la clave RSA correcta
            unverified_header = jwt.get_unverified_header(token)
            rsa_key = {}
            for key in jwks["keys"]:
                if key["kid"] == unverified_header["kid"]:
                    rsa_key = {
                        "kty": key["kty"],
                        "kid": key["kid"],
                        "use": key["use"],
                        "n": key["n"],
                        "e": key["e"],
                    }

            # 3. Decodificar y validar token
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=["RS256"],
                issuer=f"https://{settings.AUTH0_DOMAIN}/",
                audience=settings.AUTH0_AUDIENCE,  # Mejor práctica: validar audiencia aquí
            )

            # Debug: Inspeccionar payload completo
            print("Decoded JWT payload:", payload)

            # 4. Validar campos esenciales
            sub = payload.get("sub")
            if not sub:
                raise AuthenticationFailed("Claim 'sub' no encontrado en el token")

            # 5. Crear/obtener usuario basado en auth0_id (sub)
            User = get_user_model()
            user, created = User.objects.get_or_create(
                auth0_id=sub,  # Usamos sub como identificador único
                defaults={
                    "avatar_url": payload.get("picture", ""),
                    "first_name": payload.get("given_name", ""),
                    "last_name": payload.get("family_name", ""),
                },
            )

            print(f"Usuario {'creado' if created else 'obtenido'}: {user.auth0_id}")
            return (user, None)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expirado")
        except jwt.JWTClaimsError as e:
            raise AuthenticationFailed(f"Error en claims: {str(e)}")
        except Exception as e:
            raise AuthenticationFailed(f"Error de autenticación: {str(e)}")
