import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your DARKNOTE HOSTS workspace.",
};

export default function LoginPage() {
  return <AuthForm mode="signin" />;
}
