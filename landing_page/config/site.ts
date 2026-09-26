import { brand } from "./brand";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  title: `${brand.name} — The Operating System for Autonomous Swarms`,
  description:
    "A universal coordination platform connecting autonomous drones and robotic systems across manufacturers, environments and domains.",
  contactEnabled: Boolean(process.env.CONTACT_WEBHOOK_URL),
  navigation: [
    { label: "Platform", href: `${basePath}/#platform` },
    { label: "Architecture", href: `${basePath}/#architecture` },
    { label: "Simulation", href: `${basePath}/#simulation` },
    { label: "Applications", href: `${basePath}/#applications` },
    { label: "Vision", href: `${basePath}/#vision` },
  ],
};
