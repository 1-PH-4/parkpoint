# ParkPoint: Copilot instructions

ParkPoint is a peer-to-peer marketplace for renting private and company parking spots in Košice, Slovakia. It is a mobile-first web app, to be wrapped later with Capacitor for Google Play. Current goal: a high-quality prototype for the LAB IT Creativity competition (half-year presentation in February, finals in June). A team of 7 works in parallel, so consistency matters more than cleverness. The developers are beginners: write simple, readable code and briefly explain what you changed.

## Repository

- Monorepo: `frontend/` (React web app) and `backend/` (FastAPI + PostgreSQL).
- Inside `frontend/` or `backend/`, also follow the `CLAUDE.md` in that folder. If it differs from this file, the folder file wins.
- Until the backend is ready, the frontend uses mock data. The API shape (field names, price as a number, ISO dates) is agreed between frontend and backend before either side builds on it. Never guess field names; ask.

## Scope

- Bottom navigation has exactly 3 tabs: Map (home: map with price pins and a bottom sheet; tapping a pin opens Spot detail), Bookings (current, upcoming, past), Profile (a long list that opens sub-screens).
- Adding a spot lives under Profile > My spots. There the app suggests an ideal price. This is the only AI feature.
- Out of scope: parking-availability prediction and data collection, business and legal topics.
- For the February demo: build Map, Spot detail and Bookings for real. From Profile build the list plus 2-3 sub-screens; the rest uses mock data.

## Language

- Code, comments, identifiers, docs and prompts: English.
- Commit messages and pull request descriptions: Slovak, following `.github/pull_request_template.md`. Example commit message: "Pridaj komponent karty miesta".
- UI text is Slovak and lives in one dictionary file in the frontend, never inline in components.

## Git and secrets

- One feature per branch (`feature/...`), small commits, short imperative Slovak messages. Never push to `main`; every change goes through a pull request.
- Never put secrets in code. Use `.env` and `.env.example`. Anything a browser can read (variables starting with `VITE_`) is public.

## How to write code

General:
- Match the style of the file you edit. Do not rename or reformat things that are not part of the task.
- Use small functions and components. Do not introduce clever abstractions or patterns the team has not already used.
- Change one thing at a time and say how to check that it works.
- Do not add a dependency without saying why. Add it to `requirements.txt` or `package.json`.
- Ask first before deleting files or data, changing the database schema or an API response, or touching `.github/`, deployment settings or `.env` files.
- Never ask for or print secrets or the content of `.env`.

Frontend:
- Use functional components and mobile-first layouts: design for a phone screen first, with big touch targets. Every data fetch needs a loading state and an error state.
- Add new UI text to the Slovak dictionary file and use its key. Never write Slovak strings inline.
- Keep mock data in one place, with the same shape as the agreed API, so switching to the real API is one change.
- Map: Leaflet uses [latitude, longitude]; PostGIS uses (longitude, latitude). Check the order every time.

Backend:
- Keep routes thin and put logic in services. Validate input and output with Pydantic schemas; never return raw database objects.
- Every database change is a migration. Never edit a migration that is already merged.
- Add at least one test for every new route.

Helping beginners:
- When you tell someone to run a command, say which folder to run it in. When you tell them to create a file, say in which folder and with which exact name.
- Suggest commit messages and pull request descriptions in Slovak.
- Before you say a task is done, run the lint and the tests (the commands are in the `CLAUDE.md` of the folder you work in).
