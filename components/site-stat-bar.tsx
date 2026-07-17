import { CheckCircle2, Landmark, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const STATS = [
  { icon: Users, value: "10,000+", label: "Khách hàng tin tưởng" },
  { icon: CheckCircle2, value: "98%", label: "Tỷ lệ thành công" },
  { icon: Landmark, value: "150+", label: "Đối tác chiến lược" },
  { icon: Star, value: "10+", label: "Năm kinh nghiệm" },
] as const

export function SiteStatBar({ className }: { className?: string }) {
  return (
    <section
      aria-label="Thống kê nổi bật"
      className={cn("absolute bottom-0 z-30", className)}
      style={{ left: 0, right: 0, transform: "translateY(50%)" }}
    >
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-border shadow-[0_24px_48px_-16px_rgba(15,27,45,0.25),0_8px_16px_-8px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:rounded-3xl">
          <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex items-center justify-center gap-3 bg-white px-4 py-5 text-left transition-colors duration-300 ease-out sm:gap-4 sm:px-6 sm:py-6 md:min-h-[150px] md:py-7"
                >
                  <Icon
                    className="h-7 w-7 shrink-0 text-secondary sm:h-9 sm:w-9"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="flex min-w-0 flex-col">
                    <div className="font-display text-xl font-bold text-primary sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="truncate font-sans text-[11px] font-semibold tracking-[0.12em] text-foreground/70 uppercase sm:text-xs">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
