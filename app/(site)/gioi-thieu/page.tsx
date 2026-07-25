import type { Metadata } from "next"

import { AboutPage } from "@/components/about-page"
import type { SanityPartner } from "@/components/site-partners"
import { getLocale } from "@/lib/i18n-server"
import { sanityFetch } from "@/sanity/live"
import { PARTNERS_QUERY } from "@/sanity/queries"

export const metadata: Metadata = {
  title: "Giới thiệu - KVC Global",
  description:
    "Giới thiệu về KVC Global, đội ngũ chuyên gia và các dịch vụ hỗ trợ du học, việc làm và định cư tại Singapore.",
}

export default async function AboutRoutePage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: PARTNERS_QUERY,
    params: { lang: locale },
  })
  const partners = data as SanityPartner[] | null

  return <AboutPage partners={partners?.length ? partners : undefined} />
}
