# Architecture — Stage 01

The goal of this stage is a foundation that later features can plug into
without rework. Three boundaries are fixed from day one: **presentation**,
**control plane**, and **persistence/runtime**.

## Request flow

```
Browser
  │  RSC payload / navigation
  ▼
src/app  (presentation: layouts, pages, components)
  │  fetch / form action
  ▼
src/app/api  (route handlers: validation, status codes, auth checks)
  │  typed calls only
  ▼
src/server  (config · auth · db · bots · integrations)
  │  adapter interfaces
  ▼
Postgres / auth provider / container runtime   ← not bound yet
```

Rules:

1. Components never import `src/server/*` or read `process.env` for secrets.
2. Server modules never import React or UI components.
3. Route handlers are thin: parse, authorize, call a service, shape a response.
4. Every module that touches the outside world sits behind an interface.

## Modules

### `src/server/config/env.ts`

- Reads environment variables once, trims empties to `null`.
- Exposes `capabilities.*()` so the UI can display **not configured** instead of
  inventing a green state.
- `assertConfigured()` throws with an actionable message at the call site, not
  at module load, keeping `next build` safe on a bare checkout.

### `src/server/db/index.ts`

- `DatabaseAdapter` — `healthCheck()` + parameterised `query<T>()`.
- `registerDatabaseAdapter()` binds a driver once at startup.
- `getDatabase()` explains exactly what is missing instead of returning a mock.

**To bind Postgres (Stage 02):** add a driver (e.g. Prisma or `pg`), implement
`DatabaseAdapter`, register it from an init module used by server code, add
migrations, and define workspace/bot/API-key tables with workspace-scoped
foreign keys and indexes.

### `src/server/auth/index.ts`

- `Session` is the only identity shape the app knows.
- `AuthProvider` covers `signIn`, `signOut`, `getSession`, `requireSession`.
- Without a provider, `getSession()` returns `null` and `requireSession()` throws.

**To bind auth (Stage 02):** implement the provider against the chosen vendor or
a credentials flow, set an HTTP-only, `Secure`, `SameSite=Lax` session cookie,
rotate `AUTH_SECRET`, add CSRF protection on mutating routes, and gate every
`(app)` route group in its layout.

### `src/server/bots/index.ts`

- `Bot` / `BotStatus` describe lifecycle, not implementation.
- `BotRepository` is workspace-scoped by signature — callers cannot list across
  tenants by accident.
- `BotRuntime` covers `start`, `stop`, `logs`; no process is started today.

**To bind the runtime (Stage 03):** implement a supervisor (container or
process), persist desired vs. observed state, stream logs to a bounded store,
and expose lifecycle endpoints that require a session plus workspace role.

### `src/server/integrations/index.ts`

- Connection records store a `credentialRef`, never a raw secret.
- Secrets belong in a KMS/secret manager; the database stores only references.

## Health endpoint

`GET /api/health` returns only facts the process can verify:

```json
{
  "service": "darknote-hosts",
  "status": "ok",
  "version": "0.1.0",
  "stage": "foundation",
  "checks": {
    "api": "ok",
    "database": "not_configured",
    "auth": "not_configured",
    "botRuntime": "not_configured"
  }
}
```

It calls `connection()` so it always executes at request time, and sends
`Cache-Control: no-store`. Do not add provider pings here until they have
timeouts and cannot block the endpoint.

## Design system

- Tokens: `src/app/globals.css` under `@theme` and `:root`.
- Primitives: `src/components/ui/*` (`Button`, `Card`, `Badge`, `Field`,
  `Input`, `SectionHeading`).
- Brand: `src/components/brand/logo.tsx` plus static SVGs in `public/brand`.
- Reference implementation and contrast/focus guidance: `/design`.

Colour is deliberately restrained: ink surfaces, violet for intent and focus,
mint/amber/rose only for state.

## Security posture

- No secrets in the repository; `.env*` is git-ignored, `.env.example` is not.
- `server-only` guards every module under `src/server`.
- Auth and data access are unbound, so no route currently mutates state.
- Dashboard actions that would mutate state are disabled rather than simulated.

## Deliberate omissions

No mock API responses, seeded records, fake uptime numbers, fake billing, or
sample bots. Empty states are real empty states. When a capability lands, it
lands end to end with tests.
