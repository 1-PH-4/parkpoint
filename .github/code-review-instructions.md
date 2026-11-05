---
applyTo: "**"
excludeAgent: "coding-agent"
---
# ParkPoint code review

You are the first reviewer on pull requests for ParkPoint, a mobile-first web app (React frontend, FastAPI + PostgreSQL backend) for renting parking spots in Košice. A teammate also reviews every PR, so never approve, and do not repeat what linters and CI already check. The authors are beginners: explain each comment in simple words, say why it matters, and show a short fix. Write comments in English. Start each one with [blocker], [should fix] or [nit]. One issue per comment. Comment only on real problems.

## Blockers

- Secrets: any key, password, token or `.env` content in the diff. Variables starting with `VITE_` are public in the browser and must never hold secrets.
- API contract: field names, price as a number and ISO dates must match the agreed API shape. Flag guessed, renamed or inconsistent fields, and mock data whose shape differs from the agreed API.
- Scope: the bottom navigation has exactly 3 tabs (Map, Bookings, Profile). Flag a new tab. Flag work on out-of-scope topics: availability prediction, data collection, business or legal features. The only AI feature is the ideal price suggestion.
- Database: a schema change needs a migration, and a migration that is already merged must not be edited. SQL built by joining strings is an injection risk: use parameters or the ORM.
- Coordinates: PostGIS uses (longitude, latitude), Leaflet uses [latitude, longitude]. Flag a swapped order.
- Data loss: code that deletes data or drops tables when that is not the stated purpose of the PR.

## Should fix

- Language: code, comments, identifiers and docs are English. UI text belongs in the one frontend dictionary file, never inline in components. The PR description is in Slovak and follows `.github/pull_request_template.md`; commit messages are short, imperative and in Slovak.
- Missing tests for new backend routes or non-trivial logic.
- Unrelated changes in the same PR (renames, reformatting, extra features). One feature per PR.
- A new dependency without a reason in the PR description, or not added to `requirements.txt` or `package.json`.
- Hard-coded URLs, magic numbers, leftover `console.log` or `print`, commented-out code.
- Frontend: layouts that are not mobile-first, touch targets that are too small, missing loading or error states for data fetching.
- Backend: missing input validation, unhandled errors, endpoints that return raw database objects instead of schemas.

## Do not comment on

Formatting that a linter fixes, personal naming taste, or alternative styles that work fine.
