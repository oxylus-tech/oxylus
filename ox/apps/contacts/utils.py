from typing import Iterable

from django.apps.registry import Apps

from ox.utils.models import get_model, get_models

# used only for type hints, because thoses functions are used in migrations.
from django.contrib.auth.models import Group, User
from .models import ContactList, Organisation, Person


# ---- Users
def sync_user_contacts(apps: Apps | None = None, alias: str = "default"):
    """Ensure all users have related contact."""
    User, Person = get_models(["auth.user", "ox_contacts.person"], apps)

    for user in User.objects.using(alias).filter(contact__isnull=True):
        Person(user=user, first_name=user.first_name, last_name=user.last_name, email=user.email).save(using=alias)


# ---- Groups
def get_or_create_contact_list_for_group(group: Group, apps: Apps | None = None, alias: str = "default") -> ContactList:
    """Return contact list for the provided group, creating if required."""
    ContactList = get_model("ox_contacts.ContactList")

    contact_list, _ = ContactList.objects.using(alias).get_or_create(group=group, defaults={"name": group.name})
    return contact_list


def sync_group_contact_list(group: Group, apps: Apps | None = None, alias: str = "default") -> ContactList:
    """Synchronize contact list for a single group"""
    Person = get_model("ox_contacts.person", apps)

    contact_list = get_or_create_contact_list_for_group(group)
    users = group.user_set.all()
    people = Person.objects.using(alias).filter(user__in=users)
    contact_list.contacts.set(people)
    return contact_list


def sync_groups_contact_list(
    groups: Iterable[Group] | None = None, apps: Apps | None = None, alias: str = "default"
) -> list[ContactList]:
    """Ensure all groups have a related ContactList."""
    Group, ContactList = get_models(["auth.group", "ox_contacts.contactlist"], apps)

    if groups:
        in_db = ContactList.objects.using(alias).filter(group__in=groups)
    else:
        groups = Group.objects.using(alias).all()
        in_db = ContactList.objects.using(alias).exclude(group=None)

    in_db = in_db.values_list("organisation_id")
    return ContactList.objects.using(alias).bulk_create(
        [ContactList(name=item.name, group=item) for item in Group.objects.using(alias).exclude(id__in=in_db)]
    )


def sync_groups_persons_contact_list(
    items: Iterable[Group] | None = None, user: User | None = None, apps: Apps | None = None, alias: str = "default"
):
    """Ensure all group's users have the related ContactList.

    :param groups: if provided restrict to thoses groups
    :param user: if provided restrict to this user's groups
    """
    Group, ContactList, Person = get_models(["auth.group", "ox_contacts.contactlist", "ox_contacts.person"], apps)

    sync_groups_contact_list(items)

    if user and not items:
        items = user.groups.all()

    if items:
        lists = ContactList.objects.using(alias).filter(group__in=items)
        rows = Group.user_set.through.objects.using(alias).filter(group__in=items)
    else:
        lists = ContactList.objects.using(alias).exclude(group=None)
        rows = Group.user_set.through.objects.using(alias).all()

    if user:
        rows = rows.filter(user_id=user.id)

    by_id = dict(lists.values_list("group_id", "id"))
    through = Person.contact_lists.through
    items = [
        through(contact_id=contact_id, contactlist_id=by_id.get(group_id))
        for contact_id, group_id in rows.values_list("user__contact", "group_id")
    ]
    through.objects.using(alias).bulk_create(items, ignore_conflicts=True)


# ---- Organisations
def get_or_create_contact_list_for_org(
    org: Organisation, apps: Apps | None = None, alias: str = "default"
) -> ContactList:
    ContactList = get_model("ox_contacts.contactlist", apps)

    contact_list, _ = ContactList.objects.using(alias).get_or_create(
        organisation=org, defaults={"name": org.name, "color": org.color}
    )
    return contact_list


def sync_org_contact_list(org: Organisation, apps: Apps | None = None, alias: str = "default") -> ContactList:
    """Synchronize contact list for a single organisation"""
    Person = get_model("ox_contacts.person", apps)

    contact_list = get_or_create_contact_list_for_org(org)
    persons = Person.objects.using(alias).filter(organisations=org).distinct()
    contact_list.contacts.set(persons)
    return contact_list


def sync_orgs_contact_list(
    organisations: Iterable[Organisation] | None = None, apps: Apps | None = None, alias: str = "default"
) -> list[ContactList]:
    """Ensure all organisations have a related ContactList."""
    ContactList, Organisation = get_models(["ox_contacts.contactlist", "ox_contacts.organisation"], apps)

    if organisations:
        in_db = ContactList.objects.using(alias).filter(organisation__in=organisations)
    else:
        organisations = Organisation.objects.using(alias).all()
        in_db = ContactList.objects.using(alias).exclude(organisation=None)

    in_db = in_db.values_list("organisation_id")
    return ContactList.objects.using(alias).bulk_create(
        [
            ContactList(name=item.name, color=item.color, organisation=item)
            for item in Organisation.objects.using(alias).exclude(id__in=in_db)
        ]
    )


def sync_orgs_persons_contact_list(
    items: Iterable[Organisation] | None = None,
    person: Person | None = None,
    apps: Apps | None = None,
    alias: str = "default",
):
    """Ensure all organisation's users have the related ContactList.

    :param organisations: if provided restrict to thoses organisations
    :param user: if provided restrict to this user's organisations
    """
    ContactList, Organisation, Person = get_models(
        ["ox_contacts.contactlist", "ox_contacts.organisation", "ox_contacts.person"], apps
    )
    # TODO: make it generic
    sync_orgs_contact_list(items)

    if person and not items:
        items = person.organisations.all()

    if items:
        lists = ContactList.objects.using(alias).filter(organisation__in=items)
        rows = Organisation.persons.through.objects.using(alias).filter(organisation__in=items)
    else:
        lists = ContactList.objects.using(alias).exclude(organisation=None)
        rows = Organisation.persons.through.objects.using(alias).all()

    if person:
        rows = rows.filter(person_id=person.id)

    by_id = dict(lists.values_list("organisation_id", "id"))
    through = Person.contact_lists.through
    items = [
        through(contact_id=person_id, contactlist_id=by_id.get(organisation_id))
        for person_id, organisation_id in rows.values_list("person_id", "organisation_id")
    ]
    through.objects.using(alias).bulk_create(items, ignore_conflicts=True)
