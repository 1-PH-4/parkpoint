# ParkPoint

P2P marketplace for renting private and company parking spots in Košice (Slovakia). Web app, mobile-first, to be wrapped later with Capacitor for Google Play. Current goal: a high-quality prototype for the LAB IT Creativity competition (half-year presentation in February 2027, finals in June). A team of 7 works in parallel, so consistency matters more than cleverness.

## Repository layout

One repository (monorepo):

```
CLAUDE.md          this file: shared rules for everyone
docs/              specification.md (screens, rules, user flows), SETUP.md, TEAM.md
frontend/          React web app (has its own CLAUDE.md and design.md)
backend/           FastAPI + PostgreSQL (has its own CLAUDE.md)
```

When you work inside `frontend/` or `backend/`, also follow the `CLAUDE.md` in that folder. Until the backend is ready, the frontend uses mock data. The API shape (field names, price as a number, ISO dates) is agreed between frontend and backend before either side builds on it; do not guess field names.

## Source of truth

- `docs/specification.md` describes the final product, not the MVP. The MVP scope is not defined yet; until it is, ask before building a screen or feature that looks big or risky. Read the spec before working on any screen or business rule.
- `frontend/design.md` is the single source of truth for everything visual.
- If code, spec and design disagree, do not choose silently: say so and ask.

## Product in short

One account, two modes: customer (search, book, pay) and owner (offer spots, get paid). Each mode has a bottom navigation with exactly 3 tabs, the middle one is the main tab:

- Customer: Bookings, Map (main), Profile.
- Owner: My spots, Overview (main), Profile.

Parking-availability prediction is not a tab. It is a layer on the map, switched on and off with the "Predikcia" button. Adding a spot is done in the owner mode (My spots); the app suggests an ideal price there.

Rules that affect every part of the code:

- Booking is instant, payment happens before entering the spot.
- Free cancellation is possible only until X minutes before the start (X is not decided yet, at least 5).
- The exact location of a spot is secret until payment. The entry code is secret until it is released (5 minutes before the start, or right after payment if paid later). Both are enforced by the server: the API must never send them earlier, and the frontend must never be trusted to hide them.
- Owners can block specific time windows of a spot, but not over confirmed reservations. This is different from pausing the whole listing.
- There is no two-factor authentication.

## Language

- Code, comments, identifiers, docs and prompts are in English.
- Commit messages and pull request descriptions are in Slovak without diacritics (for example "Pridany komponent karty miesta"). Commit messages do not have to be imperative. A pull request description is as short as possible and follows the team's template (`.github/pull_request_template.md`).
- The only Slovak inside the product is UI text, which lives in one dictionary file in the frontend, never inline in components.

## Git and pull requests

- One feature per branch (`feature/...`), small commits. Never push to `main`.
- Claude never commits or pushes unless the user says so.
- Every pull request is reviewed by one teammate. GitHub Copilot reviews too (it reads `.github/copilot-instructions.md` and `.github/code-review-instructions.md`, which should mirror the rules in the CLAUDE.md files). Copilot's review does not replace the human one.
- CI (`.github/workflows/ci.yml`) runs on every pull request and must be green before merge.
- Never commit secrets. Use `.env` and `.env.example`. Anything a browser can read (variables starting with `VITE_`) is public.
- Team process (roles, IDEs, branch protection, CODEOWNERS, deployment) is described in the handbook "ParkPoint: Team Repository Process and JetBrains Toolkit". If a rule here differs from it, ask the team instead of choosing silently.
