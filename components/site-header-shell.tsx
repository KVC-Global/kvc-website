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
        <div className="flex h-24 w-full items-center justify-between gap-6 md:px-8">
          <SiteHeaderLogo />
          <div className="flex gap-7">
            <SiteHeaderNav className="hidden lg:flex" />
            <SiteHeaderActions />
            <SiteHeaderMobileToggle onOpen={() => setOpen(true)} />
          </div>
        </div>
      </header>
      <SiteHeaderMobileMenu open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
