from pathlib import Path
import subprocess

from django.apps import apps as d_apps, AppConfig
from django.conf import settings
from django.contrib.auth.models import User
from django.core.management import call_command
import yaml

from ox.utils.conf import SettingsEditor
from ox.utils.functional import dependency_order
from ox.utils.commands import Command


class Command(Command):
    """Oxylus management command.

    It only include tools used on deployment.
    """

    help = "Oxylus management tool."

    secrets_path = settings.OX["SETTINGS_DIR"] / ".secrets.yaml"

    def add_arguments(self, parser):
        super().add_arguments(parser)

        subparsers = parser.add_subparsers()

        # setup
        subparser = subparsers.add_parser("setup", help="Setup or update project")
        subparser.set_defaults(func=self.project_setup)
        subparser.add_argument("-a", "--admin", action="store_true", help="Create super user")
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

    def project_setup(self, apps=None, admin=False, default_admin=False, once=False, no_update_secrets=False, **kwargs):
        """Initialize the whole project."""
        self.log("[b]🌱️ Start Oxylus setup...[/b]")

        if once:
            if self.secret_path.exists():
                self.log("Setup already done, exit.")
                return

        print("")
        not no_update_secrets and self.update_secrets()

        self.log("\n[b underline]🍂 Run database migrations[/b underline]")
        call_command("migrate", *(app.label for app in apps))

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

        apps, errors = self._get_install_apps(packages)
        if errors:
            self.log("The following applications couldn't not be loaded:\n" + "\n".join(errors))
            return -1

        self.log(f"{len(apps)} will be installed.")

        # Update installed apps
        settings_editor = SettingsEditor("plugins.yaml")

        plugins = settings_editor.read() or {}
        plugins_apps = plugins.setdefault("default", {}).setdefault("PLUGINS_APPS", {})

        prev_plugins_apps = list(plugins_apps)

        # first, get existing installed apps
        installed = {app: plugins_apps[app.name] for app in d_apps.get_app_configs() if app.name in plugins_apps}
        all_apps = {
            **installed,
            **{
                app: {
                    # App may have already been installed
                    **plugins_apps.get(name, {}),
                    "as_dependency": name not in packages
                    or (name in plugins_apps and plugins_apps[name].get("as_dependency", False)),
                }
                for name, app in apps.items()
            },
        }

        plugins["default"]["PLUGINS_APPS"] = {
            app.name: all_apps[app] for app in reversed(dependency_order(all_apps.keys()))
        }
        self.log(f"Update {settings_editor.path} with: {', '.join(plugins['default']['PLUGINS_APPS'])}")

        settings_editor.write(plugins)

        try:
            # Run in a new process
            cmd = [settings.BASE_DIR / "manage.py", "ox", "setup", *(app.label for app in all_apps)]
            subprocess.run(cmd, check=True)
        except subprocess.CalledProcessError as err:
            self.log(f"[b red]An error occured on setup:[/b red] {err}")
            self.log("Restore previous settings")
            plugins["default"]["PLUGINS_APPS"] = prev_plugins_apps
            settings_editor.write(plugins)

    def _get_install_apps(self, packages) -> tuple[list[AppConfig], list[str]]:
        errors, apps = [], {}
        for package in packages:
            if d_apps.is_installed(package):
                self.log(f"{package} already installed, skip it.")
                continue

            try:
                app = AppConfig.create(package)
                apps[package] = app

                # also include dependencies
                if deps := getattr(app, "dependencies", None):
                    packages.extend(p for p in deps if p not in apps)
            except Exception as err:
                errors.append(f"`{package}`: {err}")
        return apps, errors

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

    def get_updated_secrets(self, data):
        """Update provided data for ``SECRET_KEY`` and ``SALT_KEY``."""
        from django.core.management.utils import get_random_secret_key

        data.setdefault("SECRET_KEY_FALLBACKS", [])
        data.setdefault("SALT_KEY_FALLBACKS", [])

        if key := data.get("SECRET_KEY"):
            data["SECRET_KEY_FALLBACKS"].insert(0, key)
        data["SECRET_KEY"] = get_random_secret_key()

        if key := data.get("SALT_KEY"):
            data["SALT_KEY_FALLBACKS"].insert(0, key)
        data["SALT_KEY"] = get_random_secret_key()
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
