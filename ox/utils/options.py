"""This module provide class and instance based option API, similar to Django
Model's `Meta` one, with slight differences:

- it aims to be generic;
- there can be multiple ``Option`` classes (equivalent to ``Meta``);
- ``Option`` class instances can be instanciated at the parent class initialization or at instanciation;
- parent class or instanxe is provided at ``Option``'s instanciation;
"""
import inspect


__all__ = ("Options", "OptionsBase", "HasOptions", "WithOptions")


class Options:
    _owner = None
    """Parent class/instance owning Options."""

    def __init__(self, owner, **opts):
        self._owner = owner
        for k, v in opts.items():
            if not hasattr(self, k):
                raise ValueError(f"Trying to set attribute {k} while it is not declared on class {type(self)}.")
            setattr(self, k, v)


class OptionsBase(type):
    def __new__(mcls, name, bases, attrs):
        cls = super().__new__(mcls, name, bases, attrs)
        # mcls.merge_base_options(cls)
        mcls.init_options(cls, prefix="_")
        return cls

    #     @classmethod
    #     def merge_base_options(mcls, cls):
    #         """ Ensure all contained Option classes of ``cls`` inherits
    #         from ``cls``' parents Option. """
    #         bases = mcls.get_base_options(cls)
    #         for key, opts_list in bases.items():
    #             # case 1: both parent and child have declared Option: merge
    #             if opts := cls.__dict__.get(key):
    #                 try:
    #                     merge_bases(opts, opts_list)
    #                 except TypeError as err:
    #                     print(err)
    #                     breakpoint()
    #                     raise
    #             # case 2: child class did not declared Options: create
    #             # only relevant when multiple parents have the same option.
    #             elif len(opts_list) > 1:
    #                 opts = type(f"{cls.__name__}.{key}", opts_list, {})
    #                 setattr(cls, key, opts)
    #
    #         # (case 3: declared on child -> nothing to do)
    #
    #     @classmethod
    #     def get_base_options(mcls, cls_or_obj):
    #         """Get Options classes from cls_or_obj bases returned as
    #         `{"key": set(Option)}` dict."""
    #         options = {}
    #         for base in cls_or_obj.__bases__:
    #             for key, opts in mcls.get_options(base):
    #                 options.setdefault(key, set()).add(opts)
    #         return options

    @classmethod
    def get_options(mcls, cls_or_obj) -> dict[str, set]:
        if inspect.isclass(cls_or_obj):
            items = vars(cls_or_obj).items()
        else:
            items = ((k, getattr(cls_or_obj, k)) for k in dir(cls_or_obj))

        return tuple((k, v) for k, v in items if inspect.isclass(v) and issubclass(v, Options))

    @classmethod
    def init_options(mcls, cls_or_obj, prefix="", options=None):
        """Initialize all class' options.

        Assumes :py:func:`OptionsBase.merge_base_options` has been
        called on the actual class.
        """
        if options is None:
            options = mcls.get_options(cls_or_obj)

        for key, opts in options:
            setattr(cls_or_obj, f"{prefix}{key.lower()}", opts(cls_or_obj))


class HasOptions(metaclass=OptionsBase):
    """Class contains ``Option``s initialized at instanciation, with attribute
    named as ``optionclassname``. ``Option._owner`` is set to instance.

    **Note**: Discovered options are not cached which means that at
    each instanciation, they will be searched again.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        OptionsBase.init_options(self)


class WithOptionsBase(OptionsBase):
    """Initialize options at class creation."""

    def __new__(mcls, name, bases, attrs):
        cls = super().__new__(mcls, name, bases, attrs)
        # keep option list in memory in order
        mcls.init_options(cls, prefix="_")
        return cls


class WithOptions(metaclass=OptionsBase):
    """Class contains ``Option``s initialized at class creation, with class
    attribute named as ``_optionclassname``.

    ``Option._owner`` is set to class.
    """
