from ox.router import Router
from . import views

__all__ = ("router",)

router = Router()
router.register(views)
