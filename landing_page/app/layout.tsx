import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist-mono/400.css";
import "./globals.css";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { ContactProvider } from "@/components/ContactProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Read contact delivery configuration at runtime, including on /developers.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${brand.name}` },
  description: site.description,
  applicationName: brand.name,
  icons: { icon: "/icon.svg" },
  keywords: [
    "swarm robotics",
    "distributed autonomy",
    "drone coordination",
    "robot interoperability",
    "swarm operating system",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: brand.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
};
export const viewport: Viewport = {
  themeColor: brand.primaryColor,
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      style={
        {
          "--accent": brand.accentColor,
          "--background": brand.primaryColor,
        } as CSSProperties
      }
    >
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ContactProvider enabled={site.contactEnabled}>
          <Navbar />
          {children}
          <Footer />
        </ContactProvider>
      </body>
    </html>
  );
}
