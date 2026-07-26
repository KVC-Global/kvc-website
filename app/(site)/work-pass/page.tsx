import type { Metadata } from "next"
import { WorkPassDetails } from "@/components/work-pass/work-pass-details"
import { WorkPassHero } from "@/components/work-pass/work-pass-hero"
import { sanityFetch } from "@/sanity/live"
import { WORK_PASS_PAGE_QUERY } from "@/sanity/queries"
import type { WorkPassPageData } from "@/sanity/work-pass-page"
import { urlFor } from "@/sanity/image"
import { getLocale } from "@/lib/i18n-server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isEn = locale === "en"
  const { data } = await sanityFetch({
    query: WORK_PASS_PAGE_QUERY,
    params: { lang: locale },
  })
  const workPass = data as WorkPassPageData | null

  const title =
    workPass?.seo?.title ||
    (isEn
      ? "TEP - Training Employment Pass Singapore - KVC Global"
      : "TEP - Training Employment Pass Singapore - KVC Global")

  const description =
    workPass?.seo?.description ||
    (isEn
      ? "Opportunities to work and gain practical experience in Singapore for international students and potential young people."
      : "Cơ hội làm việc và tích lũy kinh nghiệm thực tế tại Singapore cho sinh viên quốc tế và người trẻ có tiềm năng.")

  const socialImage = workPass?.seo?.image
    ? urlFor(workPass.seo.image).width(1200).height(630).url()
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
          alt: "TEP - Training Employment Pass Singapore - KVC Global",
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

export default async function WorkPassPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: WORK_PASS_PAGE_QUERY,
    params: { lang: locale },
  })
  const workPass = data as WorkPassPageData | null

  return (
    <>
      <WorkPassHero content={workPass?.hero || undefined} />
      <WorkPassDetails content={workPass || undefined} />
    </>
  )
}
