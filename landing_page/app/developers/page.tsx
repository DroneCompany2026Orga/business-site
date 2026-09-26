import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { brand } from "@/config/brand";
import { ContactButton } from "@/components/ContactProvider";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "Integration concept",
  description: `Explore the proposed vehicle integration architecture for ${brand.name}. Concept documentation, not a released SDK.`,
  alternates: { canonical: `${site.url}/developers` },
};
export default function Developers() {
  return (
    <main id="main" className="container developer-page">
      <Link className="text-link" href="/">
        <ArrowLeft size={15} />
        Back to the platform
      </Link>
      <div className="eyebrow">ENGINEERING / INTEGRATION CONCEPT</div>
      <h1>
        A common interface.
        <br />
        <span className="text-muted">Your existing stack.</span>
      </h1>
      <p className="developer-intro">
        An overview of how vehicle adapters are intended to connect autonomous
        platforms to the {brand.name} Swarm OS.
      </p>
      <div className="preview-notice">
        Design preview. This describes a proposed integration model. No public
        SDK, production endpoint, or guaranteed adapter compatibility is
        currently offered here.
      </div>
      <section>
        <h2>Where the adapter belongs</h2>
        <p>
          Your controller remains responsible for vehicle-level operation. A
          platform adapter translates between its native protocols and a shared
          coordination interface. The Swarm OS is intended to exchange
          capabilities, observations, and tasks above that boundary.
        </p>
        <div className="developer-flow">
          <span>Vehicle controller</span>
          <ArrowRight size={18} />
          <span>Platform adapter</span>
          <ArrowRight size={18} />
          <span>Swarm OS</span>
        </div>
      </section>
      <section id="interface">
        <h2>Proposed interface responsibilities</h2>
        <div className="docs-table">
          <div>
            <h3>Discover</h3>
            <p>
              Announce vehicle identity and supported capabilities, such as
              mapping or thermal perception.
            </p>
          </div>
          <div>
            <h3>Normalize</h3>
            <p>
              Translate platform telemetry into common units, coordinate
              conventions, timestamps, and state.
            </p>
          </div>
          <div>
            <h3>Publish</h3>
            <p>
              Share observations with source identity, confidence, location, and
              relevant context.
            </p>
          </div>
          <div>
            <h3>Coordinate</h3>
            <p>
              Receive task proposals and translate supported requests into
              platform-specific commands. Vehicle safety boundaries remain
              authoritative.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2>Connecting real telemetry</h2>
        <p>
          The website’s simulation is intentionally separate from these proposed
          vehicle interfaces. Its frontend data contract is defined in{" "}
          <code>lib/simulation.ts</code>. A snapshot contains nodes,
          communication links, events, and observations. A future WebSocket or
          REST adapter can provide that same shape to the visualization.
        </p>
        <p>
          The current simulation uses deterministic frontend data. Its latency,
          battery, and packet values are illustrative and do not describe
          measured platform performance.
        </p>
      </section>
      <section>
        <h2>Discuss your integration</h2>
        <p>
          Bring your controller, communication constraints, payload
          capabilities, and use case. We can use those requirements to explore
          where an adapter would fit.
        </p>
        <ContactButton intent="partnership">
          Talk about an integration
        </ContactButton>
      </section>
    </main>
  );
}
