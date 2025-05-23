from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register("country", views.CountryViewSet)
router.register("currency", views.CurrencyViewSet)

api_urls = router.urls


urls = [
    path("", views.AppView.as_view(), name="index"),
]
