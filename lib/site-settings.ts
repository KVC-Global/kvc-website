import type { Locale } from "@/lib/i18n-server"
import en from "@/messages/en.json"
import vi from "@/messages/vi.json"

export type SiteLink = {
  destination?: string
  customHref?: string
}

export type SiteNavChild = {
  _key?: string
  label?: string
  href?: string
  link?: SiteLink
  description?: string
  isComingSoon?: boolean
}

export type SiteNavItem = SiteNavChild & {
  children?: SiteNavChild[]
}

export type SiteCtaButton = {
  label?: string
  href?: string
  link?: SiteLink
}

export type SiteFooterColumn = {
  heading?: string
  links?: SiteNavChild[]
}

export type CompanyPhone = {
  _key?: string
  label?: string
  number?: string
}

export type CompanySocialLink = {
  _key?: string
  network?: "facebook" | "linkedin" | "youtube" | "instagram"
  url?: string
}

export type CompanyInfo = {
  phones?: CompanyPhone[]
  email?: string
  address?: string
  mapUrl?: string
  socialLinks?: CompanySocialLink[]
}

export type SiteSettings = {
  header?: {
    comingSoonLabel?: string
    navItems?: SiteNavItem[]
    cta?: SiteCtaButton
  }
  footer?: {
    bio?: string
    cta?: {
      enabled?: boolean
      title?: string
      description?: string
      primaryButton?: SiteCtaButton
      secondaryButton?: SiteCtaButton
    }
    servicesColumn?: SiteFooterColumn
    aboutColumn?: SiteFooterColumn
    supportColumn?: SiteFooterColumn
    contactHeading?: string
    legalLinks?: SiteNavChild[]
    copyrightNotice?: string
  }
  company?: CompanyInfo
}

const dictionaries = { vi, en } as const

const prefixHref = (href: string, locale: Locale) => {
  if (
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href
  }
  const prefix = locale === "en" ? "/en" : "/vi"
  if (href === "/") return prefix
  return `${prefix}${href}`
}

export function sanitizeHref(href?: string) {
  if (!href) return "#"
  const value = href.trim()
  if (
    /^(\/(?!\/)[^\s]*|#[^\s]*|https:\/\/[^\s]+|mailto:[^\s@]+@[^\s@]+\.[^\s@]+|tel:\+?[0-9().\-\s]+)$/i.test(
      value
    )
  ) {
    return value
  }
  return "#"
}

const destinationHrefs: Record<string, string> = {
  home: "/",
  about: "/gioi-thieu",
  workPass: "/work-pass",
  studyAbroad: "/du-hoc",
  uniMaster: "/du-hoc/dai-hoc-thac-si",
  privateStudy: "/du-hoc/tu-thuc",
  publicStudy: "/du-hoc/cong-lap",
  malaysiaStudy: "/du-hoc/malaysia",
  taiwanStudy: "/du-hoc/dai-loan",
  onlineCourses: "/khoa-hoc-online",
  ossd: "/khoa-hoc-online/ossd",
  othm: "/khoa-hoc-online/othm",
  qualifi: "/khoa-hoc-online/qualifi",
  wolverhampton: "/khoa-hoc-online/wolverhampton",
  enterprise: "/dich-vu",
  contact: "/lien-he",
  comingSoon: "/coming-soon",
}

export function resolveSiteHref(
  item: { href?: string; link?: SiteLink } | undefined,
  locale: Locale
) {
  const destination = item?.link?.destination
  const href =
    destination === "custom"
      ? item?.link?.customHref
      : destination
        ? destinationHrefs[destination]
        : item?.href
  return prefixHref(sanitizeHref(href), locale)
}

export function localizedHref(href: string | undefined, locale: Locale) {
  return prefixHref(sanitizeHref(href), locale)
}

export function phoneHref(number?: string) {
  if (!number) return undefined
  const normalized = number.replace(/[^\d+]/g, "")
  return normalized ? `tel:${normalized}` : undefined
}

export function fallbackSiteSettings(locale: Locale): SiteSettings {
  const t = dictionaries[locale]
  return {
    header: {
      comingSoonLabel: t.nav.studyAbroadDestinations.comingSoon,
      navItems: [
        { label: t.nav.home, href: "/" },
        { label: t.nav.about, href: "/gioi-thieu" },
        { label: t.nav.workPass, href: "/work-pass" },
        {
          label: t.nav.studyAbroad,
          href: "/du-hoc",
          children: [
            {
              label: t.nav.studyAbroadDestinations.diplomaSingapore,
              description: t.nav.studyAbroadDestinations.diplomaSingaporeDesc,
              href: "/du-hoc",
            },
            {
              label: t.nav.studyAbroadDestinations.uniMasterSingapore,
              description: t.nav.studyAbroadDestinations.uniMasterSingaporeDesc,
              href: "/du-hoc/dai-hoc-thac-si",
            },
            {
              label: t.nav.studyAbroadDestinations.privateAllAges,
              description: t.nav.studyAbroadDestinations.privateAllAgesDesc,
              href: "/du-hoc/tu-thuc",
            },
            {
              label: t.nav.studyAbroadDestinations.publicAllAges,
              description: t.nav.studyAbroadDestinations.publicAllAgesDesc,
              href: "/du-hoc/cong-lap",
            },
            {
              label: t.nav.studyAbroadDestinations.malaysia,
              description: t.nav.studyAbroadDestinations.malaysiaDesc,
              href: "/du-hoc/malaysia",
            },
            {
              label: t.nav.studyAbroadDestinations.taiwan,
              description: t.nav.studyAbroadDestinations.taiwanDesc,
              href: "/du-hoc/dai-loan",
            },
          ],
        },
        {
          label: t.nav.onlineCourses,
          href: "/khoa-hoc-online",
          children: [
            { label: t.nav.ossd, href: "/khoa-hoc-online/ossd" },
            { label: t.nav.othm, href: "/khoa-hoc-online/othm" },
            { label: t.nav.qualifi, href: "/khoa-hoc-online/qualifi" },
            {
              label: t.nav.wolverhampton,
              href: "/khoa-hoc-online/wolverhampton",
            },
          ],
        },
        { label: t.nav.enterprise, href: "/dich-vu" },
        { label: t.nav.contact, href: "/lien-he" },
      ],
      cta: { label: t.header.freeConsultation, href: "/lien-he" },
    },
    footer: {
      bio: t.footer.bio,
      cta: {
        enabled: true,
        title: t.footer.cta.title,
        description: t.footer.cta.description,
        primaryButton: { label: t.footer.cta.book, href: "/lien-he" },
        secondaryButton: { label: t.footer.cta.chat, href: "/lien-he" },
      },
      servicesColumn: {
        heading: t.footer.servicesHeading,
        links: [
          { label: t.footer.services.studyConsulting, href: "/du-hoc" },
          { label: t.footer.services.internship, href: "/work-pass" },
          { label: t.footer.services.incorporation, href: "/dich-vu" },
          { label: t.footer.services.immigration, href: "/lien-he" },
        ],
      },
      aboutColumn: {
        heading: t.footer.aboutHeading,
        links: [
          { label: t.footer.about.intro, href: "/gioi-thieu" },
          { label: t.footer.about.team, href: "/gioi-thieu" },
          { label: t.footer.about.partners, href: "/gioi-thieu" },
          { label: t.footer.about.values, href: "/gioi-thieu" },
          { label: t.footer.about.process, href: "/gioi-thieu" },
        ],
      },
      supportColumn: {
        heading: t.footer.supportHeading,
        links: [{ label: t.footer.support.faq, href: "/lien-he" }],
      },
      contactHeading: t.footer.contactHeading,
      legalLinks: [],
      copyrightNotice: "KVC Global. All rights reserved.",
    },
    company: {
      phones: [
        { label: "Vietnam", number: "+84 911 942 409" },
        { label: "Singapore", number: "+65 9742 1392" },
      ],
      email: "info@kvcglobal.vn",
      address: t.footer.addressVN,
      mapUrl:
        "https://maps.google.com/?q=65+L%C3%AA+L%E1%BB%A3i%2C+Qu%E1%BA%ADn+1",
      socialLinks: [
        { network: "facebook", url: "https://facebook.com/kvcglobal" },
        { network: "linkedin", url: "https://linkedin.com/company/kvcglobal" },
        { network: "youtube", url: "https://youtube.com/@kvcglobal" },
        { network: "instagram", url: "https://instagram.com/kvcglobal" },
      ],
    },
  }
}
