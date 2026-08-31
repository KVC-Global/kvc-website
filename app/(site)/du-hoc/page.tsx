import type { Metadata } from "next"
import { StudyAbroadDetails } from "@/components/study-abroad/study-abroad-details"
import { StudyAbroadHero } from "@/components/study-abroad/study-abroad-hero"
import { sanityFetch } from "@/sanity/live"
import { STUDY_ABROAD_PAGE_QUERY } from "@/sanity/queries"
import type { StudyAbroadPageContent } from "@/sanity/study-abroad-page"
import { urlFor } from "@/sanity/image"
import { localizedAlternates } from "@/lib/seo"
import { getLocale } from "@/lib/i18n-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"
  const { data } = await sanityFetch({
    query: STUDY_ABROAD_PAGE_QUERY,
    params: { lang: locale },
  })
  const studyAbroad = data as StudyAbroadPageContent | null

  const title =
    studyAbroad?.seo?.title ||
    (isEn
      ? "Study in Singapore - KVC Global"
      : "Du học Singapore - KVC Global")

  const description =
    studyAbroad?.seo?.description ||
    (isEn
      ? "Diploma 6+6 study program in Singapore. Work and study, global certificate in 1 year with internship allowance of 800 - 1,500 SGD/month."
      : "Chương trình du học Diploma 6+6 tại Singapore. Vừa học vừa làm, lấy bằng quốc tế chỉ trong 1 năm với trợ cấp thực tập 800 - 1.500 SGD/tháng.")

  const socialImage = studyAbroad?.seo?.shareImage
    ? urlFor(studyAbroad.seo.shareImage).width(1200).height(630).url()
    : "/images/thumb-sharing.png"

  return {
    title,
    description,
    alternates: localizedAlternates("/du-hoc", locale),
    openGraph: {
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Du học Singapore - KVC Global",
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

export default async function StudyAbroadPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: STUDY_ABROAD_PAGE_QUERY,
    params: { lang: locale },
  })
  const studyAbroad = data as StudyAbroadPageContent | null

  return (
    <>
      <StudyAbroadHero content={studyAbroad?.hero || undefined} />
      <StudyAbroadDetails content={studyAbroad || undefined} />
    </>
  )
}
