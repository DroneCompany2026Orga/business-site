import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "../lib/contact";
import { POST } from "../app/api/contact/route";
const valid = {
  name: "Alex",
  email: "alex@example.com",
  organization: "Robotics Lab",
  message: "We want to integrate an aerial platform.",
  intent: "demo",
};
test("inquiry validation rejects missing, malformed and oversized input", () => {
  assert.ok(validateInquiry(valid));
  for (const value of [
    null,
    [],
    {},
    { ...valid, email: "no-email" },
    { ...valid, message: "short" },
    { ...valid, intent: "unknown" },
    { ...valid, name: "a".repeat(101) },
    { ...valid, organization: " " },
  ])
    assert.equal(validateInquiry(value), null);
});
test("contact rejects cross-origin and oversized requests before delivery", async () => {
  const origin = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ).origin;
  const request = (body: string, source: string) =>
    new Request(`${origin}/api/contact`, {
      method: "POST",
      headers: { origin: source, "content-type": "application/json" },
      body,
    });
  assert.equal(
    (await POST(request(JSON.stringify(valid), "https://unrelated.example")))
      .status,
    403,
  );
  assert.equal((await POST(request("x".repeat(16385), origin))).status, 413);
  assert.equal((await POST(request("invalid", origin))).status, 400);
});
test("unconfigured delivery returns an honest unavailable result", async () => {
  const saved = process.env.CONTACT_WEBHOOK_URL;
  delete process.env.CONTACT_WEBHOOK_URL;
  const origin = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ).origin;
  try {
    const response = await POST(
      new Request(`${origin}/api/contact`, {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify(valid),
      }),
    );
    assert.equal(response.status, 503);
  } finally {
    if (saved) process.env.CONTACT_WEBHOOK_URL = saved;
  }
});
test("configured delivery sends validated fields and reports receiver failures", async (t) => {
  const savedUrl = process.env.CONTACT_WEBHOOK_URL;
  const savedToken = process.env.CONTACT_WEBHOOK_TOKEN;
  process.env.CONTACT_WEBHOOK_URL = "https://receiver.example/inquiries";
  process.env.CONTACT_WEBHOOK_TOKEN = "test-token";
  const origin = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ).origin;
  const request = () =>
    new Request(`${origin}/api/contact`, {
      method: "POST",
      headers: { origin, "content-type": "application/json" },
      body: JSON.stringify({ ...valid, unexpectedField: "discard this" }),
    });
  let delivered: Record<string, unknown> | undefined;
  const receiver = t.mock.method(
    globalThis,
    "fetch",
    async (_url: unknown, init: RequestInit) => {
      delivered = JSON.parse(init.body as string);
      assert.equal(
        new Headers(init.headers).get("authorization"),
        "Bearer test-token",
      );
      return new Response(null, { status: 204 });
    },
  );
  try {
    assert.equal((await POST(request())).status, 200);
    assert.equal(delivered?.email, valid.email);
    assert.ok(delivered?.submittedAt);
    assert.equal(delivered?.unexpectedField, undefined);
    receiver.mock.mockImplementation(
      async () => new Response(null, { status: 500 }),
    );
    assert.equal((await POST(request())).status, 502);
  } finally {
    if (savedUrl) process.env.CONTACT_WEBHOOK_URL = savedUrl;
    else delete process.env.CONTACT_WEBHOOK_URL;
    if (savedToken) process.env.CONTACT_WEBHOOK_TOKEN = savedToken;
    else delete process.env.CONTACT_WEBHOOK_TOKEN;
  }
});
