import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./UI";
import { DroneSymbol, GroundSymbol } from "./SwarmNetwork";

export function CrossDomain() {
  return (
    <section className="section container cross-section">
      <div className="section-heading-row">
        <SectionHeading
          number="03"
          eyebrow="CROSS-DOMAIN COORDINATION"
          title={
            <>
              Air and ground.
              <br />
              <span className="text-muted">One system.</span>
            </>
          }
        />
        <p>
          The information matters. Where it came from shouldn’t.
          <br />A shared network turns individual observations
          <br className="desktop-break" /> into coordinated action.
        </p>
      </div>
      <div className="cross-diagram">
        <div className="cross-scene">
          <svg
            viewBox="0 0 1080 340"
            role="img"
            aria-label="An aerial drone detects an anomaly, shares its coordinates, and a ground robot responds"
          >
            <defs>
              <pattern
                id="cross-grid"
                width="45"
                height="26"
                patternUnits="userSpaceOnUse"
                patternTransform="matrix(1 .2 -1 .2 540 140)"
              >
                <path
                  d="M45 0H0V26"
                  fill="none"
                  stroke="#70e0d1"
                  strokeOpacity=".15"
                />
              </pattern>
              <linearGradient id="scan-cone" x2="0" y2="1">
                <stop stopColor="#70e0d1" stopOpacity=".17" />
                <stop offset="1" stopColor="#70e0d1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 233 520 95 1080 234 552 375Z" fill="url(#cross-grid)" />
            <g fill="none" stroke="#3b554e" strokeWidth="1">
              <path d="m342 168 45-23 62 30v54l-45 22-62-31Zm0 0 62 30 45-23M404 198v53" />
              <path d="m456 211 34-17 38 19v33l-35 18-37-20Zm0 0 37 19 35-17M493 230v34" />
              <path d="m578 169 72-34 50 24v73l-73 34-49-24Zm0 0 49 25 73-35M627 194v72" />
              <path d="m671 265 71-35 45 23-71 35Z" />
            </g>
            <path d="m250 88-83 143h166Z" fill="url(#scan-cone)" />
            <ellipse
              cx="250"
              cy="231"
              rx="83"
              ry="24"
              fill="none"
              stroke="#70e0d1"
              strokeOpacity=".25"
              strokeDasharray="4 5"
            />
            <g transform="translate(250 80)" color="var(--accent)">
              <DroneSymbol size={28} />
            </g>
            <text x="250" y="38" textAnchor="middle" className="svg-caption">
              A-03 / PERCEPTION ACTIVE
            </text>
            <path
              id="shared-coordinates"
              d="M280 85C480 10 650 35 845 188"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity=".5"
              strokeDasharray="4 7"
            />
            <circle r="3" fill="var(--accent)" className="packet">
              <animateMotion dur="5s" repeatCount="indefinite">
                <mpath href="#shared-coordinates" />
              </animateMotion>
            </circle>
            <rect
              x="465"
              y="37"
              width="187"
              height="27"
              rx="3"
              fill="#0c1714"
              stroke="#29473e"
            />
            <text
              x="558"
              y="54"
              textAnchor="middle"
              className="svg-caption accent"
            >
              SHARED OBSERVATION
            </text>
            <path
              d="M836 228 752 274 636 302 510 278 391 291 275 243"
              fill="none"
              stroke="var(--accent)"
              strokeDasharray="3 6"
              className="travel-path"
            />
            <g transform="translate(852 213) scale(1.6)" color="var(--accent)">
              <GroundSymbol />
            </g>
            <text x="852" y="172" textAnchor="middle" className="svg-caption">
              G-02 / TASK RECEIVED
            </text>
            <g transform="translate(252 239)">
              <circle
                r="16"
                fill="#bb9466"
                fillOpacity=".08"
                stroke="#c6aa7c"
                strokeOpacity=".4"
              />
              <circle r="5" fill="#c6aa7c" />
              <circle
                r="26"
                fill="none"
                stroke="#c6aa7c"
                strokeOpacity=".15"
                className="anomaly-ring"
              />
            </g>
            <text x="252" y="293" textAnchor="middle" className="svg-caption">
              POINT OF INTEREST
            </text>
          </svg>
        </div>
        <div className="cross-steps">
          {[
            {
              n: "01",
              title: "Observe",
              text: "Aerial perception detects an event.",
            },
            {
              n: "02",
              title: "Share",
              text: "Context propagates across the mesh.",
            },
            {
              n: "03",
              title: "Coordinate",
              text: "A ground platform receives the task.",
            },
          ].map((step, i) => (
            <div key={step.n}>
              <span className="mono">{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              {i < 2 && <ArrowRight size={17} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
