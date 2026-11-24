# ParkPoint

P2P marketplace for renting private and company parking spots in Košice, Slovakia. Student project for the LAB IT Creativity competition 2026/27.

## Structure

```
backend/     FastAPI + PostgreSQL (PostGIS)
frontend/    React web app (JavaScript, Tailwind 4, Leaflet)
.github/     CI, PR template, CODEOWNERS, Copilot instructions
docs/                specification, setup guide, team
docker-compose.yml   local database
```

## Run locally

1. Copy `.env.example` to `.env` in the repo root and fill in the values (never commit `.env`).
2. Database: `docker compose up -d db`
3. Backend, from `backend/`: `pip install -r requirements.txt`, then `uvicorn app.main:app --reload`. Health check: http://localhost:8000/api/health
4. Frontend, from `frontend/`: `npm install`, then `npm run dev`. App: http://localhost:5173

## Docs

- `docs/specification.md`: what the product does (screens, rules, user flows). Describes the final product, the MVP is not defined yet.
- `frontend/design.md`: visual design (colors, type, components, states).
- `CLAUDE.md`: shared team rules (language, git and PR workflow). `frontend/CLAUDE.md` and `backend/CLAUDE.md` add the rules for each part.
- `docs/SETUP.md`: first-time setup for new team members.
- `docs/TEAM.md`: team members.
