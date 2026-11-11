import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ChunkErrorReload } from "@/components/ChunkErrorReload"
import { Navigation } from "@/components/Navigation"
import { SiteAtmosphere } from "@/components/SiteAtmosphere"
import { SiteFooter } from "@/components/SiteFooter"
import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/lib/site"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/og-logo.png", width: 512, height: 512, alt: site.name }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistSans.className} ${geistMono.variable} bg-background antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChunkErrorReload />
          <SiteAtmosphere />
          <Navigation />
          <main className="relative bg-transparent">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
