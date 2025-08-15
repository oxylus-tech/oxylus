from django.db.models import Count
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from ox.core.views import ModelViewSet
from . import models, serializers


__all__ = (
    "OrganisationTypeViewSet",
    "OrganisationViewSet",
    "PersonViewSet",
)


class ContactListViewSet(ModelViewSet):
    queryset = models.ContactList.objects.all().annotate(contact_count=Count("contacts", distinct=True)).order_by("-id")
    serializer_class = serializers.ContactListSerializer
    filterset_fields = {
        **ModelViewSet.filterset_fields,
        "is_subscription": ["exact"],
    }
    search_fields = [
        "name",
    ]
    ordering_fields = ["name", "contact_count", "is_subscription"]


class OrganisationTypeViewSet(ModelViewSet):
    queryset = models.OrganisationType.objects.all().order_by("name")
    serializer_class = serializers.OrganisationTypeSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    filterset_fields = {**ModelViewSet.filterset_fields, "country__uuid": ["in", "exact"]}
    search_fields = ["name", "abbreviation", "code"]


class ContactViewSet(ModelViewSet):
    queryset = (
        models.Contact.objects.all()
        .select_related("organisation", "person")
        .order_by("organisation__name", "person__last_name", "person__first_name")
    )
    serializer_class = serializers.ContactSerializer

    filterset_fields = {
        **ModelViewSet.filterset_fields,
        "contact_lists__uuid": ["in", "exact"],
    }
    search_fields = ["email", "organisation__name", "person__last_name", "person__first_name"]
    ordering_fields = ["email"]


class OrganisationViewSet(ModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer

    filterset_fields = {
        **ModelViewSet.filterset_fields,
        "country__uuid": ["in", "exact"],
        "contact_lists__uuid": ["in", "exact"],
    }
    search_fields = ["name", "vat"]
    ordering_fields = ["name", "vat", "email"]


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
