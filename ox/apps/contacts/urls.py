from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register("organisation", views.OrganisationViewSet, basename="organisation")
router.register("person", views.PersonViewSet, basename="person")
router.register("address", views.AddressViewSet, basename="address")

api_urls = router.urls

urls = [
    path("", views.AppView.as_view(), name="index"),
    #   path("api/", include((api, "ox_auth"), namespace="api")),
]
