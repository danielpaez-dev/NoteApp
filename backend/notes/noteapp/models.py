from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from users.models import CustomUser


class Note(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    category = models.CharField(max_length=15, default="Personal")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="notes",
        to_field="auth0_id",
    )

    def __str__(self):
        return f"Title: {self.title}, Content: {self.content[:50]}..., Category: {self.category}, Created: {self.created}, Updated: {self.updated}, User: {self.user.email}"

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_base = slugify(self.title) if self.title else "note"
            slug = slug_base
            if Note.objects.filter(slug=slug).exists():
                slug = f"{slug_base}-{get_random_string(5)}"
            self.slug = slug
        try:
            super(Note, self).save(*args, **kwargs)
        except Exception as e:
            print(f"Error guardando nota: {str(e)}")  # Debug clave
            raise
