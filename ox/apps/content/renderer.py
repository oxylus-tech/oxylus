from functools import cached_property
from typing import Iterable

from django.templates import Context, Engine, Template

from . import models


__all__ = ("Renderer",)


class Renderer:
    """
    Render :py:class:`~.models.Content` for a specific :py:class:`~.models.Bundle`.
    """

    template_libraries = {
        "cache": "django.templatetags.cache",
        "i18n": "django.templatetags.i18n",
        "l10n": "django.templatetags.l10n",
        # 'static': 'django.templatetags.static',
        "tz": "django.templatetags.tz",
    }
    """ Libraries provided by template engine. """

    template_name: str | Iterable[str] = "index.html"
    """
    Name to template file to render (as scoped by pack's directory).
    """

    @cached_property
    def engine(self):
        """Engine to use in order to render templates."""
        return Engine(dirs=[self.pack.get_template_dir()], apps_dir=False, libraries=self.template_libraries)

    def __init__(self, pack: models.Bundle, libraries: dict[str, str] | None = None):
        self.pack = pack
        if libraries:
            self.libraries = {**self.libraries, **libraries}

    def render(self, content: models.Content, template: Template | None = None, **kwargs):
        """
        Render content.

        :param content: content to render
        :param template: if provided use this template and do not :py:meth:`get_template`.
        :param **kwargs: extra context values.
        """
        if template is None:
            template = self.get_template()

        context = self.get_context_data(content=content, **kwargs)
        return template.render(Context(context))

    def get_template(self):
        """Return template used by renderer."""
        template_names = self.get_template_names()
        return self.engine.get_template(template_names)

    def get_template_names(self):
        """
        Return template names to render.

        By default this method will return each string provided by :py:attr:`template_name` prefixed with pack's slug.
        """
        if isinstance(self.template_name, str):
            return [f"{self.pack.slug}/{self.template_name}"]
        return [f"{self.pack.slug}/{template_name}" for template_name in self.template_name]

    def get_context_data(self, **kwargs):
        """Return context to pass down to template."""
        return {
            **kwargs,
            "pack": self.pack,
        }
