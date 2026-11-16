import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Mail,
  Wallet,
} from "lucide-react";
import { Notice } from "@/components/app/notice";
import { PageHeader } from "@/components/app/page-header";
import { StatusPanel } from "@/components/landing/status-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { appNav } from "@/lib/app-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "DARKNOTE HOSTS workspace overview.",
};

const stats = [
  { label: "Bots", value: "0", note: "runtime not provisioned" },
  { label: "API keys", value: "—", note: "coming soon" },
  { label: "Wallet balance", value: "—", note: "coming soon" },
];

const sectionIcons = {
  "/bot": Bot,
  "/api": Braces,
  "/contact": Mail,
  "/wallet": Wallet,
} as const;

export default function DashboardPage() {
  const sections = appNav.filter((item) => item.href !== "/dashboard");

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Control plane"
        title="Dashboard"
        description="Your workspace at a glance. Identity and sessions are live; runtime and billing are still to be connected."
        badge={
          <Badge tone="outline">Personal workspace</Badge>
        }
      />

      <Notice>
        Your account and session are live. Bot hosting, API access, wallet and
        billing are not implemented yet, so those sections show real empty or
        coming-soon states.
      </Notice>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5" hover>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ash">
              {stat.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-chalk">
              {stat.value}
            </p>
            <p className="mt-1 text-[0.65rem] text-ash">{stat.note}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <Card className="p-0">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--hairline)] px-5 py-4">
            <div>
              <h2 className="text-[0.9rem] font-semibold text-chalk">
                Platform status
              </h2>
              <p className="mt-0.5 text-[0.68rem] text-ash">
                Read from the live health endpoint
              </p>
            </div>
            <Link
              href="/api/health"
              className="inline-flex items-center gap-1.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-violet-300 transition-colors hover:text-violet-200"
            >
              /api/health
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="px-3 py-2">
            <StatusPanel embedded />
          </div>
        </Card>

        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-4">
            <div>
              <h2 className="text-[0.9rem] font-semibold text-chalk">
                Sections
              </h2>
              <p className="mt-0.5 text-[0.68rem] text-ash">
                Jump to any part of the workspace
              </p>
            </div>
            <Badge tone="outline">4 links</Badge>
          </div>
          <ul className="divide-y divide-[var(--hairline)]">
            {sections.map((item) => {
              const Icon = sectionIcons[item.href as keyof typeof sectionIcons];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3.5 px-5 py-3.5 transition-colors duration-200 hover:bg-white/[0.025]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline)] bg-white/[0.03]">
                      {Icon ? (
                        <Icon className="h-3.5 w-3.5 text-violet-300" />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-[0.8rem] font-medium text-chalk">
                          {item.label}
                        </span>
                        {item.soon ? (
                          <span className="rounded border border-[var(--hairline)] px-1.5 py-0.5 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-ash">
                            Soon
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.68rem] text-ash">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ash transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-violet-300" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-5 pb-5">
            <ButtonLink
              href="/bot"
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Open bot section
              <ArrowRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>
        </Card>
      </div>
    </div>
  );
}
