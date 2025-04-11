from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import DefaultUser


class DefaultUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultUser
        fields = ["email", "first_name", "last_name", "is_staff"]


class DefaultUserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = DefaultUser
        fields = [
            "email",
            "first_name",
            "last_name",
            "profile_image",
            "password",
            "password2",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = DefaultUser.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            password=validated_data["password"],
            profile_image=validated_data.get("profile_image"),
        )
        return user


class DefaultUserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        try:
            user = DefaultUser.objects.get(email=email)
        except DefaultUser.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "No existe ningún usuario con este email."}
            )

        # Usamos el método check_password para verificar la contraseña
        if not user.check_password(password):
            raise serializers.ValidationError({"password": "Contraseña incorrecta."})

        if not user.is_active:
            raise serializers.ValidationError(
                {"email": "Esta cuenta está desactivada."}
            )

        attrs["user"] = user
        return attrs
