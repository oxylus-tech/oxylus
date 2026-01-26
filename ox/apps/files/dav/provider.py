from functools import cached_property
from datetime import datetime, timedelta
import os

from django.conf import settings
from django.db import transaction
from django.utils.translation import gettext_lazy as _
from wsgidav.dav_provider import DAVProvider, DAVCollection, DAVNonCollection
from wsgidav.util import join_uri

from caps.models import Agent
from .. import tasks
from ..models import Folder, File

from .path import DAVPath
from .base import BaseDAV, DAVResource


class DAVFile(DAVResource, DAVNonCollection):
    def __init__(self, *args, folder=None, name=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.folder = folder
        self.name = name
        self.owner = self.owner or (folder and folder.owner)

    def get_content_length(self):
        return self.object.file.size

    def get_content(self):
        return self.object.file.open("rb")

    def get_content_type(self):
        return self.object.mime_type

    def begin_write(self, content_type=None):
        # assert self.user.has_perm("ox_files.add_file", self.object)
        path = self.object.abs_path()
        self._write_path = path
        self._write_tmp_path = path.with_suffix(path.suffix + ".tmp")
        return open(self._write_tmp_path, "wb")

    @transaction.atomic
    def end_write(self, *args, with_errors):
        if with_errors:
            os.path.unlink(self._write_tmp_path)
            return

        try:
            self._write_tmp_path.rename(self._write_path)
        except:
            self._write_tmp_path.unlink()
            raise

        try:
            last_update = self.object.pk and self.object.updated
            self.object.save()

            if not last_update or (datetime.now() - last_update) > timedelta(minutes=5):
                tasks.create_preview.enqueue(uuid=str(self.object.uuid))
        except:
            self._write_path.unlink()
            raise

    @transaction.atomic
    def delete(self):
        assert self.user.has_perm("ox_files.delete_file", self.object)

        self.object.delete()

    def handle_move(self, dest_path):
        return self._move_or_copy(dest_path)

    def handle_copy(self, dest_path, depth_infinity):
        return self._move_or_copy(dest_path, True)

    def _move_or_copy(self, dest_path, copy=False):
        # can't move upper than agent folder.
        if dest_path.count("/") < 2:
            return False

        path = DAVPath.read_path(dest_path)

        folder = self.get_folders(path=os.path.dirname(path.path), owner=path.owner).first()
        assert self.user.has_perm("ox_files.add_file", folder)
        assert self.user.has_perm("ox_files.delete_file", self.object.folder)

        self.object.move_or_copy(path.path, copy)
        return True


class DAVFolder(DAVResource, DAVCollection):
    @cached_property
    def folders(self):
        if self.object and isinstance(self.object, Folder):
            return self.get_folders(parent=self.object)
        return self.get_folders().root_nodes()

    @cached_property
    def files(self):
        query = self.get_files()
        if self.object:
            return query.filter(folder=self.object)
        return query.filter(folder__isnull=True)

    def get_member_names(self):
        return [f.name for f in self.folders] + [f.name for f in self.files]

    def get_member(self, name):
        try:
            folder = self.folders.get(name=name)
            return DAVFolder(join_uri(self.path, name), self.environ, folder, self.owner)
        except Folder.DoesNotExist:
            try:
                file = self.files.get(name=name)
                return DAVFile(join_uri(self.path, name), self.environ, file, self.owner)
            except File.DoesNotExist:
                return None

    @transaction.atomic
    def create_collection(self, name):
        assert self.user.has_perm("ox_files.add_folder", self.object)

        dest_path = self.object.abs_path() / name
        if dest_path.exists():
            return super().create_collection(name)

        obj = Folder(parent=self.object, name=name, owner=self.owner)
        obj.save()
        return DAVFolder(join_uri(self.path, name), self.environ, object=obj)

    def create_empty_resource(self, name):
        assert self.user.has_perm("ox_files.add_file", self.object)

        dest_path = self.object.abs_path() / name
        if dest_path.exists():
            # HTTP_FORBIDDEN
            return super().create_empty_resource(name)

        # we do not save it directly
        obj = File(folder=self.object, name=name, owner=self.owner)
        obj.file.name = str(dest_path.relative_to(settings.MEDIA_ROOT))
        obj.validate_node()
        return DAVFile(join_uri(self.path, name), self.environ, object=obj)

    @transaction.atomic
    def delete(self):
        assert self.user.has_perm("ox_files.delete_folder", self.object)

        self.object.delete()

    # TODO:
    # def get_used_bytes(self):


class DAVAgentFolder(DAVResource, DAVCollection):
    """Root Agent folder."""

    def get_folder_name(self, agent):
        if agent.user:
            prefix = agent.user.username
        else:
            prefix = _("Group") + " - " + agent.group.name

        return f"{prefix} - {agent.uuid}"

    @cached_property
    def folders(self):
        return {self.get_folder_name(f.owner): f for f in self.get_folders().root_nodes()}

    def get_member_names(self):
        return self.folders.keys()

    def get_member(self, name):
        if folder := self.folders.get(name):
            return DAVFolder(join_uri(self.path, name), self.environ, folder)
        return None


class DjangoDAVProvider(BaseDAV, DAVProvider):
    def is_readonly(self):
        return False

    def get_resource_inst(self, path, environ):
        agents = Agent.objects.user(environ["django.user"], strict=False).order_by("-user_id")
        environ["django.agents"] = agents

        path = DAVPath.read_path(path)
        environ["django.path"] = path

        if not path.root:
            return DAVAgentFolder(path.full_path, environ)

        if folder := self.get_folder(agents, path.owner, path.path or "/"):
            return DAVFolder(path.full_path, environ, object=folder)

        if path.path:
            if file := self.get_file(agents, path.owner, path.path, path.name):
                return DAVFile(path.full_path, environ, file)
            return None
        return DAVFolder(f"{path.full_path}", environ, owner=path.owner)

    def get_folder(self, agents, owner, path):
        return self.get_folders_queryset(agents, owner, path=path).first()

    def get_file(self, agents, owner, path, name):
        dirname = os.path.dirname(path)
        files = self.get_files_queryset(agents, owner, name=name, folder__path=dirname)
        return files.first()
