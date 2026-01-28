from copy import deepcopy
from pathlib import Path
import subprocess

from django.apps import apps as d_apps, AppConfig
from django.conf import settings
from django.contrib.auth.models import User
from django.core.management.base import CommandError
from django.core.management import call_command
import yaml

from ox.utils.conf import SettingsEditor
from ox.utils.apps import order_apps_dependencies
from ox.utils.commands import Command


class Command(Command):
    """Oxylus management command.

    It only include tools used on deployment.
    """

    help = "Oxylus management tool."

    secrets_path = settings.OX["SETTINGS_DIR"] / "secrets.yaml"

    def add_arguments(self, parser):
        super().add_arguments(parser)

        subparsers = parser.add_subparsers()

        # setup
        subparser = subparsers.add_parser("setup", help="Setup or update project")
        subparser.set_defaults(func=self.project_setup)
        subparser.add_argument("-a", "--admin", action="store_true", help="Create super user")
        subparser.add_argument("--assets", action="store_true", help="Collect assets")
        subparser.add_argument("--no-update-secrets", action="store_true", help="Don't update secrets")
        subparser.add_argument("--default-admin", action="store_true", help="Create default super user (admin:admin).")
        subparser.add_argument(
            "--once",
            action="store_true",
            help="Run setup if it hasn't been set up yet (check against `.secrets.yaml` settings file).",
        )
        subparser.add_argument("apps", metavar="APPS", nargs="*", type=self.get_app, help="Selected applications.")

        # install
        subparser = subparsers.add_parser("install", help="Install an Oxylus application by package name or path.")
        subparser.set_defaults(func=self.install_app)
        subparser.add_argument("packages", metavar="PACKAGE", nargs="+", help="Package name to install.")

        # update-secrets
        subparser = subparsers.add_parser("update-secrets", help="Update secrets settings (used for encryption).")
        subparser.set_defaults(func=self.update_secrets)
        subparser.add_argument(
            "path", metavar="PATH", nargs="?", help="Secret settings file to read and update (YAML file)."
        )

        # import-fixtures
        subparser = subparsers.add_parser(
            "import-fixtures",
            help="Collect fixtures from declared applications. Settings are in `app_dir/data/fixture*`.",
        )
        subparser.set_defaults(func=self.import_fixtures)
        subparser.add_argument("apps", metavar="APPS", nargs="*", type=self.get_app, help="Selected applications.")

    def project_setup(
        self, apps=None, admin=False, default_admin=False, once=False, no_update_secrets=False, assets=False, **kwargs
    ):
        """Initialize the whole project."""
        self.log("[b]🌱️ Start Oxylus setup...[/b]")

        if once:
            if self.secret_path.exists():
                self.log("Setup already done, exit.")
                return

        print("")
        not no_update_secrets and self.update_secrets()

        self.log("\n[b underline]🍂 Run database migrations[/b underline]")
        for app in apps:
            try:
                call_command("migrate", app.label)
            except CommandError as err:
                if "does not have migrations" in str(err):
                    continue
                raise

        if admin:
            self.log("\n[b underline]🐣 Create super user[/b underline]")
            call_command("createsuperuser")
        elif default_admin:
            self.log("\n[b underline]🙉 Create default super user[/b underline]")
            self.log("[b yellow]*** You MUST change your password after creation ***[/b yellow]")
            user, created = User.objects.get_or_create(username="admin", is_superuser=True, is_staff=True)
            if created:
                user.set_password("admin")
                user.save()
                self.log(f"User {user.username} has been created with password `admin`")
            else:
                self.log(f"User {user.username} already exists. Skip")

        print("")
        self.import_fixtures(apps=apps)

        if assets:
            self.log("\n[b underline]🌍 Collect assets translations[/b underline]")
            call_command("vue-i18n")

        self.log("\n[b underline]🦋 Collect statics[/b underline]")
        call_command("collectstatic", "--noinput")

        self.log("[b]🌳 Setup done![/b]")

    def get_app(self, app: str) -> AppConfig:
        """Return AppConfig for provided app names."""
        return d_apps.get_app_config(app)

    def install_app(self, packages=None, **_):
        """Install an application. The python package must already be present in
        python's packages.
        """
        self.log("[b underline]🐢 Install applications.[/b underline]")

        # Update installed apps
        settings_editor = SettingsEditor("plugins.yaml")

        original_settings = settings_editor.read() or {}
        new_settings = deepcopy(original_settings)
        plugins = new_settings.setdefault("default", {}).setdefault("PLUGINS_APPS", {})

        # first, get existing installed apps
        installed = {app: plugins[app.name] for app in d_apps.get_app_configs() if app.name in plugins}

        all_apps = [app for app in installed.keys()] + list(packages)
        all_apps = list(reversed(order_apps_dependencies(all_apps)))

        new_plugins = {
            app.name: self._get_plugin(packages, plugins, app)
            for app in all_apps
            if app.name not in settings.INSTALLED_APPS or app.name in plugins
        }
        plugins.clear()
        plugins.update(new_plugins)
        self.log(f"Update {settings_editor.path} with: {', '.join(plugins)}")

        settings_editor.write(new_settings)

        try:
            # Run in a new process
            cmd = [settings.BASE_DIR / "manage.py", "ox", "setup", *(app.label for app in all_apps)]
            subprocess.run(cmd, check=True)
        except subprocess.CalledProcessError as err:
            self.log(f"[b red]An error occured on setup:[/b red] {err}")
            self.log("Restore previous settings")
            settings_editor.write(original_settings)

    def _get_plugin(self, packages, plugins, app) -> list[AppConfig]:
        plugin = plugins.get(app.name, {})
        return {**plugin, "as_dependency": app.name not in packages or plugin.get("as_dependency", False)}

    def update_secrets(self, path=None, **_):
        """Update ``.secrets.yaml` file and related keys.`"""
        path = path or self.secrets_path

        # create parent dir if required
        path.parent.mkdir(parents=True, exist_ok=True)

        self.log("[b underline]🙈 Update secrets settings[/b underline]")
        self.log(f"Secrets file: : {path}")
        if not path.exists():
            self.log("File is missing, create one.", level=2)
            data = {settings.ENV: {}}
            self.get_updated_secrets(data[settings.ENV])
        else:
            self.log("File already exists: update it.", level=2)
            with open(path) as stream:
                data = yaml.load(stream, Loader=yaml.Loader)
                self.get_updated_secrets(data.setdefault(settings.ENV, {}))

        with open(path, "w") as stream:
            yaml.dump(data, stream, default_flow_style=False)

        # access rights
        path.chmod(0o700)

    _secret_keys = (
        ("SECRET_KEY", "SECRET_KEY_FALLBACKS"),
        ("SALT_KEY", "SALT_KEY_FALLBACKS"),
        ("JWT_KEY", "JWT_KEY_FALLBACKS"),
    )

    def get_updated_secrets(self, data):
        """Update provided data for ``SECRET_KEY``, ``SALT_KEY`` and ``JWT_KEY``."""
        from django.core.management.utils import get_random_secret_key

        for key, fallback in self._secret_keys:
            data.setdefault(fallback, [])
            if val := data.get(key):
                data[fallback].insert(0, val)
            data[key] = get_random_secret_key()

        return data

    def collect_settings(self, apps, force=False, target=None, **_):
        """
        Collect settings from applications (as `app_dir/data/settings.yaml`) and
        copy them to settings directory (as `target_dir/app_label.yaml`).

        :param force: if file is already present, overwrite
        :param target: target directory (defaults to settings.SETTINGS_DIR)
        """
        if not target:
            target = settings.OX["SETTINGS_DIR"]

        target.mkdir(parents=True, exist_ok=True)

        self.log("[b underline] Collect settings from applications[/b underline]")
        self.log(f"Target directory: {target}")

        apps = apps or d_apps.get_app_configs()
        for app in apps:
            path = Path(app.path) / "data/settings.yaml"
            if path.exists():
                editor = SettingsEditor.from_app(app, target)
                self.log(f"Settings found for {app.label}")
                editor.copy_from(path, force)

    def import_fixtures(self, apps, **_):
        """Import fixtures from apps."""
        self.log("[b underline]🐝 Import fixtures from applications[/b underline]")

        # we go in reverse order to ensure we have dependencies first if any
        apps = apps or reversed(d_apps.get_app_configs())
        for app in apps:
            paths = list((Path(app.path) / "data").glob("fixture*"))
            if not paths:
                continue

            paths.sort()

            self.log(f"Fixtures found for {app.label}.")
            for path in paths:
                self.log(f"Load {path}")
                call_command("loaddata", str(path))
