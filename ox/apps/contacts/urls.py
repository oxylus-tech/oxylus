from django.urls import path
from rest_framework.routers import DefaultRouter

from ox.core.views import UserAppView
from . import panels, views


router = DefaultRouter()
router.register("contact", views.ContactViewSet)
router.register("organisation", views.OrganisationViewSet)
router.register("person", views.PersonViewSet)
router.register("contactlist", views.ContactListViewSet)
router.register("organisationtype", views.OrganisationTypeViewSet)

api_urls = router.urls

urls = [
    path(
        "",
        UserAppView.as_view(
            default_panel="persons",
            panels=panels.panels,
        ),
        name="index",
    ),
]
