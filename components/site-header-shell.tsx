"use client"

import * as React from "react"

import { SiteHeaderActions } from "@/components/site-header-actions"
import { SiteHeaderLogo } from "@/components/site-header-logo"
import {
  SiteHeaderMobileMenu,
  SiteHeaderNav,
} from "@/components/site-header-nav"
import { SiteHeaderMobileToggle } from "@/components/site-header-mobile-toggle"
import { cn } from "@/lib/utils"

export function SiteHeaderShell({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn("w-full", className)}>
      <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
        <div className="flex h-15 w-full items-center justify-between gap-6 px-3 md:h-24 md:px-8">
          <SiteHeaderLogo />
          <div className="flex gap-2 md:gap-7">
            <SiteHeaderNav className="hidden xl:flex" />
            <SiteHeaderActions />
            <SiteHeaderMobileToggle onOpen={() => setOpen(true)} />
          </div>
        </div>
      </header>
      <SiteHeaderMobileMenu open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
