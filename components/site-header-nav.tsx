"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, ChevronDown } from "lucide-react"

import { useLocale } from "@/lib/i18n-client"
import {
  fallbackSiteSettings,
  resolveSiteHref,
  type SiteNavChild,
  type SiteNavItem,
} from "@/lib/site-settings"
import { cn } from "@/lib/utils"

function normalizeItems(items: SiteNavItem[] | undefined, locale: "vi" | "en") {
  return items?.length
    ? items
    : fallbackSiteSettings(locale).header?.navItems || []
}

function isActive(pathname: string, href: string) {
  if (href === "/vi" || href === "/en") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function isChildActive(
  pathname: string,
  children: SiteNavChild[] | undefined,
  locale: "vi" | "en"
) {
  return (
    children?.some((child) =>
      isActive(pathname, resolveSiteHref(child, locale))
    ) || false
  )
}

export function SiteHeaderNav({
  ariaLabel,
  className,
  items,
  comingSoonLabel,
}: {
  ariaLabel?: string
  className?: string
  items?: SiteNavItem[]
  comingSoonLabel?: string
}) {
  const locale = useLocale()
  const pathname = usePathname() ?? "/"
  const navItems = normalizeItems(items, locale)

  return (
    <nav
      aria-label={
        ariaLabel ||
        (locale === "en" ? "Primary navigation" : "Điều hướng chính")
      }
      className={className}
    >
      <ul className="flex items-center gap-7 font-body text-[15px] font-medium text-primary">
        {navItems.map((link) => {
          const href = resolveSiteHref(link, locale)
          const active = isActive(pathname, href)
          const hasChildren = !!link.children?.length
          const dropdownActive =
            active || isChildActive(pathname, link.children, locale)

          if (hasChildren) {
            const widthClass = link.children?.some((child) => child.description)
              ? "w-85"
              : "w-72"
            return (
              <li
                key={link._key || `${link.label}-${href}`}
                className="group relative"
              >
                <Link
                  href={href}
                  aria-current={dropdownActive ? "page" : undefined}
                  className={cn(
                    "group/link relative inline-flex items-center gap-1 py-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                    dropdownActive && "text-brand-gold"
                  )}
                >
                  <span className="relative inline-block">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 rounded-full bg-brand-gold transition-transform duration-300 ease-out",
                        dropdownActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
                      )}
                    />
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground/80 transition-transform duration-350 ease-out group-hover:rotate-180" />
                </Link>

                <div
                  className={cn(
                    "pointer-events-none absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100",
                    widthClass
                  )}
                >
                  <div className="flex flex-col gap-1 rounded-xl border border-border/80 bg-white p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:bg-card">
                    {link.children?.map((child) => {
                      const childHref = resolveSiteHref(child, locale)
                      const childActive = isActive(pathname, childHref)
                      return (
                        <Link
                          key={child._key || `${child.label}-${childHref}`}
                          href={childHref}
                          aria-current={childActive ? "page" : undefined}
                          className={cn(
                            "flex flex-col gap-0.5 rounded-lg p-2.5 text-left transition-colors hover:bg-muted/70 focus-visible:bg-muted/70 focus-visible:outline-none",
                            childActive && "bg-muted/50"
                          )}
                        >
                          <span className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue dark:text-foreground">
                            {child.label}
                            {child.isComingSoon && (
                              <span className="rounded-full bg-brand-gold/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-brand-gold">
                                {comingSoonLabel ||
                                  (locale === "en"
                                    ? "Coming soon"
                                    : "Sắp ra mắt")}
                              </span>
                            )}
                          </span>
                          {child.description ? (
                            <span className="font-body text-xs leading-normal text-muted-foreground">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </li>
            )
          }

          return (
            <li key={link._key || `${link.label}-${href}`}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block py-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                  active && "text-brand-gold"
                )}
              >
                <span className="relative inline-block">
                  {link.label}
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
  items,
  comingSoonLabel,
}: {
  open: boolean
  onClose: () => void
  items?: SiteNavItem[]
  comingSoonLabel?: string
}) {
  const pathname = usePathname() ?? "/"
  const locale = useLocale()
  const navItems = normalizeItems(items, locale)
  const [expandedKey, setExpandedKey] = React.useState<string | null>(null)

  React.useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      id="site-mobile-nav"
      className="fixed inset-0 z-50 overflow-y-auto bg-white xl:hidden"
    >
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
          {navItems.map((link) => {
            const href = resolveSiteHref(link, locale)
            const hasChildren = !!link.children?.length
            const active = hasChildren
              ? isChildActive(pathname, link.children, locale) ||
                isActive(pathname, href)
              : isActive(pathname, href)
            const key = link._key || `${link.label}-${href}`
            const isExpanded = expandedKey === key

            if (hasChildren) {
              return (
                <li key={key} className="flex flex-col">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedKey(isExpanded ? null : key)}
                    className={cn(
                      "group relative flex w-full items-center justify-between overflow-hidden rounded-md px-3 py-3 text-left transition-all duration-300 ease-out hover:bg-muted hover:pl-5 hover:text-foreground focus-visible:bg-muted focus-visible:pl-5 focus-visible:text-foreground focus-visible:outline-none",
                      active && "bg-muted pl-5 font-semibold text-brand-gold"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-2 left-0 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                        active || isExpanded
                          ? "scale-y-100"
                          : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                      )}
                    />
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        isExpanded && "rotate-180 text-brand-gold"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isExpanded
                        ? "mt-1 grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="my-1 ml-4 flex flex-col gap-1 border-l border-border/80 pr-3 pl-6">
                        {link.children?.map((child) => {
                          const childHref = resolveSiteHref(child, locale)
                          const childActive = isActive(pathname, childHref)
                          return (
                            <li
                              key={child._key || `${child.label}-${childHref}`}
                            >
                              <Link
                                href={childHref}
                                aria-current={childActive ? "page" : undefined}
                                className={cn(
                                  "flex items-center justify-between gap-3 rounded-md px-3 py-2 font-body text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
                                  childActive &&
                                    "bg-muted/50 font-medium text-brand-gold"
                                )}
                              >
                                <span>{child.label}</span>
                                {child.isComingSoon && (
                                  <span className="rounded-full bg-brand-gold/10 px-1.5 py-0.5 text-[9px] font-bold text-brand-gold">
                                    {comingSoonLabel ||
                                      (locale === "en"
                                        ? "Coming soon"
                                        : "Sắp ra mắt")}
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
              <li key={key}>
                <Link
                  href={href}
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
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
