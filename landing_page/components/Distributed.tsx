"use client";
import { useState } from "react";
import { GitBranch, Radio, RotateCcw, Unplug, Waypoints } from "lucide-react";
import { SectionHeading } from "./UI";
const positions = [
  [64, 124],
  [186, 61],
  [330, 84],
  [432, 170],
  [377, 288],
  [234, 328],
  [97, 286],
  [244, 188],
];
const baseLinks = [
  [0, 1],
  [0, 6],
  [0, 7],
  [1, 2],
  [1, 7],
  [2, 3],
  [2, 7],
  [3, 4],
  [3, 7],
  [4, 5],
  [4, 7],
  [5, 6],
  [5, 7],
  [6, 7],
];
export function Distributed() {
  const [removed, setRemoved] = useState(false);
  const links = removed
    ? [
        ...baseLinks.filter(([a, b]) => a !== 7 && b !== 7),
        [0, 2],
        [1, 5],
        [2, 4],
        [3, 5],
        [4, 6],
      ]
    : baseLinks;
  return (
    <section className="section distributed-section">
      <div className="container">
        <div className="split-layout distributed-layout">
          <div className="resilience-panel">
            <div className="diagram-cap mono">
              <span>
                <span className="status-dot" /> DISTRIBUTED TOPOLOGY
              </span>
              <span>FIG. 02</span>
            </div>
            <svg
              viewBox="0 0 500 390"
              aria-label={
                removed
                  ? "Seven nodes remain connected after node 8 leaves"
                  : "Eight connected peer nodes with no master"
              }
              role="img"
            >
              <defs>
                <pattern
                  id="mesh-dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r=".7" fill="#45665e" opacity=".35" />
                </pattern>
              </defs>
              <rect width="500" height="390" fill="url(#mesh-dots)" />
              {links.map(([a, b]) => (
                <path
                  key={`${a}-${b}`}
                  d={`M${positions[a][0]} ${positions[a][1]}L${positions[b][0]} ${positions[b][1]}`}
                  className="resilience-link"
                />
              ))}
              {positions.map(([x, y], i) => (
                <g
                  key={i}
                  transform={`translate(${x} ${y})`}
                  className={`resilience-node ${removed && i === 7 ? "disconnected" : ""}`}
                >
                  <circle
                    r="22"
                    fill="#101d1a"
                    stroke="currentColor"
                    strokeOpacity=".3"
                  />
                  <circle r="5" fill="currentColor" />
                  <circle
                    r="13"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity=".25"
                  />
                  <text y="38" textAnchor="middle" className="node-label">
                    N-0{i + 1}
                  </text>
                </g>
              ))}
            </svg>
            <div className="resilience-controls">
              <span className="mono" role="status">
                {removed
                  ? "07 NODES / MESH RECONNECTED"
                  : "08 NODES / MESH CONNECTED"}
              </span>
              <button
                className="button button-small button-outline"
                onClick={() => setRemoved(!removed)}
              >
                {removed ? <RotateCcw size={13} /> : <Unplug size={13} />}{" "}
                {removed ? "Restore node" : "Disconnect a node"}
              </button>
            </div>
            <p className="diagram-note mono">ILLUSTRATIVE NETWORK BEHAVIOR</p>
          </div>
          <div>
            <SectionHeading
              number="02"
              eyebrow="DISTRIBUTED BY DESIGN"
              title={
                <>
                  No mothership.
                  <br />
                  <span className="text-muted">
                    No single point
                    <br />
                    of control.
                  </span>
                </>
              }
              description="Coordination belongs to the network, not one permanent master vehicle."
            />
            <div className="benefit-list">
              {[
                {
                  icon: Waypoints,
                  title: "Distributed",
                  text: "Peers discover and coordinate with each other, without a permanent central controller.",
                },
                {
                  icon: GitBranch,
                  title: "Resilient",
                  text: "Designed to accommodate nodes joining or leaving as the mission evolves.",
                },
                {
                  icon: Radio,
                  title: "Adaptive",
                  text: "Local observations become shared context for collective responses.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon size={19} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
