import type { Metadata } from "next";
import { CircleDashed, LockKeyhole, Palette, UserRound } from "lucide-react";
import { Notice } from "@/components/app/notice";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Settings",
  description: "Account and workspace settings for DARKNOTE HOSTS.",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--hairline)] py-3 last:border-0">
      <span className="text-[0.75rem] text-ash">{label}</span>
      <span className="text-right text-[0.75rem] text-chalk">{value}</span>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Identity, workspace and appearance preferences."
        badge={
          <Badge tone="warning">
            <CircleDashed className="h-2.5 w-2.5" />
            Preview
          </Badge>
        }
      />

      <Notice>
        Settings that change account state are disabled until authentication and
        persistence are connected. Values below describe the current preview
        environment.
      </Notice>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-0">
          <div className="flex items-center gap-2.5 border-b border-[var(--hairline)] px-5 py-4">
            <UserRound className="h-4 w-4 text-violet-300" />
            <div>
              <h2 className="text-[0.88rem] font-semibold text-chalk">
                Account
              </h2>
              <p className="mt-0.5 text-[0.65rem] text-ash">
                Identity provider not connected
              </p>
            </div>
          </div>
          <div className="px-5 py-2">
            <Row label="Display name" value="Preview account" />
            <Row label="Email" value="Not connected" />
            <Row label="Sessions" value="Not available" />
            <Row label="Sign-in method" value="Not configured" />
          </div>
          <div className="px-5 pb-5 pt-2">
            <Button size="sm" variant="secondary" disabled className="w-full">
              <LockKeyhole className="h-3.5 w-3.5" />
              Account changes locked
            </Button>
          </div>
        </Card>

        <Card className="p-0">
          <div className="flex items-center gap-2.5 border-b border-[var(--hairline)] px-5 py-4">
            <Palette className="h-4 w-4 text-violet-300" />
            <div>
              <h2 className="text-[0.88rem] font-semibold text-chalk">
                Workspace & appearance
              </h2>
              <p className="mt-0.5 text-[0.65rem] text-ash">
                Fixed in the foundation build
              </p>
            </div>
          </div>
          <div className="px-5 py-2">
            <Row label="Workspace" value="Personal" />
            <Row label="State" value="Not provisioned" />
            <Row label="Theme" value="Dark (fixed)" />
            <Row label="Version" value={`v${site.version}`} />
          </div>
          <div className="px-5 pb-5 pt-2">
            <Button size="sm" variant="secondary" disabled className="w-full">
              <LockKeyhole className="h-3.5 w-3.5" />
              Preferences locked
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
