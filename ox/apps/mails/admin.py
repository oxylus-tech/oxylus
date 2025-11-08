from django.contrib import admin

from . import models


@admin.register(models.MailAccount)
class MailAccountAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Mail)
class MailAdmin(admin.ModelAdmin):
    pass
