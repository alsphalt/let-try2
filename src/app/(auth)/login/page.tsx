import type { Metadata } from "next";
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
  return <AuthForm mode="signin" />;
}
