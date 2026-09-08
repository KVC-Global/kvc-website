import type { Metadata } from "next"
import { OnlineWolverhampton } from "@/components/online-wolverhampton"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { ONLINE_WOLVERHAMPTON_PAGE_QUERY, ONLINE_PROGRAM_PAGE_QUERY } from "@/sanity/queries"
import type { OnlineWolverhamptonPageData, OnlineProgramPageData } from "@/sanity/service-pages"
import { localizedAlternates } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { data: wolverhamptonData } = await sanityFetch({ query: ONLINE_WOLVERHAMPTON_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "wolverhampton" } })
  const page = (wolverhamptonData || fallbackData) as OnlineWolverhamptonPageData | null
  return {
    title: page?.seo?.title || "University of Wolverhampton | KVC Global",
    description: page?.seo?.description || "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton.",
    alternates: localizedAlternates("/khoa-hoc-online/wolverhampton", locale),
    openGraph: {
      title: page?.seo?.title || "University of Wolverhampton | KVC Global",
      description: page?.seo?.description || "",
      images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "University of Wolverhampton | KVC Global" }],
    },
    twitter: { card: "summary_large_image", title: page?.seo?.title || "University of Wolverhampton | KVC Global", description: page?.seo?.description || "", images: ["/images/thumb-sharing.png"] },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const { data: wolverhamptonData } = await sanityFetch({ query: ONLINE_WOLVERHAMPTON_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "wolverhampton" } })
  const page = (wolverhamptonData || fallbackData) as OnlineWolverhamptonPageData | null
  return <OnlineWolverhampton data={page || undefined} />
}
