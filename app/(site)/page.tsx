import type { Metadata } from "next"

import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners, type SanityPartner } from "@/components/site-partners"
import { SiteServices, type SanityService } from "@/components/site-services"
import {
  SiteTestimonials,
  type SanityTestimonial,
} from "@/components/site-testimonials"
import { SiteWhyProcess } from "@/components/site-why-process"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { HOME_PAGE_QUERY } from "@/sanity/queries"

type HomePageData = {
  partners: SanityPartner[] | null
  services: SanityService[] | null
  testimonials: SanityTestimonial[] | null
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"

  const title = isEn
    ? "KVC Global — Study in Singapore, Online Courses, Training Employment Pass"
    : "KVC Global — Du học Singapore, Khóa học Online, Training Employment Pass"

  const description = isEn
    ? "Shape your future with KVC Global — a leading provider of study in Singapore, international online courses, and Training Employment Pass."
    : "Định hướng tương lai của bạn với KVC Global — đơn vị hàng đầu về du học Singapore, chương trình khóa học online quốc tế, và Training Employment Pass."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: ["/images/thumb-sharing.png"],
    },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
    params: { lang: locale },
  })
  const { partners, services, testimonials } = data as HomePageData

  return (
    <>
      <SiteHero />
      <SitePartners partners={partners?.length ? partners : undefined} />
      <SiteAbout />
      <SiteServices services={services?.length ? services : undefined} />
      <SiteWhyProcess />
      <SiteTestimonials
        testimonials={testimonials?.length ? testimonials : undefined}
      />
    </>
  )
}
