"use client"

import Image from "next/image"
import Link from "next/link"
import { Award, Briefcase, ClipboardCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const STATS = [
  {
    type: "lucide",
    icon: Briefcase,
    value: "10+ năm",
    label: "Kinh nghiệm",
  },
  {
    type: "lucide",
    icon: ClipboardCheck,
    value: "15,000+ hồ sơ",
    label: "Tư vấn thành công",
  },
  {
    type: "lucide",
    icon: Award,
    value: "95% tỷ lệ",
    label: "Visa & hồ sơ thành công",
  },
  {
    type: "google",
    value: "Google 4.9/5",
    label: "250+ đánh giá",
  },
] as const

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5.04c1.67 0 3.2.58 4.38 1.69l3.27-3.27C17.68 1.54 14.99 1 12 1 7.35 1 3.37 3.65 1.4 7.56l3.85 2.99c.9-2.69 3.42-4.51 6.75-4.51z"
      />
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.87 3.39-8.49z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.45c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.4 7.06A11.956 11.956 0 000 12c0 1.77.39 3.45 1.07 4.96l4.18-3.51z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-3.96 1.09-3.33 0-6.15-1.92-7.15-4.6L1.07 17.04C3.04 20.91 7.21 23 12 23z"
      />
    </svg>
  )
}

export function WorkPassHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="work-pass-hero-heading"
      className={cn(
        "relative w-full overflow-hidden border-b border-border bg-white",
        className
      )}
    >
      {/* Desktop Background Image (Right side) */}
      <div className="absolute inset-y-0 right-0 z-0 hidden w-full lg:block lg:w-[52%]">
        <Image
          src="/images/work-pass-hero.jpg"
          alt="Đội ngũ chuyên gia KVC Global tại Singapore"
          fill
          priority
          sizes="(max-w-1024px) 100vw, 52vw"
          className="object-cover object-center"
        />
        {/* Soft blend transition from white background (left) to image */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-white via-white/80 to-transparent"
        />
      </div>

      {/* Main Content Container */}
      <Container className="relative z-10 pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm"
        >
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Trang chủ
          </Link>
          <span className="select-none text-muted-foreground/60">&gt;</span>
          <span className="text-muted-foreground/80">
            Work pass & việc làm
          </span>
          <span className="select-none text-muted-foreground/60">&gt;</span>
          <span
            className="font-semibold text-foreground/80"
            aria-current="page"
          >
            TEP - Training Employment Pass
          </span>
        </nav>

        {/* Mobile/Tablet Image Display (Shown only on small/medium screens) */}
        <div className="relative mb-8 h-[240px] w-full overflow-hidden rounded-lg sm:h-[360px] md:h-[420px] lg:hidden">
          <Image
            src="/images/work-pass-hero.jpg"
            alt="Đội ngũ chuyên gia KVC Global tại Singapore"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content Box */}
        <div className="max-w-full lg:max-w-[55%]">
          {/* Main Title */}
          <h1
            id="work-pass-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            TEP - Training
            <span className="block mt-1">Employment Pass Singapore</span>
          </h1>

          {/* Description Paragraph */}
          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px] md:leading-relaxed">
            Cơ hội làm việc và tích lũy kinh nghiệm thực tế tại Singapore cho
            sinh viên quốc tế và người trẻ có tiềm năng.
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#dat-lich"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Đặt lịch tư vấn miễn phí
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
              href="#quy-trinh"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Tìm hiểu quy trình
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-border bg-border shadow-[0_12px_40px_-15px_rgba(15,27,45,0.12)] ring-1 ring-black/5 md:grid-cols-4 lg:w-fit">
            {STATS.map((stat, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white px-5 py-4 transition-all duration-300 ease-out hover:bg-brand-light sm:px-6 sm:py-5 lg:min-w-[240px]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-light">
                    {stat.type === "lucide" && stat.icon ? (
                      <stat.icon
                        className="h-5 w-5 text-brand-gold"
                        strokeWidth={2}
                      />
                    ) : (
                      <GoogleIcon className="h-5 w-5" />
                    )}
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
