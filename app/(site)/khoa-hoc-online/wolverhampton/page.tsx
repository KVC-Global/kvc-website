import type { Metadata } from "next"
import { OnlineWolverhampton } from "@/components/online-wolverhampton"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { ONLINE_PROGRAM_PAGE_QUERY } from "@/sanity/queries"
import type { OnlineProgramPageData } from "@/sanity/service-pages"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { data } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "wolverhampton" } })
  const page = data as OnlineProgramPageData | null
  return {
    title: page?.seo?.title || "Wolverhampton | KVC Global",
    description: page?.seo?.description || "",
    openGraph: {
      title: page?.seo?.title || "Wolverhampton | KVC Global",
      description: page?.seo?.description || "",
      images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "Wolverhampton | KVC Global" }],
    },
    twitter: { card: "summary_large_image", title: page?.seo?.title || "Wolverhampton | KVC Global", description: page?.seo?.description || "", images: ["/images/thumb-sharing.png"] },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const { data } = await sanityFetch({ query: ONLINE_PROGRAM_PAGE_QUERY, params: { lang: locale, slug: "wolverhampton" } })
  return <OnlineWolverhampton data={data as OnlineProgramPageData | null || undefined} />
}
