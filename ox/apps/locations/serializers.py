from rest_framework import serializers

from ox.core.serializers import ModelSerializer

from . import models


__all__ = ("CountrySerializer",)


class CountrySerializer(ModelSerializer):
    flag = serializers.CharField()

    class Meta:
        model = models.Country
        fields = "__all__"
