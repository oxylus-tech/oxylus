"""
This module provides assets management and integration into django apps.

Each :py:class:`~.base.Asset` represent an npm package to use as static. They
are regrouped under the :py:class:`~.base.Assets` class that represent the
current django application's frontend requirements.

It provides the following features:

    - attach ``Assets`` to an ``AppConfig`` using :py:class:`ox.utils.functional.Owned`;
    - Provide a list of assets to include in the application template;
    - Provide an import map object that will map the provided dependencies to the
      corresponding files;
    - It allows to integrate theses dependencies as static using the :py:class:`~.finders.AssetsFinder`.

By technical convention, Oxylus only handles building Vue based Vite.js projects.
However it allows to run other frameworks.
"""

from .base import Asset, Assets


__all__ = (
    "Asset",
    "Assets",
)
