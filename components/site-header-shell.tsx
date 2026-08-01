"use client"

import * as React from "react"

import { SiteHeaderActions } from "@/components/site-header-actions"
import { SiteHeaderLogo } from "@/components/site-header-logo"
import {
  SiteHeaderMobileMenu,
  SiteHeaderNav,
} from "@/components/site-header-nav"
import { SiteHeaderMobileToggle } from "@/components/site-header-mobile-toggle"
import type { SiteSettings } from "@/lib/site-settings"
import { cn } from "@/lib/utils"

export function SiteHeaderShell({
  className,
  settings,
}: {
  className?: string
  settings?: SiteSettings
}) {
  const [open, setOpen] = React.useState(false)
  const header = settings?.header

  return (
    <div className={cn("w-full", className)}>
      <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
        <div className="flex h-15 w-full items-center justify-between gap-6 px-3 md:h-24 md:px-8">
          <SiteHeaderLogo />
          <div className="flex gap-2 md:gap-7">
            <SiteHeaderNav
              className="hidden xl:flex"
              items={header?.navItems}
              comingSoonLabel={header?.comingSoonLabel}
            />
            <SiteHeaderActions cta={header?.cta} />
            <SiteHeaderMobileToggle onOpen={() => setOpen(true)} />
          </div>
        </div>
      </header>
      <SiteHeaderMobileMenu
        open={open}
        onClose={() => setOpen(false)}
        items={header?.navItems}
        comingSoonLabel={header?.comingSoonLabel}
      />
    </div>
  )
}
