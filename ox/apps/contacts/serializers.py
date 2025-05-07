from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from ox.core.serializers import ModelSerializer

from . import models


__all__ = (
    "AddressSerializer",
    "EmailSerializer",
    "PhoneSerializer",
    "OrganisationSerializer",
    "PersonSerializer",
)


class CountrySerializer(serializers.ModelSerializer):
    flag = serializers.CharField()

    class Meta:
        model = models.Country
        fields = "__all__"


class AddressSerializer(ModelSerializer):
    country_id = serializers.PrimaryKeyRelatedField(queryset=models.Country.objects.all())

    class Meta:
        model = models.Address
        exclude = (
            "contact",
            "country",
        )


class EmailSerializer(ModelSerializer):
    class Meta:
        model = models.Email
        exclude = ("contact",)


class PhoneSerializer(ModelSerializer):
    class Meta:
        model = models.Phone
        exclude = ("contact",)


class ContactSerializer(ModelSerializer):
    addresses = AddressSerializer(source="address_set", many=True, required=False)
    emails = EmailSerializer(source="email_set", many=True, required=False)
    phones = PhoneSerializer(source="phone_set", many=True, required=False)

    class Meta:
        nested = ("addresses", "emails", "phones")


class OrganisationSerializer(ContactSerializer):
    country_id = serializers.PrimaryKeyRelatedField(queryset=models.Country.objects.all())

    class Meta(ContactSerializer.Meta):
        model = models.Organisation
        exclude = ("country",)

    def validate_vat(self, value):
        if not models.Country.validate_vat(value):
            raise serializers.ValidationError(_("Invalid VAT number"))


class PersonSerializer(ContactSerializer):
    organisation_ids = serializers.SlugRelatedField(
        source="organisations", slug_field="uuid", queryset=models.Organisation.objects.all(), many=True, required=False
    )

    class Meta(ContactSerializer.Meta):
        model = models.Person
        exclude = ["organisations"]
