import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n-server"

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kvcglobal.com"

/**
 * Builds canonical + hreflang alternates for a bilingual route.
 *
 * URLs are relative and resolved against `metadataBase` from the site layout.
 *
 * @param path unprefixed route path, e.g. "/du-hoc/cong-lap" ("/" for home)
 * @param locale current request locale, used for the self-canonical URL
 */
export function localizedAlternates(
  path: string,
  locale: Locale
): NonNullable<Metadata["alternates"]> {
  const clean = path === "/" ? "" : path
  return {
    canonical: `/${locale}${clean}`,
    languages: {
      vi: `/vi${clean}`,
      en: `/en${clean}`,
      "x-default": `/vi${clean}`,
    },
  }
}
