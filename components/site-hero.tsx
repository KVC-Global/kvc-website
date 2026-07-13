import Image from "next/image"
import {
  ArrowUpRight,
  CheckCircle2,
  Landmark,
  Star,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"

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
      className={cn("relative isolate w-full overflow-hidden", className)}
    >
      <div className="relative h-[560px] w-full sm:h-[600px] md:h-[640px] lg:h-[680px]">
        <Image
          src={HERO_IMAGE}
          alt="Gia đình nhìn toàn cảnh thành phố Singapore lúc hoàng hôn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-white from-0% via-white via-46% to-transparent to-100%"
        />

        <div className="relative mx-auto flex h-full w-full max-w-[1280px] items-center px-6">
          <div className="max-w-2xl">
            <h1
              id="hero-heading"
              className="font-display text-3xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              <span className="block">BEGIN SOMETHING</span>
              <span className="block text-[#C8913C]">GREATER.</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/85 sm:text-lg">
              KVC Global luôn đồng hành cùng cá nhân, gia đình và doanh nghiệp
              trong hành trình học tập, làm việc, kinh doanh và định cư tại
              Singapore. Chúng tôi cung cấp giải pháp toàn diện cho tương lai
              bền vững của bạn.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#du-hoc"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#0A2540] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1A2B3C] hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540]"
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
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-[#0A2540] bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540]"
              >
                Mở công ty tại VN - Singapore
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-12 w-full max-w-295 px-6 sm:-mt-16 md:-mt-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border shadow-[0_24px_60px_-12px_rgba(15,27,45,0.3)] ring-1 ring-black/5 md:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
                <div
                  key={stat.label}
                  className="group flex items-center gap-4 bg-white px-4 py-5 text-left transition-colors duration-300 ease-out sm:px-6 sm:py-6"
                >
                  <Icon
                    className="h-8 w-8 shrink-0 text-[#C8913C] transition-transform duration-300 ease-out sm:h-9 sm:w-9"
                    strokeWidth={1.75}
                  />
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="font-sans text-[11px] font-semibold tracking-[0.12em] text-foreground/70 uppercase sm:text-xs">
                      {stat.label}
                    </div>
                  </div>
                </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
