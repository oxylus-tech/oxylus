from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import ModelViewSet
from . import models, serializers, filters


__all__ = ("CountryViewSet", "CurrencyViewSet")


class CountryViewSet(ModelViewSet):
    queryset = models.Country.objects.all().order_by("name")
    serializer_class = serializers.CountrySerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    filterset_class = filters.CountryFilterSet
    search_fields = ["name", "phone", "code", "code_3", "currency__code"]

    # TODO: static view


class CurrencyViewSet(ModelViewSet):
    queryset = models.Currency.objects.all().order_by("name")
    serializer_class = serializers.CurrencySerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    search_fields = [
        "name",
    ]
    filterset_fields = {
        # TODO
        # "uuid": ["exact", "in"],
        "code": ["exact"],
        "name": ["exact", "icontains"],
        "numeric": ["exact"],
    }

    # TODO: static view
