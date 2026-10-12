import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { JetBrains_Mono, Plus_Jakarta_Sans, Urbanist } from "next/font/google"

import "lenis/dist/lenis.css"
import "./globals.css"
import { AnalyticsEvents } from "@/components/providers/analytics-events"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { LazyToaster } from "@/components/providers/lazy-toaster"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    siteConfig.name,
    siteConfig.role,
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Fintech",
    "Bengaluru",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6fc" },
    { media: "(prefers-color-scheme: dark)", color: "#141319" },
  ],
}

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" })
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  preload: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        urbanist.variable,
        jakarta.variable,
        jetbrainsMono.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            <Button
              asChild
              className="fixed top-3 left-3 z-[70] h-10 -translate-y-24 px-4 text-sm transition-transform focus-visible:translate-y-0"
            >
              <a href="#main">Skip to content</a>
            </Button>
            <SmoothScroll>{children}</SmoothScroll>
            <LazyToaster />
          </TooltipProvider>
        </ThemeProvider>
        <AnalyticsEvents />
        <Analytics />
      </body>
    </html>
  )
}
