import {
  Be_Vietnam_Pro,
  Inter,
  JetBrains_Mono,
  Montserrat,
} from "next/font/google"

import "../globals.css"
import { cn } from "@/lib/utils"

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

export const metadata = {
  metadataBase: new URL("https://kvcglobal.com"),
  title: "Coming Soon | KVC",
  description:
    "KVC is launching a new website. Stay tuned for our refreshed experience.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Coming Soon | KVC",
    description:
      "KVC is launching a new website. Stay tuned for our refreshed experience.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "Coming Soon | KVC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming Soon | KVC",
    description:
      "KVC is launching a new website. Stay tuned for our refreshed experience.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <body className="min-h-svh bg-black text-white">{children}</body>
    </html>
  )
}
