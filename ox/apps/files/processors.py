from __future__ import annotations
from pathlib import Path
from typing import IO

import magic
import PIL
from PIL import Image
from django.utils.translation import gettext_lazy as _


from .conf import ox_files_settings
from .exceptions import FileTypeError


__all__ = ("FileProcessor", "ImageProcessor", "FileProcessors", "registry")


class FileProcessor:
    """
    A Processor handles reading file metadata, providing preview among other things.
    """

    mime_types: set[str] = set()
    type = "file"
    display_type = _("File")

    def create_preview(self, path: Path, out: Path, force: bool = False) -> bool:
        """
        Create a preview for the file at provided path.

        :param path: path of the file to create a preview of
        :param out: output path to save preview
        :param force: create file even if it exists
        :return boolean indicating wether file has been created
        """
        if not force and out.exists():
            return False
        return self._create_preview(path, out)

    def _create_preview(self, path: Path, out: Path) -> bool:
        """
        To be implemented by processors: this is where the preview is actually
        created. Default implementation does not create preview.

        Same arguments and return than :py:meth:`create_preview`.
        """
        return False

    def get_metadata(self, path: Path) -> dict[str, str]:
        """Return file metadata.

        :param path: file path
        """
        return {}


class ImageProcessor(FileProcessor):
    mime_types = {
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
        "image/tiff",
        "image/x-ms-bmp",
        "image/x-pcx",
        "image/x-tga",
        "image/x-xbitmap",
        "image/x-xpixmap",
        "image/x-portable-pixmap",
        "image/x-portable-bitmap",
        "image/x-portable-graymap",
        "image/x-portable-anymap",
        "image/x-rgb",
        "image/x-icns",
        "image/vnd.microsoft.icon",
        "image/avif",
        "image/heif",
        "image/x-exr",
    }
    type = "image"
    display_type = _("Image")

    def _create_preview(self, path: Path, out: Path) -> bool:
        """
        Create thumbnail for the input image. Thumbnails are saved as JPEG images.

        :yield: :py:class:`.exceptions.FileTypeError` when file type is not supported.
        :yield: ``FileNotFound`` if file cannot be found
        """
        try:
            with Image.open(path) as im:
                im.thumbnail(ox_files_settings.THUMBNAIL_SIZE)
                im.save(out, "JPEG")
                return True
        except (PIL.UnidentifiedImageError, ValueError, TypeError):
            raise FileTypeError(f"File format invalid for {path}.")


class FileProcessors:
    """
    Registry of all file processor classes.

    This is used to determine file type and provide a processor based on it.
    """

    processors: list[FileProcessor] = None
    """ List of processors """
    default_processor = None
    """ Default processor to use when file type is not supported by any other processor.  """
    mime_types: dict[str, FileProcessor] = None
    """ Processors by mime type """

    def __init__(self, default_processor, processors: list[FileProcessor] = []):
        self.default_processor = default_processor
        self.mime_types = {}
        self.processors = []
        for processor in processors:
            self.register(processor)

    def register(self, processor: FileProcessor):
        """Register a new processor"""
        if not isinstance(processor, FileProcessor):
            raise TypeError("processor is not a subclass `FileProcessor`.")

        self.processors.append(processor)
        self.mime_types.update((mt, processor) for mt in processor.mime_types)

    def read_mime_type(self, file_or_stream: Path | str | IO) -> str:
        """Return mime type for the provided file or stream."""
        if isinstance(file_or_stream, (str, Path)):
            return magic.from_file(file_or_stream, mime=True)

        buffer = file_or_stream.read(ox_files_settings.MAGIC_BUFFER)
        return magic.from_buffer(buffer, mime=True)

    def get(self, mime_type: str) -> FileProcessor | None:
        """Return processor for the provided mime type."""
        return self.mime_types.get(mime_type, self.default_processor)


registry = FileProcessors(FileProcessor(), [ImageProcessor()])
""" This is the default Processors instance used for processing objects. """
