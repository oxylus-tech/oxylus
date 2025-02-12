from pathlib import Path
import os
import sys
import django

sys.path.insert(0, str(Path("..", "..").resolve()))
os.environ["DJANGO_SETTINGS_MODULE"] = "ox.settings.dev"
django.setup()

# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "Oxylus"
copyright = "2024, Thomas"
author = "Thomas"
release = "1.0"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "sphinx.ext.todo",
    "sphinx.ext.viewcode",
    "sphinx.ext.autodoc",
    "sphinx.ext.autosummary",
    "sphinx_autodoc_typehints",
    "sphinx_rtd_theme",
    "sphinx_js",
]

templates_path = ["_templates"]
exclude_patterns = []

root_doc = "index"

# --- js doc
js_language = "typescript"
js_source_path = "../js/"


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

# html_theme = 'alabaster'
html_theme = "sphinx_rtd_theme"
html_static_path = ["_static"]

suppress_warnings = ["misc.highlighting_failure"]
