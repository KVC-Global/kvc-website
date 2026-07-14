"use client"

import { Menu } from "lucide-react"

export function SiteHeaderMobileToggle({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      aria-label="Mở menu"
      onClick={onOpen}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
