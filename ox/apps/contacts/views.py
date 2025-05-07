from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import AppView, ModelViewSet
from . import models, serializers


__all__ = ("AppView", "OrganisationViewSet", "PersonViewSet", "AddressViewSet")


class AppView(PermissionRequiredMixin, LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/contacts/app.html"
    permission_required = ["ox_contacts.view_organisation", "ox_contact.view_person"]
    default_panel = "persons"


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


class OrganisationViewSet(ModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer
    permission_classes = [DjangoModelPermissions]

    search_fields = ["name", "vat"]


class PersonViewSet(ModelViewSet):
    queryset = models.Person.objects.all().order_by("last_name", "first_name")
    serializer_class = serializers.PersonSerializer
    permission_classes = [DjangoModelPermissions]

    filterset_fields = {"organisations__uuid": ["in", "exact"]}
    search_fields = ["last_name", "first_name", "phone__number", "email__email", "organisations__name"]


class AddressViewSet(ModelViewSet):
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer
    permission_classes = [DjangoModelPermissions]


class PhoneViewSet(ModelViewSet):
    queryset = models.Phone.objects.all()
    serializer_class = serializers.PhoneSerializer
    permission_classes = [DjangoModelPermissions]


class EmailViewSet(ModelViewSet):
    queryset = models.Email.objects.all()
    serializer_class = serializers.EmailSerializer
    permission_classes = [DjangoModelPermissions]
