import type { NextConfig } from "next";
const pagesBuild = process.env.GITHUB_PAGES_BUILD === "1";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const basePath = pagesBuild ? new URL(siteUrl).pathname.replace(/\/$/, "") : "";
const nextConfig: NextConfig = {
  output: pagesBuild ? "export" : "standalone",
  ...(pagesBuild ? { basePath, trailingSlash: true } : {}),
  poweredByHeader: false,
  ...(!pagesBuild && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=()",
            },
          ],
        },
      ];
    },
  }),
};
export default nextConfig;
