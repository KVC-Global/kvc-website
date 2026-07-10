import Link from "next/link"

import { cn } from "@/lib/utils"

export function SiteHeaderLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="KVC Global — Trang chủ"
      className={cn(
        "flex items-center gap-3 text-[#0F1B2D] no-underline",
        className,
      )}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-10 w-10 shrink-0"
      >
        <path
          d="M4 4 L4 44 L16 44 L16 28 L32 44 L44 44 L24 24 L44 4 L32 4 L16 20 L16 4 Z"
          fill="#0F1B2D"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-[0.18em]">
          KVC GLOBAL
        </span>
        <span className="mt-1.5 font-display text-[8px] font-medium tracking-[0.32em] text-[#0F1B2D]/70">
          BEGIN SOMETHING GREATER
        </span>
      </span>
    </Link>
  )
}
