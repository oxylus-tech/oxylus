from django.contrib import admin

from . import models


@admin.register(models.Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ["code", "code_3", "flag", "name", "phone"]
    search_fields = [
        "name",
    ]


@admin.register(models.Address)
class AddressAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Email)
class EmailAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Phone)
class PhoneAdmin(admin.ModelAdmin):
    pass


class AddressInline(admin.TabularInline):
    model = models.Address


class EmailInline(admin.TabularInline):
    model = models.Email


class PhoneInline(admin.TabularInline):
    model = models.Phone


class ContactAdmin(admin.ModelAdmin):
    inlines = [
        EmailInline,
        PhoneInline,
        AddressInline,
    ]


@admin.register(models.Organisation)
class OrganisationAdmin(ContactAdmin):
    list_filters = ("book",)


@admin.register(models.Person)
class PersonAdmin(ContactAdmin):
    pass
