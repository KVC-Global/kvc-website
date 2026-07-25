"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { useDictionary, useLocale } from "@/lib/i18n-client"

const NAV_LINKS_KEYS = [
  { href: "/", key: "home" },
  { href: "/gioi-thieu", key: "about" },
  { href: "/work-pass", key: "workPass" },
  { href: "/du-hoc", key: "studyAbroad" },
  { href: "/khoa-hoc-online", key: "onlineCourses" },
  { href: "/dich-vu", key: "enterprise" },
  { href: "/lien-he", key: "contact" },
] as const

const destinations = [
  { key: "diplomaSingapore", href: "/du-hoc", isComingSoon: false },
  { key: "uniMasterSingapore", href: "/du-hoc/dai-hoc-thac-si", isComingSoon: false },
  { key: "privateAllAges", href: "/du-hoc/tu-thuc", isComingSoon: false },
  { key: "publicAllAges", href: "/du-hoc/cong-lap", isComingSoon: false },
  { key: "malaysia", href: "/coming-soon", isComingSoon: true },
  { key: "taiwan", href: "/coming-soon", isComingSoon: true },
] as const

function getLocalizedHref(href: string, locale: string) {
  const prefix = locale === "en" ? "/en" : "/vi"
  if (href === "/") return prefix
  return `${prefix}${href}`
}

function isActive(pathname: string, href: string) {
  if (href === "/vi" || href === "/en") {
    return pathname === "/vi" || pathname === "/en"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeaderNav({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/"
  const locale = useLocale()
  const t = useDictionary()

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-7 font-body text-[15px] font-medium text-primary">
        {NAV_LINKS_KEYS.map((link) => {
          const localizedHref = getLocalizedHref(link.href, locale)
          const label = t.nav[link.key]
          const active = isActive(pathname, localizedHref)

          if (link.key === "studyAbroad") {
            return (
              <li key={link.href} className="group relative">
                <Link
                  href={localizedHref}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group/link relative inline-flex items-center gap-1 py-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                    active && "text-brand-gold"
                  )}
                >
                  <span className="relative inline-block">
                    {label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 rounded-full bg-brand-gold transition-transform duration-300 ease-out",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
                      )}
                    />
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground/80 group-hover:rotate-180 transition-transform duration-350 ease-out" />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-85 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="bg-white dark:bg-card border border-border/80 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2.5 flex flex-col gap-1">
                    {destinations.map((dest) => {
                      const destHref = getLocalizedHref(dest.href, locale)
                      const destActive = pathname === destHref
                      const destName = t.nav.studyAbroadDestinations[dest.key]
                      const destDesc = t.nav.studyAbroadDestinations[`${dest.key}Desc` as keyof typeof t.nav.studyAbroadDestinations]

                      return (
                        <Link
                          key={dest.key}
                          href={destHref}
                          className={cn(
                            "text-left flex flex-col gap-0.5 rounded-lg p-2.5 transition-colors hover:bg-muted/70 focus-visible:bg-muted/70 focus-visible:outline-none",
                            destActive && "bg-muted/50"
                          )}
                        >
                          <span className="font-heading text-sm font-semibold text-brand-blue dark:text-foreground flex items-center gap-2">
                            {destName}
                            {dest.isComingSoon && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-brand-gold/10 text-brand-gold rounded-full tracking-wide">
                                {t.nav.studyAbroadDestinations.comingSoon}
                              </span>
                            )}
                          </span>
                          <span className="font-body text-xs text-muted-foreground leading-normal">
                            {destDesc}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </li>
            )
          }

          return (
            <li key={link.href}>
              <Link
                href={localizedHref}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block py-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                  active && "text-brand-gold"
                )}
              >
                <span className="relative inline-block">
                  {label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 rounded-full bg-brand-gold transition-transform duration-300 ease-out",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    )}
                  />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function SiteHeaderMobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname() ?? "/"
  const locale = useLocale()
  const t = useDictionary()
  const [studyAbroadOpen, setStudyAbroadOpen] = React.useState(false)

  React.useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  React.useEffect(() => {
    if (!open) {
      return
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div id="site-mobile-nav" className="fixed inset-0 z-50 bg-white xl:hidden overflow-y-auto">
      <div className="flex h-20 items-center justify-end px-6">
        <button
          type="button"
          aria-label={locale === "en" ? "Close menu" : "Đóng menu"}
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav aria-label="Mobile" className="px-6 pt-2 pb-10">
        <ul className="flex flex-col gap-1 font-body text-lg text-foreground">
          {NAV_LINKS_KEYS.map((link) => {
            const localizedHref = getLocalizedHref(link.href, locale)
            const label = t.nav[link.key]
            const active = isActive(pathname, localizedHref)

            if (link.key === "studyAbroad") {
              return (
                <li key={link.href} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setStudyAbroadOpen(!studyAbroadOpen)}
                    aria-expanded={studyAbroadOpen}
                    className={cn(
                      "group relative flex w-full items-center justify-between overflow-hidden rounded-md px-3 py-3 text-left transition-all duration-300 ease-out hover:bg-muted hover:pl-5 hover:text-foreground focus-visible:bg-muted focus-visible:pl-5 focus-visible:text-foreground focus-visible:outline-none",
                      active && "bg-muted pl-5 font-semibold text-brand-gold"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-2 left-0 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                        active || studyAbroadOpen
                          ? "scale-y-100"
                          : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                      )}
                    />
                    <span>{label}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300 text-muted-foreground",
                        studyAbroadOpen && "rotate-180 text-brand-gold"
                      )}
                    />
                  </button>

                  {/* Collapsible Panel */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      studyAbroadOpen
                        ? "grid-rows-[1fr] opacity-100 mt-1"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="pl-6 pr-3 flex flex-col gap-1 border-l border-border/80 ml-4 my-1">
                        {destinations.map((dest) => {
                          const destHref = getLocalizedHref(dest.href, locale)
                          const destActive = pathname === destHref
                          const destName = t.nav.studyAbroadDestinations[dest.key]
                          return (
                            <li key={dest.key}>
                              <Link
                                href={destHref}
                                className={cn(
                                  "block rounded-md py-2 px-3 text-sm font-body text-muted-foreground hover:bg-muted hover:text-foreground transition-all flex items-center justify-between",
                                  destActive && "text-brand-gold font-medium bg-muted/50"
                                )}
                              >
                                <span>{destName}</span>
                                {dest.isComingSoon && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-brand-gold/10 text-brand-gold rounded-full">
                                    {t.nav.studyAbroadDestinations.comingSoon}
                                  </span>
                                )}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            }

            return (
              <li key={link.href}>
                <Link
                  href={localizedHref}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative block overflow-hidden rounded-md px-3 py-3 transition-all duration-300 ease-out hover:bg-muted hover:pl-5 hover:text-foreground focus-visible:bg-muted focus-visible:pl-5 focus-visible:text-foreground focus-visible:outline-none",
                    active && "bg-muted pl-5 font-semibold text-brand-gold"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-2 left-0 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                      active
                        ? "scale-y-100"
                        : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    )}
                  />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
