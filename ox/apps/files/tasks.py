from pathlib import Path

from django.conf import settings
from django_tasks import task

from . import models
from .models.file import get_obfuscated_path
from .conf import ox_files_settings


@task()
def create_preview(uuid, force: bool = True):
    """Create file preview.

    :param uuid: file object id
    :param force: if True (default), create preview even if already present.
    :return a tuple of ``(created, preview_path)``.
    """
    obj = models.File.objects.get(uuid=uuid)
    if not force and obj.preview:
        return

    # delete preview if exists
    if obj.preview:
        obj.preview.delete()

    obj.file_size = Path(obj.file.path).stat().st_size
    processor = obj.get_processor()

    # looping should not happen often, but we never know...
    path = None
    while not path or path.exists():
        path = ox_files_settings.preview_dir / get_obfuscated_path("jpg")
    path.parent.mkdir(parents=True, exist_ok=True)
    created = processor.create_preview(Path(obj.file.path), path, ox_files_settings.THUMBNAIL_SIZE, force=True)
    if created:
        obj.preview.name = str(path.relative_to(settings.MEDIA_ROOT))
        obj.save()
    return created, str(path)
