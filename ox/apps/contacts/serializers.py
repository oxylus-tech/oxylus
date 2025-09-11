from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from ox.core.serializers import ModelSerializer, RelatedField

from . import models


__all__ = (
    "AddressSerializer",
    "EmailSerializer",
    "PhoneSerializer",
    "BankAccountSerializer",
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


class BankAccountSerializer(ModelSerializer):
    class Meta:
        model = models.BankAccount
        exclude = ("contact",)


class OrganisationTypeSerializer(ModelSerializer):
    country = RelatedField(queryset=models.Country.objects.all())

    class Meta:
        model = models.OrganisationType
        fields = "__all__"


class ContactListSerializer(ModelSerializer):
    organisation = RelatedField(queryset=models.Organisation.objects.all(), required=False, allow_null=True)
    contacts = RelatedField(queryset=models.Contact.objects.all(), many=True, required=False)
    contact_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = models.ContactList
        fields = "__all__"
        extra_kwargs = {
            "group": {"allow_null": True},
        }


class BaseContactSerializer(ModelSerializer):
    addresses = AddressSerializer(source="address_set", many=True, required=False)
    emails = EmailSerializer(source="email_set", many=True, required=False)
    phones = PhoneSerializer(source="phone_set", many=True, required=False)
    iban_accounts = BankAccountSerializer(source="ibanaccount_set", many=True, required=False)

    class Meta:
        nested = ("addresses", "emails", "phones", "iban_accounts")
        fields = "__all__"


class OrganisationSerializer(BaseContactSerializer):
    country = RelatedField(queryset=models.Country.objects.all(), required=False)
    type = RelatedField(queryset=models.OrganisationType.objects.all(), required=False)
    contact_list = RelatedField(read_only=True)

    class Meta(BaseContactSerializer.Meta):
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


class PersonSerializer(BaseContactSerializer):
    organisations = RelatedField(queryset=models.Organisation.objects.all(), many=True, required=False)
    contact_lists = RelatedField(queryset=models.ContactList.objects.all(), many=True, required=False)
    email = serializers.EmailField(required=False)

    class Meta(BaseContactSerializer.Meta):
        model = models.Person
        read_only_fields = ("user",)

    def validate(self, data):
        v_data = super().validate(data)
        if self.instance and self.instance.user:
            email = v_data.get("email")
            if email and email != self.instance.user.email:
                raise serializers.ValidationError(
                    {"email": _("Default email can't be changed for a contact linked to a user")}
                )
        return v_data


class ContactSerializer(ModelSerializer):
    name = serializers.SerializerMethodField()
    organisation = OrganisationSerializer(read_only=True)
    person = PersonSerializer(read_only=True)

    class Meta:
        model = models.Contact
        fields = ("id", "name", "email", "organisation", "person")

    def get_name(self, obj):
        if person := getattr(obj, "person", None):
            return person.full_name
        else:
            return obj.organisation.name
