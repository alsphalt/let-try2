import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WelcomeExperience } from "@/components/welcome/welcome-experience";
import { getSessionUser } from "@/server/auth";

export const metadata: Metadata = {
  title: "Welcome",
  description: "The DARKNOTE HOSTS introduction.",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function WelcomePage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  const store = await cookies();
  const soundOn = store.get("dn_sound")?.value !== "off";

  return <WelcomeExperience initialSoundOn={soundOn} />;
}
