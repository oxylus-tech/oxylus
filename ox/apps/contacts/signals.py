from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

from . import models


@receiver(post_save, sender=User)
def sync_user_to_contact(sender, instance, *args, **kwargs):
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
        models.Person.objects.create(
            user=instance,
            first_name=instance.first_name,
            last_name=instance.last_name,
            email=instance.email,
        )


# @receiver(post_save, Group)
# def sync_group_to_contact(sender, instance, *args, **kwargs):
#     if contact := getattr(instance, 'organisation', None):
#         if contact.name != instance.name:
#             contact.name = instance.name
#             contact.save(updated_fields=['name'])
#
#
# @receiver(m2m_changed, sender=User.groups.through)
# def sync_person_organisations(sender, instance, action, pk_set, **kwargs):
#     contact = getattr(instance, "contact", None)
#     if not contact:
#         return
#
#     if action == "post_add":
#         organisations = Organisation.objects.filter(group__in=pk_set)
#         person.organisations.add(*organisations)
#     elif action == "post_remove":
#         organisations = Organisation.objects.filter(group__in=pk_set)
#         person.organisations.remove(*organisations)
#     elif action == "post_clear":
#         orgs = Organisation.objects.filter(group__in=instance.groups.all())
#         person.organisations.remove(*orgs)
