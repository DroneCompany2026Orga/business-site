import { brand } from "./brand";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  title: `${brand.name} — The Operating System for Autonomous Swarms`,
  description:
    "A universal coordination platform connecting autonomous drones and robotic systems across manufacturers, environments and domains.",
  contactEnabled: Boolean(process.env.CONTACT_WEBHOOK_URL),
  navigation: [
    { label: "Platform", href: "/#platform" },
    { label: "Architecture", href: "/#architecture" },
    { label: "Simulation", href: "/#simulation" },
    { label: "Applications", href: "/#applications" },
    { label: "Vision", href: "/#vision" },
  ],
};
