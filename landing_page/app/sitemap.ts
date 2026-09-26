import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/developers`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
