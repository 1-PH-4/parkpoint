# ParkPoint — backend

FastAPI + PostgreSQL API for ParkPoint. Shared project rules (screens, language, git and PR workflow) are in the root `../CLAUDE.md`; read it first. The frontend (`../frontend/`, see its `CLAUDE.md`) uses mock data until this API is ready, so the shape of every response must match that mock data.

## Stack

- Python 3.12+, FastAPI, Uvicorn. Pydantic v2 for input and output schemas.
- SQLAlchemy 2.0 in **async** style (`asyncpg`, `Mapped[...]` models). Sessions come only from the `get_db` dependency.
- PostgreSQL with **PostGIS**, through GeoAlchemy2 (`Geography("POINT", srid=4326)`). Distances are in meters, queried with `ST_DWithin`. PostGIS order is `(longitude, latitude)`, Leaflet in the frontend uses `[latitude, longitude]`: never mix them up. Never send raw PostGIS values to the client; convert them to the agreed latitude and longitude fields.
- Alembic for migrations (async template).
- scikit-learn + joblib for the only AI feature: the suggested ideal price for a spot.
- pytest + httpx for tests, ruff for lint.
- API: every route lives under `/api` (for example `GET /api/health` returns `{"status": "ok"}`). Field names are `snake_case`. Prices are **numbers** in JSON (Pydantic v2 sends `Decimal` as a string, so use `float` in response schemas). Dates and times are ISO 8601, timezone-aware, in UTC. Agree the JSON shape with the frontend owner before building on it, and match the mock data in `../frontend/src/api/mock/`. Do not guess field names.
- The API never returns Slovak text. UI text lives in the frontend; errors are English messages or codes.
- No authentication in the prototype: no login, tokens or password handling. Where an owner or renter is needed, use one fixed demo user. No real payment code either: payments in the app are mock data.
- Settings come only from `app/core/config.py`. The shared `.env` lives in the repo root, not in `backend/`, so the settings class uses `env_file="../.env"` and the server is started from `backend/`. Never hard-code secrets, URLs or keys.
- CORS: allow `http://localhost:5173` and the production frontend address from settings. Never `*`.
- Approved dependencies: `fastapi`, `uvicorn[standard]`, `sqlalchemy`, `asyncpg`, `alembic`, `pydantic-settings`, `geoalchemy2`, `scikit-learn`, `joblib`, `pytest`, `httpx`, `ruff`. Do NOT add any other dependency without asking first.

## Project structure

```
backend/
  app/
    main.py       creates the app, CORS, includes routers, loads the ML model at startup
    api/
      deps.py     shared dependencies (get_db)
      routes/     one thin file per resource: spots.py, bookings.py, ...
    core/         config.py (settings)
    db/           base.py, session.py, seed.py (demo data)
    models/       SQLAlchemy models
    schemas/      Pydantic schemas (SpotCreate, SpotRead, ...)
    services/     business logic and database queries (nearby search, bookings, price suggestion)
    ml/           train.py, predict.py, model.joblib
    tests/
  alembic/        migrations (alembic.ini is in backend/)
  requirements.txt
```

Where does new code go? A route only reads the request, calls a service, and returns a schema: it goes to `api/routes/`. Anything that decides something or queries the database goes to `services/`. A table goes to `models/`, with a migration. The JSON shape goes to `schemas/`. Anything about the price model stays in `ml/`.

## Code rules

- Routes are thin. No business logic and no database queries inside route functions.
- Use separate schemas for input and output. Never return SQLAlchemy objects or password-like fields; always return a schema.
- Use `async def` for routes and services that touch the database. Add type hints.
- Raise `HTTPException` with the right status (404 not found, 400 or 422 invalid input). Do not swallow errors silently.
- Use `logging`, not `print`.
- Prefer the simplest solution that works. No clever abstractions, no premature optimization. If a file grows past ~150 lines, propose a split.
- Every new route gets tests: at least one success case and one error case. Tests must not touch the developer's real data: use a separate test database or a mocked session.
- Keep `requirements.txt` in sync with what the code imports. CI installs from it.

## Database

- Every schema change is an Alembic migration. Never use `create_all`, and never change tables by hand.
- Create migrations with `alembic revision --autogenerate -m "..."`, then **read** the file before keeping it (autogenerate misses things, especially PostGIS columns and indexes).
- Never edit a migration that is already merged: create a new one.
- The first migration enables PostGIS: `CREATE EXTENSION IF NOT EXISTS postgis`.
- Add a spatial index to every geography column used for searching.
- Prices are `Numeric(8, 2)` in the database.
- Local database: Docker Compose service `db` (`docker compose up -d db` from the repo root). Never run `docker compose down -v` or delete data without asking first.
- `app/db/seed.py` fills the database with demo spots, so everyone's map has data.

## AI (price suggestion only)

- Train offline with `ml/train.py`. The app loads `model.joblib` once at startup (in the lifespan function), never per request.
- Keep the model file small (a few MB) and never commit real personal data.
- Until a trained model exists, the price suggestion endpoint returns a simple rule-based price in the final response shape, so the frontend can already use it.
- Out of scope: parking-availability prediction and data collection.

## Workflow

- Commands (run inside `backend/` with the `.venv` active): `pip install -r requirements.txt`, `uvicorn app.main:app --reload`, `ruff check .`, `python -m pytest`, `alembic upgrade head`. API docs: http://127.0.0.1:8000/docs
- CI runs `ruff check .` and `python -m pytest` on every pull request, so both must pass. Render starts the app with `uvicorn app.main:app --host 0.0.0.0 --port $PORT` and runs `alembic upgrade head` on deploy.
- Before saying a task is done: run `ruff check .` and `python -m pytest`, check a changed route on the `/docs` page, and report what you checked. If you changed a model, confirm that the migration exists and `alembic upgrade head` works.
- Changes to models and migrations need review from the database owner, changes to `ml/` from the AI owner.
- Git and PR rules are in the root `../CLAUDE.md`.
