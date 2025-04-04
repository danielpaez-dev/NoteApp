from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from users.models import CustomUser


class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    slug = models.SlugField(unique=True, blank=True, null=True)
    category = models.CharField(max_length=15, default="Personal")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="notes",
        to_field="email",
        default="default@example.com",
        null=True,  # Temporary
        blank=True,  # Temporary
    )

    def __str__(self):
        return f"Title: {self.title}, Content: {self.content[:50]}..., Category: {self.category}, Created: {self.created}, Updated: {self.updated}, User: {self.user.email}"

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_base = slugify(self.title)
            slug = slug_base
            if Note.objects.filter(slug=slug).exists():
                slug = f"{slug_base}-{get_random_string(5)}"
            self.slug = slug
        super(Note, self).save(*args, **kwargs)
