import logging

from django.db.models.signals import post_migrate
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.dispatch import receiver


logger = logging.getLogger()


@receiver(post_migrate)
def create_app_groups(sender, app_config, *args, **kwargs):
    """This creates users groups for applications."""
    if label := getattr(app_config, "verbose_name"):
        app_label = str(label)
    else:
        app_label = app_config.label.replace("_", " ").capitalize()

    staff, _ = Group.objects.get_or_create(name=f"{app_label}: Staff")
    viewers, _ = Group.objects.get_or_create(name=f"{app_label}: View")

    for model in app_config.get_models():
        content_type = ContentType.objects.get_for_model(model)
        perms = Permission.objects.filter(content_type=content_type)

        for perm in perms:
            codename = perm.codename
            if codename.startswith("view_"):
                viewers.permissions.add(perm)
                staff.permissions.add(perm)
            elif codename.startswith(("add_", "change_", "delete_")):
                staff.permissions.add(perm)

    logger.info(f"Groups updated for app: {app_label}")
