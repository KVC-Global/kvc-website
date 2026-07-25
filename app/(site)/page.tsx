import type { Metadata } from "next"

import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners } from "@/components/site-partners"
import { SiteServices } from "@/components/site-services"
import { SiteTestimonials } from "@/components/site-testimonials"
import { SiteWhyProcess } from "@/components/site-why-process"
import { sanityFetch } from "@/sanity/live"
import {
  HOME_PAGE_QUERY,
  PARTNERS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries"
import type { HomePageData } from "@/sanity/home-page"
import { urlFor } from "@/sanity/image"
import type {
  PARTNERS_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
  TESTIMONIALS_QUERY_RESULT,
} from "@/sanity.types"
import { getLocale } from "@/lib/i18n-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"
  const { data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
    params: { lang: locale },
  })
  const home = data as HomePageData | null

  const title =
    home?.seo?.title ||
    (isEn
      ? "KVC Global — Study in Singapore, Online Courses, Training Employment Pass"
      : "KVC Global — Du học Singapore, Khóa học Online, Training Employment Pass")

  const description =
    home?.seo?.description ||
    (isEn
      ? "Shape your future with KVC Global — a leading provider of study in Singapore, international online courses, and Training Employment Pass."
      : "Định hướng tương lai của bạn với KVC Global — đơn vị hàng đầu về du học Singapore, chương trình khóa học online quốc tế, và Training Employment Pass.")
  const socialImage = home?.seo?.image
    ? urlFor(home.seo.image).width(1200).height(630).url()
    : "/images/thumb-sharing.png"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: socialImage,
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
      images: [socialImage],
    },
  }
}

export default async function Page() {
  const locale = await getLocale()

  const [homeRes, partnersRes, servicesRes, testimonialsRes] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY, params: { lang: locale } }),
    sanityFetch({ query: PARTNERS_QUERY, params: { lang: locale } }),
    sanityFetch({ query: SERVICES_QUERY, params: { lang: locale } }),
    sanityFetch({ query: TESTIMONIALS_QUERY, params: { lang: locale } }),
  ])

  const home = homeRes.data as HomePageData | null
  const partners = (home?.featuredPartners?.length
    ? home.featuredPartners
    : partnersRes.data) as PARTNERS_QUERY_RESULT
  const services = (home?.featuredServices?.length
    ? home.featuredServices
    : servicesRes.data) as SERVICES_QUERY_RESULT
  const testimonials = (home?.featuredTestimonials?.length
    ? home.featuredTestimonials
    : testimonialsRes.data) as TESTIMONIALS_QUERY_RESULT

  return (
    <>
      <SiteHero content={home?.hero} stats={home?.stats} />
      <SitePartners
        partners={partners?.length ? partners : undefined}
        content={home?.partnersContent}
      />
      <SiteAbout content={home?.about} />
      <SiteServices
        services={services?.length ? services : undefined}
        content={home?.servicesContent}
      />
      <SiteWhyProcess
        reasons={home?.whyReasons}
        processSteps={home?.processSteps}
        content={home?.whyProcessContent}
      />
      <SiteTestimonials
        testimonials={testimonials?.length ? testimonials : undefined}
        googleReviewsContent={home?.googleReviews}
        content={home?.testimonialsContent}
      />
    </>
  )
}
