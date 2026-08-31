import type { Metadata } from "next"
import { OnlineOthm } from "@/components/online-othm"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { ONLINE_OTHM_PAGE_QUERY, ONLINE_PROGRAM_PAGE_QUERY } from "@/sanity/queries"
import type { OnlineOthmPageData, OnlineProgramPageData } from "@/sanity/service-pages"
import { localizedAlternates } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { data: othmData } = await sanityFetch({ query: ONLINE_OTHM_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "othm" } })
  const page = (othmData || fallbackData) as OnlineOthmPageData | null
  return {
    title: page?.seo?.title || "OTHM | KVC Global",
    description: page?.seo?.description || "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global.",
    alternates: localizedAlternates("/khoa-hoc-online/othm", locale),
    openGraph: {
      title: page?.seo?.title || "OTHM | KVC Global",
      description: page?.seo?.description || "",
      images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "OTHM | KVC Global" }],
    },
    twitter: { card: "summary_large_image", title: page?.seo?.title || "OTHM | KVC Global", description: page?.seo?.description || "", images: ["/images/thumb-sharing.png"] },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const { data: othmData } = await sanityFetch({ query: ONLINE_OTHM_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "othm" } })
  const page = (othmData || fallbackData) as OnlineOthmPageData | null
  return <OnlineOthm data={page || undefined} />
}
