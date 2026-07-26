import type { Metadata } from "next"

import { AboutPage } from "@/components/about-page"
import { getLocale } from "@/lib/i18n-server"
import type { AboutPageData } from "@/sanity/content-pages"
import { urlFor } from "@/sanity/image"
import { sanityFetch } from "@/sanity/live"
import { ABOUT_PAGE_QUERY } from "@/sanity/queries"

const fallbackMetadata: Metadata = {
  title: "Giới thiệu - KVC Global",
  description:
    "Giới thiệu về KVC Global, đội ngũ chuyên gia và các dịch vụ hỗ trợ du học, việc làm và định cư tại Singapore.",
}

async function getAboutPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    params: { lang: locale },
  })
  return data as AboutPageData | null
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage()
  const title = page?.seo?.title || fallbackMetadata.title
  const description = page?.seo?.description || fallbackMetadata.description
  const socialImage = page?.seo?.image
    ? urlFor(page.seo.image).width(1200).height(630).url()
    : "/images/thumb-sharing.png"

  return {
    title,
    description,
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      images: [
        { url: socialImage, width: 1200, height: 630, alt: "KVC Global" },
      ],
    },
    twitter: { card: "summary_large_image", images: [socialImage] },
  }
}

export default async function AboutRoutePage() {
  const page = await getAboutPage()
  return <AboutPage content={page || undefined} />
}
