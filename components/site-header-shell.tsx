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
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6">
          <SiteHeaderLogo />
          <SiteHeaderNav className="hidden flex-1 justify-center lg:flex" />
          <div className="flex items-center gap-3">
            <SiteHeaderActions />
            <SiteHeaderMobileToggle onOpen={() => setOpen(true)} />
          </div>
        </div>
      </header>
      <SiteHeaderMobileMenu open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
