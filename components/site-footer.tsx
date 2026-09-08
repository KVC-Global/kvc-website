"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useLocale, useDictionary } from "@/lib/i18n-client"
import {
  fallbackSiteSettings,
  localizedHref,
  phoneHref,
  resolveSiteHref,
  sanitizeHref,
  type SiteSettings,
} from "@/lib/site-settings"

const ACCENT = "var(--color-brand-gold)"
const NAVY = "var(--color-brand-blue-mid)"

const CTA_IMAGE = "/footer-banner.png"

type SocialIconProps = {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}
type SocialLink = {
  label: string
  href: string
  icon: (props: SocialIconProps) => React.ReactElement
  /** Optical size compensation, e.g. circles read smaller than squares. */
  iconClassName?: string
}

const SOCIAL_LINKS: ReadonlyArray<SocialLink & { network: string }> = [
  {
    network: "facebook",
    label: "Facebook",
    href: "https://facebook.com/kvcglobal",
    iconClassName: "h-[25px] w-[25px]",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="2 2 20 20"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.8 8.43-4.94 8.43-9.94Z" />
      </svg>
    ),
  },
  {
    network: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/company/kvcglobal",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    network: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@kvcglobal",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.49 3.5 12 3.5 12 3.5s-7.49 0-9.37.56A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.13 2.14C4.51 20.5 12 20.5 12 20.5s7.49 0 9.37-.56a3.02 3.02 0 0 0 2.13-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z" />
      </svg>
    ),
  },
  {
    network: "instagram",
    label: "Instagram",
    href: "https://instagram.com/kvcglobal",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    ),
  },
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-primary capitalize">
      {children}
    </h3>
  )
}

function LinkList({
  links,
  className,
}: {
  links: ReadonlyArray<{
    label?: string
    href?: string
    openInNewTab?: boolean
  }>
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col gap-3 text-[15px]", className)}>
      {links.map((link) => (
        <li key={`${link.label}-${link.href}`}>
          <Link
            href={link.href || "#"}
            target={link.openInNewTab ? "_blank" : undefined}
            rel={link.openInNewTab ? "noopener noreferrer" : undefined}
            className="text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function CtaBanner({
  className,
  settings,
}: {
  className?: string
  settings?: SiteSettings["footer"]
}) {
  const t = useDictionary()
  const locale = useLocale()
  const cta = settings?.cta

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-lg",
        className
      )}
    >
      <div className="relative h-[360px] py-8 sm:h-[300px] sm:py-0 md:h-[280px]">
        <Image
          src={CTA_IMAGE}
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover object-[center_35%]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #FCE4C4 0%, #F8DCC2 25%, rgba(248,220,194,0.55) 45%, rgba(248,220,194,0.15) 60%, rgba(248,220,194,0) 72%)",
          }}
        />

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <h2
            id="footer-cta-heading"
            className="font-heading text-2xl leading-[1.15] font-bold tracking-tight text-primary uppercase sm:text-3xl md:text-[34px]"
          >
            {cta?.title || t.footer.cta.title}
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-[3px] w-16 rounded-full bg-brand-gold"
          />

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/80 sm:text-base">
            {cta?.description || t.footer.cta.description}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={resolveSiteHref(
                cta?.primaryButton || { href: "/lien-he" },
                locale
              )}
              className="group inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: NAVY }}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
              {cta?.primaryButton?.label || t.footer.cta.book}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>

            <Link
              href={resolveSiteHref(
                cta?.secondaryButton || { href: "/lien-he" },
                locale
              )}
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
              {cta?.secondaryButton?.label || t.footer.cta.chat}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function CollapsibleFooterSection({
  heading,
  className,
  children,
}: {
  heading: string
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const apply = () => setOpen(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return (
    <details
      open={open}
      onToggle={(event) => setOpen((event.target as HTMLDetailsElement).open)}
      className={cn("group", className)}
    >
      <summary className="relative -mx-2 flex cursor-pointer list-none items-center justify-between gap-3 px-2 pt-2 pb-3 transition-colors duration-200 ease-out after:absolute after:bottom-0 after:left-2 after:h-px after:w-[calc(100%-1rem)] after:bg-brand-blue-mid/15 hover:bg-foreground/[0.03] lg:pointer-events-none lg:cursor-default lg:after:w-1/2 lg:hover:bg-transparent [&::-webkit-details-marker]:hidden">
        <ColumnHeading>{heading}</ColumnHeading>
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-foreground/70 transition-transform duration-300 ease-out group-open:rotate-180 lg:hidden"
        />
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-4 lg:mt-5">{children}</div>
        </div>
      </div>
    </details>
  )
}

export function SiteFooter({
  className,
  settings,
  locale: serverLocale,
}: {
  className?: string
  settings?: SiteSettings
  locale?: string
}) {
  const locale = useLocale()
  const fallback = fallbackSiteSettings(locale)
  const isMismatched = !!serverLocale && locale !== serverLocale
  const footer = isMismatched
    ? fallback.footer
    : settings?.footer || fallback.footer
  const company = isMismatched
    ? fallback.company
    : settings?.company || fallback.company
  const columns = [
    footer?.servicesColumn,
    footer?.aboutColumn,
    footer?.supportColumn,
  ]
  const socialIconMap = Object.fromEntries(
    SOCIAL_LINKS.map((social) => [social.network, social])
  )

  return (
    <footer className={cn("bg-white text-foreground", className)}>
      {footer?.cta?.enabled !== false ? (
        <div className="px-4 pt-12 sm:px-6 sm:pt-16">
          <CtaBanner settings={footer} />
        </div>
      ) : null}

      <div className="w-full px-4 sm:px-6">
        <div className="mt-14 grid grid-cols-1 gap-10 pb-10 sm:mt-16 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Link
              href={localizedHref("/", locale)}
              aria-label="KVC Global"
              className="inline-flex items-center no-underline"
            >
              <Image
                src="/images/KVC_LOGO_SVG/Blue%20Horizontal%20Logo_KVC.svg.svg"
                alt="KVC Global"
                width={200}
                height={46}
                className="h-9 w-auto shrink-0 sm:h-11"
                loading="lazy"
              />
            </Link>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-foreground/75">
              {footer?.bio}
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {company?.socialLinks?.map((social) => {
                const socialConfig = social.network
                  ? socialIconMap[social.network]
                  : undefined
                const Icon = socialConfig?.icon
                if (!Icon || !social.url) return null
                return (
                  <li key={social._key || `${social.network}-${social.url}`}>
                    <a
                      href={sanitizeHref(social.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialConfig.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-mid/10 text-primary transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-primary focus-visible:-translate-y-0.5 focus-visible:text-primary focus-visible:outline-none"
                    >
                      <Icon className={cn("h-5 w-5", socialConfig.iconClassName)} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {columns.map((column, index) => (
            <CollapsibleFooterSection
              key={`${column?.heading}-${index}`}
              heading={column?.heading || ""}
              className="lg:col-span-2"
            >
              <LinkList
                links={(column?.links || []).map((link) => ({
                  label: link.label,
                  href: resolveSiteHref(link, locale),
                }))}
              />
            </CollapsibleFooterSection>
          ))}

          <CollapsibleFooterSection
            heading={
              footer?.contactHeading ||
              (locale === "en" ? "Contact" : "Liên hệ")
            }
            className="lg:col-span-3"
          >
            <ul className="flex flex-col gap-3 text-[15px]">
              {company?.phones?.map((phone) => {
                const href = phoneHref(phone.number)
                return (
                  <li
                    key={phone._key || `${phone.label}-${phone.number}`}
                    className="flex gap-3"
                  >
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2}
                      aria-hidden
                    />
                    {href ? (
                      <a
                        href={href}
                        className="text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                      >
                        {phone.label ? `${phone.label}: ` : ""}
                        {phone.number}
                      </a>
                    ) : null}
                  </li>
                )
              })}

              {company?.email ? (
                <li className="flex gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                    aria-hidden
                  />
                  <a
                    href={sanitizeHref(`mailto:${company.email}`)}
                    className="text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                  >
                    {company.email}
                  </a>
                </li>
              ) : null}

              {company?.address ? (
                <li className="flex gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                    aria-hidden
                  />
                  {company.mapUrl ? (
                    <a
                      href={sanitizeHref(company.mapUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                    >
                      {company.address}
                    </a>
                  ) : (
                    <span className="text-foreground/80">
                      {company.address}
                    </span>
                  )}
                </li>
              ) : null}
            </ul>
          </CollapsibleFooterSection>
        </div>

        <div aria-hidden="true" className="h-px w-full bg-brand-blue-mid/15" />

        <div className="flex flex-col items-start justify-between gap-3 py-6 text-[13px] text-foreground/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {footer?.copyrightNotice}
          </p>
          <nav
            aria-label={
              locale === "en" ? "Legal policies" : "Chính sách pháp lý"
            }
            className="flex items-center gap-5"
          >
            {footer?.legalLinks?.map((link) => (
              <Link
                key={`${link.label}-${link._key || link.href}`}
                href={resolveSiteHref(link, locale)}
                className="transition-colors duration-200 hover:text-foreground/75 focus-visible:text-foreground/75 focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
