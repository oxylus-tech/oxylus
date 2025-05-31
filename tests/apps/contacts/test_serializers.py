import pytest
from rest_framework.exceptions import ValidationError

from ox.apps.locations.models import Country, Continent
from ox.apps.contacts import serializers


@pytest.fixture
def country(db):
    return Country.objects.create(name="Belgium", code="BE", continent=Continent.EUROPE, phone=32)


@pytest.fixture
def organisation_ser():
    return serializers.OrganisationSerializer()


organisation_dat = {
    "name": "Some Organisation",
}


@pytest.fixture
def person_ser(user):
    return serializers.PersonSerializer(instance=user.contact)


class TestOrganisationSerializer:
    def test_validate_vat_raises_no_country(self, organisation_ser):
        with pytest.raises(ValidationError):
            organisation_ser.validate({**organisation_dat, "vat": "BE1230099"})

    def test_validate_vat_raises_invalid_vat(self, organisation_ser, country):
        with pytest.raises(ValidationError):
            organisation_ser.validate({**organisation_dat, "vat": "BE123", "country": country})

    def test_validate_vat_ok(self, organisation_ser, country):
        organisation_ser.validate({**organisation_dat, "vat": "BE1021921031", "country": country})


class TestPersonSerializer:
    def test_validate_raise_default_user_mail(self, person_ser):
        with pytest.raises(ValidationError):
            person_ser.validate(
                {
                    "first_name": "Foo",
                    "last_name": "Bar",
                    "email": "foo@bar.org",
                }
            )

    def test_validate_default_user_mail(self, person_ser, user):
        person_ser.validate(
            {
                "first_name": "Foo",
                "last_name": "Bar",
                "email": user.email,
            }
        )
