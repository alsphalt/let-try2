import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSessionUser } from "@/server/auth";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your DARKNOTE HOSTS workspace.",
};

export default async function RegisterPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");
  return <AuthForm mode="signup" />;
}
