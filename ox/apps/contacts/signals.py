from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from django.contrib.auth.models import User, Group

from . import utils
from .models import Person, Organisation


@receiver(post_save, sender=Group)
def on_group_update_sync_contact_list(sender, instance, *args, **kwargs):
    if contact_list := getattr(instance, "contact_list", None):
        if contact_list.name != instance.name:
            contact_list.name = instance.name
            contact_list.save(update_fields=["name"])


@receiver(post_save, sender=Organisation)
def on_org_update_sync_contact_list(sender, instance, *args, **kwargs):
    if contact_list := getattr(instance, "contact_list", None):
        if contact_list.name != instance.name or contact_list.color != instance.color:
            contact_list.name = instance.name
            contact_list.color = instance.color
            contact_list.save(update_fields=["name", "color"])


@receiver(post_save, sender=User)
def on_user_update_sync_contact(sender, instance, *args, **kwargs):
    if contact := getattr(instance, "contact", None):
        changed = []
        if instance.first_name != contact.first_name:
            contact.first_name = instance.first_name
            changed.append("first_name")
        if instance.last_name != contact.last_name:
            contact.last_name = instance.last_name
            changed.append("last_name")
        if instance.email != contact.email:
            contact.email = instance.email
            changed.append("email")

        if changed:
            contact.save(update_fields=changed)
    else:
        Person.objects.create(
            user=instance,
            first_name=instance.first_name,
            last_name=instance.last_name,
            email=instance.email,
        )


@receiver(m2m_changed, sender=User.groups.through)
def on_user_group_changed(sender, instance: User, action, **kwargs):
    if action in ("post_add", "post_remove", "post_clear"):
        utils.ContactListSynchronizer([instance.contact]).sync()


@receiver(m2m_changed, sender=Person.organisations.through)
def on_person_organisation_changed(sender, instance: Organisation, action, **kwargs):
    if action in ("post_add", "post_remove", "post_clear"):
        utils.ContactListSynchronizer([instance]).sync()


# @receiver(m2m_changed, sender=Person.organisations.through)
# def on_person_organisation_changed(sender, instance: Person, action, reverse, pk_set, **kwargs):
#     if action in ("post_add", "post_remove", "post_clear"):
#         # Ensure signal doesn't misfire during migration
#         orgs = instance.organisations.all() if not reverse else Organisation.objects.filter(pk__in=pk_set)
#         for org in orgs:
#             utils.sync_org_contact_list(org)
#


@receiver(post_save, sender=Group)
def ensure_group_contact_list(sender, instance: Group, created, **kwargs):
    if created:
        utils.get_or_create_contact_list_for_group(instance)


@receiver(post_save, sender=Organisation)
def ensure_org_contact_list(sender, instance: Organisation, created, **kwargs):
    if created:
        utils.get_or_create_contact_list_for_org(instance)
