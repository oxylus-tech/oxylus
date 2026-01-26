ox.apps.content
===============

This application provides basis to allow content edition for different kind of media.

It allows user to edit rich text, ensuring input sanitization. The rich text content may
also contains custom blocks as defined by :py:class:`.blocks.DynamicBlock`. Those are translated in Django template code.

So what does it provides?

- RichTextField (for models and serializers);
- Renderer that containerize user's django templates;
- Dynamic blocks that can be reused by user for rich text edition (such as variable, conditional variables);
- Messages: basic models, serializers, views and components for creating messages.

It is planned later to also add support for template packs (eg. for CMS).



Models
------

.. automodule:: ox.apps.content.models
   :show-inheritance:
   :members:


ox.apps.content.apps
--------------------

.. automodule:: ox.apps.content.apps
   :show-inheritance:
   :members:

ox.apps.content.conf
--------------------

.. automodule:: ox.apps.content.conf
   :show-inheritance:
   :members:

ox.apps.content.mixins
----------------------

.. automodule:: ox.apps.content.mixins
   :show-inheritance:
   :members:

ox.apps.content.renderers
-------------------------

.. automodule:: ox.apps.content.renderers
   :show-inheritance:
   :members:

ox.apps.content.serializers
---------------------------

.. automodule:: ox.apps.content.serializers
   :show-inheritance:
   :members:
