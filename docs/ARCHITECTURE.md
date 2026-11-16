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

- Owns one SQLite connection (`better-sqlite3`) cached on `globalThis`, so hot
  reloads and route handlers share a handle.
- Enables WAL, foreign keys and a 5s busy timeout; creates the schema
  idempotently and tracks it with `PRAGMA user_version`.
- Tables: `users`, `sessions`, `password_reset_tokens` with unique keys and
  indexes on expiry and ownership.
- `DATABASE_PATH` selects the file (default `./data/darknote-hosts.db`).

**Moving to Postgres:** keep the repository functions in `users.ts` /
`session.ts` as the seam — replace their SQL with a Postgres client and add
workspace-scoped tables. Do not persist SQLite files on ephemeral hosts.

### `src/server/auth/*`

- `password.ts` — scrypt (`N=16384, r=8, p=1`) with a 16-byte salt; parameters
  travel with the hash, comparison is constant-time.
- `users.ts` — user lookup by id/email/username, insert and password update.
  Email and username uniqueness is enforced by the database.
- `session.ts` — 256-bit token, SHA-256 stored server-side, HTTP-only cookie,
  30-day expiry, `Secure` when `APP_URL` is HTTPS.
- `reset.ts` — single-use reset tokens (30-minute expiry, hashed at rest).
- `mailer.ts` — SMTP transport; local fallback returns the reset link only when
  `AUTH_DEV_RESET_LINKS=true` or in development without SMTP.
- `index.ts` — the only auth surface route handlers import.

**Route protection:** `(app)/layout.tsx` resolves the session server-side and
redirects to `/login` when absent. `/login` and `/register` redirect signed-in
users to `/dashboard`. Mutating auth routes reject cross-site origins and all
validation is re-run on the server.

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
  "version": "0.2.0",
  "stage": "identity",
  "checks": {
    "api": "ok",
    "database": "ok",
    "auth": "ok",
    "email": "not_configured",
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
- Passwords use scrypt with per-user salts; reset tokens are hashed and
  single-use; sessions are revocable and expire after 30 days.
- Auth mutations check the request origin; validation always runs server-side.
- Bot, API and wallet actions remain disabled rather than simulated.

## Deliberate omissions

No mock API responses, seeded records, fake uptime numbers, fake billing, or
sample bots. Empty states are real empty states. When a capability lands, it
lands end to end with tests.
