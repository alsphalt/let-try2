import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSessionUser } from "@/server/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your DARKNOTE HOSTS workspace.",
};

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  // First-time visitors see the introduction before the sign-in form.
  const store = await cookies();
  if (store.get("dn_intro_seen")?.value !== "1") redirect("/welcome");

  return <AuthForm mode="signin" />;
}
