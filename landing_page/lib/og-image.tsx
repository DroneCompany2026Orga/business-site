import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
export const alt = `${brand.name} — One operating system. Every autonomous machine.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px",
        background: brand.primaryColor,
        color: "#f0f3f1",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 6,
          color: brand.accentColor,
        }}
      >
        {brand.wordmark}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 76,
          fontSize: 68,
          letterSpacing: -3,
          lineHeight: 1.08,
        }}
      >
        <span>One operating system.</span>
        <span style={{ color: brand.accentColor }}>
          Every autonomous machine.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 60,
          fontSize: 19,
          color: "#97a7a0",
        }}
      >
        HARDWARE AGNOSTIC · DISTRIBUTED COORDINATION · AI-NATIVE
      </div>
      <div style={{ display: "flex", marginTop: 35, fontSize: 19 }}>
        {brand.tagline}
      </div>
    </div>,
    size,
  );
}
