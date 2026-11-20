# ParkPoint — frontend

React web app for ParkPoint. Shared project rules (screens, language, git and PR workflow) are in the root `../CLAUDE.md`; read it first. The backend (FastAPI + PostgreSQL) is built separately; until it is ready, the frontend uses mock data.

## Stack

- React + Vite, **plain JavaScript** (`.jsx` / `.js`, no TypeScript; the Vite template is `react`, not `react-ts`). No `tsc` in the build.
- Tailwind CSS **4** with the Vite plugin `@tailwindcss/vite`. There is no `tailwind.config.js`; theme values live in `src/index.css`.
- React Router for navigation
- react-leaflet + OpenStreetMap tiles for the map. Import `leaflet/dist/leaflet.css` once in `src/main.jsx`, fix the default marker icons (Vite breaks their paths), and remember Leaflet wants `[latitude, longitude]`. Default map center is Košice, `[48.7164, 21.2611]`. Use `100dvh`, not `100vh`, for full-height maps. The app stays a web app wrapped with Capacitor, so Leaflet stays; if it ever becomes React Native, the map must be replaced (react-leaflet does not run there).
- No Google API key and no Google API calls until the team decides which Google API is needed and why (each has separate billing and key restrictions). Navigation to a spot is a plain Google Maps or Waze link and needs no key. Anything starting with `VITE_` is public in the browser, so never put a secret in it.
- `fetch` for API calls (no axios, no TanStack Query yet)
- Backend API: every route lives under `/api` (for example `GET /api/health`). The base URL comes from `VITE_API_URL`. In development, forward `/api` to the FastAPI server with `server.proxy` in `vite.config.js` instead of fighting CORS. Field names in API data are `snake_case` (FastAPI default); mock data uses the same names, so switching from mock to real is one change inside `src/api/`. Agree the JSON shape with the API owner before building on it.
- The shared `.env` file lives in the repo root, not in `frontend/`. `vite.config.js` therefore sets `envDir:'..'`. Only variables starting with `VITE_` reach the browser.
- Approved dependencies: `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`, `leaflet`, `react-leaflet`. Do NOT add any other dependency without asking first.

## Project structure

```
frontend/
  src/
    api/          all backend calls live here; mock data in api/mock/
    components/   generic reusable UI with no ParkPoint logic (Button, Chip, Input, ListRow, ...)
    features/     one folder per domain area (map, spots, bookings, profile); holds that feature's components and hooks
    pages/        one thin file per route; composes features and components
    hooks/        custom hooks shared by more than one feature (useSpots, useAuth, ...)
    lib/          small pure helpers (formatPrice, distance, strings.js, ...)
    assets/       logo, images
```

Where does a new file go? If it knows nothing about parking (a button), it goes to `components/`. If it is specific to one area (the map, a booking card), it goes to `features/<area>/`. If it is a whole screen reached by a URL, it goes to `pages/` and stays thin. Shared hooks go to `hooks/`, a hook used by one feature stays in that feature's folder.

## Code rules

- Components are small and do one thing. If a file grows past ~150 lines, propose a split.
- Prefer the simplest solution that works. No clever abstractions, no premature optimization.
- No API calls or business logic inside JSX components: put them in `api/` and `hooks/`.
- Every screen handles three states: loading, error, empty.
- Mobile-first. Build for 390px width first, then scale up. Check every screen at 390px.
- Semantic HTML, visible focus states, text contrast at least 4.5:1, touch targets at least 44px.
- UI text (Slovak) lives in one dictionary file, `src/lib/strings.js`, never inline in components.
- Prices are numbers in code and formatted in one helper (`lib/formatPrice`) as Slovak currency, e.g. `0,80 €` (use `Intl.NumberFormat('sk-SK', ...)`).
- Do not store anything important in localStorage.
- CI runs `npm ci` and `npm run build` on every pull request, so `package-lock.json` must be committed in sync with `package.json`, and the build must pass.

## Workflow

- Commands (run inside `frontend/`): `npm run dev`, `npm run build`, `npm run lint`
- Before saying a task is done: run lint and build, and report what you checked.
- Git and PR rules are in the root `../CLAUDE.md`.
