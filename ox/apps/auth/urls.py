from django.urls import path

from . import views

urls = [
    path("", views.AppView.as_view(), name="index"),
    #   path("api/", include((api, "ox_auth"), namespace="api")),
]
