from rest_framework import serializers


__all__ = ("ModelSerializer",)


class ModelSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source="uuid", read_only=True)

    class Meta:
        fields = ("id",)
