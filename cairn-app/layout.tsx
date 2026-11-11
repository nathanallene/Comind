import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RefineApp } from "@/components/RefineApp";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Client software, AI, and embedded systems`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: `${site.name} · Client software, AI, and embedded systems`,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#e7e2d6",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  description: site.description,
  url: site.url,
  knowsAbout: [
    "Custom software development",
    "AI optimization",
    "Embedded Linux",
    "NVIDIA Jetson",
    "Raspberry Pi",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <RefineApp>
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </RefineApp>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
