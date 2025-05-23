from rest_framework.authentication import BaseAuthentication
from django.contrib.auth import get_user_model

User = get_user_model()


class DemoTokenAuthentication(BaseAuthentication):
    """
    Autenticación personalizada para el modo demo.
    Si se recibe el token 'demo-token', se busca (o crea) un usuario
    por defecto con username 'demo' y se autentica la petición.
    """

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != "Bearer":
            return None

        token = parts[1]
        if token == "demo-token":
            try:
                user = User.objects.get(username="demo")
            except User.DoesNotExist:
                user = User.objects.create_user(
                    username="demo", email="demo@example.com"
                )
                user.set_unusable_password()
                user.save()
            return (user, None)
        return None
