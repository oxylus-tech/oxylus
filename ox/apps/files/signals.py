from django.db.models.signals import post_save
from django.dispatch import receiver

from caps.models import Agent
from .models import Folder


@receiver(post_save, sender=Agent)
def on_agent_save_ensure_root_folder(sender, instance, *args, **kwargs):
    root_folder = Folder.objects.filter(tree_id=instance.id, name="").root_nodes()
    if not root_folder.exists():
        Folder.objects.create(name="", tree_id=instance.id, owner=instance)
