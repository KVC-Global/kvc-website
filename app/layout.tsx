import { Be_Vietnam_Pro, Inter, Montserrat } from "next/font/google"

import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
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

const fontMono = Inter({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
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
                fontMono.variable,
                inter.variable,
                montserrat.variable,
                beVietnam.variable,
                "font-sans",
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
