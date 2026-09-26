import { SectionHeading } from "./UI";
export function FutureHardware() {
  return (
    <section className="section hardware-section">
      <div className="container split-layout">
        <div>
          <SectionHeading
            number="09"
            eyebrow="BEYOND THE SOFTWARE"
            title={
              <>
                Software first.
                <br />
                <span className="text-muted">
                  Autonomous
                  <br />
                  systems next.
                </span>
              </>
            }
            description="Our first focus is the coordination layer for existing machines. Our longer-term vision: vehicles designed around the Swarm OS from the beginning."
          />
          <span className="outline-badge mono">
            HARDWARE VISION / CONCEPT STAGE
          </span>
        </div>
        <div className="hardware-render">
          <svg
            viewBox="0 0 600 400"
            role="img"
            aria-label="Abstract concept of a modular drone, with native Swarm OS, edge AI, mesh communication, and modular payload"
          >
            <defs>
              <linearGradient id="drone-metal" x2=".3" y2="1">
                <stop stopColor="#39413e" />
                <stop offset=".5" stopColor="#18201d" />
                <stop offset="1" stopColor="#0d1210" />
              </linearGradient>
              <radialGradient id="drone-light">
                <stop stopColor="#254238" stopOpacity=".45" />
                <stop offset="1" stopColor="#070b0d" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse
              cx="300"
              cy="223"
              rx="260"
              ry="170"
              fill="url(#drone-light)"
            />
            <g stroke="#2b3832" fill="none">
              <ellipse
                cx="300"
                cy="220"
                rx="218"
                ry="100"
                strokeDasharray="3 9"
              />
              <path
                d="M38 220h524M300 52v310"
                strokeDasharray="3 9"
                strokeOpacity=".5"
              />
            </g>
            <g stroke="#48554f" strokeWidth="1" fill="url(#drone-metal)">
              <path d="m263 183-111-45-13 10 109 58ZM327 181l113-55 16 12-111 62M263 225l-109 60-14-10 107-66M335 221l108 48 17-11-112-56" />
              <path d="m244 181 49-23 57 22v48l-45 29-61-27Z" />
              <path d="m244 181 61 27 45-28M305 208v49" />
              <path d="m266 178 27-12 35 14-28 13Z" fill="#24342c" />
              <path d="m281 239 21 8 19-10v18l-19 11-21-9Z" />
            </g>
            {[
              [143, 143],
              [449, 132],
              [146, 279],
              [450, 262],
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <ellipse
                  rx="62"
                  ry="22"
                  fill="#131a16"
                  fillOpacity=".55"
                  stroke="#4b5750"
                  strokeOpacity=".7"
                />
                <ellipse rx="53" ry="18" stroke="#303c34" fill="none" />
                <path d="m-47-7 42 4 40 13 13-4L5-4-35-13Z" fill="#343e37" />
                <circle r="7" fill="#202d25" stroke="#67746a" />
                <circle r="2" fill="var(--accent)" />
              </g>
            ))}
            <g stroke="var(--accent)" strokeOpacity=".4" fill="none">
              <path d="M284 175 228 65H114M340 195l79-120h95M289 249l-69 84H101M351 228l89 99h74" />
              <circle cx="284" cy="175" r="3" />
              <circle cx="340" cy="195" r="3" />
              <circle cx="289" cy="249" r="3" />
              <circle cx="351" cy="228" r="3" />
            </g>
            <g className="hardware-label">
              <text x="113" y="44">
                SWARM OS
              </text>
              <text x="113" y="58" className="text-muted">
                NATIVE
              </text>
              <text x="426" y="53">
                EDGE AI
              </text>
              <text x="426" y="67" className="text-muted">
                READY
              </text>
              <text x="100" y="356">
                MESH
              </text>
              <text x="100" y="370" className="text-muted">
                COMMUNICATION
              </text>
              <text x="429" y="350">
                MODULAR
              </text>
              <text x="429" y="364" className="text-muted">
                PAYLOAD
              </text>
            </g>
          </svg>
          <span className="hardware-caption mono">
            CONCEPT VISUALIZATION · NOT A PRODUCT SPECIFICATION
          </span>
        </div>
      </div>
    </section>
  );
}
