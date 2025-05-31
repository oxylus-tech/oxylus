from pathlib import Path

from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from ox.utils.models import PackageInfo

from . import mixins
from .conf import ox_content_settings


__all__ = ("RichTextField", "TemplatePack", "Content")


class RichTextField(mixins.RichTextFieldMixin, models.CharField):
    """
    Provide rich text value, ensuring input text is cleaned based on
    :py:attr:`~.conf.ox_content_settings`.

    It uses bleach, and provided attributes reflects bleach's ``clean()`` settings.

    Note though that strings are not marked as safe. This is up to the
    user to do so.
    """

    pass


class TemplatePack(PackageInfo):
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

    source_dir = ""
    """
    [class attribute] Directory name in which to store packs.

    If not provided, use model's ``label_lower``.
    """
    template_files = [
        ("index.html", _("Default")),
    ]
    """
    [class attribute] Allowed template files that user can select.

    It is set as choices of related content's `template`.
    """

    @property
    def template_dir(self) -> Path:
        """Template directory for this template."""
        return self.get_template_dir() / self.slug

    @property
    def static_dir(self) -> Path:
        """Static directory for this template."""
        return self.get_static_dir() / self.slug

    class Meta:
        abstract = True
        verbose_name = _("Template Pack")
        verbose_name_plural = _("Template Packs")

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
        return cls.source_dir or cls._meta.label_lower

    def save(self, *args, update_fields=None, **kwargs):
        if not update_fields or "is_active" in update_fields:
            type(self).objects.filter(is_active=True).update(is_active=False)
        super().save(*args, update_fields=update_fields, **kwargs)


class ContentBase(models.ModelBase):
    def __new__(mcls, name, bases, attrs):
        cls = super(ContentBase, mcls).__new__(mcls, name, bases, attrs)
        mcls.init_field(cls)
        return cls

    @classmethod
    def init_fields(mcls, cls):
        should = not cls._meta.abstract and not cls._meta.proxy
        if should:
            field = cls.get_field("template_pack")
            if not field:
                raise ValueError(f"{cls.__name__} class misses foreign key `template_pack` foreign key.")

            choices = field.remote_field.model.template_files
            cls.get_field("template").choices = choices


class Content(models.Model, metaclass=ContentBase):
    template = models.CharField(_("Template file"), max_length=64, default="index.html")

    content = RichTextField(_("Content"), default="")
    """ Content's body. """

    class Meta:
        abstract = True
