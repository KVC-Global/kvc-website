import type { Metadata } from "next"
import { UniMasterStudyAbroadDetails } from "@/components/study-abroad/uni-master/uni-master-details"
import { UniMasterStudyAbroadHero } from "@/components/study-abroad/uni-master/uni-master-hero"
import { sanityFetch } from "@/sanity/live"
import { UNI_MASTER_PAGE_QUERY } from "@/sanity/queries"
import type { UniMasterPageContent } from "@/sanity/uni-master-page"
import { urlFor } from "@/sanity/image"
import { localizedAlternates } from "@/lib/seo"
import { getLocale } from "@/lib/i18n-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"
  const { data } = await sanityFetch({
    query: UNI_MASTER_PAGE_QUERY,
    params: { lang: locale },
  })
  const uniMaster = data as UniMasterPageContent | null

  const title =
    uniMaster?.seo?.title ||
    (isEn
      ? "Bachelor & Master's Programs in Singapore - KVC Global"
      : "Chương trình Đại học - Thạc sĩ tại Singapore - KVC Global")

  const description =
    uniMaster?.seo?.description ||
    (isEn
      ? "Personalized Bachelor and Master's pathways in Singapore. Diverse majors, flexible costs, and broad job opportunities."
      : "Tư vấn lộ trình đại học và thạc sĩ cá nhân hóa tại Singapore. Lựa chọn ngành học đa dạng, chi phí linh hoạt và cơ hội việc làm rộng mở.")

  const socialImage = uniMaster?.seo?.shareImage
    ? urlFor(uniMaster.seo.shareImage).width(1200).height(630).url()
    : "/images/thumb-sharing.png"

  return {
    title,
    description,
    alternates: localizedAlternates("/du-hoc/dai-hoc-thac-si", locale),
    openGraph: {
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Chương trình Đại học - Thạc sĩ tại Singapore - KVC Global",
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

export default async function UniMasterStudyAbroadPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: UNI_MASTER_PAGE_QUERY,
    params: { lang: locale },
  })
  const uniMaster = data as UniMasterPageContent | null

  return (
    <>
      <UniMasterStudyAbroadHero content={uniMaster?.hero} />
      <UniMasterStudyAbroadDetails content={uniMaster || undefined} />
    </>
  )
}
