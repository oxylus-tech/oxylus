from django.db import models
from django.utils import timezone as tz
from django.utils.translation import gettext_lazy as _

from ox.core.models import Model
from ox.utils.models import Created, Updated


class Task(Created, Updated, Model):
    """Base class for tasks."""

    class State(models.IntegerChoices):
        CREATED = 0x00, _("Created")
        PENDING = 0x01, _("Pending")
        RUNNING = 0x02, _("Running")
        SUCCESS = 0x03, _("Succeed")
        ERROR = 0x04, _("Error")
        DISCARDED = 0x05, _("Discarded")

    StateStyle = {
        State.CREATED: "",
        State.PENDING: "",
        State.RUNNING: "",
        State.SUCCESS: "text-success",
        State.ERROR: "text-error",
        State.DISCARDED: "text-warn",
    }
    """ Display CSS class for states. """

    state = models.PositiveSmallIntegerField(_("State"), default=State.CREATED, choices=State.choices)
    run_at = models.DateTimeField(_("Ran at"), null=True, blank=True)
    finish_at = models.DateTimeField(_("Finish at"), null=True, blank=True)
    information = models.CharField(_("Information"), max_length=128, default="")

    @property
    def state_style(self):
        """Display class for state."""
        return self.StateStyle.get(self.state, "")

    class Meta:
        abstract = True

    def update(self, **values):
        """
        Update fields and save instance.
        When state is provided, it will update related fields (such as :py:attr:`run_at`)

        :param **values: fields values (by name).
        """
        if state := values.get("state"):
            dt_field = self._state_dt_field.get(state)
            if dt_field and dt_field not in values:
                values[dt_field] = tz.now()

        self.__dict__.update(values)
        self.save(update_fields=values.keys())

    def run(self, *args, **kwargs):
        """
        Run the task and update states accordingly.
        """
        self.update(state=self.State.RUNNING)
        try:
            self.process(*args, **kwargs)
            if self.state == self.State.RUNNING:
                self.update(state=self.state.SUCCESS)
        except Exception as err:
            self.update(state=self.State.ERROR, info=str(err))

    def process(self, *args, **kwargs):
        """This method actually run task and shall be overriden by
        subclasses.
        """
        raise NotImplementedError(f"This method is not implemented for {type(self)}.")

    _state_dt_field = {
        State.RUNNING: "run_at",
        State.SUCCESS: "finish_at",
        State.ERROR: "finish_at",
    }
