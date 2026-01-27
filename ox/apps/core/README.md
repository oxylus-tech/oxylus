# Oxerp Core

Oxerp core application


## Build project
### Python
Build uses [Poetry](https://python-poetry.org).

```sh
poetry install
poetry build
```

Running commands inside virtual environment prefix it with `poetry run`.


### Assets
Build uses [Vite](https://vitejs.dev/). From assets' package directory, run:

```sh
npm run build # or watch
```

Files are generated inside Django application's static directory.
