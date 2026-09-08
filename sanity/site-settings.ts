import type { Locale } from "@/lib/i18n-server"
import { fallbackSiteSettings, type SiteSettings } from "@/lib/site-settings"
import { sanityFetch } from "@/sanity/live"
import { SITE_SETTINGS_QUERY } from "@/sanity/queries"

export type { SiteSettings } from "@/lib/site-settings"

function mergeDefined<T extends object>(
  base: T | undefined,
  override: T | undefined
): T {
  const definedOverride = Object.fromEntries(
    Object.entries(override || {}).filter(
      ([, value]) => value !== null && value !== undefined
    )
  ) as Partial<T>
  return { ...base, ...definedOverride } as T
}

function mergeSiteSettings(
  cms: SiteSettings | null,
  locale: Locale
): SiteSettings {
  const fallback = fallbackSiteSettings(locale)
  if (!cms) return fallback

  const header = mergeDefined(fallback.header, cms.header)
  const footer = mergeDefined(fallback.footer, cms.footer)
  const company = mergeDefined(fallback.company, cms.company)

  return {
    header: {
      ...header,
      navItems: cms.header?.navItems?.length
        ? cms.header.navItems
        : fallback.header?.navItems,
      cta: mergeDefined(fallback.header?.cta, cms.header?.cta),
    },
    footer: {
      ...footer,
      cta: {
        ...mergeDefined(fallback.footer?.cta, cms.footer?.cta),
        primaryButton: mergeDefined(
          fallback.footer?.cta?.primaryButton,
          cms.footer?.cta?.primaryButton
        ),
        secondaryButton: mergeDefined(
          fallback.footer?.cta?.secondaryButton,
          cms.footer?.cta?.secondaryButton
        ),
      },
      servicesColumn: mergeDefined(
        fallback.footer?.servicesColumn,
        cms.footer?.servicesColumn
      ),
      aboutColumn: mergeDefined(
        fallback.footer?.aboutColumn,
        cms.footer?.aboutColumn
      ),
      supportColumn: mergeDefined(
        fallback.footer?.supportColumn,
        cms.footer?.supportColumn
      ),
      legalLinks: cms.footer?.legalLinks ?? fallback.footer?.legalLinks,
    },
    company: {
      ...company,
      phones: cms.company?.phones ?? fallback.company?.phones,
      socialLinks: cms.company?.socialLinks ?? fallback.company?.socialLinks,
    },
  }
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      params: { lang: locale },
    })
    return mergeSiteSettings(data as SiteSettings | null, locale)
  } catch (error) {
    console.error("CMS site settings fetch failed, using fallback", error)
    return fallbackSiteSettings(locale)
  }
}
