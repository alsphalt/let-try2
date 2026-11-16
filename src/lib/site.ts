/**
 * Static product metadata. Kept free of secrets so it is safe in both
 * server and client components.
 */

export const site = {
  name: "DARKNOTE HOSTS",
  shortName: "DarkNote",
  tagline: "Host bots that never sleep.",
  description:
    "DARKNOTE HOSTS is an always-on hosting platform for messaging bots and internal automations — isolated workspaces, a clean API and a dashboard built for operators.",
  version: "0.1.0",
  stage: "Stage 01 — Foundation",
  url: "http://localhost:3000",
} as const;

export const primaryNav = [
  { label: "Platform", href: "/platform" },
  { label: "Design system", href: "/design" },
  { label: "Dashboard", href: "/dashboard" },
] as const;

export const footerNav = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "API health", href: "/api/health" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Design system", href: "/design" },
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
    ],
  },
] as const;

export const dashboardNav = [
  { label: "Overview", href: "/dashboard", icon: "overview" },
  { label: "Bots", href: "/dashboard#bots", icon: "bots" },
  { label: "API keys", href: "/dashboard#api-keys", icon: "keys" },
  { label: "Activity", href: "/dashboard#activity", icon: "activity" },
  { label: "Settings", href: "/dashboard#settings", icon: "settings" },
] as const;
