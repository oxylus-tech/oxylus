from pathlib import Path
from uuid import UUID

from django.conf import settings
from ox.core.conf import ox_settings
from ox.utils import conf


class Settings(conf.Settings):
    UPLOAD_DIR = "ox_files/uploads"
    """ Subdirectory in protected media where to upload files. """
    PREVIEW_DIR = "ox_files/previews"
    """ Directory in protected media which to save previews. """

    FILE_SIZE_LIMIT = 15 * 1024 * 1024
    """ Set maximum file size. """

    CLEAR_FILES_ON_DELETE: False = True
    """ When a File is deleted from database, remove it from storage. """

    MAGIC_BUFFER: int = 2048
    """ Buffer size used by Python-Magic to read mime types. """
    THUMBNAIL_SIZE: tuple[int, int] = (600, 800)
    """ Size for thumbnails """

    PROCESSORS: list[str] = [
        "ox.apps.files.processors.ImageProcessor",
        "ox.apps.files.processors.PDFProcessor",
        "ox.apps.files.processors.LibreOfficeProcessor",
    ]
    """ List of file processors. """

    @property
    def upload_dir(self) -> Path:
        """Return full path to upload dir."""
        # We enforce media to be protected
        return ox_settings.protected_media_dir / self.UPLOAD_DIR

    @property
    def preview_dir(self) -> Path:
        """Return full path to preview dir."""
        # We enforce media to be protected
        return ox_settings.protected_media_dir / self.PREVIEW_DIR

    def resolve_upload(self, path: str, owner: UUID | None = None, relative: bool = False):
        """Resolve path under file upload directory.

        :param path: path to resolve.
        :param owner: if provided resolve under this owner's path.
        :param relative: if True, return path relative to MEDIA_ROOT.
        """
        if path.startswith("/"):
            path = path[1:]

        if owner:
            path = Path(str(owner)) / path

        path = self.upload_dir / path
        if relative:
            return path.relative_to(settings.MEDIA_ROOT)
        return path


ox_files_settings: Settings = Settings("OX_FILES")
"""
Settings used by ``ox_files`` application, using key ``OX_FILES``.
"""
