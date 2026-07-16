import type { Metadata } from "next"
import {
  Be_Vietnam_Pro,
  Inter,
  JetBrains_Mono,
  Montserrat,
} from "next/font/google"

import "../globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL("https://kvcglobal.com"),
  title: {
    default: "KVC Global",
    template: "%s",
  },
  description:
    "Định hướng tương lai của bạn với KVC Global — Du học Singapore, khóa học online quốc tế, Training Employment Pass.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "KVC Global",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/thumb-sharing.png"],
  },
}

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        inter.variable,
        montserrat.variable,
        beVietnam.variable,
        fontMono.variable,
      )}
    >
      <body className="flex min-h-svh flex-col bg-background text-foreground">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
