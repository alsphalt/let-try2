# DARKNOTE HOSTS

An always-on hosting platform for messaging bots and internal automations.

**Stage 02 — Identity.** Branding, the design system and the application shell
are in place, and **accounts are live**: registration, sign-in, sign-out and
password reset run against SQLite with scrypt-hashed passwords. Bot hosting,
wallet operations and API keys are still to come.

> This is a standalone project. It does not import from, deploy with, or modify
> the existing DARKNOTE bot project.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) |
| Styling | Tailwind CSS v4 with CSS design tokens |
| Type | Inter Variable + JetBrains Mono Variable (self-hosted via Fontsource) |
| Icons | Lucide |
| API | Route handlers under `src/app/api` |
| Database | SQLite via `better-sqlite3` (WAL, foreign keys) |
| Auth | scrypt hashing, SHA-256 session tokens, HTTP-only cookies |
| Email | Optional SMTP via `nodemailer` for reset links |
| Runtime | Node.js 20.9+ |

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: SMTP is only needed for reset email
npm run dev                  # http://localhost:3000
```

Production check:

```bash
npm run build
npm start
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Routes

| Route | What it is |
| --- | --- |
| `/` | Landing page — brand, capabilities, architecture, design preview |
| `/platform` | Platform map and an honest foundation-status table |
| `/design` | Living design system (colour, type, components, motion) |
| `/dashboard` | Workspace overview with live platform status |
| `/bot` | Bot section shell with a real empty state |
| `/api` | API section — Coming soon (with the live health endpoint linked) |
| `/contact` | Contact layout with a non-sending form |
| `/wallet` | Wallet section — Coming soon |
| `/settings` | Live account, session and workspace settings |
| `/login`, `/register` | Working sign-in / registration (session cookies) |
| `/forgot-password`, `/reset-password` | Single-use password reset flow |
| `/api/health` | Real runtime health, including database and email state |
| `/api/auth/*` | register · login · logout · forgot-password · reset-password |

## Structure

```
src/
├── app/
│   ├── (marketing)/          # Public site: landing, platform, design
│   ├── (auth)/               # Split-screen auth shell
│   ├── (app)/                # Application shell: dashboard, bot, api,
│   │                         # contact, wallet, settings
│   ├── api/health/           # Health endpoint
│   ├── layout.tsx            # Root document, fonts, metadata
│   ├── globals.css           # Design tokens + primitives
│   ├── icon.svg              # Favicon
│   └── not-found.tsx
├── components/
│   ├── brand/                # Logo mark + lockup
│   ├── layout/               # Site header, footer
│   ├── ui/                   # Button, card, badge, field, section
│   ├── landing/              # Landing sections, live status panel
│   ├── auth/                 # Sign-in, registration, recovery forms
│   └── app/                  # Shell, sidebar, topbar, page primitives
├── lib/                      # Client-safe helpers and site metadata
└── server/
    ├── config/env.ts         # Server-only configuration + capability states
    ├── db/                   # SQLite connection, schema and migrations
    ├── auth/                 # Users, scrypt hashing, sessions, reset, mailer
    ├── bots/                 # Bot types + repository/runtime contracts
    └── integrations/         # Channel and API connection contracts
```

Deeper detail: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Design language

- **Surfaces** — near-black ink (`#040308` … `#181129`) with hairline violet borders.
- **Signal** — violet `#7C4DFF` for actions and focus, iris `#B298FF` for labels.
- **Type** — Inter for UI, JetBrains Mono for technical metadata and labels.
- **Motion** — 200–700ms `ease-out-soft` transitions; everything respects
  `prefers-reduced-motion`.
- **Shape** — 8px controls, 16px cards, 24px feature panels.

Tokens live in `src/app/globals.css`; the rendered reference is `/design`.

## Authentication

- Accounts are stored in SQLite (`data/darknote-hosts.db` by default).
- Passwords are hashed with Node's scrypt (`N=16384, r=8, p=1`) and a per-user
  salt; plaintext is never persisted or logged.
- Sessions use a 256-bit random token stored as a SHA-256 hash, delivered in an
  HTTP-only, `SameSite=Lax` cookie (30 days, `Secure` when `APP_URL` is HTTPS).
- Login accepts either email or username, case-insensitively.
- Registration and reset requests are validated on the server; the database
  enforces unique email and username keys.
- Password reset tokens are 256-bit, single-use and expire after 30 minutes.
  Completing a reset invalidates every existing session.

### Reset email

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `SMTP_FROM` to send
real reset emails. Without SMTP, `npm run dev` returns the one-time link to the
browser so the flow can be completed locally. For a local production build, run
`AUTH_DEV_RESET_LINKS=true npm start`; enable that flag only for trusted local
testing. In production without SMTP the endpoint reports that reset email is not
configured rather than pretending a mail was sent.

## Configuration

`DATABASE_PATH` and SMTP variables are optional; see
[`.env.example`](.env.example). The database file and schema are created on
first use.

## Stage status

| Area | State |
| --- | --- |
| Branding, design system, responsive shell | Complete |
| Marketing surfaces | Complete |
| Application shell, five-section navigation, profile and notifications | Complete |
| Registration, login, logout, sessions | Complete (SQLite + scrypt) |
| Password reset | Complete (single-use tokens; SMTP optional) |
| Health endpoint | Complete (reports real database and auth state) |
| Bot repository / runtime | Scaffolded — interfaces only |
| Provisioning, logs, billing | Planned |

## Deploy

Any Node host with a persistent disk works (`npm run build && npm start`), which
is what the SQLite stage assumes. Serverless platforms with ephemeral storage
need a hosted Postgres adapter before accounts will survive deployments. Keep
`APP_URL` set to the public HTTPS origin so session cookies are marked `Secure`.
