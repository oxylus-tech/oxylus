from pathlib import Path

from django.conf import settings
from django_tasks import task

from . import models
from .conf import ox_files_settings


@task()
def create_preview(file_id, force: bool = True):
    """Create file preview"""
    file = models.File.objects.get(uuid=file_id)
    if not force and file.preview:
        return

    file.file_size = Path(file.file.path).stat().st_size

    processor = file.get_processor()
    path = ox_files_settings.preview_to / f"{Path(file.file.name).stem}.jpg"

    path.parent.mkdir(parents=True, exist_ok=True)
    created = processor.create_preview(Path(file.file.path), path, ox_files_settings.THUMBNAIL_SIZE, force=True)
    if created:
        file.preview.name = str(path.relative_to(settings.MEDIA_ROOT))
        file.save()
    return created, str(path)
