import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordGate } from "@/components/auth/reset-password-gate";

export const metadata: Metadata = {
  title: "Choose a new password",
  description: "Complete the DARKNOTE HOSTS password reset.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="h-40 animate-pulse rounded-xl border border-[var(--hairline)] bg-white/[0.02]" />
      }
    >
      <ResetPasswordGate />
    </Suspense>
  );
}
