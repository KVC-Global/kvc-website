import type { Metadata } from "next"
import { OnlineProgramPage } from "@/components/online-program-page"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { ONLINE_PROGRAM_PAGE_QUERY } from "@/sanity/queries"
import type { OnlineProgramPageData } from "@/sanity/service-pages"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { data } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "ossd" } })
  const page = data as OnlineProgramPageData | null
  return {
    title: page?.seo?.title || "OSSD Ontario | KVC Global",
    description: page?.seo?.description || "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario.",
    openGraph: {
      title: page?.seo?.title || "OSSD Ontario | KVC Global",
      description: page?.seo?.description || "",
      images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "OSSD Ontario | KVC Global" }],
    },
    twitter: { card: "summary_large_image", title: page?.seo?.title || "OSSD Ontario | KVC Global", description: page?.seo?.description || "", images: ["/images/thumb-sharing.png"] },
  }
}

export default async function OssdPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "ossd" } })
  return <OnlineProgramPage data={data as OnlineProgramPageData | null || undefined} />
}
