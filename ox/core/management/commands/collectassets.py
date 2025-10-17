import os

from django.core.files.storage import FileSystemStorage

from ox.utils.commands import AppsCommand
from ox.core.assets.base import Assets
from ox.core.assets.finders import AssetsFinder


class Command(AppsCommand):
    """Oxylus management command."""

    help = "Collect assets builds and dependencies into apps' statics."

    def add_arguments(self, parser):
        super().add_arguments(parser)

    def handle(self, **kwargs):
        self.set_options(**kwargs)
        self.copied_files = []

        self.log(f"> {len(self.apps)} applications found")
        for app in self.apps:
            if isinstance(getattr(app, "assets", None), Assets):
                self.collect_app(app, app.assets)

        self.log(f"[b]Done! [green]{len(self.copied_files)}[/green] have been copied[/b]", level=1)

    def collect_app(self, app, assets):
        self.log(f"[b cyan]Collect {app.label} assets[/b cyan]", level=1)
        static_storage = FileSystemStorage(os.path.join(app.path, "static"))
        self.log(f"Target directory: `{static_storage.location}`", level=1)
        finder = AssetsFinder([app])

        self.log("Clear target directory", level=1)
        self.clear_dir(static_storage, "")

        self.log("Copy them all...", level=1)
        n = len(self.copied_files)
        for path, storage in finder.list():
            source_path = storage.path(path)
            prefixed_path = os.path.join(storage.prefix, path)
            self.copied_files.append(source_path)
            self.log(f"Copy `{source_path}` => `{prefixed_path}`")

            if not self.dry_run:
                with storage.open(path) as source:
                    static_storage.save(prefixed_path, source)

        self.log(f"[green]{len(self.copied_files)-n}[/green] files have been copied.", level=1)

    def clear_dir(self, storage, path):
        # From django.contrib.staticfiles collectstatic
        if not storage.exists(path):
            return

        dirs, files = storage.listdir(path)
        for f in files:
            file_path = os.path.join(path, f)
            self.log(f"Delete {file_path}", level=2)
            if not self.dry_run:
                try:
                    full_path = storage.path(file_path)
                except NotImplementedError:
                    storage.delete(file_path)
                else:
                    if not os.path.exists(full_path) and os.path.lexists(full_path):
                        os.unlink(full_path)
                    else:
                        storage.delete(file_path)

        for d in dirs:
            self.clear_dir(storage, os.path.join(path, d))
