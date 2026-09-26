"use client";
import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { SectionHeading, TextLink } from "./UI";
export const exampleCode = `const vehicle = swarm.connect({
  adapter: "ardupilot",
  id: "drone-07",
  capabilities: [
    "thermal-camera",
    "mapping",
    "navigation"
  ]
})

vehicle.publish({
  type: "thermal_anomaly",
  position: coordinates
})`;
export function DeveloperIntegration() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(exampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }
  return (
    <section id="integrations" className="section container">
      <div className="split-layout integration-layout">
        <div>
          <SectionHeading
            number="08"
            eyebrow="BUILT FOR BUILDERS"
            title={
              <>
                Integrate the vehicle.
                <br />
                <span className="text-muted">Keep your stack.</span>
              </>
            }
            description="Your flight software already knows how to fly. It shouldn’t need to be rebuilt to work with others."
          />
          <p className="body-copy">
            The platform sits above vehicle-specific control systems. Adapters
            translate capabilities and telemetry into a common interface, while
            your existing stack stays in control of the vehicle.
          </p>
          <TextLink href="/developers">
            Explore the integration concept
          </TextLink>
          <div className="integration-tags mono">
            <span>ArduPilot</span>
            <span>PX4</span>
            <span>Custom stacks</span>
          </div>
        </div>
        <div className="code-editor">
          <div className="code-toolbar">
            <div>
              <Terminal size={14} />
              <span className="mono">vehicle.ts</span>
            </div>
            <button
              className="icon-button"
              onClick={copy}
              aria-label="Copy illustrative code"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
          <pre tabIndex={0} aria-label="Illustrative vehicle integration code">
            <code>
              {exampleCode.split("\n").map((line, i) => (
                <span className="code-line" key={i}>
                  <span className="line-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    {line
                      .split(/("[^"]*"|\bconst\b|\bvehicle\b|\bswarm\b)/g)
                      .map((part, j) => (
                        <span
                          key={j}
                          className={
                            part.startsWith('"')
                              ? "code-string"
                              : part === "const"
                                ? "code-keyword"
                                : part === "vehicle" || part === "swarm"
                                  ? "code-variable"
                                  : ""
                          }
                        >
                          {part}
                        </span>
                      ))}
                  </span>
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
          <div className="code-footer mono">
            <span className="status-dot" />
            {failed
              ? "COPY UNAVAILABLE — SELECT THE CODE TO COPY"
              : copied
                ? "COPIED TO CLIPBOARD"
                : "ILLUSTRATIVE API · NOT A RELEASED SDK"}
          </div>
        </div>
      </div>
    </section>
  );
}
