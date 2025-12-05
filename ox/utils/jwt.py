import jwt
from django.conf import settings


__all__ = ("encode", "decode")


def encode(payload, headers=None, json_encoder=None):
    """
    Simple wrapper around pyjwt's encode, using configured key and HS256
    algorithm.
    """
    return jwt.encode(payload, settings.JWT_KEY, headers=headers, json_encoder=json_encoder)


def decode(jwt: str, **kwargs) -> dict:
    """
    Simple wrapper around pyjwt's decode, using configured key (and fallback keys).

    It will try to run over all keys provided by ``JWT_KEY`` and ``JWT_KEY_FALLBACKS``
    settings. If none succeed, will re-raise error that happened on the decoding using ``JWT_KEY``.

    :param jwt: the token to be decoded.
    :param **kwargs: extra parameters to pass to ``jwt.decode``.
    """
    keys = [settings.JWT_KEY, *settings.JWT_KEY_FALLBACKS]
    error = None

    for key in keys:
        try:
            return jwt.decode(jwt, key, **kwargs)
        except Exception as err:
            if error is None:
                error = err

    raise error
