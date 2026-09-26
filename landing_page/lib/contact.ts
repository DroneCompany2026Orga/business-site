export type Inquiry = {
  name: string;
  email: string;
  organization: string;
  message: string;
  intent: "demo" | "partnership";
  website?: string;
};
export function validateInquiry(input: unknown): Inquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const data = input as Record<string, unknown>;
  for (const [key, min, max] of [
    ["name", 1, 100],
    ["email", 3, 254],
    ["organization", 1, 200],
    ["message", 10, 3000],
  ] as const) {
    if (
      typeof data[key] !== "string" ||
      data[key].trim().length < min ||
      data[key].length > max
    )
      return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) return null;
  if (data.intent !== "demo" && data.intent !== "partnership") return null;
  return {
    name: (data.name as string).trim(),
    email: (data.email as string).trim(),
    organization: (data.organization as string).trim(),
    message: (data.message as string).trim(),
    intent: data.intent,
    website: typeof data.website === "string" ? data.website : undefined,
  };
}
