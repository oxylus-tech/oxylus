import logging

from .cli import fmt

__all__ = ("Logs", "logs")


class Logs:
    """Provide logging utilities."""

    logger = logging.getLogger("")
    """Logger used by the task in order to log informations."""

    _log_levels = {
        "out": (0, "", logging.INFO),
        "info": (34, "I", logging.INFO),
        "success": (92, "S", logging.INFO),
        "error": (91, "E", logging.ERROR),
        "warning": (33, "W", logging.WARNING),
    }

    def __init__(self, name):
        self.reset(name)

    def reset(self, name):
        self.logger = logging.getLogger(name)

    # ---- output
    def log(self, level, msg=None, *args, exc=None, pad=0, format=True, **kwargs):
        color, key, lev = self._log_levels[level]
        prefix = self.get_prefix(key)
        msg = fmt(f"{prefix}{msg}", level)
        print(msg, *args)

    def get_prefix(self, *prefixes):
        prefix = "".join(f"[{p}]" for p in prefixes if p)
        return prefix and f"{prefix} " or ""

    def out(self, *args, **kw):
        self.log("out", *args, **kw)

    def info(self, *a, **kw):
        self.log("info", *a, **kw)

    def success(self, *a, **kw):
        self.log("success", *a, **kw)

    def warn(self, *a, **kw):
        self.log("warning", *a, **kw)

    def err(self, *a, **kw):
        self.log("error", *a, **kw)


logs = Logs("oxylus")
