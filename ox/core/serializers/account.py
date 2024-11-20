from rest_framework import serializers


__all__ = ("PasswordLoginSerializer",)


class PasswordLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
