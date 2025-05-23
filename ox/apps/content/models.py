from pathlib import Path

from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from ox.utils.models import PackageInfo

from . import fields
from .conf import ox_content_settings


__all__ = ("Bundle",)


class Bundle(PackageInfo):
    """
    Base abstract model used to provide content templates.

    A bundle consist of different elements:

        - templates: used to render the content;
        - statics: assets;
        - user_fields: user specific fields;

    Templates and static directories are provided at class level, in order to allow users to
    create a new template inheriting from another one.
    """

    slug = models.SlugField(_("Slug"), max_length=64, unique=True)
    is_active = models.BooleanField(_("Is active"), default=True)
    user_fields = models.JSONField(_("User Fields"), null=True, blank=True)

    @property
    def template_dir(self):
        """Template directory for this template."""
        return self.get_template_dir() / self.slug

    @property
    def static_dir(self):
        """Static directory for this template."""
        return self.get_static_dir() / self.slug

    class Meta:
        abstract = True
        verbose_name = _("Content Template")
        verbose_name_plural = _("Content Template")

    def __str__(self):
        return f"{self.name}"

    @classmethod
    def get_template_dir(cls) -> Path:
        """Return template directory used for this model class."""
        return Path(settings.BASE_DIR) / "templates" / ox_content_settings.TEMPLATE_DIR / cls.get_source_dirname()

    @classmethod
    def get_static_dir(cls) -> Path:
        """Return static directory used for this model class."""
        return Path(settings.STATIC_DIR) / ox_content_settings.STATIC_DIR / cls.get_source_dirname()

    @classmethod
    def get_source_dirname(cls) -> str:
        """
        Return directory name in which templates and statics are put.
        This typically takes the format of ``app_label.model_name`` (lower cased).
        """
        return cls._meta.label_lower


class Content(models.Model):
    user_fields = models.JSONField(_("User's data"), default=dict, blank=True)
    """ User's inputed data. """
    content = fields.RichTextField(_("Content"), default="")
    """ Content's body. """

    class Meta:
        abstract = True
