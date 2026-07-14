import Image from "next/image"
import { ArrowUpRight, CheckCircle2, Landmark, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const STATS = [
  {
    icon: Users,
    value: "10,000+",
    label: "Khách hàng tin tưởng",
  },
  {
    icon: CheckCircle2,
    value: "98%",
    label: "Tỷ lệ thành công",
  },
  {
    icon: Landmark,
    value: "150+",
    label: "Đối tác chiến lược",
  },
  {
    icon: Star,
    value: "10+",
    label: "Năm kinh nghiệm",
  },
] as const

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80&auto=format&fit=crop"

export function SiteHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "relative isolate w-full overflow-hidden bg-brand-light",
        className
      )}
    >
      <div className="relative min-h-[100dvh] w-full sm:min-h-[600px] md:min-h-[640px] lg:min-h-[680px]">
        <Image
          src={HERO_IMAGE}
          alt="Gia đình nhìn toàn cảnh thành phố Singapore lúc hoàng hôn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] sm:object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white via-46% to-transparent to-100%"
        />

        <Container className="relative flex min-h-[inherit] items-center py-20 sm:py-24 md:py-0">
          <div className="max-w-4xl">
            <h1
              id="hero-heading"
              className="font-display text-4xl leading-[1.1] font-bold tracking-[-0.01em] text-foreground sm:text-5xl sm:leading-[1.05] sm:tracking-normal md:text-6xl lg:text-7xl lg:leading-[1.02] lg:tracking-[-0.02em]"
            >
              <span className="block">BEGIN SOMETHING</span>
              <span className="block text-secondary">GREATER.</span>
            </h1>

            <p className="mt-5 line-clamp-4 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
              KVC Global luôn đồng hành cùng cá nhân, gia đình và doanh nghiệp
              trong hành trình học tập, làm việc, kinh doanh và định cư tại
              Singapore. Chúng tôi cung cấp giải pháp toàn diện cho tương lai
              bền vững của bạn.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#du-hoc"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
              >
                Du học / Việc làm Singapore
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="#mo-cong-ty"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
              >
                Mở công ty tại VN - Singapore
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Container className="relative z-10 -mt-10 sm:-mt-16 md:-mt-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border ring-1 ring-black/5 md:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group flex items-center justify-center gap-3 bg-white px-4 py-5 text-left transition-colors duration-300 ease-out sm:gap-4 sm:px-6 sm:py-6 md:h-[160px] md:py-7"
              >
                <Icon
                  className="h-7 w-7 shrink-0 text-secondary transition-transform duration-300 ease-out sm:h-9 sm:w-9"
                  strokeWidth={1.75}
                />
                <div className="flex min-w-0 flex-col">
                  <div className="font-display text-xl font-bold text-foreground sm:text-3xl">
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
      </Container>
    </section>
  )
}
