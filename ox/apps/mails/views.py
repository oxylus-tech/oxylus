from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _

from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import AppView, ModelViewSet, register_nav
from . import models, serializers


__all__ = ("AppView", "OrganisationTypeViewSet", "OrganisationViewSet", "PersonViewSet", "AddressViewSet")


register_nav(
    "contacts",
    {
        "title": _("Contacts"),
        "type": "group",
        "items": {
            "persons": {
                "url": "ox_contacts:index",
                "title": _("Persons"),
                "icon": "mdi-card-account-mail",
                "order": 0,
                "permissions": "ox_contacts.view_person",
            },
            "organisations": {
                "url": "ox_contacts:index",
                "title": _("Organisations"),
                "icon": "mdi-domain",
                "permissions": "ox_contacts.view_organisation",
            },
            "settings": {
                "title": _("Settings"),
                "type": "subheader",
                "order": 100,
                "items": {
                    "organisationtypes": {
                        "url": "ox_contacts:index",
                        "title": _("Organisation Types"),
                        "icon": "mdi-domain-switch",
                        "permissions": "ox_contacts.view_organisationtype",
                    }
                },
            },
        },
    },
)


class AppView(LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/contacts/app.html"
    default_panel = "persons"


class OrganisationTypeViewSet(ModelViewSet):
    queryset = models.OrganisationType.objects.all().order_by("name")
    serializer_class = serializers.OrganisationTypeSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    filterset_fields = {"country__uuid": ["in", "exact"]}
    search_fields = ["name", "abbreviation", "code"]


class OrganisationViewSet(ModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer
    permission_classes = [DjangoModelPermissions]

    filterset_fields = {"country__uuid": ["in", "exact"]}
    search_fields = ["name", "vat"]


class PersonViewSet(ModelViewSet):
    queryset = models.Person.objects.all().order_by("last_name", "first_name")
    serializer_class = serializers.PersonSerializer
    permission_classes = [DjangoModelPermissions]

    filterset_fields = {"organisations__uuid": ["in", "exact"]}
    search_fields = ["last_name", "first_name", "phone__number", "email__email", "organisations__name"]
    ordering_fields = ["last_name", "first_name", "organisations"]


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
