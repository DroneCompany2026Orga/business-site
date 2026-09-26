/** UI contract: a real telemetry adapter can provide the same snapshot shape. */
export type ScenarioId = "wildfire" | "infrastructure" | "search";
export type SwarmNode = {
  id: string;
  type: "air" | "ground";
  x: number;
  y: number;
  active: boolean;
  task: string;
  battery: number;
};
export type NetworkEvent = {
  tick: number;
  message: string;
  kind: "info" | "alert" | "success";
};
export type SimulationSnapshot = {
  tick: number;
  nodes: SwarmNode[];
  links: [string, string][];
  events: NetworkEvent[];
  anomaly: { x: number; y: number; label: string } | null;
  latency: number;
  packets: number;
};
export const scenarios: {
  id: ScenarioId;
  name: string;
  label: string;
  anomaly: string;
  task: string;
}[] = [
  {
    id: "wildfire",
    name: "Wildfire",
    label: "FOREST / COORDINATED RESPONSE",
    anomaly: "THERMAL ANOMALY",
    task: "Approach observation",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    label: "UTILITY CORRIDOR / INSPECTION",
    anomaly: "LINE ANOMALY",
    task: "Inspect structure",
  },
  {
    id: "search",
    name: "Search area",
    label: "SEARCH GRID / AREA COVERAGE",
    anomaly: "OBJECT DETECTED",
    task: "Verify observation",
  },
];
export function isScenario(value: string | null): value is ScenarioId {
  return scenarios.some((s) => s.id === value);
}
const origins = [
  [105, 105],
  [260, 72],
  [410, 121],
  [572, 78],
  [668, 182],
  [492, 268],
  [279, 229],
  [128, 301],
  [192, 395],
  [375, 362],
  [581, 387],
  [672, 315],
];
export const CYCLE_LENGTH = 36;
export function getSnapshot(
  time: number,
  scenario: ScenarioId,
): SimulationSnapshot {
  const tick = Math.max(0, Math.floor(time)) % CYCLE_LENGTH;
  const current = scenarios.find((s) => s.id === scenario) || scenarios[0];
  const nodes: SwarmNode[] = origins.map(([x, y], i) => {
    const air = i < 8;
    const approaching = i === 9 && tick >= 14;
    const amount = approaching ? Math.min((tick - 14) / 14, 1) : 0;
    return {
      id: `${air ? "A" : "G"}-${String(air ? i + 1 : i - 7).padStart(2, "0")}`,
      type: air ? "air" : "ground",
      x: x + Math.sin(tick * 0.08 + i) * (air ? 12 : 4) + (432 - x) * amount,
      y: y + Math.cos(tick * 0.08 + i) * (air ? 8 : 3) + (204 - y) * amount,
      active: !(i === 7 && tick < 3) && !(i === 3 && tick >= 22 && tick < 28),
      task: approaching
        ? current.task
        : air
          ? "Survey area"
          : "Await observation",
      battery: 96 - i * 3 - Math.floor(tick / 12),
    };
  });
  const active = nodes.filter((n) => n.active);
  const links: [string, string][] = [];
  for (let i = 0; i < active.length; i++)
    for (let j = i + 1; j < active.length; j++) {
      if (
        Math.hypot(active[i].x - active[j].x, active[i].y - active[j].y) < 245
      )
        links.push([active[i].id, active[j].id]);
    }
  const events: NetworkEvent[] = [
    { tick: 0, message: "Mesh discovery initialized", kind: "info" },
    { tick: 3, message: "NODE A-08 joined the network", kind: "success" },
    {
      tick: 9,
      message: `A-03 detected ${current.anomaly.toLowerCase()}`,
      kind: "alert",
    },
    { tick: 11, message: "Observation propagated to peers", kind: "info" },
    {
      tick: 14,
      message: `G-02 assigned: ${current.task.toLowerCase()}`,
      kind: "success",
    },
    { tick: 22, message: "NODE A-04 left · routes updated", kind: "alert" },
    { tick: 28, message: "NODE A-04 rejoined the mesh", kind: "success" },
    {
      tick: 32,
      message: "G-02 arrived · observation verified",
      kind: "success",
    },
  ];
  return {
    tick,
    nodes,
    links,
    events: events
      .filter((e) => e.tick <= tick)
      .reverse()
      .slice(0, 5),
    anomaly: tick >= 9 ? { x: 432, y: 204, label: current.anomaly } : null,
    latency: 16 + (tick % 5),
    packets: tick * 24,
  };
}
export function formatTime(tick: number) {
  return `00:${String(Math.floor(tick / 60)).padStart(2, "0")}:${String(tick % 60).padStart(2, "0")}`;
}
