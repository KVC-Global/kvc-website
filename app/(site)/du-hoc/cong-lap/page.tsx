import type { Metadata } from "next"
import { PublicStudyAbroadDetails } from "@/components/study-abroad/public/public-details"
import { PublicStudyAbroadHero } from "@/components/study-abroad/public/public-hero"
import { sanityFetch } from "@/sanity/live"
import { PUBLIC_STUDY_PAGE_QUERY } from "@/sanity/queries"
import type { PublicStudyPageContent } from "@/sanity/public-study-page"
import { urlFor } from "@/sanity/image"
import { getLocale } from "@/lib/i18n-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"
  const { data } = await sanityFetch({
    query: PUBLIC_STUDY_PAGE_QUERY,
    params: { lang: locale },
  })
  const publicStudy = data as PublicStudyPageContent | null

  const title =
    publicStudy?.seo?.title ||
    (isEn
      ? "Public Schools Study in Singapore - KVC Global"
      : "Du học công lập Singapore - KVC Global")

  const description =
    publicStudy?.seo?.description ||
    (isEn
      ? "World-leading public education system in Singapore under MOE management, from Primary to Pre-University/Polytechnic."
      : "Hệ thống giáo dục công lập Singapore hàng đầu thế giới dưới sự quản lý của MOE, từ bậc Tiểu học đến Dự bị Đại học/Polytechnic.")

  const socialImage = publicStudy?.seo?.shareImage
    ? urlFor(publicStudy.seo.shareImage).width(1200).height(630).url()
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
          alt: "Du học công lập Singapore - KVC Global",
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

export default async function PublicStudyAbroadPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: PUBLIC_STUDY_PAGE_QUERY,
    params: { lang: locale },
  })
  const publicStudy = data as PublicStudyPageContent | null

  return (
    <>
      <PublicStudyAbroadHero content={publicStudy?.hero} />
      <PublicStudyAbroadDetails content={publicStudy || undefined} />
    </>
  )
}
