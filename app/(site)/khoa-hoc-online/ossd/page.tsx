import type { Metadata } from "next"
import { OnlineOssd } from "@/components/online-ossd"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { ONLINE_OSSD_PAGE_QUERY, ONLINE_PROGRAM_PAGE_QUERY } from "@/sanity/queries"
import type { OnlineOssdPageData, OnlineProgramPageData } from "@/sanity/service-pages"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { data: ossdData } = await sanityFetch({ query: ONLINE_OSSD_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "ossd" } })
  const page = (ossdData || fallbackData) as OnlineOssdPageData | null
  return {
    title: page?.seo?.title || "OSSD Ontario | KVC Global",
    description: page?.seo?.description || "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario. Chương trình được công nhận quốc tế.",
    openGraph: {
      title: page?.seo?.title || "OSSD Ontario | KVC Global",
      description: page?.seo?.description || "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario.",
      images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "OSSD Ontario | KVC Global" }],
    },
    twitter: { card: "summary_large_image", title: page?.seo?.title || "OSSD Ontario | KVC Global", description: page?.seo?.description || "", images: ["/images/thumb-sharing.png"] },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const { data: ossdData } = await sanityFetch({ query: ONLINE_OSSD_PAGE_QUERY, params: { lang: locale } })
  const { data: fallbackData } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "ossd" } })
  const page = (ossdData || fallbackData) as OnlineOssdPageData | null
  return <OnlineOssd data={page || undefined} />
}
