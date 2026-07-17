import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners } from "@/components/site-partners"
import { SiteServices } from "@/components/site-services"
import { SiteTestimonials } from "@/components/site-testimonials"
import { SiteWhyProcess } from "@/components/site-why-process"

export const metadata: Metadata = {
  title: "KVC Global — Du học Singapore, Khóa học Online, Training Employment Pass",
  description:
    "Định hướng tương lai của bạn với KVC Global — đơn vị hàng đầu về du học Singapore, chương trình khóa học online quốc tế, và Training Employment Pass.",
  openGraph: {
    title: "KVC Global — Du học Singapore, Khóa học Online, Training Employment Pass",
    description:
      "Định hướng tương lai của bạn với KVC Global — đơn vị hàng đầu về du học Singapore, chương trình khóa học online quốc tế, và Training Employment Pass.",
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
    title: "KVC Global — Du học Singapore, Khóa học Online, Training Employment Pass",
    description:
      "Định hướng tương lai của bạn với KVC Global — đơn vị hàng đầu về du học Singapore, chương trình khóa học online quốc tế, và Training Employment Pass.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function Page() {
  return (
    <>
      <SiteHero />
      <SitePartners />
      <SiteAbout />
      <SiteServices />
      <SiteWhyProcess />
      <SiteTestimonials />
    </>
  )
}

// TODO: replace with feature flag check (e.g. `if (flags.showLanding) return <SiteLanding />`)
// export default function Page() {
//   redirect("/coming-soon")
// }
