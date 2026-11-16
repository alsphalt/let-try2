"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export function ResetPasswordGate() {
  const token = useSearchParams().get("token") ?? "";
  return <ResetPasswordForm token={token} />;
}
