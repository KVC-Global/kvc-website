"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

import { useDictionary, useLocale } from "@/lib/i18n-client"

const NAV_LINKS_KEYS = [
  { href: "/", key: "home" },
  { href: "/gioi-thieu", key: "about" },
  { href: "/work-pass", key: "workPass" },
  { href: "/du-hoc", key: "studyAbroad" },
  { href: "/khoa-hoc-online", key: "onlineCourses" },
  { href: "/doanh-nghiep", key: "enterprise" },
  { href: "/lien-he", key: "contact" },
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
          {NAV_LINKS_KEYS.map((link) => {
            const localizedHref = getLocalizedHref(link.href, locale)
            const label = t.nav[link.key]
            const active = isActive(pathname, localizedHref)
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
