# Tervlon Web — Next.js client (integration-ready)

The Tervlon client as a Next.js App Router project, structured so wiring it to the
live NestJS backend later is a config change, not a rewrite. **It runs fully on mock
data today** — no backend required — and flips to live with one env var.

This is the build-target realisation of §1 of `../PRODUCT_DESIGN_GUIDE.md`. The static
`../index.html` and `../landing.html` remain the frozen *visual* reference.

```bash
cp .env.example .env.local      # defaults to mock data
npm install
npm run dev                     # http://localhost:3000
```

- `/` — the coming-soon landing page (ported from `landing.html`).
- `/app/catalog` — scenarios via the data layer (mock today).
- `/app/runtime/demo` — the **contract-driven** runtime: the layout switches off
  `contract.layoutPriority`, and every action is gated on `enabled` / `disabledReason`.
  Use the switcher to preview all five `layoutPriority` states.

## The integration seams (what "ready" means)

Everything that touches the backend lives in `src/lib`, isolated and typed:

| Seam | File | What it does |
|---|---|---|
| **Env / mode** | `lib/env.ts` | `NEXT_PUBLIC_DATA_SOURCE` (`mock` \| `live`) + API base URL. |
| **Auth fetch wrapper** | `lib/api/client.ts` | Injects the bearer, on 401 runs one silent `/auth/refresh` and retries once. Every live call goes through `request()`. |
| **Action gate** | `lib/api/runAction.ts` | The backend is action-driven: reads `{ method, url, enabled, disabledReason }` and calls it. Route every mutation through here — never compute permissions client-side. |
| **Endpoints** | `lib/api/endpoints.ts` | Every backend path in one typed place (verified against the controllers). |
| **Data source** | `lib/api/dataSource.ts` | The mock ⇄ live switch. Hooks call `api.*`; `mockApi` returns fixtures, `liveApi` calls `request()`. |
| **SSE** | `lib/sse/stream.ts` | Fetch-based reader (native `EventSource` can't send a bearer — the #1 mistake here). Tracks last-event-id; on reconnect → catch-up → refetch contract → repaint. |
| **Event tiers** | `lib/events/tiers.ts` | The loudness grammar. Only `STANDUP_INCOMING` interrupts; unknown types are `internal` and never rendered. |
| **Contract types** | `lib/types/runtime.ts` | `FrontendContract`, `layoutPriority`, the presenter, board/ticket/review shapes — mirrored from the backend so mock → live changes data, not types. |

`src/features/*` are the React Query hooks + components that consume those seams.
`src/mocks/*` are the fixtures (including a per-`layoutPriority` contract, the same idea
as the backend's `/frontend-contract/fixtures`).

## How to integrate (later, not now)

1. Set `NEXT_PUBLIC_DATA_SOURCE=live` and `NEXT_PUBLIC_API_BASE_URL` in `.env.local`.
2. Confirm CORS on the backend, or add the rewrite in `next.config.mjs` to proxy
   `/api/*` and keep cookies same-origin (cleanest for the SSE stream).
3. Sign in: store the access token via `setAccessToken()` and keep the refresh token
   in an httpOnly cookie. The wrapper and SSE reader pick it up automatically.
4. Flesh out `liveApi` in `dataSource.ts` for any endpoints not yet mapped (the paths
   are already in `endpoints.ts`).

No component or hook changes are required to switch backings — that's the point.

## Deliberately not built yet

This is the integration-ready skeleton plus the finished landing page and the
contract-driven runtime pattern end to end. The remaining app surfaces (full editor +
terminal, billing checkout, company/institution/admin) are **scaffolded by the same
pattern** — add a hook in `features/`, a fixture in `mocks/`, and a route. Follow the
execution priority order in `../PRODUCT_DESIGN_GUIDE.md` §5.
