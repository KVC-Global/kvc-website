import type { Metadata } from "next"
import { PrivateStudyAbroadDetails } from "@/components/study-abroad/private/private-details"
import { PrivateStudyAbroadHero } from "@/components/study-abroad/private/private-hero"
import { sanityFetch } from "@/sanity/live"
import { PRIVATE_STUDY_PAGE_QUERY } from "@/sanity/queries"
import type { PrivateStudyPageContent } from "@/sanity/private-study-page"
import { urlFor } from "@/sanity/image"
import { getLocale } from "@/lib/i18n-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"
  const { data } = await sanityFetch({
    query: PRIVATE_STUDY_PAGE_QUERY,
    params: { lang: locale },
  })
  const privateStudy = data as PrivateStudyPageContent | null

  const title =
    privateStudy?.seo?.title ||
    (isEn
      ? "Private Schools Study in Singapore - KVC Global"
      : "Du học tư thục Singapore - KVC Global")

  const description =
    privateStudy?.seo?.description ||
    (isEn
      ? "International school systems in Singapore welcoming pupils from Early Years to Grade 12 (18 months to 18 years old) with international standards."
      : "Hệ thống trường quốc tế tại Singapore đón nhận học sinh từ bậc mầm non đến hết trung học phổ thông (18 tháng đến 18 tuổi) với lộ trình chuẩn quốc tế.")

  const socialImage = privateStudy?.seo?.shareImage
    ? urlFor(privateStudy.seo.shareImage).width(1200).height(630).url()
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
          alt: "Du học tư thục Singapore - KVC Global",
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

export default async function PrivateStudyAbroadPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: PRIVATE_STUDY_PAGE_QUERY,
    params: { lang: locale },
  })
  const privateStudy = data as PrivateStudyPageContent | null

  return (
    <>
      <PrivateStudyAbroadHero content={privateStudy?.hero} />
      <PrivateStudyAbroadDetails content={privateStudy || undefined} />
    </>
  )
}
