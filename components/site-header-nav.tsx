"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useDictionary, useLocale, dictionaries } from "@/lib/i18n-client"

// ─── types ──────────────────────────────────────────────────────────────────

type NavKey = keyof typeof dictionaries.vi.nav

type SubLink = {
  href: string
  key: NavKey
}

type NavLink = {
  href: string
  key: NavKey
  children?: SubLink[]
}

const NAV_LINKS: NavLink[] = [
  { href: "/", key: "home" },
  { href: "/gioi-thieu", key: "about" },
  { href: "/work-pass", key: "workPass" },
  { href: "/du-hoc", key: "studyAbroad" },
  {
    href: "/khoa-hoc-online",
    key: "onlineCourses",
    children: [
      { href: "/khoa-hoc-online/ossd", key: "ossd" },
      { href: "/khoa-hoc-online/othm", key: "othm" },
      { href: "/khoa-hoc-online/qualifi", key: "qualifi" },
      { href: "/khoa-hoc-online/wolverhampton", key: "wolverhampton" },
    ],
  },
  { href: "/doanh-nghiep", key: "enterprise" },
  { href: "/lien-he", key: "contact" },
]

// ─── helpers ────────────────────────────────────────────────────────────────

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

/** Check if any child link is active (for dropdown parent highlighting) */
function isChildActive(pathname: string, children: SubLink[], locale: string) {
  return children.some((child) => isActive(pathname, getLocalizedHref(child.href, locale)))
}

// ─── desktop dropdown ───────────────────────────────────────────────────────

function NavDropdown({
  link,
  locale,
  t,
}: {
  link: NavLink
  locale: string
  t: ReturnType<typeof useDictionary>
}) {
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLLIElement | null>(null)

  const parentHref = getLocalizedHref(link.href, locale)
  const parentActive = isActive(pathname, parentHref)
  const childActive = isChildActive(pathname, link.children!, locale)
  const active = parentActive || childActive

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <li key={link.href} ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group relative inline-flex items-center gap-1 py-1 font-body text-[15px] font-medium whitespace-nowrap transition-colors duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
          active && "text-brand-gold"
        )}
      >
        <span className="relative inline-block">
          {t.nav[link.key]}
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 rounded-full bg-brand-gold transition-transform duration-300 ease-out",
              active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            )}
          />
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul className="absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-sm border border-border bg-white py-1 shadow-lg">
          {link.children!.map((child) => {
            const childHref = getLocalizedHref(child.href, locale)
            const childItemActive = isActive(pathname, childHref)
            return (
              <li key={child.href}>
                <Link
                  href={childHref}
                  aria-current={childItemActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors hover:bg-muted",
                    childItemActive
                      ? "font-semibold text-brand-gold"
                      : "text-foreground"
                  )}
                >
                  {t.nav[child.key]}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

// ─── main nav component ─────────────────────────────────────────────────────

export function SiteHeaderNav({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useDictionary()
  const pathname = usePathname() ?? "/"

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-7 font-body text-[15px] font-medium text-primary">
        {NAV_LINKS.map((link) => {
          // Render dropdown for links with children
          if (link.children) {
            return <NavDropdown key={link.href} link={link} locale={locale} t={t} />
          }

          // Flat link (no children)
          const localizedHref = getLocalizedHref(link.href, locale)
          const label = t.nav[link.key]
          const active = isActive(pathname, localizedHref)
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

// ─── mobile menu ────────────────────────────────────────────────────────────

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
  const [expandedKey, setExpandedKey] = React.useState<string | null>(null)

  React.useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  React.useEffect(() => {
    if (!open) {
      setExpandedKey(null)
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
    <div id="site-mobile-nav" className="fixed inset-0 z-50 bg-white xl:hidden">
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
      <nav aria-label="Mobile" className="px-6 pt-2">
        <ul className="flex flex-col gap-1 font-body text-lg text-foreground">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children
            const localizedHref = getLocalizedHref(link.href, locale)
            const label = t.nav[link.key]
            const active = hasChildren
              ? isChildActive(pathname, link.children!, locale) || isActive(pathname, localizedHref)
              : isActive(pathname, localizedHref)
            const isExpanded = expandedKey === link.key

            // Dropdown parent (accordion)
            if (hasChildren) {
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedKey(isExpanded ? null : link.key)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-3 text-left transition-all duration-300 ease-out hover:bg-muted hover:pl-5 hover:text-foreground focus-visible:bg-muted focus-visible:pl-5 focus-visible:text-foreground focus-visible:outline-none",
                      active && "bg-muted pl-5 font-semibold text-brand-gold"
                    )}
                  >
                    <span className="relative">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-y-2 left-0 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                          active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                        )}
                      />
                      {label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Sub-links */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="ml-4 border-l-2 border-border/60 py-1">
                        {link.children!.map((child) => {
                          const childHref = getLocalizedHref(child.href, locale)
                          const childActive = isActive(pathname, childHref)
                          return (
                            <li key={child.href}>
                              <Link
                                href={childHref}
                                aria-current={childActive ? "page" : undefined}
                                className={cn(
                                  "block rounded-md px-4 py-2.5 text-base transition-all duration-300 ease-out hover:bg-muted hover:pl-6 hover:text-foreground focus-visible:bg-muted focus-visible:pl-6 focus-visible:text-foreground focus-visible:outline-none",
                                  childActive && "bg-muted pl-6 font-semibold text-brand-gold"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "absolute inset-y-2 left-4 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                                    childActive ? "scale-y-100" : "scale-y-0"
                                  )}
                                />
                                {t.nav[child.key]}
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

            // Flat link (no children)
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
