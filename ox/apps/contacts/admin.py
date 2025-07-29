from django.contrib import admin

from . import models


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


@admin.register(models.OrganisationType)
class OrganisationTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "country", "name", "code")
    list_filters = ("country",)
    search_fields = ("name", "code")


@admin.register(models.Organisation)
class OrganisationAdmin(ContactAdmin):
    list_display = (
        "id",
        "name",
        "type",
    )


@admin.register(models.Person)
class PersonAdmin(ContactAdmin):
    pass


@admin.register(models.ContactList)
class ContactListAdmin(admin.ModelAdmin):
    list_display = ("name", "group", "organisation", "is_subscription")
