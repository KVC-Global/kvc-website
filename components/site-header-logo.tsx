"use client"

import Image from "next/image"
import Link from "next/link"

import { useLocale } from "@/lib/i18n-client"
import { localizedHref } from "@/lib/site-settings"
import { cn } from "@/lib/utils"

export function SiteHeaderLogo({ className }: { className?: string }) {
  const locale = useLocale()

  return (
    <Link
      href={localizedHref("/", locale)}
      aria-label={
        locale === "en" ? "KVC Global — Home" : "KVC Global — Trang chủ"
      }
      className={cn(
        "flex items-center gap-3 text-foreground no-underline",
        className
      )}
    >
      <Image
        src="/images/KVC_LOGO_SVG/Blue%20Horizontal%20Logo_KVC.svg.svg"
        alt="KVC Global"
        width={150}
        height={35}
        className="h-8 w-auto shrink-0 md:h-12"
        priority
      />
    </Link>
  )
}
