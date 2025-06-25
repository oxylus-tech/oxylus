from typing import Iterable

from django.contrib.auth.models import Group, User
from django.utils.translation import gettext as __

from .models import ContactList, Organisation, Person


# ---- Users
def sync_user_contacts():
    """Ensure all users have related contact."""
    for user in User.objects.filter(contact__isnull=True):
        Person(user=user, first_name=user.first_name, last_name=user.last_name, email=user.email).save()


# ---- Groups
def get_or_create_contact_list_for_group(group: Group) -> ContactList:
    contact_list, _ = ContactList.objects.get_or_create(
        group=group, defaults={"name": __("Group: {name}").format(name=group.name)}
    )
    return contact_list


def sync_group_contact_list(group: Group) -> ContactList:
    """Synchronize contact list for a single group"""
    contact_list = get_or_create_contact_list_for_group(group)
    users = group.user_set.all()
    people = Person.objects.filter(user__in=users)
    contact_list.contacts.set(people)
    return contact_list


def sync_groups_contact_list(groups: Iterable[Group] | None = None):
    """Ensure all groups have a related ContactList."""
    if groups:
        in_db = ContactList.objects.filter(group__in=groups)
    else:
        groups = Group.objects.all()
        in_db = ContactList.objects.exclude(group=None)

    in_db = in_db.values_list("organisation_id")
    return ContactList.objects.bulk_create(
        [
            ContactList(name=__("Group: {name}").format(name=item.name), group=item)
            for item in Group.objects.exclude(id__in=in_db)
        ]
    )


def sync_groups_persons_contact_list(items: Iterable[Group] | None = None, user: User | None = None):
    """Ensure all group's users have the related ContactList.

    :param groups: if provided restrict to thoses groups
    :param user: if provided restrict to this user's groups
    """
    sync_groups_contact_list(items)

    if user and not items:
        items = user.groups.all()

    if items:
        lists = ContactList.objects.filter(group__in=items)
        rows = Group.user_set.through.objects.filter(group__in=items)
    else:
        lists = ContactList.objects.exclude(group=None)
        rows = Group.user_set.through.objects.all()

    if user:
        rows = rows.filter(user_id=user.id)

    by_id = dict(lists.values_list("group_id", "id"))
    through = Person.contact_lists.through
    items = [
        through(contact_id=contact_id, contactlist_id=by_id.get(group_id))
        for contact_id, group_id in rows.values_list("user__contact", "group_id")
    ]
    through.objects.bulk_create(items, ignore_conflicts=True)


# ---- Organisations
def get_or_create_contact_list_for_org(org: Organisation) -> ContactList:
    contact_list, _ = ContactList.objects.get_or_create(
        organisation=org, defaults={"name": __("Organisation: {name}").format(name=org.name)}
    )
    return contact_list


def sync_org_contact_list(org: Organisation) -> ContactList:
    """Synchronize contact list for a single organisation"""
    contact_list = get_or_create_contact_list_for_org(org)
    persons = Person.objects.filter(organisations=org).distinct()
    contact_list.contacts.set(persons)
    return contact_list


def sync_orgs_contact_list(organisations: Iterable[Organisation] | None = None):
    """Ensure all organisations have a related ContactList."""
    if organisations:
        in_db = ContactList.objects.filter(organisation__in=organisations)
    else:
        organisations = Organisation.objects.all()
        in_db = ContactList.objects.exclude(organisation=None)

    in_db = in_db.values_list("organisation_id")
    return ContactList.objects.bulk_create(
        [
            ContactList(name=__("Organisation: {name}").format(name=item.name), organisation=item)
            for item in Organisation.objects.exclude(id__in=in_db)
        ]
    )


def sync_orgs_persons_contact_list(items: Iterable[Organisation] | None = None, person: Person | None = None):
    """Ensure all organisation's users have the related ContactList.

    :param organisations: if provided restrict to thoses organisations
    :param user: if provided restrict to this user's organisations
    """
    # TODO: make it generic
    sync_orgs_contact_list(items)

    if person and not items:
        items = person.organisations.all()

    if items:
        lists = ContactList.objects.filter(organisation__in=items)
        rows = Organisation.persons.through.objects.filter(organisation__in=items)
    else:
        lists = ContactList.objects.exclude(organisation=None)
        rows = Organisation.persons.through.objects.all()

    if person:
        rows = rows.filter(person_id=person.id)

    by_id = dict(lists.values_list("organisation_id", "id"))
    through = Person.contact_lists.through
    items = [
        through(contact_id=person_id, contactlist_id=by_id.get(organisation_id))
        for person_id, organisation_id in rows.values_list("person_id", "organisation_id")
    ]
    through.objects.bulk_create(items, ignore_conflicts=True)
