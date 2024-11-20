from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from rest_framework.permissions import DjangoModelPermissions
from rest_framework.viewsets import ModelViewSet

from ox.core.views import AppView
from . import models, serializers


__all__ = ("AppView", "OrganisationViewSet", "PersonViewSet", "AddressViewSet")


class AppView(PermissionRequiredMixin, LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/contacts/app.html"
    permission_required = ["ox_contacts.view_organisation", "ox_contact.view_person"]
    default_panel = "organisation-list"


class OrganisationViewSet(ModelViewSet):
    queryset = models.Organisation.all()
    serializer_class = serializers.OrganisationSerializer
    permission_classes = [DjangoModelPermissions]


class PersonViewSet(ModelViewSet):
    queryset = models.Person.all()
    serializer_class = serializers.PersonSerializer
    permission_classes = [DjangoModelPermissions]


class AddressViewSet(ModelViewSet):
    queryset = models.Address.all()
    serializer_class = serializers.AddressSerializer
    permission_classes = [DjangoModelPermissions]
