# DARKNOTE HOSTS

An always-on hosting platform for messaging bots and internal automations.

**Stage 01 — Foundation.** This repository establishes the brand, the design
system and the application skeleton. Authentication, database access and bot
provisioning are intentionally **not implemented** yet — their contracts exist,
their providers are unbound, and the UI says so.

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
| Runtime | Node.js 20.9+ |

## Quick start

```bash
npm install
cp .env.example .env.local   # optional in Stage 01
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
| `/dashboard` | Control-plane shell with truthful empty states |
| `/login`, `/register` | Auth UI shells; no provider is connected |
| `/api/health` | Real runtime health; reports unbound capabilities as pending |

## Structure

```
src/
├── app/
│   ├── (marketing)/          # Public site: landing, platform, design
│   ├── (auth)/               # Split-screen auth shell
│   ├── dashboard/            # App shell + overview
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
│   ├── auth/                 # Auth form
│   └── dashboard/            # Reserved for dashboard widgets
├── lib/                      # Client-safe helpers and site metadata
└── server/
    ├── config/env.ts         # Server-only configuration + capability states
    ├── db/                   # Database adapter contract
    ├── auth/                 # Session + provider contract
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

## Configuration

Nothing is required to run the site. Optional variables are documented in
[`.env.example`](.env.example). Server modules read them and expose capability
state rather than failing the boot:

```ts
capabilities.database();   // "not_configured" | "not_connected"
capabilities.auth();
capabilities.botRuntime();
```

## Stage status

| Area | State |
| --- | --- |
| Branding, design system, responsive shell | Complete |
| Marketing and auth surfaces | Complete (UI) |
| Health endpoint | Complete (real) |
| Auth provider, Postgres adapter | Scaffolded — interfaces only |
| Bot repository / runtime | Scaffolded — interfaces only |
| Provisioning, logs, billing | Planned |

## Deploy

Any Node host works (`npm run build && npm start`). On Vercel, import the repo
and keep the default Next.js settings; add environment variables from
`.env.example` as capabilities come online.
