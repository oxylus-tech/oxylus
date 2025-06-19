import inspect
import json
import logging
from pathlib import Path
from types import ModuleType

from django.db import models
from django.conf import settings
from django.core.management.base import BaseCommand
from django.apps import apps, AppConfig
from django.utils import translation


logger = logging.getLogger()


class Command(BaseCommand):
    help = "Generate Vue-i18n translations"

    def add_arguments(self, parser):
        parser.add_argument("-l", "--locale", action="append", help="Specify a locale")
        parser.add_argument(
            "-o", "--out", type=Path, help="Specify an output directory instead of default (ox/static/locales)."
        )

    def handle(self, locale=None, out=None, **kwargs):
        if out is None:
            out = settings.BASE_DIR / "ox/static/locales"

        out.mkdir(exist_ok=True)

        if not locale:
            locale = (v[0] for v in settings.LANGUAGES)

        for code in locale:
            self.make_i18n(code, out)

    source = "window.__i18n_messages??={{}};" "window.__i18n_messages={{...window.__i18n_messages, ...{messages} }};"

    def make_i18n(self, locale: str, out: Path):
        """Create i18n file for the provided locale."""
        labels = self.get_labels(locale)
        path = out / f"{locale}/django.js"

        path.parent.mkdir(exist_ok=True)

        source = self.source.format(messages=json.dumps(labels))
        path.write_text(source)
        logger.info(f"{len(labels)} translations written to `{path}`")

    def get_labels(self, locale: str) -> dict[str, str]:
        """Return labels for the provided locale"""
        output = {}
        with translation.override(locale):
            logger.info(f"Get translation for `{locale}`...")
            for app_config in apps.get_app_configs():
                logger.info(f"Get app labels for `{app_config.name}`")
                self.get_app_labels(app_config, output)
        return output

    def get_app_labels(self, app_config: AppConfig, output: dict[str, str]):
        """Provide labels for this app."""
        if label := getattr(app_config, "verbose_name"):
            output[f"apps.{app_config.label}"] = str(label).replace("_", " ")

        if not app_config.models_module:
            return

        self.get_enums_labels(app_config.models_module, output)

        for model in app_config.get_models():
            output[f"models.{model._meta.model_name}"] = (
                f"{model._meta.verbose_name.capitalize()} | {model._meta.verbose_name_plural.capitalize()}"
            )

            self.get_fields_labels(model, output)
            self.get_enums_labels(model, output, model._meta.model_name + ".")

    def get_fields_labels(self, model: models.Model, output: dict[str, str]):
        """Provide model fields translations."""
        meta = model._meta
        for field in meta.fields + meta.many_to_many:
            if isinstance(field, models.ManyToOneRel):
                continue

            output[f"fields.{field.name}"] = str(field.verbose_name).capitalize()
            if field.help_text:
                output[f"fields.{field.name}.help"] = str(field.help_text).capitalize()

    def get_enums_labels(self, obj: models.Model | ModuleType, output: dict[str, str], prefix: str = ""):
        """List enums from provided module or model and set provide translations."""
        for attr, value in vars(obj).items():
            name = attr.lower()
            if inspect.isclass(value) and issubclass(value, models.Choices):
                self.get_enum_labels(prefix + name, value, output)

    def get_enum_labels(self, name: str, obj, output: dict[str, str]):
        """Provide translations for the provided enum."""
        for enum in iter(obj):
            output[f"enums.{name}.{enum.name}"] = str(enum.label).capitalize()
            output[f"enums.{name}._.{enum.value}"] = str(enum.label).capitalize()
