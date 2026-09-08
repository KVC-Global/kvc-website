"use client"

import * as React from "react"
import Image from "next/image"
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
    <div id="site-mobile-nav" className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        aria-label={locale === "en" ? "Close menu" : "Đóng menu"}
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-brand-blue-mid/35 backdrop-blur-sm"
      />

      <div className="relative ml-auto flex h-[100svh] w-full max-w-[420px] flex-col overflow-hidden bg-white shadow-[-24px_0_80px_rgba(0,0,0,0.22)]">
        <div className="flex min-h-16 items-center justify-between border-b border-brand-blue-mid/10 px-4 sm:min-h-20 sm:px-6">
          <Link
            href={resolveSiteHref({ href: "/" }, locale)}
            aria-label={
              locale === "en" ? "KVC Global — Home" : "KVC Global — Trang chủ"
            }
            className="inline-flex items-center no-underline"
          >
            <Image
              src="/images/KVC_LOGO_SVG/Blue%20Horizontal%20Logo_KVC.svg.svg"
              alt="KVC Global"
              width={150}
              height={35}
              className="h-9 w-auto shrink-0"
              priority
            />
          </Link>
          <button
            type="button"
            aria-label={locale === "en" ? "Close menu" : "Đóng menu"}
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-blue-mid/10 text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          aria-label={
            locale === "en" ? "Mobile navigation" : "Điều hướng di động"
          }
          className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5"
        >
          <ul className="flex flex-col border-y border-brand-blue-mid/10 font-body text-[16px] text-foreground">
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
                  <li
                    key={key}
                    className="border-b border-brand-blue-mid/10 last:border-b-0"
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3 px-1 transition-colors duration-200 sm:px-2",
                        (active || isExpanded) && "bg-muted/70 text-brand-gold"
                      )}
                    >
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        onClick={onClose}
                        className="min-w-0 flex-1 py-4 text-left font-heading text-[17px] font-semibold hover:text-brand-gold focus-visible:outline-none"
                      >
                        <span className="block truncate">{link.label}</span>
                      </Link>
                      <button
                        type="button"
                        aria-label={
                          isExpanded
                            ? locale === "en"
                              ? `Collapse ${link.label}`
                              : `Thu gọn ${link.label}`
                            : locale === "en"
                              ? `Expand ${link.label}`
                              : `Mở rộng ${link.label}`
                        }
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedKey(isExpanded ? null : key)
                        }
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid/5 hover:bg-brand-blue-mid/10 focus-visible:outline-none"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform duration-300",
                            isExpanded && "rotate-180 text-brand-gold"
                          )}
                        />
                      </button>
                    </div>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "pointer-events-none grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className="mb-3 ml-4 flex flex-col border-l border-brand-blue-mid/15 pl-4">
                          {link.children?.map((child) => {
                            const childHref = resolveSiteHref(child, locale)
                            const childActive = isActive(pathname, childHref)
                            return (
                              <li
                                key={
                                  child._key || `${child.label}-${childHref}`
                                }
                              >
                                <Link
                                  href={childHref}
                                  aria-current={
                                    childActive ? "page" : undefined
                                  }
                                  className={cn(
                                    "flex items-start justify-between gap-3 px-0 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                                    childActive && "font-medium text-brand-gold"
                                  )}
                                >
                                  <span className="min-w-0">
                                    <span className="block leading-snug">
                                      {child.label}
                                    </span>
                                    {child.description ? (
                                      <span className="mt-1 line-clamp-2 block text-xs leading-normal text-muted-foreground/85">
                                        {child.description}
                                      </span>
                                    ) : null}
                                  </span>
                                  {child.isComingSoon && (
                                    <span className="mt-0.5 shrink-0 rounded-full bg-brand-gold/10 px-2 py-1 text-[9px] font-bold text-brand-gold">
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
                <li
                  key={key}
                  className="border-b border-brand-blue-mid/10 last:border-b-0"
                >
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center px-1 font-heading text-[17px] font-semibold transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none sm:px-2",
                      active && "text-brand-gold"
                    )}
                  >
                    <span className="min-w-0 truncate">{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
