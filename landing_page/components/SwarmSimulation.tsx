"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  Crosshair,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Radio,
  X,
} from "lucide-react";
import { SectionHeading } from "./UI";
import { DroneSymbol, GroundSymbol } from "./SwarmNetwork";
import {
  getSnapshot,
  formatTime,
  isScenario,
  scenarios,
  type ScenarioId,
} from "@/lib/simulation";
import { useInView } from "@/lib/useInView";
import { ContactButton } from "./ContactProvider";

const subscribeMotion = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const subscribeLocation = () => () => {};
const getScenarioFromUrl = (): ScenarioId => {
  const requested = new URLSearchParams(window.location.search).get("scenario");
  return isScenario(requested) ? requested : "wildfire";
};
export function SwarmSimulation() {
  const requestedScenario = useSyncExternalStore<ScenarioId>(
    subscribeLocation,
    getScenarioFromUrl,
    () => "wildfire",
  );
  const [manualScenario, setManualScenario] = useState<ScenarioId | null>(null);
  const scenario = manualScenario ?? requestedScenario;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);
  const [explicitPlay, setExplicitPlay] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const { ref, active } = useInView<HTMLDivElement>();
  const playing = running && (!reducedMotion || explicitPlay);
  const snapshot = getSnapshot(tick, scenario);
  const currentScenario = scenarios.find((s) => s.id === scenario)!;
  const activeNodes = snapshot.nodes.filter((n) => n.active);
  const selectedNode = snapshot.nodes.find((n) => n.id === selected);
  useEffect(() => {
    if (!playing || !active) return;
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [playing, active]);
  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "Tab") {
        const elements = ref.current?.querySelectorAll<HTMLElement>(
          "button, select, [tabindex='0']",
        );
        if (!elements?.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded, ref]);
  function changeScenario(value: ScenarioId) {
    setManualScenario(value);
    setTick(0);
    setSelected(null);
  }
  return (
    <section id="simulation" className="section simulation-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading
            number="06"
            eyebrow="THE SWARM, IN MOTION"
            title={
              <>
                See the swarm <span className="text-muted">think.</span>
              </>
            }
            description="Watch autonomous agents discover, share, and respond as one coordinated system."
          />
          <a
            className="text-link"
            href="#simulation-console"
            onClick={() => {
              setExplicitPlay(true);
              setRunning(true);
            }}
          >
            Launch simulation <ArrowUpRight size={16} />
          </a>
        </div>
        {expanded && (
          <div
            className="console-backdrop"
            onClick={() => setExpanded(false)}
            aria-hidden="true"
          />
        )}
        <div
          id="simulation-console"
          ref={ref}
          role={expanded ? "dialog" : undefined}
          aria-modal={expanded ? true : undefined}
          aria-label={expanded ? "Expanded swarm simulation" : undefined}
          className={`simulation-console ${expanded ? "console-expanded" : ""} ${playing ? "is-playing" : "is-paused"}`}
        >
          <div className="console-toolbar">
            <div className="console-name">
              <span className="status-dot" />
              <span className="mono">SWARM ENVIRONMENT</span>
              <span className="demo-badge mono">SIMULATED</span>
            </div>
            <div className="console-toolbar-right">
              <span className="mono">{formatTime(snapshot.tick)}</span>
              <button
                className="icon-button"
                aria-label={
                  expanded ? "Reduce simulation" : "Expand simulation"
                }
                aria-pressed={expanded}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>
          </div>
          <div className="console-main">
            <div className="simulation-map">
              <div className="map-caption mono">
                <Crosshair size={12} />
                {currentScenario.label}
              </div>
              <svg
                viewBox="0 0 780 470"
                className="simulation-svg"
                role="group"
                aria-label={`${currentScenario.name} simulation: select a node to inspect telemetry`}
              >
                <defs>
                  <pattern
                    id="sim-grid"
                    width="34"
                    height="34"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M34 0H0V34"
                      fill="none"
                      stroke="#416252"
                      strokeOpacity=".15"
                      strokeWidth=".7"
                    />
                  </pattern>
                  <radialGradient id="sim-glow">
                    <stop stopColor="#244036" stopOpacity=".35" />
                    <stop offset="1" stopColor="#0b1210" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="780" height="470" fill="url(#sim-grid)" />
                <ellipse
                  cx="390"
                  cy="235"
                  rx="360"
                  ry="260"
                  fill="url(#sim-glow)"
                />
                {scenario === "wildfire" && (
                  <g
                    fill="none"
                    stroke="#435447"
                    strokeOpacity=".25"
                    strokeWidth="1"
                  >
                    {Array.from({ length: 9 }, (_, i) => (
                      <path
                        key={i}
                        d={`M${-90 + i * 28} 470Q${35 + i * 35} 285 ${100 + i * 36} 220T${230 + i * 47} -20M${390 + i * 29} 490Q${345 + i * 30} 345 ${460 + i * 32} 300T${870 + i * 20} 140`}
                      />
                    ))}
                  </g>
                )}
                {scenario === "infrastructure" && (
                  <g fill="none" stroke="#66766a" strokeOpacity=".45">
                    <path d="M30 205 750 205M30 222 750 222" />
                    {[100, 250, 400, 550, 700].map((x) => (
                      <g key={x}>
                        <path
                          d={`M${x - 10} 247l8-85h4l8 85M${x - 18} 181h36M${x - 22} 198h44M${x - 6} 219h12`}
                        />
                        <rect
                          x={x - 20}
                          y="258"
                          width="39"
                          height="22"
                          strokeOpacity=".3"
                        />
                      </g>
                    ))}
                  </g>
                )}
                {scenario === "search" && (
                  <g fill="none" stroke="#52695d" strokeOpacity=".4">
                    {[0, 1, 2, 3].map((i) => (
                      <g key={i}>
                        <rect
                          x={55 + i * 174}
                          y="55"
                          width="150"
                          height="357"
                          strokeDasharray="3 6"
                        />
                        <text x={63 + i * 174} y="73" className="node-label">
                          SECTOR 0{i + 1}
                        </text>
                      </g>
                    ))}
                  </g>
                )}
                <path
                  d="M35 342C220 300 181 131 358 104S495 345 752 314"
                  stroke="#536254"
                  strokeOpacity=".2"
                  strokeWidth="12"
                  fill="none"
                />
                {snapshot.links.map(([a, b], i) => {
                  const from = snapshot.nodes.find((n) => n.id === a)!;
                  const to = snapshot.nodes.find((n) => n.id === b)!;
                  return (
                    <g key={`${a}-${b}`}>
                      <path
                        d={`M${from.x} ${from.y}L${to.x} ${to.y}`}
                        className={`sim-link ${selected === a || selected === b ? "sim-link-selected" : ""}`}
                      />
                      {i % 5 === 0 && (
                        <circle
                          cx={
                            from.x + (to.x - from.x) * ((snapshot.tick % 4) / 4)
                          }
                          cy={
                            from.y + (to.y - from.y) * ((snapshot.tick % 4) / 4)
                          }
                          r="2"
                          fill="var(--accent)"
                          opacity=".8"
                        />
                      )}
                    </g>
                  );
                })}
                {snapshot.anomaly && (
                  <g
                    transform={`translate(${snapshot.anomaly.x} ${snapshot.anomaly.y})`}
                  >
                    <circle
                      r="40"
                      fill="#c79b60"
                      fillOpacity=".055"
                      stroke="#c79b60"
                      strokeOpacity=".2"
                      strokeDasharray="3 5"
                    />
                    <circle
                      r="17"
                      fill="#c79b60"
                      fillOpacity=".12"
                      stroke="#c79b60"
                      strokeOpacity=".5"
                    />
                    <path d="m0-6 6 10H-6Z" fill="none" stroke="#d4b780" />
                    <text x="23" y="-23" className="anomaly-label">
                      {snapshot.anomaly.label}
                    </text>
                  </g>
                )}
                {snapshot.nodes.map((node) => (
                  <g
                    key={node.id}
                    transform={`translate(${node.x} ${node.y})`}
                    className={`sim-node ${node.active ? "" : "sim-node-offline"} ${selected === node.id ? "sim-node-selected" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${node.id}, ${node.type}, ${node.active ? "connected" : "offline"}`}
                    aria-pressed={selected === node.id}
                    onClick={() =>
                      setSelected(selected === node.id ? null : node.id)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(selected === node.id ? null : node.id);
                      }
                    }}
                  >
                    <circle r="24" className="node-hitbox" />
                    <circle
                      r="18"
                      fill="#0c1914"
                      stroke="currentColor"
                      strokeOpacity=".3"
                    />
                    {node.type === "air" ? (
                      <DroneSymbol size={12} />
                    ) : (
                      <g transform="scale(.75)">
                        <GroundSymbol />
                      </g>
                    )}
                    <text y="33" textAnchor="middle" className="node-label">
                      {node.id}
                    </text>
                  </g>
                ))}
                <g className="coordinate-labels">
                  <text x="20" y="453">
                    SIMULATION GRID / 01
                  </text>
                  <text x="657" y="453">
                    100 m ━━━
                  </text>
                </g>
              </svg>
              <div className="map-legend mono">
                <span>
                  <i className="legend-air" /> AIR
                </span>
                <span>
                  <i className="legend-ground" /> GROUND
                </span>
                <span>
                  <i className="legend-anomaly" /> OBSERVATION
                </span>
              </div>
            </div>
            <aside
              className="telemetry-panel"
              aria-label="Simulated swarm telemetry"
            >
              <div className="telemetry-heading mono">
                <Activity size={13} />
                SWARM STATUS
              </div>
              <div className="node-count">
                <strong>{String(activeNodes.length).padStart(2, "0")}</strong>
                <span>ACTIVE NODES</span>
              </div>
              <div className="node-count-split">
                <span>
                  <i className="legend-air" />
                  {activeNodes.filter((n) => n.type === "air").length} AIR
                </span>
                <span>
                  <i className="legend-ground" />
                  {activeNodes.filter((n) => n.type === "ground").length} GROUND
                </span>
              </div>
              <div className="network-status">
                <div className="mono">NETWORK</div>
                <p>
                  <Radio size={14} /> Mesh connected
                </p>
                <div>
                  <span>Avg. latency</span>
                  <span>{snapshot.latency} ms</span>
                </div>
                <div>
                  <span>Packets shared</span>
                  <span>{snapshot.packets}</span>
                </div>
              </div>
              {selectedNode ? (
                <div className="selected-telemetry">
                  <div className="telemetry-heading mono">
                    NODE {selectedNode.id}
                    <button
                      className="icon-button"
                      aria-label="Close node details"
                      onClick={() => setSelected(null)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <dl>
                    <div>
                      <dt>Type</dt>
                      <dd>{selectedNode.type}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{selectedNode.active ? "Connected" : "Offline"}</dd>
                    </div>
                    <div>
                      <dt>Battery</dt>
                      <dd>{selectedNode.battery}%</dd>
                    </div>
                    <div>
                      <dt>Task</dt>
                      <dd>
                        {selectedNode.active
                          ? selectedNode.task
                          : "Disconnected"}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div className="event-stream">
                  <div className="telemetry-heading mono">EVENT STREAM</div>
                  <ol>
                    {snapshot.events.map((event) => (
                      <li key={event.tick}>
                        <time className="mono">{formatTime(event.tick)}</time>
                        <span className={`event-${event.kind}`}>
                          {event.message}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </aside>
          </div>
          <div className="console-controls">
            <div className="playback-controls">
              <button
                className="button button-small button-play"
                aria-label={playing ? "Pause simulation" : "Play simulation"}
                onClick={() => {
                  setExplicitPlay(true);
                  setRunning(!playing);
                }}
              >
                {playing ? <Pause size={13} /> : <Play size={13} />}{" "}
                {playing ? "Pause" : "Play"}
              </button>
              <button
                className="icon-button"
                aria-label="Reset simulation"
                onClick={() => {
                  setTick(0);
                  setSelected(null);
                  setRunning(false);
                }}
              >
                <RotateCcw size={15} />
              </button>
              <span className="mono playback-label">
                {playing ? "RUNNING" : "PAUSED"}
              </span>
            </div>
            <label className="scenario-select">
              <span className="mono">SCENARIO</span>
              <select
                aria-label="Simulation scenario"
                value={scenario}
                onChange={(e) => changeScenario(e.target.value as ScenarioId)}
              >
                {scenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
        </div>
        <div className="simulation-footnote">
          <p>
            <span className="status-dot" /> Interactive concept demonstration.
            All telemetry is simulated.
          </p>
          <ContactButton secondary>Request a live demo</ContactButton>
        </div>
      </div>
    </section>
  );
}
