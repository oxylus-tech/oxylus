from pathlib import Path

from django.conf import settings
from ox.core import conf


class Settings(conf.Settings):
    UPLOAD_DIR = "odir/uploads"
    """ Subdirectory in media where to upload files. """
    PREVIEW_DIR = "ox_files/previews"
    """ Directory in which to save previews. """
    SYNC_DIR = "ox_files/store"
    """
    Base directory in which unobfuscated files and folder are synchronized.

    By default uploaded files names and directories are obfuscated on file system. There might however be some cases with wan't them to be synchronized with it.

    This settings defines the root directory for thoses folders and files, in order to
    synchronize with external tools (eg. FTP).
    """

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
    THUMBNAIL_SIZE = (600, 800)
    """ Size for thumbnails """

    PROCESSORS = [
        "ox.apps.files.processors.ImageProcessor",
        "ox.apps.files.processors.PDFProcessor",
        "ox.apps.files.processors.LibreOfficeProcessor",
    ]
    """ List of file processors. """

    @property
    def upload_dir(self) -> Path:
        """Return full path to upload dir"""
        return Path(settings.MEDIA_ROOT) / self.UPLOAD_DIR

    @property
    def preview_dir(self) -> Path:
        """Return full path to preview dir"""
        return Path(settings.MEDIA_ROOT) / self.PREVIEW_DIR

    @property
    def sync_dir(self) -> Path:
        return Path(settings.MEDIA_ROOT) / self.SYNC_DIR


ox_files_settings: Settings = Settings("OX_FILES")
"""
Settings used by ``ox_content`` application, using key ``OX_CONTENT``.
"""
