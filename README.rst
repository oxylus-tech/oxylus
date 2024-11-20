# Oxylus

Django-based back-office framework. It aims to provide a basic set of applications and to be runnable as a standalone application.

This project is distributed under GPL-3.0-or-later license.


## Build project
### Python
Build uses [Poetry](https://python-poetry.org).

```
poetry install
poetry build
```

Running commands inside virtual environment prefix it with `poetry run`.


### Assets
Build uses [Vite](https://vitejs.dev/). From assets' package directory, run:

```
npm run build # or watch
```

Files are generated inside Django application's static directory.


## Practices and conventions
Here are conventions and practices we want for this project.

### Root principles
**Regardless who you are or define yourself, you have the right to be fully respected**, as we all are at first humans. It implies that pricks are not welcome here.

**Stick to PEPs and good development practices**. This including:
- pytest as much as possible;
- pre-commit code quality;
- CI/CD tests before merge;
- documentation must be provided, docstring and README provided. It should be succint but complete, including conventions, eventually code organisation, and usage;
- avoid to reinvent the wheel except when it is *really* necessary;
- avoid boilerplate, reuse code -- but don't over-generalize by using monolithic code: this induce technical debt as particular cases arise in usage and makes it hard to extend usage. In short: modularity is the way;

**KISS** is the way, remember it at each step of the conception and usage. Avoid to dive in the deep waters of hacky-dirty design and code -- you'll loose important parts of your life and health;

*Remember that code is easy to write, but is even more easy to get dirty. Good design and workflow are necessary as they avoid tons of problems. Providing projects is not a sprint, but a marathon -- a long harcheous journey between development, testing, quality assesment, production usage and debugging.*


### Code quality
- build tools:
    - python: poetry is the way;
    - assets: vitejs is the way;
- modularity should be clean in usage:
    - extensibility should allow declarative subclassing, using class or instance attributes: this reduces code boilerplate;
    - clear separation of concerns and scope for each (sub-)class, including what should be at a class or instance level;
- performances:
    - optimize by design, don't over-optimize;
    - batch operation as much as possible, without implying dirty and unreadable code;
- multi-files modules will only expose public interfaces and classes in their `__init__.py` file;
- when using external libraries, ensure that:
    - project well organised and coded;
    - project is active and won't die anytime soon if not yet dead;
    - maintainers are reactive and a community is behind them;
    - licenses matches;
    - regardless whoever they are, people are respected;

Regarding to Django specific conventions:
- translation MUST be integrated;
- views and templates:
    - exploit the extensibility of Django templates;
- assets code should be clean: use of modern build systems in order to generate it;
- one use case/scope per application, which must be well defined;
- `QuerySet` should be used to provide batch db helpers;


### Project structure

The project is structured as follow:
- `oxerp/`: application project instance and common tools, such as routers, utility function and classes to be used by applications and project;
    - `settings/`: Django settings files (`dev`, `test`, `prod`)
    - `utils/`: utility classes and functions;
    - `apps/`: common Django applications of oxerp
        - `base/`: base application models, views, filters, templates, assets, etc.
        - `auth/`: users, groups and permissions management interfaces and tools;
- `scripts/`: development and production scripts, cookiecutter templates, etc;

Each application is structured as a regular Django application using tools such as `rest-framework` or `django-filter`, and with the expected peculiarities:

- `assets/`, `statics/` (source and dist directory): assets are vite-js projects;
- `controllers/`: it clears separate concerns between commands and the controllers they may require;
- `models`, `views`: one file for each model, in order to have clean and short modules content.;
- `filters`, `serializers`, `forms`, `permissions`: when they are mostly declarative, we keep them as single-file modules;
- `urls`: discovered at project init, provides `router` instance used to generate urls;
