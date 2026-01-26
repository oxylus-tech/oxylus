from ox.apps.files.models import Folder, File


__all__ = ("BaseDAV", "DAVResource")


class BaseDAV:
    def get_files_queryset(self, agents, owner=None, **lookups):
        query = File.objects.available(agents).filter(**lookups).select_related("folder")
        return query.filter(owner=owner) if owner else query

    def get_folders_queryset(self, agents, owner=None, **lookups):
        query = Folder.objects.available(agents).filter(**lookups)
        return query.filter(owner=owner) if owner else query


class DAVResource(BaseDAV):
    def __init__(self, path, environ, object=None, owner=None):
        super().__init__(path, environ)
        self.object = object
        self.owner = owner or (object and object.owner) or None

    @property
    def user(self):
        return self.environ["django.user"]

    @property
    def agents(self):
        return self.environ["django.agents"]

    def get_files(self, **lookups):
        lookups.setdefault("owner", self.owner)
        return self.get_files_queryset(self.agents, **lookups)

    def get_folders(self, **lookups):
        lookups.setdefault("owner", self.owner)
        return self.get_folders_queryset(self.agents, **lookups)

    def get_display_name(self):
        return self.object and self.object.name or ""

    def support_etag(self):
        return True

    def get_etag(self):
        """ETag for caching; can be based on folder modification timestamp."""
        if self.object and hasattr(self.object, "updated"):
            return f"{self.object.uuid}-{self.object.updated.timestamp()}"

    def get_creation_date(self):
        if self.object:
            return self.object.created.timestamp()

    def get_last_modified(self):
        if self.object:
            return self.object.updated.timestamp()
