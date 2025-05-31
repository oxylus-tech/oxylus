from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import AppView, ModelViewSet, nav
from . import models, serializers, filters


__all__ = ("AppView", "CountryViewSet", "CurrencyViewSet")


nav.app_nav["settings"].append(
    nav.NavSubGroup(
        "locations",
        _("Locations"),
        items=[
            nav.NavItem(
                "countries",
                _("Countries"),
                url="ox_locations:index",
                icon="mdi-earth",
                permissions="ox_locations.view_country",
            ),
            nav.NavItem(
                "currencies",
                _("Currencies"),
                url="ox_locations:index",
                icon="mdi-currency-eur",
                permissions="ox_locations.view_currency",
            ),
        ],
    ),
)


class AppView(LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/locations/app.html"
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
