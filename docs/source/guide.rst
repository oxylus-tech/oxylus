Guide
=====

Oxylus is a regular Django project composed of multiple applications. For the frontend, we use the Vue framework combined with other tools.

This splits the technical stack in two different components:

- **Django application**: backend server, SSR, and API. SSR allows applications to extend user interface. We use ``django-rest-framework``, ``django-tasks``, ``dynaconf`` among other things.
- **Vue application**: frontend application, components, and user interaction. We use here a pnpm monorepo with ``vue``, ``vuetify``, ``pinia-orm``, ``@pinia-orm/axios``. The Oxylus packages are scoped under ``@oxylus``, the core library is ``@oxylus/ox``.

Oxylus provides the bases for integration between both parts, as application set up, user and permissions management, fetching data from server, standard layout for user's list/view/edition, etc.

The code is organised in order to keep coherency between both sides. Each side handles things its own ways (project buiding, testing, code documentation): this keeps bests practices on. However, we provide utilities in order to integrate frontend into backend (including assets management, see :ref:`guide-app-assets`).

*Note*: All oxylus libraries and modules use the abbreviation ``ox`` (as ``ox_core`` for core frontend libraries and AppConfig's label).


.. toctree::
   :maxdepth: 2
   :glob:
   :caption: Guide

   guide/*
