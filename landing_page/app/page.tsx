import { Hero } from "@/components/Hero";
import { Platform, Architecture } from "@/components/Architecture";
import { Distributed } from "@/components/Distributed";
import { CrossDomain } from "@/components/CrossDomain";
import { Applications } from "@/components/Applications";
import { AINative } from "@/components/AINative";
import { SwarmSimulation } from "@/components/SwarmSimulation";
import { DeveloperIntegration } from "@/components/DeveloperIntegration";
import { FutureHardware } from "@/components/FutureHardware";
import { Vision } from "@/components/Vision";
import { CTA } from "@/components/CTA";
import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { alternates: { canonical: site.url } };
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Platform />
      <Distributed />
      <CrossDomain />
      <Applications />
      <AINative />
      <SwarmSimulation />
      <Architecture />
      <DeveloperIntegration />
      <FutureHardware />
      <Vision />
      <CTA />
    </main>
  );
}
