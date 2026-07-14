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
        src="/images/horizontal-logo/blue-logo.png"
        alt="KVC Global"
        width={200}
        height={100}
        className="h-24 w-auto shrink-0"
        priority
      />
    </Link>
  )
}
