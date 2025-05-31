from ox.core import conf


class Settings(conf.Settings):
    UPLOAD_TO = "uploads"
    """ Subdirectory in media where to upload files. """
    FILE_SIZE_LIMIT = 15 * 1024 * 1024
    """ Set maximum file size. """

    MAGIC_BUFFER = 2048
    """ Buffer size used by Python-Magic to read mime types. """

    THUMBNAIL_SIZE = (400, 400)
    """ Size for thumbnails """


ox_files_settings: Settings = Settings("OX_FILES")
"""
Settings used by ``ox_content`` application, using key ``OX_CONTENT``.
"""
