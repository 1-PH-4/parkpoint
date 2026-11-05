# ParkPoint

P2P marketplace for renting private and company parking spots in Košice (Slovakia). Web app, mobile-first, to be wrapped later with Capacitor for Google Play. Current goal: a high-quality prototype for the LAB IT Creativity competition (half-year presentation in February, finals in June). A team of 7 works in parallel, so consistency matters more than cleverness.

## Repository layout

One repository (monorepo):

```
CLAUDE.md          this file: shared rules for everyone
frontend/          React web app (has its own CLAUDE.md)
backend/           FastAPI + PostgreSQL (will have its own CLAUDE.md)
```

When you work inside `frontend/` or `backend/`, also follow the `CLAUDE.md` in that folder. Until the backend is ready, the frontend uses mock data. The API shape (field names, price as a number, ISO dates) is agreed between frontend and backend before either side builds on it; do not guess field names.

## Screens (scope)

Bottom navigation has exactly 3 tabs:
1. Map (home): map with price pins and a bottom sheet. Tapping a pin opens Spot detail.
2. Bookings: current, upcoming and past bookings.
3. Profile: a long list that opens sub-screens (payment methods, my spots, my cars, settings, ...). Adding a spot lives under Profile > My spots; there the app suggests an ideal price (the only AI feature for now).

Out of scope for now: parking-availability prediction and data collection, business and legal topics. For the February demo, build Map, Spot detail and Bookings for real; from Profile build the list plus 2-3 sub-screens, the rest with mock data.

## Language

- Code, comments, identifiers, docs and prompts are in English.
- Commit messages and pull request descriptions are in Slovak, following the team's PR template (`.github/pull_request_template.md`).
- The only Slovak inside the product is UI text, which lives in one dictionary file in the frontend, never inline in components.

## Git and pull requests

- One feature per branch (`feature/...`), small commits, short imperative Slovak messages ("Pridaj komponent karty miesta"). Never push to `main`.
- Every pull request is reviewed by one teammate. GitHub Copilot reviews too (it reads `.github/copilot-instructions.md`, which should mirror the rules in the CLAUDE.md files). Copilot's review does not replace the human one.
- CI (`.github/workflows/ci.yml`) runs on every pull request and must be green before merge.
- Never commit secrets. Use `.env` and `.env.example`. Anything a browser can read (variables starting with `VITE_`) is public.
- Team process (roles, IDEs, branch protection, CODEOWNERS, deployment) is described in the handbook "ParkPoint: Team Repository Process and JetBrains Toolkit". If a rule here differs from it, ask the team instead of choosing silently.
