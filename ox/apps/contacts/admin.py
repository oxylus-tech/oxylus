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


@admin.register(models.ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Organisation)
class OrganisationAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Person)
class PersonAdmin(admin.ModelAdmin):
    pass
