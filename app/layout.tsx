// import { Be_Vietnam_Pro, Inter, Montserrat } from "next/font/google"
//
// import "./globals.css"
// import { SiteFooter } from "@/components/site-footer"
// import { SiteHeader } from "@/components/site-header"
// import { ThemeProvider } from "@/components/theme-provider"
// import { cn } from "@/lib/utils"
//
// const inter = Inter({
//     subsets: ["latin", "vietnamese"],
//     variable: "--font-sans",
//     display: "swap",
// })
//
// const montserrat = Montserrat({
//     subsets: ["latin", "vietnamese"],
//     weight: ["500", "600", "700", "800"],
//     variable: "--font-montserrat",
//     display: "swap",
// })
//
// const beVietnam = Be_Vietnam_Pro({
//     subsets: ["latin", "vietnamese"],
//     weight: ["400", "500", "600", "700"],
//     variable: "--font-be-vietnam",
//     display: "swap",
// })
//
// const fontMono = Inter({
//     subsets: ["latin"],
//     variable: "--font-mono",
// })
//
// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode
// }>) {
//     return (
//         <html
//             lang="vi"
//             suppressHydrationWarning
//             className={cn(
//                 "antialiased",
//                 fontMono.variable,
//                 inter.variable,
//                 montserrat.variable,
//                 beVietnam.variable,
//                 "font-sans",
//             )}
//         >
//             <body className="flex min-h-svh flex-col bg-background text-foreground">
//                 <ThemeProvider>
//                     <SiteHeader />
//                     <main className="flex-1">{children}</main>
//                     <SiteFooter />
//                 </ThemeProvider>
//             </body>
//         </html>
//     )
// }
import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

// TẠM THỜI COMMENT ĐỐNG FONT GOOGLE LẠI ĐỂ BYPASS WI-FI LAG
/*
import { Be_Vietnam_Pro, Inter, Montserrat } from "next/font/google"

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
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      // Bỏ các biến font ảo (.variable), ép cứng font hệ thống đẹp của Ubuntu/Chrome vào
      className={cn("antialiased", "font-sans")}
      style={{
        // Ép đống font này làm dự phòng để layout không bị vỡ/lệch CSS và hiển thị lại chữ trắng
        // Khi nào mạng ngon ông mở lại font Google sau
        fontFamily:
          'Inter, "Be Vietnam Pro", Montserrat, system-ui, sans-serif',
      }}
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
