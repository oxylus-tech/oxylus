from pathlib import Path

from django.conf import settings
from ox.core import conf


class Settings(conf.Settings):
    UPLOAD_TO = "uploads"
    """ Subdirectory in media where to upload files. """
    PREVIEW_TO = "previews"
    """ Directory in which to save previews. """

    FILE_SIZE_LIMIT = 15 * 1024 * 1024
    """ Set maximum file size. """

    PREVIEW_ON_SAVE = True
    """ If True, preview is created when model is saved.

    Otherwise it will be handled by task manager.
    """

    CLEAR_FILES_ON_DELETE = True
    """ When a File is deleted from database, remove it from storage. """

    MAGIC_BUFFER = 2048
    """ Buffer size used by Python-Magic to read mime types. """
    THUMBNAIL_SIZE = (400, 400)
    """ Size for thumbnails """

    @property
    def upload_to(self) -> Path:
        """Return full path to upload dir"""
        return Path(settings.MEDIA_ROOT) / self.UPLOAD_TO

    @property
    def preview_to(self) -> Path:
        """Return full path to preview dir"""
        return Path(settings.MEDIA_ROOT) / self.PREVIEW_TO


ox_files_settings: Settings = Settings("OX_FILES")
"""
Settings used by ``ox_content`` application, using key ``OX_CONTENT``.
"""
