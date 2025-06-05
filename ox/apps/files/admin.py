from django.contrib import admin

from . import models


@admin.register(models.Folder)
class FolderAdmin(admin.ModelAdmin):
    pass


@admin.register(models.File)
class FileAdmin(admin.ModelAdmin):
    pass
