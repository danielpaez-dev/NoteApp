from django.apps import AppConfig
from django.db.models.signals import post_migrate


class DefaultUsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "default_users"

    def ready(self):
        post_migrate.connect(create_default_user, sender=self)
        pass


def create_default_user(sender, **kwargs):
    from django.db import connection
    from .models import DefaultUser

    table_name = DefaultUser._meta.db_table
    if table_name in connection.introspection.table_names():
        DefaultUser.objects.get_or_create_demo_user()
