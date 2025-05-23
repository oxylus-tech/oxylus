from ox.core.serializers import ModelSerializer, RelatedField

from . import models


__all__ = (
    "CurrencySerializer",
    "CountrySerializer",
)


class CurrencySerializer(ModelSerializer):
    class Meta:
        model = models.Currency
        fields = "__all__"


class CountrySerializer(ModelSerializer):
    # flag = serializers.CharField()
    currency = RelatedField(queryset=models.Currency.objects.all())

    class Meta:
        model = models.Country
        fields = "__all__"
