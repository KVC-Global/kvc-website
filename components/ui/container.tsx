import * as React from "react"

import { cn } from "@/lib/utils"

type ContainerProps = React.ComponentProps<"div">

/**
 * Page-level content wrapper. Centralizes the centering + max-width +
 * responsive horizontal padding pattern so individual sections don't
 * scatter `mx-auto max-w-[1280px] px-…` across the codebase.
 *
 * Padding scale follows the 4/8dp rhythm with adaptive gutters per
 * breakpoint (mobile 20 → tablet 24 → desktop 32 → wide 40).
 */
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10 xl:max-w-[1440px] 2xl:max-w-[1600px]",
        className,
      )}
      {...props}
    />
  )
}
