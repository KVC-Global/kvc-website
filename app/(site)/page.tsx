import type { Metadata } from "next"

import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners } from "@/components/site-partners"
import { SiteServices } from "@/components/site-services"
import { SiteTestimonials } from "@/components/site-testimonials"
import { SiteWhyProcess } from "@/components/site-why-process"
import { sanityFetch } from "@/sanity/live"
import {
  PARTNERS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries"
import type {
  PARTNERS_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
  TESTIMONIALS_QUERY_RESULT,
} from "@/sanity.types"
import { getLocale } from "@/lib/i18n-server"

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

  const [partnersRes, servicesRes, testimonialsRes] = await Promise.all([
    sanityFetch({ query: PARTNERS_QUERY, params: { lang: locale } }),
    sanityFetch({ query: SERVICES_QUERY, params: { lang: locale } }),
    sanityFetch({ query: TESTIMONIALS_QUERY, params: { lang: locale } }),
  ])

  const partners = partnersRes.data as PARTNERS_QUERY_RESULT
  const services = servicesRes.data as SERVICES_QUERY_RESULT
  const testimonials = testimonialsRes.data as TESTIMONIALS_QUERY_RESULT

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
