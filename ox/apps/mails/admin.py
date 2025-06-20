from django.contrib import admin

from . import models


@admin.register(models.MailAccount)
class MailAccountAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MailTemplate)
class MailTemplateAdmin(admin.ModelAdmin):
    pass


@admin.register(models.SendMail)
class SendMailAdmin(admin.ModelAdmin):
    pass
