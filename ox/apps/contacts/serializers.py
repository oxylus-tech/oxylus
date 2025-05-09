from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from ox.core.serializers import ModelSerializer, RelatedField

from . import models


__all__ = (
    "AddressSerializer",
    "EmailSerializer",
    "PhoneSerializer",
    "OrganisationSerializer",
    "PersonSerializer",
)


class AddressSerializer(ModelSerializer):
    country = RelatedField(queryset=models.Country.objects.all())

    class Meta:
        model = models.Address
        exclude = ("contact",)


class EmailSerializer(ModelSerializer):
    class Meta:
        model = models.Email
        exclude = ("contact",)


class PhoneSerializer(ModelSerializer):
    class Meta:
        model = models.Phone
        exclude = ("contact",)


class OrganisationTypeSerializer(ModelSerializer):
    country = RelatedField(queryset=models.Country.objects.all())

    class Meta:
        model = models.OrganisationType
        fields = "__all__"


class ContactSerializer(ModelSerializer):
    addresses = AddressSerializer(source="address_set", many=True, required=False)
    emails = EmailSerializer(source="email_set", many=True, required=False)
    phones = PhoneSerializer(source="phone_set", many=True, required=False)

    class Meta:
        nested = ("addresses", "emails", "phones")
        fields = "__all__"


class OrganisationSerializer(ContactSerializer):
    country = RelatedField(queryset=models.Country.objects.all(), required=False)
    type = RelatedField(queryset=models.OrganisationType.objects.all(), required=False)

    class Meta(ContactSerializer.Meta):
        model = models.Organisation

    def validate(self, data):
        v_data = super().validate(data)
        country, vat = v_data.get("country"), data.get("vat")

        if vat:
            if not country:
                raise serializers.ValidationError({"vat": _("Please select a country in order to input VAT")})
            if not country.validate_vat(vat):
                raise serializers.ValidationError({"vat": _("Invalid VAT number for this country")})
        return v_data


class PersonSerializer(ContactSerializer):
    organisations = RelatedField(queryset=models.Organisation.objects.all(), many=True, required=False)

    class Meta(ContactSerializer.Meta):
        model = models.Person
