"use client"

import { Menu } from "lucide-react"

import { useLocale } from "@/lib/i18n-client"

export function SiteHeaderMobileToggle({ onOpen }: { onOpen: () => void }) {
  const locale = useLocale()

  return (
    <button
      type="button"
      aria-label={locale === "en" ? "Open menu" : "Mở menu"}
      onClick={onOpen}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted xl:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
