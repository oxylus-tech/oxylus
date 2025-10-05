from pathlib import Path

from rich import print as rprint
from django.apps import apps as d_apps, AppConfig
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Oxylus management command."""

    dry_run: bool = False
    verbosity: int = 1

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true", help="Dry run.")

    def handle(self, func=None, **kwargs):
        """
        Default implementation will run provided function.

        Flowchart:

            - ``set_options``
            - ``func(**kwargs)``
        """
        self.set_options(**kwargs)
        return func and func(**kwargs)

    def set_options(self, **options):
        """Set class instance values based on user's options."""
        self.dry_run = options.get("dry_run", False)
        self.verbosity = options.get("verbosity", 2)

        if self.dry_run:
            self.log("[yellow]*** You have chosen to run this command in dry mode. ***[/yellow]")

    def log(self, msg, level=2):
        """Log provided message."""
        if self.verbosity >= level:
            if self.dry_run:
                msg = "DRY | " + msg
            rprint(msg)


class AppsCommand(Command):
    """Base command class adding features to select applications."""

    apps: list[AppConfig]
    """ User selected apps """

    def add_arguments(self, parser):
        parser.add_argument("apps", metavar="APP", nargs="*", help="Select those applications (by label).")
        parser.add_argument(
            "-r", "-root", action="append", type=Path, help="Only applications that are in the parent directory."
        )
        super().add_arguments(parser)

    def set_options(self, **options):
        super().set_options(**options)

        self.apps = d_apps.get_app_configs()
        if apps := options.get("apps"):
            self.apps = [app for app in self.apps if app.label in apps]
        if root := options.get("root"):
            self.apps = [app for app in self.apps if app.path in root or any(p in root for p in app.path.parents)]
