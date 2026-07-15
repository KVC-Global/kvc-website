import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function SiteHeaderLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="KVC Global — Trang chủ"
      className={cn(
        "flex items-center gap-3 text-foreground no-underline",
        className
      )}
    >
      <Image
        src="/images/KVC_LOGO_SVG/Blue%20Horizontal%20Logo_KVC.svg.svg"
        alt="KVC Global"
        width={150}
        height={150}
        className="h-8 w-auto shrink-0 md:h-12"
        priority
      />
    </Link>
  )
}
