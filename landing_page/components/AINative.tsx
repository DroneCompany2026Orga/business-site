import {
  Cpu,
  ScanLine,
  Waypoints,
  ArrowRight,
  Camera,
  Box,
} from "lucide-react";
import { SectionHeading } from "./UI";
export function AINative() {
  return (
    <section className="section container ai-section">
      <div className="split-layout">
        <div>
          <SectionHeading
            number="05"
            eyebrow="AI-NATIVE, AT EVERY NODE"
            title={
              <>
                Intelligence at the edge.
                <br />
                <span className="text-muted">
                  Coordination across
                  <br />
                  the swarm.
                </span>
              </>
            }
            description="Onboard AI turns sensor data into local understanding. The Swarm OS makes that understanding useful to every connected platform."
          />
          <div className="capability-tags">
            {[
              "Perception",
              "Anomaly detection",
              "Navigation",
              "Local decisions",
            ].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
        <div className="ai-diagram">
          <div className="diagram-cap mono">
            LOCAL INTELLIGENCE → SHARED CONTEXT
          </div>
          <div className="ai-flow">
            <div>
              <Camera />
              <span>Sensor input</span>
            </div>
            <ArrowRight className="flow-arrow" size={16} />
            <div className="ai-core">
              <Cpu />
              <span>Onboard AI</span>
              <small className="mono">PERCEIVE · UNDERSTAND</small>
            </div>
            <ArrowRight className="flow-arrow" size={16} />
            <div>
              <ScanLine />
              <span>Observation</span>
            </div>
          </div>
          <div className="ai-bus">
            <span />
            <div>
              <Waypoints size={20} /> SWARM OS{" "}
              <span className="mono">SHARED CONTEXT</span>
            </div>
          </div>
          <div className="ai-nodes">
            {["AIR PLATFORM", "GROUND PLATFORM", "OTHER SYSTEMS"].map((x) => (
              <div key={x}>
                <Box size={19} />
                <span className="mono">{x}</span>
              </div>
            ))}
          </div>
          <p>
            AI understands locally.
            <br />
            <span>The swarm understands collectively.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
