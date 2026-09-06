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
    params: { lang: locale, type: "taiwanStudyPage" },
  })
  const taiwanStudy = data as StudyAbroadPageContent | null

  const title =
    taiwanStudy?.seo?.title ||
    (isEn ? "Study in Taiwan - KVC Global" : "Du học Đài Loan - KVC Global")

  const description =
    taiwanStudy?.seo?.description ||
    (isEn
      ? "Study in Taiwan with attractive scholarships, affordable tuition, strong technology programs, and work opportunities after graduation."
      : "Chương trình du học Đài Loan: học bổng hấp dẫn, chi phí học tập và sinh hoạt hợp lý, thế mạnh về đào tạo công nghệ và cơ hội việc làm sau tốt nghiệp.")

  const socialImage = taiwanStudy?.seo?.shareImage
    ? urlFor(taiwanStudy.seo.shareImage).width(1200).height(630).url()
    : "/images/thumb-sharing.png"

  return {
    title,
    description,
    alternates: localizedAlternates("/du-hoc/dai-loan", locale),
    openGraph: {
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Du học Đài Loan - KVC Global",
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

export default async function TaiwanStudyPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: STUDY_COUNTRY_PAGE_QUERY,
    params: { lang: locale, type: "taiwanStudyPage" },
  })
  const taiwanStudy = data as StudyAbroadPageContent | null

  return (
    <>
      <StudyAbroadHero content={taiwanStudy?.hero || undefined} />
      <StudyAbroadDetails content={taiwanStudy || undefined} />
    </>
  )
}
