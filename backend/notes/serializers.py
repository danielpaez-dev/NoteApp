from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        allow_blank=True,
        required=False,
    )
    content = serializers.CharField(
        allow_blank=True,
        required=False,
    )

    class Meta:
        model = Note
        fields = [
            "id",
            "title",
            "content",
            "category",
            "created_at",
            "updated_at",
            "user",
        ]
        read_only_fields = ["user", "created_at", "updated_at"]
