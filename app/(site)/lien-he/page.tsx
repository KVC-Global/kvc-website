import type {Metadata} from "next"

import {ContactPage} from "@/components/contact-page"
import {getLocale} from "@/lib/i18n-server"
import type {ContactPageData} from "@/sanity/content-pages"
import {sanityFetch} from "@/sanity/live"
import {CONTACT_PAGE_QUERY} from "@/sanity/queries"
import { localizedAlternates } from "@/lib/seo"

const fallbackMetadata: Metadata = {
  title: "Liên hệ - KVC Global",
  description: "Liên hệ với KVC Global để được tư vấn về du học Singapore, khóa học online quốc tế, Training Employment Pass và các dịch vụ định cư tại Singapore.",
}

async function getContactPage() {
  const locale = await getLocale()
  const {data} = await sanityFetch({query: CONTACT_PAGE_QUERY, params: {lang: locale}})
  return data as ContactPageData | null
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const page = await getContactPage()
  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
    alternates: localizedAlternates("/lien-he", locale),
    openGraph: {
      title: page?.seo?.title || fallbackMetadata.title || undefined,
      description: page?.seo?.description || fallbackMetadata.description || undefined,
    },
  }
}

export default async function ContactRoutePage() {
  const page = await getContactPage()
  return <ContactPage content={page || undefined} />
}
