import pytest
from django.db import models

from ox.apps.contacts import utils
from ox.apps.contacts.models import ContactList


# ---- groups
def test_get_or_create_contact_list_for_group(group):
    ContactList.objects.all().delete()
    obj = utils.get_or_create_contact_list_for_group(group)
    assert obj.name == group.name
    assert obj.group_id == group.id


# def test_sync_group_contact_list(user, group, user_groups):
#     ContactList.objects.all().delete()
#     obj = utils.sync_group_contact_list(group)
#     assert obj.group_id == group.id
#     assert obj.contacts.filter(id=user.contact.id).exists()
#
#
# def test_sync_groups_contact_list(user, group, user_groups):
#     ContactList.objects.all().delete()
#     utils.sync_groups_contact_list()
#
#     for group in user.groups.all():
#         assert group.contact_list
#         assert group.contact_list.name == group.name
#
#
# def test_sync_groups_persons_contact_list(user, group, user_groups):
#     ContactList.objects.all().delete()
#     utils.sync_groups_persons_contact_list()
#
#     for group in user.groups.all():
#         assert group.contact_list
#         assert group.contact_list.contacts.filter(id=user.contact.id).exists()


# ---- organisations
def test_get_or_create_contact_list_for_org(organisation):
    ContactList.objects.all().delete()
    obj = utils.get_or_create_contact_list_for_org(organisation)
    assert obj.name == organisation.name
    assert obj.color == organisation.color
    assert obj.organisation_id == organisation.id


# def test_sync_org_contact_list(person, organisation):
#     ContactList.objects.all().delete()
#     obj = utils.sync_org_contact_list(organisation)
#     assert obj.organisation_id == organisation.id
#     assert obj.contacts.filter(id=person.id).exists()
#
#
# def test_sync_orgs_contact_list(person, organisation):
#     ContactList.objects.all().delete()
#     utils.sync_orgs_contact_list()
#
#     for organisation in person.organisations.all():
#         assert organisation.contact_list
#         assert organisation.contact_list.name == organisation.name
#         assert organisation.contact_list.color == organisation.color
#
#
# def test_sync_orgs_persons_contact_list(person, organisation):
#     ContactList.objects.all().delete()
#     utils.sync_orgs_persons_contact_list()
#     organisation.refresh_from_db()
#     assert organisation.contact_list
#     assert organisation.contact_list.contacts.filter(id=person.id).exists()
#


@pytest.fixture
def persons(person, person_2):
    return [person, person_2]


@pytest.fixture
def synchronizer(persons, organisation):
    return utils.ContactListSynchronizer(persons)


class TestContactListSynchronizer:
    def test___init__(self, synchronizer, persons):
        assert all(p.id in synchronizer.person_map for p in persons)

    def test__populate_groups(self, synchronizer, person):
        assert set(synchronizer.group_map[person.user_id]) == set(person.user.groups.all())

    def test__populate_organisations(self, synchronizer, person):
        assert set(synchronizer.organisation_map[person.id]) == set(person.organisations.all())

    def test_sync(self, synchronizer):
        synchronizer.ensure_contact_lists()
        synchronizer.sync()
        for person in synchronizer.persons:
            groups = synchronizer.group_map.get(person.user_id, set())
            orgs = synchronizer.organisation_map.get(person.id, set())
            valid_lists = synchronizer.eligible_lists_for(groups, orgs)
            current_lists = set(person.contact_lists.all())
            assert valid_lists == current_lists

    def test_ensure_contact_lists(self, synchronizer):
        synchronizer.ensure_contact_lists()
        # Check that all group and organisation contact lists exist
        all_groups = {g for groups in synchronizer.group_map.values() for g in groups}
        all_orgs = {o for orgs in synchronizer.organisation_map.values() for o in orgs}
        group_lists = ContactList.objects.filter(group__in=all_groups, organisation__isnull=True)
        org_lists = ContactList.objects.filter(organisation__in=all_orgs, group__isnull=True)
        assert group_lists.count() == len(all_groups)
        assert org_lists.count() == len(all_orgs)

    def test_ensure_group_contact_lists(self, synchronizer):
        synchronizer.ensure_group_contact_lists()
        all_groups = {g for groups in synchronizer.group_map.values() for g in groups}
        group_lists = ContactList.objects.filter(group__in=all_groups, organisation__isnull=True)
        assert group_lists.count() == len(all_groups)

    def test_ensure_organisation_contact_lists(self, synchronizer):
        synchronizer.ensure_organisation_contact_lists()
        all_orgs = {o for orgs in synchronizer.organisation_map.values() for o in orgs}
        org_lists = ContactList.objects.filter(organisation__in=all_orgs, group__isnull=True)
        assert org_lists.count() == len(all_orgs)

    def test_eligible_lists_for(self, synchronizer):
        for person in synchronizer.persons:
            groups = synchronizer.group_map.get(person.user_id, set())
            orgs = synchronizer.organisation_map.get(person.id, set())
            eligible = synchronizer.eligible_lists_for(groups, orgs)
            # Should match the contact lists for those groups/orgs
            expected = set(
                ContactList.objects.filter(
                    (
                        models.Q(group__in=groups, organisation__isnull=True)
                        | models.Q(organisation__in=orgs, group__isnull=True)
                    ).distinct()
                )
            )
            assert eligible == expected
