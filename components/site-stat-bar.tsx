import { CheckCircle2, Landmark, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { getDictionaryServer } from "@/lib/i18n-server"
import type { HomepageStat } from "@/sanity/home-page"

export async function SiteStatBar({
  className,
  content,
}: {
  className?: string
  content?: HomepageStat[]
}) {
  const t = await getDictionaryServer()

  const defaultStats = [
    { icon: Users, value: "10,000+", label: t.stats.clients },
    { icon: CheckCircle2, value: "98%", label: t.stats.successRate },
    { icon: Landmark, value: "150+", label: t.stats.partners },
    { icon: Star, value: "13+", label: t.stats.experience },
  ]
  const icons = [Users, CheckCircle2, Landmark, Star]
  const stats = content?.length
    ? content.map((stat, index) => ({
        icon: icons[index % icons.length],
        value: stat.value || "",
        label: stat.label || "",
      }))
    : defaultStats

  return (
    <section
      aria-label={t.stats.ariaLabel}
      className={cn("absolute bottom-0 z-30", className)}
      style={{ left: 0, right: 0, transform: "translateY(50%)" }}
    >
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-16px_rgba(15,27,45,0.25),0_8px_16px_-8px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:rounded-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="relative flex items-center justify-center bg-white px-3 py-5 text-left transition-colors duration-300 ease-out sm:gap-4 sm:px-6 sm:py-6 md:min-h-[150px] md:py-7"
                >
                  <div className="flex min-w-0 flex-col items-center gap-1 text-center sm:hidden">
                    <div className="flex items-center justify-center gap-2">
                      <Icon
                        className="h-7 w-7 shrink-0 text-[#f8bc62]"
                        style={{ color: "#f8bc62" }}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <div className="font-display text-lg font-bold text-primary">
                        {stat.value}
                      </div>
                    </div>
                    <div className="max-w-full truncate font-sans text-[11px] font-semibold tracking-[0.08em] text-foreground/70 uppercase">
                      {stat.label}
                    </div>
                  </div>

                  <div className="hidden min-w-0 items-center gap-4 sm:flex">
                    <Icon
                      className="h-11 w-11 shrink-0 text-[#f8bc62]"
                      style={{ color: "#f8bc62" }}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <div className="flex min-w-0 flex-col md:gap-1.5">
                      <div className="font-display text-3xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="truncate font-sans text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase">
                        {stat.label}
                      </div>
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
            <span
              className="absolute"
              style={{
                backgroundColor: "#d6b46d",
                height: 40,
                left: "50%",
                top: "25%",
                transform: "translate(-50%, -50%)",
                width: 1,
              }}
            />
            <span
              className="absolute"
              style={{
                backgroundColor: "#d6b46d",
                height: 40,
                left: "50%",
                top: "75%",
                transform: "translate(-50%, -50%)",
                width: 1,
              }}
            />
            <span
              className="absolute"
              style={{
                backgroundColor: "#d6b46d",
                height: 1,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 40,
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
