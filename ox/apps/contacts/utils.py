from collections import defaultdict

from django.apps.registry import Apps
from django.db.models import Q

from ox.utils.models import get_model, get_models

# used only for type hints, because thoses functions are used in migrations.
from django.contrib.auth.models import Group
from .models import ContactList, Organisation, Person


__all__ = (
    "sync_user_contacts",
    "get_or_create_contact_list_for_group",
    "get_or_create_contact_list_for_org",
    "ContactListSynchronizer",
)


def sync_user_contacts(apps: Apps | None = None, alias: str = "default") -> list[Person]:
    """Ensure all users have related contact.

    :return The created users.
    """
    User, Person = get_models(["auth.user", "ox_contacts.person"], apps)

    objs = [
        Person(user=user, first_name=user.first_name, last_name=user.last_name, email=user.email)
        for user in User.objects.using(alias).filter(contact__isnull=True)
    ]

    # can't bulk create model with multi-inheritance
    for obj in objs:
        obj.save()

    return objs


def get_or_create_contact_list_for_group(group: Group, apps: Apps | None = None, alias: str = "default") -> ContactList:
    """Return contact list for the provided group, creating if required."""
    ContactList = get_model("ox_contacts.ContactList")

    contact_list, _ = ContactList.objects.using(alias).get_or_create(group=group, defaults={"name": group.name})
    return contact_list


def get_or_create_contact_list_for_org(
    org: Organisation, apps: Apps | None = None, alias: str = "default"
) -> ContactList:
    ContactList = get_model("ox_contacts.contactlist", apps)

    contact_list, _ = ContactList.objects.using(alias).get_or_create(
        organisation=org, defaults={"name": org.name, "color": org.color}
    )
    return contact_list


class ContactListSynchronizer:
    """
    Synchronize Person instance's ContactList based on group and organisations.
    """

    def __init__(self, persons: list[Person] = [], apps=None, alias="default"):
        """
        :params persons: if not provided, run over all persons
        :param apps: Apps registry (used by migrations)
        :param alias: database alias (used by migrations)
        """
        self.ContactList = get_model("ox_contacts.ContactList", apps)
        self.Organisation = get_model("ox_contacts.Organisation", apps)
        self.Person = get_model("ox_contacts.Person", apps)
        self.Group = get_model("auth.Group", apps)
        self.User = get_model("auth.User", apps)

        self.persons = persons or self.Person.objects.using(alias).all()
        self.alias = alias

        self.person_map = {p.id: p for p in self.persons}
        self.group_map = defaultdict(set)  # user_id -> set(Group)
        self.organisation_map = defaultdict(set)  # person_id -> set(Organisation)

        self._populate_groups()
        self._populate_organisations()

    def _populate_groups(self):
        user_ids = [p.user_id for p in self.persons]

        group_qs = (
            self.Group.objects.using(self.alias).filter(user__id__in=user_ids).distinct().prefetch_related("user_set")
        )

        for group in group_qs:
            for user in group.user_set.all():
                self.group_map[user.id].add(group)

    def _populate_organisations(self):
        person_ids = [p.id for p in self.persons]
        through = self.Person.organisations.through
        org_links = (
            through.objects.using(self.alias)
            .filter(person_id__in=person_ids)
            .values_list("person_id", "organisation_id")
        )

        organisation_ids = {oid for _, oid in org_links}
        org_map = {org.id: org for org in self.Organisation.objects.using(self.alias).filter(id__in=organisation_ids)}

        for person_id, org_id in org_links:
            if org_id in org_map:
                self.organisation_map[person_id].add(org_map[org_id])

    def sync(self):
        """Synchronize over all persons."""
        self.ensure_contact_lists()
        for person in self.persons:
            self.sync_one(person)

    def sync_one(self, person: Person):
        """Synchronize a single person."""
        groups = self.group_map.get(person.user_id, set())
        orgs = self.organisation_map.get(person.id, set())

        valid_lists = self.eligible_lists_for(groups, orgs)
        current_lists = set(person.contact_lists.all())

        to_add = valid_lists - current_lists
        to_remove = current_lists - valid_lists

        if to_add:
            person.contact_lists.add(*to_add)
        if to_remove:
            person.contact_lists.remove(*to_remove)

    def ensure_contact_lists(self):
        """Ensure contact lists are created for groups and organisations."""
        self.ensure_group_contact_lists()
        self.ensure_organisation_contact_lists()

    def ensure_group_contact_lists(self):
        """Ensure contact lists for groups are created."""
        all_groups = {g for groups in self.group_map.values() for g in groups}

        existing_group_ids = set(
            self.ContactList.objects.using(self.alias)
            .filter(group__in=all_groups, organisation__isnull=True)
            .values_list("group_id", flat=True)
        )
        self.ContactList.objects.using(self.alias).bulk_create(
            self.ContactList(name=group.name, group=group) for group in all_groups if group.id not in existing_group_ids
        )

    def ensure_organisation_contact_lists(self):
        """Ensure contact lists for organisations are created."""
        all_orgs = {o for orgs in self.organisation_map.values() for o in orgs}
        existing_org_ids = set(
            self.ContactList.objects.using(self.alias)
            .filter(organisation__in=all_orgs, group__isnull=True)
            .values_list("organisation_id", flat=True)
        )
        self.ContactList.objects.using(self.alias).bulk_create(
            self.ContactList(name=org.name, organisation=org) for org in all_orgs if org.id not in existing_org_ids
        )

    def eligible_lists_for(self, groups, orgs):
        return set(
            self.ContactList.objects.using(self.alias)
            .filter(Q(group__in=groups, organisation__isnull=True) | Q(organisation__in=orgs, group__isnull=True))
            .distinct()
        )
