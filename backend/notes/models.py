from django.db import models
from django.conf import settings


class Note(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    category = models.CharField(
        max_length=9,
        choices=[
            ("Business", "BUSINESS"),
            ("Important", "IMPORTANT"),
            ("Personal", "PERSONAL"),
        ],
        default="PERSONAL",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
