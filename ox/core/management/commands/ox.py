from pathlib import Path
import shutil

from django.apps import apps
from django.conf import settings
from django.contrib.auth.models import User
from django.core.management import call_command
import yaml

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
        subparser.add_argument("--default-admin", action="store_true", help="Create default super user (admin:admin).")
        subparser.add_argument(
            "--once",
            action="store_true",
            help="Run setup if it hasn't been set up yet (check against `.secrets.yaml` settings file).",
        )

        # update-secrets
        subparser = subparsers.add_parser("update-secrets", help="Update secrets settings (used for encryption).")
        subparser.set_defaults(func=self.update_secrets)
        subparser.add_argument(
            "path", metavar="PATH", nargs="?", help="Secret settings file to read and update (YAML file)."
        )

        # collect-settings
        subparser = subparsers.add_parser(
            "collect-settings",
            help="Collect settings from declared applications. Settings are in `app_dir/data/settings.yaml`.",
        )
        subparser.set_defaults(func=self.collect_settings)
        subparser.add_argument("-f", "--force", action="store_true", help="Force existing files overwrite.")

        # import-fixtures
        subparser = subparsers.add_parser(
            "import-fixtures",
            help="Collect fixtures from declared applications. Settings are in `app_dir/data/fixture*`.",
        )
        subparser.set_defaults(func=self.import_fixtures)

    def project_setup(self, admin=False, default_admin=False, once=False, **kwargs):
        """Initialize the whole project."""
        self.log("[b]🌱️ Setup Oxylus 🌳[/b]\n")

        if once:
            if self.secret_path.exists():
                self.log("Setup already done, exit.")
                return

        print("")
        self.update_secrets()

        self.log("\n[b underline]🍂 Run database migrations[/b underline]")
        call_command("migrate")

        if admin:
            self.log("\n[b underline]🐣 Create super user[/b underline]")
            call_command("createsuperuser")
        elif default_admin:
            self.log("\n[b underline]🙉 Create default super user[/b underline]")
            self.log("[b yellow]*** You MUST change your password after creation ***[/b yellow]")
            user = User(username="admin", is_superuser=True, is_staff=True)
            user.set_password("admin")
            user.save()
            self.log(f"User {user.username} has been created with password `admin`")

        print("")
        self.import_fixtures()

        self.log("\n[b underline]🦋 Collect statics[/b underline]")
        call_command("collectstatic", "--noinput")

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

    def collect_settings(self, force=False, target=None, **_):
        """
        Collect settings from applications (as `app_dir/data/settings.yaml`) and
        copy them to settings directory (as `target_dir/app_label.yaml`).

        :param force: if file is already present, overwrite
        :param target: target directory (defaults to settings.SETTINGS_DIR)
        """
        if not target:
            target = settings.OX["SETTINGS_DIR"]

        target.mkdir(parents=True, exist_ok=True)

        self.log("[b underline]🐢 Collect settings from applications[/b underline]")
        self.log(f"Target directory: {target}")
        for app in apps.get_app_configs():
            path = Path(app.path) / "data/settings.yaml"
            target_path = target / f"{app.label}.yaml"
            if path.exists():
                self.log(f"Settings found for {app.label}")
                if not force and target_path.exists():
                    self.log(f"Target file already exists at {target_path}. Skip")
                    continue
                shutil.copy(str(path), str(target_path))

    def import_fixtures(self, **_):
        """Import fixtures from apps."""
        self.log("[b underline]🐝 Import fixtures from applications[/b underline]")

        # we go in reverse order to ensure we have dependencies first if any
        for app in reversed(apps.get_app_configs()):
            paths = list((Path(app.path) / "data").glob("fixture*"))
            if not paths:
                continue

            paths.sort()

            self.log(f"Fixtures found for {app.label}.")
            for path in paths:
                self.log(f"Load {path}")
                call_command("loaddata", str(path))
