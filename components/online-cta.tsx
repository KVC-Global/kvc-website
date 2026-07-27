"use client"

import Image from "next/image"

import type { KhoaHocOnlineCta } from "@/sanity/service-pages"
import { cn } from "@/lib/utils"

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1513708849965-aa9a95c2b8c5?w=1920&q=80&auto=format&fit=crop"

export function OnlineCta({
  className,
  data,
}: {
  className?: string
  data?: KhoaHocOnlineCta
}) {
  const title =
    data?.title ?? "Sẵn sàng bắt đầu hành trình của bạn?"
  const description =
    data?.description ??
    "Đội ngũ tư vấn luôn sẵn sàng lắng nghe và thiết kế lộ trình phù hợp nhất."
  const buttonLabel = data?.buttonLabel ?? "Đặt lịch tư vấn ngay"
  const buttonHref = data?.buttonHref ?? "#lien-he"

  return (
    <section
      aria-labelledby="online-cta-heading"
      className={cn("relative isolate w-full overflow-hidden", className)}
    >
      <div className="relative min-h-[360px] w-full sm:min-h-[420px]">
        <Image
          src={BANNER_IMAGE}
          alt="Toàn cảnh thành phố - bắt đầu hành trình cùng KVC Global"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-[#0A2540]/92 via-[#0A2540]/82 to-[#0A2540]/65"
        />

        <div className="relative mx-auto flex h-full min-h-[360px] w-full max-w-[1280px] flex-col justify-center px-6 py-16 sm:min-h-[420px]">
          <div className="max-w-2xl">
            <h2
              id="online-cta-heading"
              className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-[44px]"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={buttonHref}
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#C8913C] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#b67f30] hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8913C]"
              >
                {buttonLabel}
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
                href="#lien-he"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Chat với chuyên viên
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
