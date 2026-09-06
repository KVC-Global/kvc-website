import type { Metadata } from "next"
import { StudyAbroadDetails } from "@/components/study-abroad/study-abroad-details"
import { StudyAbroadHero } from "@/components/study-abroad/study-abroad-hero"
import { sanityFetch } from "@/sanity/live"
import { STUDY_COUNTRY_PAGE_QUERY } from "@/sanity/queries"
import type { StudyAbroadPageContent } from "@/sanity/study-abroad-page"
import { urlFor } from "@/sanity/image"
import { localizedAlternates } from "@/lib/seo"
import { getLocale } from "@/lib/i18n-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"
  const { data } = await sanityFetch({
    query: STUDY_COUNTRY_PAGE_QUERY,
    params: { lang: locale, type: "malaysiaStudyPage" },
  })
  const malaysiaStudy = data as StudyAbroadPageContent | null

  const title =
    malaysiaStudy?.seo?.title ||
    (isEn ? "Study in Malaysia - KVC Global" : "Du học Malaysia - KVC Global")

  const description =
    malaysiaStudy?.seo?.description ||
    (isEn
      ? "Study in Malaysia with affordable tuition, English-medium education, internationally recognized degrees, and transfer pathways to third countries."
      : "Chương trình du học Malaysia: chi phí hợp lý, môi trường học bằng tiếng Anh, bằng cấp quốc tế và cơ hội chuyển tiếp sang các nước thứ ba.")

  const socialImage = malaysiaStudy?.seo?.shareImage
    ? urlFor(malaysiaStudy.seo.shareImage).width(1200).height(630).url()
    : "/images/thumb-sharing.png"

  return {
    title,
    description,
    alternates: localizedAlternates("/du-hoc/malaysia", locale),
    openGraph: {
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Du học Malaysia - KVC Global",
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

export default async function MalaysiaStudyPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: STUDY_COUNTRY_PAGE_QUERY,
    params: { lang: locale, type: "malaysiaStudyPage" },
  })
  const malaysiaStudy = data as StudyAbroadPageContent | null

  return (
    <>
      <StudyAbroadHero content={malaysiaStudy?.hero || undefined} />
      <StudyAbroadDetails content={malaysiaStudy || undefined} />
    </>
  )
}
