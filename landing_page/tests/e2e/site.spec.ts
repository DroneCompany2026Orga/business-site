import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("landing page renders without overflow or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "One operating",
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
test("simulation controls, scenarios, and node inspection work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#simulation");
  await expect(
    page.getByRole("button", { name: "Play simulation", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Play simulation", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Pause simulation", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Pause simulation", exact: true })
    .click();
  await page.getByLabel("Simulation scenario").selectOption("infrastructure");
  await expect(page.getByText("UTILITY CORRIDOR / INSPECTION")).toBeVisible();
  await page
    .getByRole("button", { name: "Inspect A-03, air, connected", exact: true })
    .click();
  await expect(page.locator(".selected-telemetry")).toContainText("NODE A-03");
  await page
    .getByRole("button", { name: "Reset simulation", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Play simulation", exact: true }),
  ).toBeVisible();
  await page.getByLabel("Simulation scenario").selectOption("search");
  await expect(page.getByText("SEARCH GRID / AREA COVERAGE")).toBeVisible();
});
test("scenario links select the matching simulation", async ({ page }) => {
  await page.goto("/?scenario=infrastructure#simulation");
  await expect(page.getByLabel("Simulation scenario")).toHaveValue(
    "infrastructure",
  );
});
test("resilience control updates the topology", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Disconnect a node" }).click();
  await expect(page.getByRole("status")).toContainText(
    "07 NODES / MESH RECONNECTED",
  );
  await page.getByRole("button", { name: "Restore node" }).click();
  await expect(page.getByRole("status")).toContainText(
    "08 NODES / MESH CONNECTED",
  );
});
test("expanded simulation contains keyboard focus and closes with Escape", async ({
  page,
}) => {
  await page.goto("/#simulation");
  await page
    .getByRole("button", { name: "Expand simulation", exact: true })
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Expanded swarm simulation",
  });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByLabel("Simulation scenario")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Reduce simulation" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Expand simulation", exact: true }),
  ).toBeFocused();
});
test("contact preview downloads a real inquiry and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.locator(".nav-cta");
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Your name").fill("Alex Example");
  await dialog.getByLabel("Work email").fill("alex@example.com");
  await dialog.getByLabel("Organization").fill("Example Robotics");
  await dialog
    .getByLabel("What are you working on?")
    .fill("We would like to connect aerial and ground systems.");
  const download = page.waitForEvent("download");
  await dialog.getByRole("button", { name: "Download inquiry" }).click();
  expect((await download).suggestedFilename()).toMatch(/inquiry\.txt$/);
  await expect(dialog.getByRole("status")).toContainText(
    "Your inquiry is ready",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("mobile menu supports navigation and escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Simulation" })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeVisible();
  await expect(page).toHaveURL(/#simulation$/);
});
test("page and dialog pass automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.locator(".nav-cta").click();
  const modal = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(modal.violations).toEqual([]);
});
test("guide and metadata endpoints resolve", async ({ page, request }) => {
  await page.goto("/developers");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A common interface",
  );
  for (const route of [
    "/icon.svg",
    "/opengraph-image",
    "/robots.txt",
    "/sitemap.xml",
  ]) {
    expect((await request.get(route)).status()).toBe(200);
  }
});
