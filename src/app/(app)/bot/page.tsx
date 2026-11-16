import type { Metadata } from "next";
import {
  Activity,
  Bot,
  CircleDashed,
  Plus,
  Radio,
  ScrollText,
  Server,
} from "lucide-react";
import { Notice } from "@/components/app/notice";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Bot",
  description: "Bot instances and runtime controls.",
};

const planned = [
  {
    icon: Server,
    title: "Runtime provisioning",
    copy: "Create a supervised process per bot with restart policy and health checks.",
    state: "Stage 03",
  },
  {
    icon: Radio,
    title: "Channel sessions",
    copy: "Pair messaging channels and keep sessions warm between deploys.",
    state: "Stage 03",
  },
  {
    icon: ScrollText,
    title: "Live logs",
    copy: "Follow stdout, lifecycle events and errors from a single stream.",
    state: "Stage 03",
  },
];

export default function BotPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Runtime"
        title="Bot"
        description="Deploy and supervise the bots that run in this workspace."
        badge={
          <Badge tone="warning">
            <CircleDashed className="h-2.5 w-2.5" />
            Not provisioned
          </Badge>
        }
        actions={
          <Button size="sm" variant="secondary" disabled>
            <Plus className="h-3.5 w-3.5" />
            New bot
          </Button>
        }
      />

      <Notice>
        Bot hosting is not connected yet. The list below is a real empty state —
        no sample bots, no simulated processes.
      </Notice>

      <Card className="p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline)] px-5 py-4">
          <div>
            <h2 className="text-[0.9rem] font-semibold text-chalk">
              All bots
            </h2>
            <p className="mt-0.5 text-[0.68rem] text-ash">
              0 instances · runtime unbound
            </p>
          </div>
          <span className="flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-ash">
            <Activity className="h-3 w-3" />
            Idle
          </span>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hairline)] bg-white/[0.03]">
            <Bot className="h-5 w-5 text-violet-300" />
          </span>
          <p className="mt-4 text-[0.92rem] font-medium text-chalk">
            No bots in this workspace
          </p>
          <p className="mt-1.5 max-w-sm text-[0.76rem] leading-relaxed text-ash">
            When the runtime stage lands, your first bot will be created here
            with its own process, channel session and log stream.
          </p>
          <Button className="mt-5" size="sm" disabled>
            <Plus className="h-3.5 w-3.5" />
            Create your first bot
          </Button>
          <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ash/70">
            Unlocks with the runtime stage
          </p>
        </div>
      </Card>

      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Planned</p>
            <h2 className="mt-2 text-[1.05rem] font-semibold tracking-[-0.02em] text-chalk">
              What this section will hold
            </h2>
          </div>
          <ButtonLink href="/platform" variant="ghost" size="sm">
            Platform plan
          </ButtonLink>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {planned.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} hover className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--hairline)] bg-gradient-to-b from-white/[0.06] to-transparent">
                    <Icon className="h-4 w-4 text-violet-300" />
                  </span>
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ash">
                    {item.state}
                  </span>
                </div>
                <h3 className="mt-4 text-[0.85rem] font-semibold text-chalk">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ash">
                  {item.copy}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
