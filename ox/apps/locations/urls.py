from django.urls import path
from rest_framework.routers import DefaultRouter

from ox.core.views import UserAppView
from . import panels, views


router = DefaultRouter()
router.register("country", views.CountryViewSet)
router.register("currency", views.CurrencyViewSet)

api_urls = router.urls


urls = [
    path(
        "",
        UserAppView.as_view(
            default_panel="countries",
            panels=panels.panels,
        ),
        name="index",
    ),
]
