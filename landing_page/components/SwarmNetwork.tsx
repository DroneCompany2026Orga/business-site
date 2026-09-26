"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

export function DroneSymbol({ size = 18 }: { size?: number }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <path
        d={`M${-size * 0.6} ${-size * 0.6} ${size * 0.6} ${size * 0.6}M${-size * 0.6} ${size * 0.6} ${size * 0.6} ${-size * 0.6}`}
      />
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x * size * 0.55}
          cy={y * size * 0.55}
          rx={size * 0.38}
          ry={size * 0.22}
        />
      ))}
      <path d="m0-5 4 5-4 5-4-5Z" fill="currentColor" fillOpacity=".24" />
    </g>
  );
}
export function GroundSymbol() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="m-12-3 12-6 12 6v8L0 11-12 5ZM-12-3 0 3l12-6M0 3v8" />
      <path d="M-8 2v6M8 2v6M-4-7v-5h8v5" />
      <circle cx="0" cy="-14" r="2" />
    </g>
  );
}
const nodes = [
  { x: 145, y: 151, type: "air" },
  { x: 310, y: 97, type: "air" },
  { x: 463, y: 160, type: "air" },
  { x: 558, y: 270, type: "air" },
  { x: 361, y: 241, type: "air" },
  { x: 210, y: 279, type: "air" },
  { x: 84, y: 307, type: "air" },
  { x: 435, y: 366, type: "air" },
  { x: 297, y: 420, type: "ground" },
  { x: 137, y: 416, type: "ground" },
  { x: 536, y: 442, type: "ground" },
  { x: 384, y: 511, type: "ground" },
  { x: 601, y: 151, type: "air" },
  { x: 80, y: 215, type: "air" },
];
const links = [
  [0, 1],
  [0, 5],
  [0, 13],
  [1, 2],
  [1, 4],
  [2, 4],
  [2, 3],
  [2, 12],
  [3, 4],
  [3, 7],
  [3, 10],
  [4, 5],
  [4, 7],
  [5, 6],
  [5, 8],
  [5, 9],
  [6, 9],
  [6, 13],
  [7, 8],
  [7, 10],
  [7, 11],
  [8, 9],
  [8, 11],
  [10, 11],
  [12, 3],
  [13, 5],
];

export function SwarmNetwork() {
  const id = useId().replace(/:/g, "");
  const [selected, setSelected] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const { ref, active } = useInView<HTMLDivElement>();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (active && !media.matches) svg.current?.unpauseAnimations();
      else svg.current?.pauseAnimations();
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [active]);
  const node = selected === null ? null : nodes[selected];
  return (
    <div
      className={`hero-network ${active ? "animation-active" : "animation-paused"}`}
      ref={ref}
    >
      <div className="network-topline mono">
        <span>
          <i className="status-dot" /> DISTRIBUTED NETWORK
        </span>
        <span>FIG. 01</span>
      </div>
      <svg
        ref={svg}
        className="mesh-svg"
        viewBox="0 0 680 600"
        role="group"
        aria-label="Interactive decentralized mesh of aerial and ground platforms"
      >
        <defs>
          <pattern
            id={`${id}-grid`}
            width="44"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="matrix(1 .42 -1 .42 340 105)"
          >
            <path
              d="M44 0H0V26"
              fill="none"
              stroke="#54867c"
              strokeOpacity=".17"
              strokeWidth=".6"
            />
          </pattern>
          <radialGradient id={`${id}-floor`}>
            <stop stopColor="#173c35" stopOpacity=".5" />
            <stop offset="1" stopColor="#070b0d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-beam`} x2="0" y2="1">
            <stop stopColor="#70e0d1" stopOpacity=".3" />
            <stop offset="1" stopColor="#70e0d1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx="340"
          cy="350"
          rx="330"
          ry="240"
          fill={`url(#${id}-floor)`}
        />
        <path d="M10 350 330 205 671 352 353 534Z" fill={`url(#${id}-grid)`} />
        <g fill="none" stroke="#2a4943" strokeWidth=".65">
          <path d="M33 349 330 217 650 352 354 517Z" />
          <path d="M73 350 332 238 605 353 354 493Z" strokeDasharray="3 8" />
        </g>
        {nodes
          .filter((n) => n.type === "air")
          .map((n, i) => (
            <g key={i}>
              <path
                d={`M${n.x} ${n.y + 16}v92`}
                stroke={`url(#${id}-beam)`}
                strokeDasharray="2 5"
              />
              <ellipse
                cx={n.x}
                cy={n.y + 108}
                rx="19"
                ry="7"
                fill="none"
                stroke="#70e0d1"
                strokeOpacity=".12"
              />
            </g>
          ))}
        <g>
          {links.map(([a, b], i) => (
            <g key={`${a}-${b}`}>
              <path
                id={`${id}-link-${i}`}
                d={`M${nodes[a].x} ${nodes[a].y}L${nodes[b].x} ${nodes[b].y}`}
                fill="none"
                stroke="currentColor"
                className={
                  selected === a || selected === b
                    ? "mesh-link selected-link"
                    : "mesh-link"
                }
                strokeDasharray={i % 4 === 0 ? "3 6" : undefined}
              />
              {i % 3 === 0 && (
                <circle r="2" fill="var(--accent)" className="packet">
                  <animateMotion
                    dur={`${5 + (i % 4)}s`}
                    begin={`${-i}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${id}-link-${i}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}
        </g>
        {nodes.map((n, i) => (
          <g
            key={i}
            transform={`translate(${n.x} ${n.y})`}
            role="button"
            tabIndex={0}
            aria-label={`Inspect ${n.type === "air" ? "aerial" : "ground"} node ${i + 1}`}
            aria-pressed={selected === i}
            className={`mesh-node ${n.type} ${selected === i ? "node-selected" : ""}`}
            onMouseEnter={() => setSelected(i)}
            onMouseLeave={() => setSelected(null)}
            onFocus={() => setSelected(i)}
            onBlur={() => setSelected(null)}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected(i);
              }
              if (e.key === "Escape") setSelected(null);
            }}
          >
            <circle r="25" className="node-hitbox" />
            <ellipse cy="2" rx="28" ry="17" className="node-halo" />
            {n.type === "air" ? <DroneSymbol /> : <GroundSymbol />}
            <text y="36" textAnchor="middle" className="node-label">
              {n.type === "air" ? "A" : "G"}-{String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
        <g className="coordinate-labels">
          <text x="28" y="505">
            X / 048.21
          </text>
          <text x="552" y="520">
            Y / 002.34
          </text>
          <path
            d="M34 470v-20m-10 10h20M629 471v-20m-10 10h20"
            stroke="currentColor"
          />
        </g>
      </svg>
      {node && (
        <div className="node-tooltip" role="status">
          <span className="mono">
            NODE {node.type === "air" ? "A" : "G"}-
            {String(selected! + 1).padStart(2, "0")}
          </span>
          <strong>
            {node.type === "air" ? "Air platform" : "Ground platform"}
          </strong>
          <div>
            <span>Connections</span>
            <span>{links.filter((l) => l.includes(selected!)).length}</span>
          </div>
          <div>
            <span>Controller</span>
            <span>{node.type === "air" ? "ArduPilot" : "Custom"}</span>
          </div>
          <small>Illustrative network</small>
        </div>
      )}
      <div className="network-bottomline mono">
        <span>
          <i className="legend-air" /> AERIAL
        </span>
        <span>
          <i className="legend-ground" /> GROUND
        </span>
        <span className="network-caption">NO PERMANENT MASTER NODE</span>
      </div>
    </div>
  );
}
