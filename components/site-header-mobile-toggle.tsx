"use client"

import { Menu } from "lucide-react"

export function SiteHeaderMobileToggle({
  onOpen,
}: {
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      aria-label="Mở menu"
      onClick={onOpen}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#0F1B2D] hover:bg-[#0F1B2D]/5 lg:hidden"
    >
      <Menu className="h-6 w-6" />
    </button>
  )
}
