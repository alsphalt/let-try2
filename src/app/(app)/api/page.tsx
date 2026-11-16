import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Braces, KeyRound, ScrollText, Webhook } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "API",
  description: "Programmatic access to DARKNOTE HOSTS.",
};

const planned = [
  "Scoped API keys with per-key permissions",
  "Bot lifecycle endpoints (create, start, stop)",
  "Request logs and usage visibility",
  "Outbound webhooks for lifecycle events",
];

export default function ApiPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Developers"
        title="API"
        description="A typed control plane for everything in the dashboard — keys, bots and events."
        badge={<Badge tone="outline">In design</Badge>}
      />

      <ComingSoon
        icon={Braces}
        section="API access"
        title="Keys and requests land here soon."
        description="API access is being built alongside authentication and the bot runtime. Nothing can be issued until those boundaries are connected."
        planned={planned}
        actions={
          <>
            <Button disabled>
              <KeyRound className="h-4 w-4" />
              Create API key
            </Button>
            <ButtonLink href="/contact" variant="secondary">
              Ask about access
            </ButtonLink>
          </>
        }
        footnote="Keys will be scoped per workspace and shown once at creation."
      />

      <Card className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline)] bg-white/[0.03]">
            <ScrollText className="h-4 w-4 text-violet-300" />
          </span>
          <div>
            <p className="text-[0.82rem] font-medium text-chalk">
              One endpoint is already live
            </p>
            <p className="mt-0.5 text-[0.7rem] leading-relaxed text-ash">
              <span className="font-mono text-[0.65rem] text-mist">
                GET /api/health
              </span>{" "}
              reports the real state of this process and its unbound services.
            </p>
          </div>
        </div>
        <Link
          href="/api/health"
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-violet-300 transition-colors hover:text-violet-200"
        >
          Open response
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </Card>

      <Card className="flex items-start gap-3.5 border-dashed p-5">
        <Webhook className="mt-0.5 h-4 w-4 shrink-0 text-ash" />
        <div>
          <p className="text-[0.82rem] font-medium text-chalk">
            Webhooks are part of this section
          </p>
          <p className="mt-1 text-[0.7rem] leading-relaxed text-ash">
            Event delivery will use the same scoped-key model and the integration
            contracts already defined on the server. No endpoints are exposed
            yet.
          </p>
        </div>
      </Card>
    </div>
  );
}
