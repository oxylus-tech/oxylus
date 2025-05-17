from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import AppView, ModelViewSet
from . import models, serializers


__all__ = ("CountryViewSet",)


class AppView(PermissionRequiredMixin, LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/locations/app.html"
    permission_required = ["ox_locations.view_countries", "ox_contact.view_currency"]
    default_panel = "countries"


class CountryViewSet(ModelViewSet):
    queryset = models.Country.objects.all().order_by("name")
    serializer_class = serializers.CountrySerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    search_fields = [
        "name",
    ]
    filterset_fields = {"code", "code_3", "phone"}  # , "continent", "currency"}
    pagination_class = None

    # TODO: static view


class CurrencyViewSet(ModelViewSet):
    queryset = models.Currency.objects.all().order_by("name")
    serializer_class = serializers.CurrencySerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    search_fields = [
        "name",
    ]
    filterset_fields = {"code", "name", "numeric"}
    pagination_class = None

    # TODO: static view
