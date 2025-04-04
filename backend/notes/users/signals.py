from django.db.models.signals import post_migrate
from django.contrib.auth import get_user_model
from django.dispatch import receiver


@receiver(post_migrate)
def create_default_user(sender, **kwargs):
    if sender.name == "users":
        User = get_user_model()
        default_email = "user@example.com"
        default_password = "userpass123"

        if not User.objects.filter(email=default_email).exists():
            try:
                User.objects.create_user(
                    email=default_email,
                    password=default_password,
                    first_name="Default",
                    last_name="User",
                )
            except Exception as e:
                print(f"\n❌ Error creando usuario normal: {e}\n")
