import {
  ArrowDown,
  ArrowDownUp,
  Blocks,
  Layers3,
  Waypoints,
} from "lucide-react";
import { BrandMark } from "./Brand";
import { SectionHeading, TextLink } from "./UI";

export function Platform() {
  return (
    <section id="platform" className="section container platform-section">
      <div className="split-layout">
        <div>
          <SectionHeading
            number="01"
            eyebrow="A COMMON LANGUAGE"
            title={
              <>
                Autonomy shouldn’t
                <br />
                depend on the
                <br />
                <span className="text-muted">manufacturer.</span>
              </>
            }
            description="Today’s autonomous machines speak different languages. We’re building the layer that lets them work together."
          />
          <p className="body-copy">
            The Swarm OS sits between mission intelligence and vehicle-specific
            control. Discover capabilities, share information, and coordinate
            tasks across a heterogeneous fleet.
          </p>
          <TextLink href="#architecture">Inside the architecture</TextLink>
        </div>
        <div
          className="platform-diagram"
          aria-label="Mission applications connect through Swarm OS and vehicle adapters to physical systems"
        >
          <div className="diagram-cap mono">
            <span>INTEROPERABILITY STACK</span>
            <span>01 / 04</span>
          </div>
          <div className="diagram-layer">
            <span className="mono layer-label">MISSION / APPLICATIONS</span>
            <div className="diagram-items">
              <span>Mission planning</span>
              <span>Operator interface</span>
              <span>External systems</span>
            </div>
          </div>
          <div className="layer-connector">
            <ArrowDown size={15} />
            <ArrowDown size={15} />
            <ArrowDown size={15} />
          </div>
          <div className="os-layer">
            <div>
              <BrandMark />
              <strong>SWARM OS</strong>
              <span className="mono">ONE SHARED LAYER</span>
            </div>
            <div className="os-capabilities">
              {[
                "Coordination",
                "Discovery",
                "Communication",
                "Task distribution",
                "Shared state",
                "AI orchestration",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
          <div className="layer-connector">
            <ArrowDownUp size={15} />
            <ArrowDownUp size={15} />
            <ArrowDownUp size={15} />
          </div>
          <div className="diagram-layer">
            <span className="mono layer-label">ADAPTER / CONTROL</span>
            <div className="adapter-chips">
              <span>ArduPilot</span>
              <span>PX4</span>
              <span>Custom controllers</span>
            </div>
          </div>
          <div className="layer-connector">
            <ArrowDown size={15} />
            <ArrowDown size={15} />
            <ArrowDown size={15} />
          </div>
          <div className="physical-layer">
            <span>
              <Waypoints size={20} />
              Aerial systems
            </span>
            <span>
              <Blocks size={20} />
              Ground robots
            </span>
            <span>
              <Layers3 size={20} />
              Future platforms
            </span>
          </div>
          <div className="diagram-note mono">
            CONCEPTUAL ARCHITECTURE · ADAPTERS IN DEVELOPMENT
          </div>
        </div>
      </div>
      <div className="platform-statement">
        <span className="small-cross">+</span>
        <p>
          The robot changes. <span>The coordination layer doesn’t.</span>
        </p>
        <span className="small-cross">+</span>
      </div>
    </section>
  );
}

const layers = [
  {
    n: "01",
    name: "Application layer",
    items: [
      "Mission logic",
      "Operator interfaces",
      "Simulation",
      "External systems",
    ],
  },
  {
    n: "02",
    name: "Swarm intelligence",
    items: [
      "Task coordination",
      "Shared world state",
      "Distributed discovery",
      "Information routing",
    ],
  },
  {
    n: "03",
    name: "Vehicle abstraction",
    items: [
      "Common vehicle interface",
      "Telemetry normalization",
      "Command translation",
      "Capability discovery",
    ],
  },
  {
    n: "04",
    name: "Platform adapters",
    items: ["ArduPilot", "PX4", "Custom autopilots", "Ground robotics"],
  },
  {
    n: "05",
    name: "Hardware",
    items: [
      "Multirotors",
      "Fixed-wing",
      "Ground robots",
      "Custom autonomous systems",
    ],
  },
];
export function Architecture() {
  return (
    <section id="architecture" className="section architecture-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading
            number="07"
            eyebrow="THE PLATFORM ARCHITECTURE"
            title={
              <>
                Built between autonomy
                <br />
                <span className="text-muted">and hardware.</span>
              </>
            }
          />
          <p>
            Clear boundaries. A common interface.
            <br />
            Each layer has a job. Together, they make
            <br className="desktop-break" /> collaborative autonomy possible.
          </p>
        </div>
        <div className="architecture-stack">
          {layers.map((layer, i) => (
            <div
              className={`architecture-row ${i === 1 ? "highlight-layer" : ""}`}
              key={layer.n}
            >
              <div className="architecture-title">
                <span className="mono">{layer.n}</span>
                {i === 1 ? <BrandMark /> : <Layers3 size={18} />}
                <h3>{layer.name}</h3>
              </div>
              <div className="architecture-capabilities">
                {layer.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <ArrowDown size={15} className="architecture-arrow" />
            </div>
          ))}
        </div>
        <p className="architecture-note mono">
          <span className="status-dot" /> CONCEPTUAL SYSTEM DESIGN{" "}
          <span>HARDWARE-INDEPENDENT BY DESIGN</span>
        </p>
      </div>
    </section>
  );
}
