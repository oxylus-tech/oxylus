from django.core.exceptions import PermissionDenied
from caps.models import Owned, OwnedQuerySet

from .save_hook import SaveHook, SaveHookQuerySet


__all__ = ("ChildOwned", "ChildOwned")


class ChildOwnedQuerySet(OwnedQuerySet, SaveHookQuerySet):
    """Queryset for :py:class:`ChildOwned`."""

    pass


class ChildOwned(Owned, SaveHook):
    """
    Add parenting mechanism for parent-child relations, checking
    that owner is the same on parent and child.

    Parent and child MUST both inherit from django-caps' ``Owned``.
    """

    parent_attr = "parent"
    """ Field name used for parenting. """

    objects = ChildOwnedQuerySet.as_manager()

    class Meta:
        abstract = True

    def on_save(self, fields=None):
        # we don't set child's owner to parent's one by default in order
        # to avoid bypassing authentication framework.

        parent = getattr(self, self.parent_attr)
        if parent and parent.owner_id != self.owner_id:
            model_name = type(self)._meta.verbose_name.lower()
            raise PermissionDenied(f"Owner of this {model_name} should be the same as its parent")
