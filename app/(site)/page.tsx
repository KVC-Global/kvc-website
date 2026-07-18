import type { Metadata } from "next"

import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners } from "@/components/site-partners"
import { SiteServices } from "@/components/site-services"
import { SiteStatBar } from "@/components/site-stat-bar"
import { SiteTestimonials } from "@/components/site-testimonials"
import { SiteWhyProcess } from "@/components/site-why-process"
import { sanityFetch } from "@/sanity/live"
import { PARTNERS_QUERY, SERVICES_QUERY, TESTIMONIALS_QUERY } from "@/sanity/queries"

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

export default async function Page() {
  const [
    { data: partners },
    { data: services },
    { data: testimonials },
  ] = await Promise.all([
    sanityFetch({ query: PARTNERS_QUERY }),
    sanityFetch({ query: SERVICES_QUERY }),
    sanityFetch({ query: TESTIMONIALS_QUERY }),
  ])

  return (
    <>
      <SiteHero />
      <SiteStatBar />
      <SitePartners partners={partners?.length ? partners : undefined} />
      <SiteAbout />
      <SiteServices services={services?.length ? services : undefined} />
      <SiteWhyProcess />
      <SiteTestimonials testimonials={testimonials?.length ? testimonials : undefined} />
    </>
  )
}
