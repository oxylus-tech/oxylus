from django.db import models
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.models import User, Group
from ox.core.models import Model


__all__ = ("BaseSubscription",)


class BaseSubscription(Model):
    """Abstract class representing a subscription.

    A subscription is the relation of a user to a specific scope (context is a scope).

    The class attributes ``context_class`` and ``context_fk`` should be provided by subclasses.
    """

    class Status(models.IntegerChoices):
        REQUEST = 0, _("Request")
        INVITE = 1, _("Invite")
        SUBSCRIBED = 2, _("Subscribed")

    status = models.SmallIntegerField(_("status"), choices=Status.choices)
    user = models.ForeignKey(User, models.CASCADE)
    group = models.ForeignKey(Group, models.CASCADE)

    class Meta:
        abstract = True
        verbose_name = _("Subscription")
        verbose_name_plural = _("Subscriptions")

    @property
    def is_invite(self):
        return self.status == self.Status.INVITE

    @property
    def is_request(self):
        return self.status == self.Status.REQUEST

    @property
    def is_subscribed(self):
        return self.status == self.Status.SUBSCRIBED
