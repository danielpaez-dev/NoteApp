from django.contrib.auth.backends import ModelBackend
from .models import DefaultUser


class DefaultUserBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = DefaultUser.objects.get(email=email)
            if user.check_password(password):
                return user
        except DefaultUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return DefaultUser.objects.get(pk=user_id)
        except DefaultUser.DoesNotExist:
            return None
