# Swarm OS landing page

A complete Next.js App Router website for a hardware-agnostic robotics platform. Built with React, TypeScript, Tailwind CSS 4, self-hosted Geist fonts, Lucide, and custom SVG illustrations. The temporary brand is **NEXUS**; change it in one configuration file.

## Run locally

Use Node.js 20.9 or newer (Node 22/24 LTS recommended).

```bash
cd landing_page
npm install
npm run dev
```

Open http://localhost:3000. For repeatable installs, use `npm ci` with the included lockfile.

## Production

```bash
cp .env.example .env.local
# Set your public HTTPS origin and contact delivery endpoint.
npm run build
npm start
```

Deploy the directory to a Node.js-compatible Next.js host. This application uses a server route for contact delivery and is not a static-export application. No external font, image, map, or analytics service is needed.

Set `NEXT_PUBLIC_SITE_URL` to the real canonical origin before building (for example, `https://your-domain.com`). This configures social metadata, sitemap URLs, and the contact origin check. Rebuild after changing branding or public environment values.

### Contact delivery

The form works in two explicit modes:

- **Without `CONTACT_WEBHOOK_URL`:** visitors can prepare and download an inquiry as a text file. The interface clearly says the inquiry is not sent or stored.
- **With `CONTACT_WEBHOOK_URL`:** the server sends validated JSON to your HTTPS webhook. Set `CONTACT_WEBHOOK_TOKEN` if the receiver needs a bearer token. The receiver must durably accept the request and return a 2xx response. Wire it to your CRM or email delivery service.

The payload contains `name`, `email`, `organization`, `message`, `intent` (`demo` or `partnership`), and `submittedAt`. Secrets stay on the server. The endpoint rejects cross-origin and oversized requests, validates input, includes a honeypot, limits delivery time, and does not log inquiry contents. It also has a bounded per-process request counter. For a public multi-instance deployment, configure shared rate limiting at your hosting edge. Ensure the inquiry use statement matches your organization's data policy.

Restart/rebuild the application after enabling contact delivery so the rendered form and endpoint use the same configuration. Test successful and failed delivery against your real receiver before launch.

## Branding and content

- `config/brand.ts`: name, wordmark, optional logo URL/path, tagline, background, accent. All company-name references, footer copyright, icon, page titles, and social images use this configuration.
- `config/site.ts`: navigation, title, description, origin, contact availability.
- `components/`: individual narrative sections and reusable UI.
- `app/globals.css`: responsive design system, including mobile layouts, reduced-motion behavior, focus styles, and print rules. Tailwind is configured and available for extensions.
- `app/developers/page.tsx`: honest concept documentation rather than dead links to an unreleased SDK.

The default node logo and artwork are SVG. A custom logo can be placed under `public/` and referenced through `brand.logo`. The generated favicon retains the temporary node symbol; replace its SVG path in `app/icon.svg/route.ts` if your logo geometry changes. The brand colors remain configurable.

## Simulation

`components/SwarmSimulation.tsx` is isolated from the surrounding website. It supports play/pause, reset, scenario selection, expansion, and keyboard-accessible node inspection. All displayed telemetry is visibly labeled simulated.

`lib/simulation.ts` exports the `SimulationSnapshot` contract and deterministic `getSnapshot()` generator. The 36-second loop models discovery, a node joining, a detected observation, propagation, a ground task, a node leaving, and rejoining. Each scenario has its own environment and observation. Inactive or offscreen tabs pause updates; reduced-motion users start with a paused simulation and can explicitly play.

To connect real telemetry, replace the local tick and `getSnapshot()` source with a WebSocket subscription or REST hook returning `SimulationSnapshot`. Preserve stable node IDs, coordinate normalization, and connection state. Add reconnect/error/staleness UI before using it operationally. The site presents a conceptual distributed system, not a safety-critical vehicle control interface.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright starts the production server automatically. Tests cover viewport overflow, mobile navigation, simulation controls and inspection, the resilience demo, contact downloads, metadata routes, and automated WCAG accessibility checks on desktop and mobile. Unit tests verify simulation graph integrity across every scenario/tick and contact validation/error handling. Run browser tests without contact delivery configured to exercise the downloadable preview flow.

Use your own runtime QA for target devices and your deployment-specific contact receiver before public launch. No customer logos, partners, deployment numbers, benchmarks, or released APIs are implied.
