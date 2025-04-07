from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, auth0_id, **extra_fields):
        user = self.model(auth0_id=auth0_id, **extra_fields)
        user.save(using=self._db)
        return user

    def create_superuser(self, auth0_id, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(auth0_id, **extra_fields)


class CustomUser(AbstractUser):
    username = None  # Eliminar username
    password = None  # Eliminar password
    auth0_id = models.CharField(max_length=150, unique=True, primary_key=True)
    email = models.EmailField(blank=True)  # Opcional si no lo necesitas
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    avatar_url = models.URLField(blank=True)

    USERNAME_FIELD = "auth0_id"  # Campo de identificación principal
    REQUIRED_FIELDS = []  # Campos requeridos para createsuperuser

    objects = CustomUserManager()  # Usar el manager personalizado

    def __str__(self):
        return self.auth0_id
