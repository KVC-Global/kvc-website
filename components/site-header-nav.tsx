"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/work-pass", label: "Work pass & việc làm" },
  { href: "/du-hoc", label: "Du học" },
  { href: "/khoa-hoc-online", label: "Khóa học Online" },
  { href: "/doanh-nghiep", label: "Dịch vụ doanh nghiệp" },
  { href: "/lien-he", label: "Liên hệ" },
] as const

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeaderNav({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/"

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-7 font-serif text-[15px] font-medium text-[#1F2937]">
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href)
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block whitespace-nowrap py-1 transition-colors duration-300 ease-out hover:text-[#0F1B2D] focus-visible:text-[#0F1B2D] focus-visible:outline-none",
                  active && "text-[#0F1B2D]",
                )}
              >
                <span className="relative inline-block">
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-[2px] w-full -translate-x-1/2 origin-center rounded-full bg-[#0F1B2D] transition-transform duration-300 ease-out",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
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
    <div id="site-mobile-nav" className="fixed inset-0 z-50 bg-white lg:hidden">
      <div className="flex h-16 items-center justify-end px-6">
        <button
          type="button"
          aria-label="Đóng menu"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#0F1B2D] hover:bg-[#0F1B2D]/5"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav aria-label="Mobile" className="px-6 pt-2">
        <ul className="flex flex-col gap-1 font-serif text-lg text-[#1F2937]">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative block overflow-hidden rounded-md px-3 py-3 transition-all duration-300 ease-out hover:bg-[#0F1B2D]/5 hover:pl-5 hover:text-[#0F1B2D] focus-visible:bg-[#0F1B2D]/5 focus-visible:pl-5 focus-visible:text-[#0F1B2D] focus-visible:outline-none",
                    active &&
                      "bg-[#0F1B2D]/5 pl-5 font-semibold text-[#0F1B2D]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-2 left-0 w-[3px] origin-top rounded-r-full bg-[#0F1B2D] transition-transform duration-300 ease-out",
                      active
                        ? "scale-y-100"
                        : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100",
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
