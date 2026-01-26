from dataclasses import dataclass
from functools import cached_property
import os
from urllib.parse import unquote
from uuid import UUID

from caps.models import Agent


@dataclass
class DAVPath:
    """
    Represent a file or folder path mapped to DAV.

    The top directory is the owner's directory in the DAV.
    Then come nested files and directories.
    """

    full_path: str
    root: str
    path: str

    @classmethod
    def read_path(cls, full_path):
        """Read provided path and return an instance of DAVPath."""
        full_path = unquote(full_path)
        root, *next = full_path.strip("/").split("/", 1)

        path = next and ("/" + next[0]) or ""
        return cls(full_path, root, path)

    @cached_property
    def name(self):
        return os.path.basename(self.path)

    @cached_property
    def owner(self) -> Agent:
        """Owner of the path (based on root directory name)."""
        uuid = self.root and self.get_owner_uuid(self.root)
        return uuid and Agent.objects.get(uuid=uuid)

    @staticmethod
    def get_owner_uuid(name):
        parts = name.split("-")[-5:]
        return UUID("-".join(parts).strip())
