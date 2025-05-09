from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import ModelViewSet
from . import models, serializers


__all__ = ("CountryViewSet",)


class CountryViewSet(ModelViewSet):
    queryset = models.Country.objects.all().order_by("name")
    serializer_class = serializers.CountrySerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    search_fields = [
        "name",
    ]
    filterset_fields = {"code", "code_3", "phone"}
    pagination_class = None

    # TODO: static view
