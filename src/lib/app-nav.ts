export type AppNavItem = {
  label: string;
  href: string;
  description: string;
  soon?: boolean;
};

/** The five application sections. Order is intentional. */
export const appNav: AppNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Workspace overview and platform state",
  },
  {
    label: "Bot",
    href: "/bot",
    description: "Bot instances and runtime controls",
  },
  {
    label: "API",
    href: "/api",
    description: "Keys, requests and webhooks",
    soon: true,
  },
  {
    label: "Contact Us",
    href: "/contact",
    description: "Reach the DARKNOTE HOSTS team",
  },
  {
    label: "Wallet",
    href: "/wallet",
    description: "Balance, top-ups and invoices",
    soon: true,
  },
];

export function pageTitleFor(pathname: string): string {
  const match = appNav.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  if (match) return match.label;
  if (pathname.startsWith("/settings")) return "Settings";
  return "Workspace";
}
