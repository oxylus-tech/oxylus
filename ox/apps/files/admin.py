from django.contrib import admin

from . import models


@admin.register(models.Folder)
class FolderAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Folder.Access)
class FolderAccessAdmin(admin.ModelAdmin):
    pass


@admin.register(models.FolderComment)
class FolderCommentAdmin(admin.ModelAdmin):
    pass


@admin.register(models.File)
class FileAdmin(admin.ModelAdmin):
    pass


@admin.register(models.File.Access)
class FileAccessAdmin(admin.ModelAdmin):
    pass


@admin.register(models.FileComment)
class FileCommentAdmin(admin.ModelAdmin):
    pass
