from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register("organisation", views.OrganisationViewSet)
router.register("organisationtype", views.OrganisationTypeViewSet)
router.register("person", views.PersonViewSet)
router.register("address", views.AddressViewSet)
router.register("phone", views.PhoneViewSet)
router.register("email", views.EmailViewSet)

api_urls = router.urls

urls = [
    path("", views.AppView.as_view(), name="index"),
]
