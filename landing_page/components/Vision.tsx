import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./UI";
export function Vision() {
  return (
    <section id="vision" className="section container vision-section">
      <Eyebrow number="10">THE LONG VIEW</Eyebrow>
      <h2>
        A future with millions of autonomous machines will require them to{" "}
        <span>understand each other.</span>
      </h2>
      <p>
        Robotics is moving from isolated machines toward interconnected systems.
        <br className="desktop-break" /> We’re building the coordination layer
        that makes that transition possible.
      </p>
      <div className="vision-progression">
        {[
          "One machine",
          "Multiple machines",
          "Heterogeneous fleet",
          "Autonomous swarm",
        ].map((label, i) => (
          <div key={label}>
            <div
              className={`progression-nodes progression-${i}`}
              aria-hidden="true"
            >
              {Array.from({ length: [1, 3, 6, 9][i] }, (_, j) => (
                <span key={j} />
              ))}
            </div>
            <span>{label}</span>
            {i < 3 && <ArrowRight size={18} />}
          </div>
        ))}
      </div>
      <p className="vision-statement">
        One network. Many machines. <span>Shared intelligence.</span>
      </p>
    </section>
  );
}
