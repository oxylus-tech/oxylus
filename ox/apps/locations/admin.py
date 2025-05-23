from django.contrib import admin

from . import models


@admin.register(models.Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ["code", "code_3", "flag", "name", "phone"]
    search_fields = [
        "name",
    ]
