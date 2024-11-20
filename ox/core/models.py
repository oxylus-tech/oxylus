import uuid

from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from model_utils import managers


__all__ = ("Model", "QuerySet", "InheritanceQuerySet")


class QuerySet(models.QuerySet):
    def uuid(self, value: uuid.UUID):
        """Filter by uuid."""
        return self.filter(uuid=value)


class InheritanceQuerySet(managers.InheritanceQuerySet, QuerySet):
    """This is utility QuerySet subclass for :py:class:`Model`, inheriting from
    ``model_utils.InheritanceQuerySet``."""

    pass


class Model(models.Model):
    """Model class used by Oxylus applications. It provides:

        - public uuid: reducing bruteforcing database row index;
        - url reverse;

    Using :py:attr:`uuid` as a public identifier is preferred over directly exposing
    database primary key.
    """

    uuid = models.UUIDField(
        _("Id"),
        db_index=True,
        default=uuid.uuid4,
        editable=False,
        help_text=_("Object reference"),
    )

    objects = QuerySet.as_manager()

    class Meta:
        abstract = True

    def get_absolute_url(self):
        """Return model detail url."""
        return self.reverse_url("detail", uuid=self.uuid)

    def get_api_url(self, action: str = "detail") -> str:
        """Return model api url."""
        return self.reverse_url(action, "api", uuid=self.uuid)

    def get_list_url(self) -> str:
        """Return model list url."""
        return self.reverse_url("list")

    @classmethod
    def reverse_url(cls, action: str, namespace: str = "", **kwargs) -> str:
        """Reverse an url for the provided action.

        :param str action: name of the action (eg. detail, update);
        :param str namespace: if provided insert namespace after application namespace;
        :param **kwargs: passed down to reverse
        :return reversed url as string.
        """
        name = cls._meta.label_lower.replace(".", ":")
        if namespace:
            name = name.replace(":", namespace + ":")
        if action:
            name = f"{name}-{action}"
        return reverse(name, **kwargs)
