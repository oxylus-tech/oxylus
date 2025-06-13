from pathlib import Path

from django.conf import settings
from django_tasks import task

from . import models
from .conf import ox_files_settings


@task()
def create_preview(file_uuid, force: bool = True):
    """Create file preview.

    :param file_uuid: file object id
    :param force: if True (default), create preview even if already present.
    :return a tuple of ``(created, preview_path)``.
    """
    obj = models.File.objects.get(uuid=file_uuid)
    if not force and obj.preview:
        return

    obj.file_size = Path(obj.file.path).stat().st_size

    processor = obj.get_processor()
    path = ox_files_settings.preview_to / f"{Path(obj.file.name).stem}.jpg"

    path.parent.mkdir(parents=True, exist_ok=True)
    created = processor.create_preview(Path(obj.file.path), path, ox_files_settings.THUMBNAIL_SIZE, force=True)
    if created:
        obj.preview.name = str(path.relative_to(settings.MEDIA_ROOT))
        obj.save()
    return created, str(path)
