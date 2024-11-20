import time

from django.core.management.base import BaseCommand
from django.apps import apps

from ox.core.apps import AppConfig
from ox.core.assets import order_assets


class Command(BaseCommand):
    help = "Collect assets dependencies"

    def add_arguments(self, parser):
        parser.add_argument("-i", "--init", action="store_true", help="Force assets initialization.")
        parser.add_argument("-b", "--build", action="store_true", help="Force assets rebuild")
        parser.add_argument("-w", "--watch", action="store_true", help="Watch for changes and rebuild")
        parser.add_argument("-d", "--dev", action="store_true", help="Build in development mode.")

    def handle(self, *args, init=False, build=False, watch=False, dev=False, **options):
        ox_apps = list(reversed([app for app in apps.app_configs.values() if isinstance(app, AppConfig)]))
        assets_list = order_assets([app.assets for app in ox_apps])

        build = not watch and build
        self.collect(assets_list, init=init, build=build, dev=dev)
        if watch:
            self.watch(assets_list, dev=dev)

    def collect(self, assets_list, **kwargs):
        exclude = set()

        for assets in assets_list:
            done = assets.collect(exclude=exclude, **kwargs)
            if done is None:
                print(f"{repr(assets)}: no assets to collect.")

            exclude = exclude | set(done.keys())
            self.print_done(assets, done)

    def watch(self, assets_list, sleep=0.1, dev=False):
        print("Start to watch for changes in:", ", ".join(repr(assets) for assets in assets_list))
        processes = [
            p for p in (assets.command("watch", use_async=True, dev=dev) for assets in assets_list) if p is not None
        ]
        while processes:
            for process in processes:
                if process.poll() is not None:
                    processes.remove(process)
            time.sleep(sleep)
        print("Watch done")

    def print_done(self, assets, done):
        if done:
            msg = f"{len(done)} collected: {', '.join(done.keys())}"
        else:
            msg = "none collected"

        print(f"{repr(assets)}: {msg}")
        for key, paths in done.items():
            print(f"  {key}: {paths.source} -> {paths.target}")
