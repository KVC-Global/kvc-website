import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"

export function OnlineHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="online-hero-heading"
      className={cn("relative isolate w-full overflow-hidden", className)}
    >
      <div className="relative h-[520px] w-full sm:h-[560px] md:h-[600px]">
        <Image
          src={HERO_IMAGE}
          alt="Sinh viên học trực tuyến cùng KVC Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-[#0A2540]/92 via-[#0A2540]/80 to-[#0A2540]/55"
        />

        <div className="relative mx-auto flex h-full w-full max-w-[1280px] items-center px-6">
          <div className="max-w-2xl">
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#C8913C] uppercase">
              Đào tạo trực tuyến
            </p>
            <h1
              id="online-hero-heading"
              className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Khóa học Online
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Mở ra cơ hội học tập linh hoạt với các chương trình đào tạo trực
              tuyến chất lượng quốc tế.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#lien-he"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#C8913C] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#b67f30] hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8913C]"
              >
                Nhận tư vấn ngay
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
                href="#directory"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Khám phá chương trình
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
