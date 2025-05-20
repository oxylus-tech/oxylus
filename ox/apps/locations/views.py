from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.utils.translation import gettext_lazy as _
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import AppView, ModelViewSet, register_nav
from . import models, serializers, filters


__all__ = ("AppView", "CountryViewSet", "CurrencyViewSet")


register_nav(
    "settings.locations",
    {
        "title": _("Locations"),
        "type": "subheader",
        "items": {
            "countries": {
                "url": "ox_locations:index",
                "title": _("Countries"),
                "icon": "mdi-earth",
                "permissions": "ox_locations.view_country",
            },
            "currencies": {
                "url": "ox_locations:index",
                "title": _("Currencies"),
                "icon": "mdi-currency-eur",
                "permissions": "ox_locations.view_currency",
            },
        },
    },
)


class AppView(PermissionRequiredMixin, LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/locations/app.html"
    permission_required = ["ox_locations.view_countries", "ox_contact.view_currency"]
    default_panel = "countries"


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
        "code": ["exact"],
        "name": ["exact", "icontains"],
        "numeric": ["exact"],
    }

    # TODO: static view
