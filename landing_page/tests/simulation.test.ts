import { test } from "node:test";
import assert from "node:assert/strict";
import { getSnapshot, CYCLE_LENGTH, scenarios } from "../lib/simulation";
test("each scenario is deterministic and repeats cleanly", () => {
  for (const scenario of scenarios) {
    assert.deepEqual(
      getSnapshot(15, scenario.id),
      getSnapshot(15, scenario.id),
    );
    assert.deepEqual(
      getSnapshot(0, scenario.id),
      getSnapshot(CYCLE_LENGTH, scenario.id),
    );
  }
});
test("join, observation, assignment, leave and rejoin are reflected in state", () => {
  const state = (t: number) => getSnapshot(t, "wildfire");
  assert.equal(state(0).nodes.filter((n) => n.active).length, 11);
  assert.equal(state(3).nodes.filter((n) => n.active).length, 12);
  assert.equal(state(8).anomaly, null);
  assert.ok(state(9).anomaly);
  assert.equal(
    state(14).nodes.find((n) => n.id === "G-02")?.task,
    "Approach observation",
  );
  assert.equal(state(22).nodes.filter((n) => n.active).length, 11);
  assert.equal(state(28).nodes.filter((n) => n.active).length, 12);
});
test("links never target offline nodes and remaining mesh stays connected", () => {
  for (const scenario of scenarios)
    for (let tick = 0; tick < CYCLE_LENGTH; tick++) {
      const snapshot = getSnapshot(tick, scenario.id);
      const active = snapshot.nodes.filter((n) => n.active).map((n) => n.id);
      const visited = new Set([active[0]]);
      let changed = true;
      for (const [a, b] of snapshot.links) {
        assert.ok(active.includes(a));
        assert.ok(active.includes(b));
      }
      while (changed) {
        changed = false;
        for (const [a, b] of snapshot.links) {
          if (visited.has(a) && !visited.has(b)) {
            visited.add(b);
            changed = true;
          }
          if (visited.has(b) && !visited.has(a)) {
            visited.add(a);
            changed = true;
          }
        }
      }
      assert.equal(
        visited.size,
        active.length,
        `Disconnected graph at ${scenario.id} tick ${tick}`,
      );
      assert.ok(snapshot.events.every((e) => e.tick <= tick));
    }
});
