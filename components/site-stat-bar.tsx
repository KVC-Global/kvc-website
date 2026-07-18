import { CheckCircle2, Landmark, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { getDictionaryServer } from "@/lib/i18n-server"

export async function SiteStatBar({ className }: { className?: string }) {
  const t = await getDictionaryServer()

  const stats = [
    { icon: Users, value: "10,000+", label: t.stats.clients },
    { icon: CheckCircle2, value: "98%", label: t.stats.successRate },
    { icon: Landmark, value: "150+", label: t.stats.partners },
    { icon: Star, value: "10+", label: t.stats.experience },
  ]

  return (
    <section
      aria-label={t.stats.ariaLabel}
      className={cn("relative z-30 -mt-8 sm:-mt-10 md:-mt-14", className)}
    >
      <Container>
        <div className="relative overflow-hidden rounded-md bg-border shadow-[0_24px_48px_-16px_rgba(15,27,45,0.25),0_8px_16px_-8px_rgba(15,27,45,0.12)] ring-1 ring-black/5">
          <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {stats.map((stat) => {
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
