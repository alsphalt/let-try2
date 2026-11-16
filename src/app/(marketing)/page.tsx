import { Architecture } from "@/components/landing/architecture";
import { Capabilities } from "@/components/landing/capabilities";
import { CtaBand } from "@/components/landing/cta-band";
import { DesignTeaser } from "@/components/landing/design-teaser";
import { Hero } from "@/components/landing/hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Architecture />
      <DesignTeaser />
      <CtaBand />
    </>
  );
}
