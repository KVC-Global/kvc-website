import type { Metadata } from "next"
import { OnlineQualifi } from "@/components/online-qualifi"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { ONLINE_QUALIFI_PAGE_QUERY, ONLINE_PROGRAM_PAGE_QUERY } from "@/sanity/queries"
import type { OnlineQualifiPageData, OnlineProgramPageData } from "@/sanity/service-pages"
import { localizedAlternates } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { data: qualifiData } = await sanityFetch({ query: ONLINE_QUALIFI_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "qualifi" } })
  const page = (qualifiData || fallbackData) as OnlineQualifiPageData | null
  return {
    title: page?.seo?.title || "QUALIFI | KVC Global",
    description: page?.seo?.description || "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global.",
    alternates: localizedAlternates("/khoa-hoc-online/qualifi", locale),
    openGraph: {
      title: page?.seo?.title || "QUALIFI | KVC Global",
      description: page?.seo?.description || "",
      images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "QUALIFI | KVC Global" }],
    },
    twitter: { card: "summary_large_image", title: page?.seo?.title || "QUALIFI | KVC Global", description: page?.seo?.description || "", images: ["/images/thumb-sharing.png"] },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const { data: qualifiData } = await sanityFetch({ query: ONLINE_QUALIFI_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "qualifi" } })
  const page = (qualifiData || fallbackData) as OnlineQualifiPageData | null
  return <OnlineQualifi data={page || undefined} />
}
