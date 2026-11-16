import type { Metadata } from "next";
import { CircleCheck, Palette, ShieldCheck, UserRound } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSessionUser } from "@/server/auth";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Settings",
  description: "Account and workspace settings for DARKNOTE HOSTS.",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--hairline)] py-3 last:border-0">
      <span className="text-[0.75rem] text-ash">{label}</span>
      <span className="min-w-0 truncate text-right text-[0.75rem] text-chalk">
        {value}
      </span>
    </div>
  );
}

export default async function SettingsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Your identity, session and workspace preferences."
        badge={
          <Badge tone="success">
            <CircleCheck className="h-2.5 w-2.5" />
            Signed in
          </Badge>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-0">
          <div className="flex items-center gap-2.5 border-b border-[var(--hairline)] px-5 py-4">
            <UserRound className="h-4 w-4 text-violet-300" />
            <div>
              <h2 className="text-[0.88rem] font-semibold text-chalk">Account</h2>
              <p className="mt-0.5 text-[0.65rem] text-ash">
                Stored in the DARKNOTE HOSTS database
              </p>
            </div>
          </div>
          <div className="px-5 py-2">
            <Row label="Username" value={user.username} />
            <Row label="Email" value={user.email} />
            <Row label="Member since" value={memberSince} />
            <Row label="User ID" value={user.id.slice(0, 8)} />
          </div>
        </Card>

        <Card className="p-0">
          <div className="flex items-center gap-2.5 border-b border-[var(--hairline)] px-5 py-4">
            <ShieldCheck className="h-4 w-4 text-violet-300" />
            <div>
              <h2 className="text-[0.88rem] font-semibold text-chalk">Security</h2>
              <p className="mt-0.5 text-[0.65rem] text-ash">
                Scrypt hashing · HTTP-only session
              </p>
            </div>
          </div>
          <div className="px-5 py-2">
            <Row label="Password" value="Hashed with scrypt" />
            <Row label="Session" value="30-day secure cookie" />
            <Row label="Reset" value="Single-use link, 30 min" />
            <Row label="Sign-out" value="Profile menu" />
          </div>
          <div className="px-5 pb-5 pt-2">
            <ButtonLink
              href="/forgot-password"
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Change password via email link
            </ButtonLink>
          </div>
        </Card>
      </div>

      <Card className="p-0">
        <div className="flex items-center gap-2.5 border-b border-[var(--hairline)] px-5 py-4">
          <Palette className="h-4 w-4 text-violet-300" />
          <div>
            <h2 className="text-[0.88rem] font-semibold text-chalk">
              Workspace & appearance
            </h2>
            <p className="mt-0.5 text-[0.65rem] text-ash">
              Current environment
            </p>
          </div>
        </div>
        <div className="grid gap-x-8 px-5 py-2 sm:grid-cols-2">
          <Row label="Workspace" value="Personal" />
          <Row label="Theme" value="Dark (default)" />
          <Row label="Version" value={`v${site.version}`} />
          <Row label="Stage" value={site.stage} />
        </div>
      </Card>
    </div>
  );
}
