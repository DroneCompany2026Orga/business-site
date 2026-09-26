import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl || new URL(siteUrl).protocol !== "https:") {
  throw new Error(
    "Set NEXT_PUBLIC_SITE_URL to the full HTTPS GitHub Pages URL.",
  );
}
const basePath = new URL(siteUrl).pathname.replace(/\/$/, "");
const stage = await mkdtemp(join(root, ".pages-build-"));
try {
  for (const name of [
    "app",
    "components",
    "config",
    "lib",
    "next.config.ts",
    "postcss.config.mjs",
    "tsconfig.json",
    "package.json",
    "next-env.d.ts",
  ]) {
    await cp(join(root, name), join(stage, name), { recursive: true });
  }
  if (existsSync(join(root, "public"))) {
    await cp(join(root, "public"), join(stage, "public"), { recursive: true });
  }
  const dependencies = spawnSync(
    "cp",
    ["-al", join(root, "node_modules"), join(stage, "node_modules")],
    { stdio: "inherit" },
  );
  if (dependencies.status !== 0) {
    throw new Error("Could not stage installed dependencies.");
  }
  await rm(join(stage, "app/api"), { recursive: true });
  const layoutPath = join(stage, "app/layout.tsx");
  const layout = await readFile(layoutPath, "utf8");
  const runtimeSetting = 'export const dynamic = "force-dynamic";';
  if (!layout.includes(runtimeSetting)) {
    throw new Error("Expected the runtime layout setting in app/layout.tsx.");
  }
  await writeFile(layoutPath, layout.replace(runtimeSetting, ""));
  const build = spawnSync(
    process.execPath,
    [join(stage, "node_modules/next/dist/bin/next"), "build", "--webpack"],
    {
      cwd: stage,
      env: {
        ...process.env,
        GITHUB_PAGES_BUILD: "1",
        NEXT_PUBLIC_BASE_PATH: basePath,
        CONTACT_WEBHOOK_URL: "",
        CONTACT_WEBHOOK_TOKEN: "",
      },
      stdio: "inherit",
    },
  );
  if (build.status !== 0) {
    throw new Error(
      `GitHub Pages build failed (${build.status ?? build.signal}).`,
    );
  }
  await rm(join(root, "out"), { recursive: true, force: true });
  await cp(join(stage, "out"), join(root, "out"), { recursive: true });
  await writeFile(join(root, "out/.nojekyll"), "");
} finally {
  await rm(stage, { recursive: true, force: true });
}
