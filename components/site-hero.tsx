import Image from "next/image"
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  FolderOpen,
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
    icon: FolderOpen,
    value: "15,000+",
    label: "Số hồ sơ xử lý",
  },
  {
    icon: FileText,
    value: "10+",
    label: "Năm kinh nghiệm",
  },
  {
    icon: CheckCircle2,
    value: "98%",
    label: "Tỷ lệ thành công",
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
          className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10 sm:via-white/70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent"
        />

        <div className="relative mx-auto flex h-full w-full max-w-[1280px] items-center px-6">
          <div className="max-w-2xl">
            <h1
              id="hero-heading"
              className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-[#0F1B2D] sm:text-5xl md:text-6xl"
            >
              <span className="block">BEGIN SOMETHING</span>
              <span className="block text-[#B0332A]">GREATER.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#1F2937]/85 sm:text-lg">
              KVC Global luôn đồng hành cùng cá nhân, gia đình và doanh nghiệp
              trong hành trình học tập, làm việc, kinh doanh và định cư tại
              Singapore. Chúng tôi cung cấp giải pháp toàn diện cho tương lai
              bền vững của bạn.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#du-hoc"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#0F1B2D] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1A2B3C] hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1B2D]"
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
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-[#0F1B2D] bg-white px-6 py-3 text-sm font-semibold text-[#0F1B2D] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0F1B2D]/5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1B2D]"
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

      <div className="relative z-10 mx-auto -mt-20 w-full max-w-295 px-6 sm:-mt-24 md:-mt-28">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border shadow-[0_20px_60px_-15px_rgba(15,27,45,0.25)] ring-1 ring-black/5 md:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center gap-3 bg-white px-4 py-7 text-center transition-colors duration-300 ease-out sm:px-6 sm:py-8"
              >
                <Icon
                  className="h-7 w-7 text-[#B0332A] transition-transform duration-300 ease-out"
                  strokeWidth={1.75}
                />
                <div className="font-display text-2xl font-bold text-[#0F1B2D] sm:text-3xl">
                  {stat.value}
                </div>
                <div className="font-sans text-[11px] font-semibold tracking-[0.12em] text-[#1F2937]/70 uppercase sm:text-xs">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
