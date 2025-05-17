from rest_framework import serializers

from ox.core.serializers import ModelSerializer, RelatedField

from . import models


__all__ = ("CountrySerializer",)


class CurrencySerializer(ModelSerializer):
    class Meta:
        model = models.Currency
        fields = "__all__"


class CountrySerializer(ModelSerializer):
    flag = serializers.CharField()
    currency = RelatedField(queryset=models.Currency.objects.all())
    currency_code = serializers.CharField()

    class Meta:
        model = models.Country
        fields = "__all__"
