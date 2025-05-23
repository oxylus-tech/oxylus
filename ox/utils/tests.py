__all__ = ("Mock", "track_calls")


class Mock:
    """Provide a class to mock class and values."""

    def __init__(self, **attrs):
        self.__dict__.update(attrs)


def track_calls(obj, name):
    """
    Spoof object's method to keep track of its calls.

    :param obj: object to spoof method from
    :param name: method name
    :return a list in which calls will be stored. For each call: ``(args, kwargs)``.
    """
    calls = []
    setattr(obj, name, lambda *a, **kw: calls.append((a, kw)))
    return calls
