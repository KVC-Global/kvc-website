import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

type StudyAbroadStat = {
  icon: LucideIcon
  value: string
  label: string
}

export function StudyAbroadStatBar({
  stats,
  className,
}: {
  stats: readonly StudyAbroadStat[]
  className?: string
}) {
  return (
    <section
      aria-label="Thông tin nổi bật chương trình"
      className={cn("absolute inset-x-0 bottom-0 z-30", className)}
      style={{ transform: "translateY(50%)" }}
    >
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-16px_rgba(15,27,45,0.25),0_8px_16px_-8px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:rounded-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="relative flex items-center justify-center gap-3 bg-white px-3 py-5 text-left transition-colors duration-300 ease-out sm:gap-4 sm:px-6 sm:py-6 md:min-h-[150px] md:py-7"
                >
                  <Icon
                    className="h-9 w-9 shrink-0 text-[#f8bc62] sm:h-11 sm:w-11"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="font-display text-base leading-tight font-bold text-primary sm:text-xl md:text-2xl">
                      {stat.value}
                    </div>
                    <div className="font-sans text-[10px] font-semibold tracking-[0.1em] text-foreground/70 uppercase sm:text-xs sm:tracking-[0.12em]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block"
          >
            {[25, 50, 75].map((left) => (
              <span
                key={left}
                className="absolute"
                style={{
                  backgroundColor: "#c8913c",
                  height: 48,
                  left: `${left}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 2,
                }}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 md:hidden"
          >
            <span className="absolute top-1/4 left-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[#d6b46d]" />
            <span className="absolute top-3/4 left-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[#d6b46d]" />
            <span className="absolute top-1/2 left-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-[#d6b46d]" />
          </div>
        </div>
      </Container>
    </section>
  )
}
