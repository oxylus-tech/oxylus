from pathlib import Path
from typing import Literal

from django.conf import settings
from ox.utils import conf


class Settings(conf.Settings):
    """Main settings for Oxylus."""

    PROTECTED_MEDIA_DIR = "protected/"
    """ Directory in media used for protected data. """
    PROTECTED_MEDIA_URL = "/protected/"
    """ Configured URL for protected media. MUST end with a ``/``. """

    HTTP_SERVER_BACKEND: Literal["nginx", "apache"] | None = None
    """ Running HTTP server (defaults to nginx on production).

    This settings also defines supported backends for different applications.
    """

    @property
    def protected_media_dir(self) -> Path:
        """Return full path to upload dir."""
        return Path(settings.MEDIA_ROOT) / self.PROTECTED_MEDIA_DIR

    def protected_media_url(self, path) -> str:
        """Return url for the protected media of provided path.

        :param path: path related to MEDIA_ROOT
        """
        relative_path = Path(path).relative_to(self.protected_media_dir)
        return f"{self.PROTECTED_MEDIA_URL}{relative_path}"


ox_settings: Settings = Settings("OX")
""" Main settings used by Oxylus, under key ``OX``. """
