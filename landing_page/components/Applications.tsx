import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./UI";
function ApplicationArt({ kind }: { kind: number }) {
  return (
    <svg viewBox="0 0 300 190" fill="none" aria-hidden="true">
      <defs>
        <pattern
          id={`app-grid-${kind}`}
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path d="M30 0H0V30" stroke="#70e0d1" strokeOpacity=".07" />
        </pattern>
      </defs>
      <rect width="300" height="190" fill={`url(#app-grid-${kind})`} />
      {kind === 0 && (
        <>
          <g stroke="#40524a">
            <path d="M25 141 67 108 91 127 137 74 161 104 203 47 237 98 282 122" />
            <path d="M15 160 80 140 125 150 169 125 215 144 285 129" />
            <path
              d="m158 145 12-25-5-18 16 14 5-24 14 26 10 12-6 20Z"
              fill="#ae8560"
              fillOpacity=".07"
              stroke="#ae8560"
            />
          </g>
          <ellipse
            cx="180"
            cy="129"
            rx="57"
            ry="31"
            stroke="#b69970"
            strokeDasharray="3 5"
            strokeOpacity=".5"
          />
          <path
            d="M58 64 178 129 255 90"
            stroke="var(--accent)"
            strokeDasharray="3 5"
          />
          <circle cx="58" cy="64" r="5" fill="var(--accent)" />
          <circle cx="255" cy="90" r="5" fill="var(--accent)" />
          <circle cx="178" cy="129" r="4" fill="#b69970" />
        </>
      )}
      {kind === 1 && (
        <>
          <g stroke="#52635e">
            <path d="m77 153 16-105h16l16 105M83 115h36M88 83h27M68 72h66M60 88h82M174 152l13-86h12l14 86M168 88h50M161 104h64M187 66v-9h12v9" />
            <path d="M60 88q48 55 101 16M142 88q-13 32 26 0M68 72q43 50 100 16M225 104q30 20 64-2" />
          </g>
          <path
            d="M42 44 155 42 249 72"
            stroke="var(--accent)"
            strokeDasharray="3 5"
          />
          <circle cx="42" cy="44" r="5" fill="var(--accent)" />
          <circle cx="155" cy="42" r="5" fill="var(--accent)" />
          <circle cx="249" cy="72" r="5" fill="var(--accent)" />
          <circle
            cx="101"
            cy="100"
            r="17"
            stroke="var(--accent)"
            strokeOpacity=".25"
          />
        </>
      )}
      {kind === 2 && (
        <>
          <g stroke="#52635e">
            <path d="M66 150V64m0 0-28-17m28 17 3-34m-3 34 28 22M150 155V86m0 0-30-15m30 15 4-32m-4 32 25 23M233 149V55m0 0-24-22m24 22 6-32m-6 32 31 16" />
            <path d="m31 156 76-10 76 17 84-15" strokeOpacity=".4" />
          </g>
          <path
            d="M44 108 120 44 214 108 275 45"
            stroke="var(--accent)"
            strokeDasharray="3 5"
          />
          <circle cx="44" cy="108" r="4" fill="var(--accent)" />
          <circle cx="120" cy="44" r="4" fill="var(--accent)" />
          <circle cx="214" cy="108" r="4" fill="var(--accent)" />
          <circle cx="275" cy="45" r="4" fill="var(--accent)" />
        </>
      )}
      {kind === 3 && (
        <>
          <g stroke="#52635e">
            <path d="m38 94 46-25 51 27v43l-47 25-50-27Zm0 0 50 27 47-25M88 121v43M152 56l43-22 55 29v45l-43 23-55-29Zm0 0 55 30 43-23M207 86v45" />
            <path d="m164 139 30-15 29 15-29 15Zm0 0v18l30 15 29-15v-18M194 154v18" />
          </g>
          <path
            d="M30 53 135 39 272 140 125 171"
            stroke="var(--accent)"
            strokeDasharray="3 5"
          />
          <circle cx="30" cy="53" r="4" fill="var(--accent)" />
          <circle cx="135" cy="39" r="4" fill="var(--accent)" />
          <circle cx="272" cy="140" r="4" fill="var(--accent)" />
          <circle cx="125" cy="171" r="4" fill="var(--accent)" />
        </>
      )}
    </svg>
  );
}
const applications = [
  {
    title: "Emergency response",
    tag: "SITUATIONAL AWARENESS",
    text: "Share observations across air and ground when a complete picture matters most.",
    scenario: "wildfire",
  },
  {
    title: "Infrastructure",
    tag: "CONNECTED INSPECTION",
    text: "Connect inspection, anomaly localization, and intervention across different platforms.",
    scenario: "infrastructure",
  },
  {
    title: "Energy & utilities",
    tag: "WIDE-AREA COORDINATION",
    text: "Make every observation useful across power lines, pipelines, and remote sites.",
    scenario: "infrastructure",
  },
  {
    title: "Industrial operations",
    tag: "COLLABORATIVE AUTONOMY",
    text: "Coordinate heterogeneous machines across complex, evolving environments.",
    scenario: "search",
  },
];
export function Applications() {
  return (
    <section id="applications" className="section applications-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading
            number="04"
            eyebrow="REAL-WORLD POSSIBILITIES"
            title={
              <>
                Different environments.
                <br />
                <span className="text-muted">Shared intelligence.</span>
              </>
            }
          />
          <p>
            From critical infrastructure to complex field operations.
            <br />
            Built for the work that no single machine can do alone.
          </p>
        </div>
        <div className="application-grid">
          {applications.map((app, i) => (
            <a
              href={`?scenario=${app.scenario}#simulation`}
              key={app.title}
              className="application-card"
            >
              <div className="application-art">
                <ApplicationArt kind={i} />
                <span className="mono">0{i + 1}</span>
              </div>
              <div className="application-content">
                <div className="mono">{app.tag}</div>
                <h3>
                  {app.title}
                  <ArrowUpRight size={18} />
                </h3>
                <p>{app.text}</p>
                <span className="app-link">
                  Explore scenario <ArrowUpRight size={13} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
