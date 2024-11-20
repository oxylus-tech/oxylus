from .base import *

print("\033[31m;*** ! Running with production settings ! ***\033[0m;")

DEBUG = False

ALLOWED_HOSTS = ["127.0.0.1:8042"]
DATABASES["default"] = DATABASES["prod"]


LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"

# TODO: secret_key
