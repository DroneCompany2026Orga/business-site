import { brand } from "@/config/brand";
export const dynamic = "force-static";
export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="${brand.primaryColor}"/><g transform="translate(6 6)" fill="${brand.accentColor}" stroke="${brand.accentColor}" stroke-width="1.5"><path d="m7 9 11 6 11-6M7 9v13l11 6 11-6V9M18 15v13M7 22l11-7 11 7" fill="none"/>${[
    [7, 9],
    [18, 15],
    [29, 9],
    [7, 22],
    [18, 28],
    [29, 22],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`)
    .join("")}</g></svg>`;
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
