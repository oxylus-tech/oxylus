from ox.apps.contacts import utils
from ox.apps.contacts.models import ContactList


# ---- groups
def test_get_or_create_contact_list_for_group(group):
    ContactList.objects.all().delete()
    obj = utils.get_or_create_contact_list_for_group(group)
    assert obj.name == group.name
    assert obj.group_id == group.id


def test_sync_group_contact_list(user, group, user_groups):
    ContactList.objects.all().delete()
    obj = utils.sync_group_contact_list(group)
    assert obj.group_id == group.id
    assert obj.contacts.filter(id=user.contact.id).exists()


def test_sync_groups_contact_list(user, group, user_groups):
    ContactList.objects.all().delete()
    utils.sync_groups_contact_list()

    for group in user.groups.all():
        assert group.contact_list
        assert group.contact_list.name == group.name


def test_sync_groups_persons_contact_list(user, group, user_groups):
    ContactList.objects.all().delete()
    utils.sync_groups_persons_contact_list()

    for group in user.groups.all():
        assert group.contact_list
        assert group.contact_list.contacts.filter(id=user.contact.id).exists()


# ---- organisations
def test_get_or_create_contact_list_for_org(organisation):
    ContactList.objects.all().delete()
    obj = utils.get_or_create_contact_list_for_org(organisation)
    assert obj.name == organisation.name
    assert obj.color == organisation.color
    assert obj.organisation_id == organisation.id


def test_sync_org_contact_list(person, organisation):
    ContactList.objects.all().delete()
    obj = utils.sync_org_contact_list(organisation)
    assert obj.organisation_id == organisation.id
    assert obj.contacts.filter(id=person.id).exists()


def test_sync_orgs_contact_list(person, organisation):
    ContactList.objects.all().delete()
    utils.sync_orgs_contact_list()

    for organisation in person.organisations.all():
        assert organisation.contact_list
        assert organisation.contact_list.name == organisation.name
        assert organisation.contact_list.color == organisation.color


def test_sync_orgs_persons_contact_list(person, organisation):
    ContactList.objects.all().delete()
    utils.sync_orgs_persons_contact_list()
    organisation.refresh_from_db()
    assert organisation.contact_list
    assert organisation.contact_list.contacts.filter(id=person.id).exists()
