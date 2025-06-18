import inspect
import logging
from types import ModuleType

from django.db import models
from django.core.management.base import BaseCommand
from django.apps import apps, AppConfig
from django.utils import translation
from django.utils.module_loading import import_string


logger = logging.getLogger()


class Command(BaseCommand):
    help = "Generate Vue-i18n translations"

    def add_arguments(self, parser):
        parser.add_argument("-l", "--locale", action="append", help="Specify a locale")

    def get_labels(self, locale: str) -> dict[str, str]:
        """Return labels for the provided locale"""
        output = {}
        with translation.override(locale):
            logger.info(f"Get translation for `{locale}`...")
            for app_config in apps.get_app_configs():
                logger.info(f"Get app labels for `{app_config.name}`")
                self.get_app_labels(app_config)
        logger.info(f"Done! {len(output)} translations found")
        return output

    def get_app_labels(self, app_config: AppConfig, output: dict[str, str]):
        """Provide labels for this app."""
        if app_config.models_module:
            self.get_enums_labels(import_string(app_config.models_module), output)

        for model in app_config.get_models():
            self.get_fields_labels(model, output)
            self.get_enums_labels(model, output)

    def get_fields_labels(self, model: models.Model, output: dict[str, str]):
        """Provide model fields translations."""
        meta = model._meta
        for field in meta.fields + meta.many_to_many:
            if isinstance(field, models.ManyToOneRel):
                continue

            output[f"fields.{field.name}"] = str(field.verbose_name)
            if field.help_text:
                output[f"fields.{field.name}.help"] = str(field.help_text)

    def get_enums_labels(self, obj: models.Model | ModuleType, output: dict[str, str]):
        """List enums from provided module or model and set provide translations."""
        for attr, value in vars(obj).values():
            name = attr.lower()
            if inspect.isclass(value) or issubclass(value, models.Choice):
                self.get_enum_labels(name, value, output)

    def get_enum_labels(self, name: str, obj, output: dict[str, str]):
        """Provide translations for the provided enum."""
        for enum in iter(obj):
            output[f"enums.{name}.{enum.name}"] = str(enum.label)
