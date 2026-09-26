import { validateInquiry } from "@/lib/contact";
export const runtime = "nodejs";
// A bounded, per-process guard. Apply a shared rate limit at the deployment edge
// for multi-instance deployments; no personal data is kept in this counter.
let windowStart = 0;
let accepted = 0;
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || request.url,
  ).origin;
  if (!origin || origin !== expectedOrigin)
    return Response.json(
      { error: "This request must originate from this website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return Response.json(
      { error: "Expected a JSON request." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length")) > 16384)
    return Response.json({ error: "Request too large." }, { status: 413 });
  let input: unknown;
  try {
    if (!request.body)
      return Response.json({ error: "Missing request body." }, { status: 400 });
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return Response.json({ error: "Request too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    input = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const inquiry = validateInquiry(input);
  if (!inquiry)
    return Response.json(
      { error: "Please check your name, email, organization, and message." },
      { status: 400 },
    );
  if (inquiry.website) return Response.json({ ok: true });
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook)
    return Response.json(
      {
        error:
          "Contact delivery is not configured. Please use the inquiry download.",
      },
      { status: 503 },
    );
  let endpoint: URL;
  try {
    endpoint = new URL(webhook);
    if (endpoint.protocol !== "https:") throw new Error("HTTPS required");
  } catch {
    return Response.json(
      { error: "Contact delivery is temporarily unavailable." },
      { status: 503 },
    );
  }
  const now = Date.now();
  if (now - windowStart > 60000) {
    windowStart = now;
    accepted = 0;
  }
  if (accepted >= 30)
    return Response.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  accepted++;
  try {
    const { website: honeypot, ...payload } = inquiry;
    void honeypot;
    const response = await fetch(endpoint, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "We couldn’t deliver your request. Please try again shortly." },
      { status: 502 },
    );
  }
}
