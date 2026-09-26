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
import { isScenario } from "@/lib/simulation";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>;
}) {
  const { scenario } = await searchParams;
  return (
    <main id="main">
      <Hero />
      <Platform />
      <Distributed />
      <CrossDomain />
      <Applications />
      <AINative />
      <SwarmSimulation
        initialScenario={
          isScenario(scenario ?? null)
            ? (scenario as "wildfire" | "infrastructure" | "search")
            : "wildfire"
        }
      />
      <Architecture />
      <DeveloperIntegration />
      <FutureHardware />
      <Vision />
      <CTA />
    </main>
  );
}
