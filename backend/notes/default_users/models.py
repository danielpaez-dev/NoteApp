from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission,
)
from django.utils.translation import gettext_lazy as _
from django.db import models


class DefaultUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El email es obligatorio para crear un usuario.")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

    def get_or_create_demo_user(self):
        demo_email = "default@example.com"
        password = "TuPasswordSegura123"
        user, created = self.get_or_create(
            email=demo_email,
            defaults={
                "first_name": "Default",
                "last_name": "User",
                "is_staff": False,
                "is_superuser": False,
            },
        )
        if created:
            user.set_password(password)
            user.save()
        return user, created


class DefaultUser(AbstractBaseUser, PermissionsMixin):
    # Campos básicos
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=30, blank=True)
    last_name = models.CharField(_("last name"), max_length=30, blank=True)

    # Campos de estado
    is_active = models.BooleanField(_("active"), default=True)
    is_staff = models.BooleanField(_("staff status"), default=False)
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)

    # Campo opcional para imagen de perfil
    profile_image = models.ImageField(
        _("profile image"), upload_to="profile_images/", blank=True, null=True
    )

    objects = DefaultUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        # Evita conflictos de nombres inversos
        default_related_name = "default_users"

    def __str__(self):
        return self.email

    # Solución definitiva para conflictos de related_name
    groups = models.ManyToManyField(
        Group,
        verbose_name=_("groups"),
        blank=True,
        help_text=_("Los grupos a los que pertenece este usuario."),
        related_name="default_user_groups",
        related_query_name="default_user_group",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Permisos específicos para este usuario."),
        related_name="default_user_permissions",
        related_query_name="default_user_permission",
    )
