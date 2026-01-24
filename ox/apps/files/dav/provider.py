from functools import cached_property
import os
from urllib.parse import unquote
from uuid import UUID

from django.utils.translation import gettext_lazy as _
from wsgidav.dav_provider import DAVProvider, DAVCollection, DAVNonCollection
from wsgidav.util import join_uri

from caps.models import Agent
from ox.apps.files.models import Folder, File


class DAVFilesMixin:
    def __init__(self, path, environ, agents, object=None, owner=None):
        super().__init__(path, environ)
        self.object = object
        self.agents = agents
        self.owner = owner

    def get_display_name(self):
        return self.object and self.object.name or ""

    def support_etag(self):
        return True

    def get_etag(self):
        """ETag for caching; can be based on folder modification timestamp."""
        if self.object and hasattr(self.object, "updated"):
            return f"{self.object.uuid}-{self.object.updated.timestamp()}"

    def get_last_modified(self):
        if self.object:
            return self.object.updated.timestamp()


class DAVFile(DAVFilesMixin, DAVNonCollection):
    def get_content_length(self):
        return self.object.file.size

    def get_content(self):
        return self.object.file.open("rb")

    def get_content_type(self):
        return self.object.mime_type

    def begin_write(self, content_type=None):
        raise NotImplementedError("Upload not implemented yet")


class DAVFolder(DAVFilesMixin, DAVCollection):
    @cached_property
    def folders(self):
        if self.object:
            query = self.object.get_children()
        else:
            query = Folder.objects.root_nodes().filter(owner__uuid=self.owner)
        return query.available(self.agents)

    @cached_property
    def files(self):
        query = File.objects.available(self.agents)
        if self.object:
            return query.filter(folder=self.object)
        return query.filter(folder__isnull=True, owner__uuid=self.owner)

    def get_member_names(self):
        return [f.name for f in self.folders] + [f.name for f in self.files]

    def get_member(self, name):
        try:
            folder = self.folders.get(name=name)
            return DAVFolder(join_uri(self.path, name), self.environ, self.agents, folder)
        except Folder.DoesNotExist:
            try:
                file = self.files.get(name=name)
                return DAVFile(join_uri(self.path, name), self.environ, self.agents, file)
            except File.DoesNotExist:
                return None

    # TODO:
    # def get_used_bytes(self):
    # create_collection
    # delete
    # handle_copy
    # handle_move
    # handle_delete


class RootFolder(DAVCollection):
    def __init__(self, path, environ, agents):
        super().__init__(path, environ)
        self.agents = agents

    def get_folder_name(self, agent):
        if agent.user:
            prefix = agent.user.username
        else:
            prefix = _("Group") + " - " + agent.group.name

        return f"{prefix} - {agent.uuid}"

    def get_member_names(self):
        return [self.get_folder_name(a) for a in self.agents]

    def get_member(self, name):
        uuid = get_owner_uuid(name)
        agent = next((a for a in self.agents if a.uuid == uuid), None)
        if agent:
            return DAVFolder(join_uri(self.path, name), self.environ, agent)
        return None


def get_owner_uuid(name):
    parts = name.split("-")[-5:]
    return UUID("-".join(parts).strip())


class RequestPath:
    def __init__(self, path):
        path = unquote(path)
        first, *next = path.strip("/").split("/", 1)

        self.full_path = path
        self.root_dir = first
        self.path = next and ("/" + next[0]) or ""
        self.name = os.path.basename(self.path)


class DjangoDAVProvider(DAVProvider):
    def get_resource_inst(self, path, environ):
        agents = Agent.objects.user(environ["django.user"], strict=False).order_by("-user_id")

        path = RequestPath(path)
        if not path.root_dir:
            return RootFolder(path.full_path, environ, agents)

        owner = get_owner_uuid(path.root_dir)
        if path.path:
            if folder := self.get_folder(agents, owner, path.path):
                return DAVFolder(path.full_path, environ, agents, object=folder)

            if file := self.get_file(agents, path.path, path.name):
                return DAVFile(path.full_path, environ, agents, file)
            return None
        return DAVFolder(f"{path.full_path}", environ, agents, owner=owner)

    def get_folder(self, agents, owner, path):
        folders = self.get_folders(agents, owner__uuid=owner)
        return folders.filter(path=path).first()

    def get_folders(self, agents, **kwargs):
        query = Folder.objects.available(agents)
        return query.filter(**kwargs) if kwargs else query

    def get_file(self, agents, path, name):
        files = self.get_files(agents, name=name)
        dirname = os.path.dirname(path)
        if dirname and dirname != "/":
            files = files.filter(folder__path=dirname)
        else:
            files = files.filter(folder__isnull=True)
        return files.first()

    def get_files(self, agents, **kwargs):
        query = File.objects.available(agents).select_related("folder")
        return query.filter(**kwargs) if kwargs else query
