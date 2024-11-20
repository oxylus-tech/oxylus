from ox.core.serializers import ModelSerializer

from . import models


__all__ = (
    "AddressSerializer",
    "EmailSerializer",
    "PhoneSerializer",
    "ContactInfoSerializer",
    "OrganisationSerializer",
    "PersonSerializer",
)


class AddressSerializer(ModelSerializer):
    class Meta:
        model = models.Address
        fields = "__all__"


class EmailSerializer(ModelSerializer):
    class Meta:
        model = models.Email
        fields = "__all__"


class PhoneSerializer(ModelSerializer):
    class Meta:
        model = models.Phone
        fields = "__all__"


class ContactInfoSerializer(ModelSerializer):
    addresses = AddressSerializer(source="address_set")
    emails = EmailSerializer(source="email_set")
    phones = PhoneSerializer(source="phone_set")

    class Meta:
        fields = "__all__"


class OrganisationSerializer(ModelSerializer):
    class Meta:
        model = models.Organisation
        fields = "__all__"


class PersonSerializer(ModelSerializer):
    class Meta:
        model = models.Person
        fields = "__all__"
