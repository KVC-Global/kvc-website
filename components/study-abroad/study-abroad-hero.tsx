"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Clock,
  Coins,
  FileCheck,
  GraduationCap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const STATS = [
  {
    icon: Clock,
    value: "1 năm",
    label: "hoàn thành",
  },
  {
    icon: Coins,
    value: "800 – 1.500 SGD/tháng",
    label: "trợ cấp thực tập",
  },
  {
    icon: FileCheck,
    value: "Không yêu cầu IELTS",
    label: "bắt buộc",
  },
  {
    icon: GraduationCap,
    value: "Bằng Diploma",
    label: "quốc tế",
  },
] as const

export function StudyAbroadHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="study-hero-heading"
      className={cn("relative w-full overflow-hidden bg-white border-b border-border", className)}
    >
      {/* Desktop Background Image (Right side) */}
      <div className="absolute inset-y-0 right-0 z-0 hidden w-full lg:block lg:w-[52%]">
        <Image
          src="/images/study-abroad-hero.jpg"
          alt="Nhóm du học sinh tại Singapore"
          fill
          priority
          sizes="(max-w-1024px) 100vw, 52vw"
          className="object-cover object-center"
        />
        {/* Soft blend transition from white background (left) to image */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent"
        />
      </div>

      {/* Main Content Container */}
      <Container className="relative z-10 py-8 md:py-16 lg:py-20">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm font-body"
        >
          <Link href="/" className="hover:text-foreground transition-colors duration-200">
            Trang chủ
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <Link href="/du-hoc" className="hover:text-foreground transition-colors duration-200">
            Du học
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span className="text-foreground/80 font-semibold" aria-current="page">
            Diploma 6+6 tại Singapore
          </span>
        </nav>

        {/* Mobile/Tablet Image Display (Shown only on small/medium screens) */}
        <div className="relative mb-8 h-[240px] w-full overflow-hidden rounded-lg sm:h-[360px] md:h-[420px] lg:hidden">
          <Image
            src="/images/study-abroad-hero.jpg"
            alt="Nhóm du học sinh tại Singapore"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content Box */}
        <div className="max-w-full lg:max-w-[55%]">
          {/* Subtitle / Tag */}
          <span className="inline-block font-heading text-xs font-bold tracking-wider text-secondary uppercase sm:text-sm mb-3">
            DIPLOMA 6+6 TẠI SINGAPORE
          </span>

          {/* Main Title */}
          <h1
            id="study-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            Vừa học vừa làm,
            <span className="block mt-1">lấy bằng quốc tế chỉ trong 1 năm</span>
          </h1>

          {/* Description Paragraph */}
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px] md:leading-relaxed">
            Lộ trình Diploma 6+6 kết hợp 6 tháng học lý thuyết
            và 6 tháng thực tập hưởng lương tại Singapore.
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="#dang-ky"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-secondary/90 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Đăng ký tư vấn miễn phí
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
            </Link>

            <Link
              href="#chuong-trinh"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-secondary bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Tìm hiểu chương trình
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 text-brand-blue"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats Grid Container */}
        <div className="relative z-20 mt-12 w-full lg:mt-16 xl:mt-20">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border shadow-[0_12px_40px_-15px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:grid-cols-2 lg:grid-cols-4 lg:w-fit">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white px-5 py-4 transition-all duration-300 ease-out hover:bg-brand-light sm:px-6 sm:py-5 lg:min-w-[240px]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-light">
                    <Icon
                      className="h-5 w-5 text-secondary"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-sm font-bold text-brand-blue sm:text-[15px]">
                      {stat.value}
                    </span>
                    <span className="font-body text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </span>
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
