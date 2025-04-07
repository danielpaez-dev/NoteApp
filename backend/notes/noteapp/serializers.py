from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
        read_only_fields = ("user",)

    def create(self, validated_data):
        print("Contexto recibido:", self.context)
        validated_data["user"] = self.context["request"].user
        print(f"Creando nota para usuario: {validated_data['user'].auth0_id}")
        return super().create(validated_data)
