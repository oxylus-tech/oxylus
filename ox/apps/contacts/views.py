from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import ModelViewSet
from . import models, serializers


__all__ = (
    "OrganisationTypeViewSet",
    "OrganisationViewSet",
    "PersonViewSet",
)


class OrganisationTypeViewSet(ModelViewSet):
    queryset = models.OrganisationType.objects.all().order_by("name")
    serializer_class = serializers.OrganisationTypeSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    filterset_fields = {**ModelViewSet.filterset_fields, "country__uuid": ["in", "exact"]}
    search_fields = ["name", "abbreviation", "code"]


class OrganisationViewSet(ModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer

    filterset_fields = {**ModelViewSet.filterset_fields, "country__uuid": ["in", "exact"]}
    search_fields = ["name", "vat"]


class ContactListViewSet(ModelViewSet):
    queryset = models.ContactList.objects.all().order_by("name")
    serializer_class = serializers.ContactListSerializer
    filterset_fields = {
        **ModelViewSet.filterset_fields,
        "is_subscription": ["exact"],
    }
    search_fields = [
        "name",
    ]


class PersonViewSet(ModelViewSet):
    queryset = models.Person.objects.all().order_by("last_name", "first_name")
    serializer_class = serializers.PersonSerializer

    filterset_fields = {
        **ModelViewSet.filterset_fields,
        "organisations__uuid": ["in", "exact"],
        "contact_lists__uuid": ["in", "exact"],
    }
    search_fields = ["last_name", "first_name", "email", "phone__number", "email_set__email", "organisations__name"]
    ordering_fields = ["last_name", "first_name", "organisations"]
