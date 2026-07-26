"use client"

import Image from "next/image"
import Link from "next/link"
import { Award, Briefcase, ClipboardCheck } from "lucide-react"

import { StudyAbroadStatBar } from "@/components/study-abroad/study-abroad-stat-bar"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/image"
import type { WorkPassHeroContent } from "@/sanity/work-pass-page"
import { workPassIcons } from "./work-pass-icons"

const HERO_IMAGE = "/images/work-pass-hero.jpg"

const STATS = [
  { icon: Briefcase, value: "10+ năm", label: "Kinh nghiệm" },
  { icon: ClipboardCheck, value: "15,000+ hồ sơ", label: "Tư vấn thành công" },
  { icon: Award, value: "95% tỷ lệ", label: "Visa & hồ sơ thành công" },
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

export function WorkPassHero({
  className,
  content,
}: {
  className?: string
  content?: WorkPassHeroContent
}) {
  const heroImage = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : HERO_IMAGE

  const stats = content?.stats?.length
    ? content.stats.map((stat) => ({
        icon: stat.icon ? workPassIcons[stat.icon] || Briefcase : Briefcase,
        value: stat.value || "",
        label: stat.label || "",
      }))
    : STATS

  return (
    <section
      aria-labelledby="work-pass-hero-heading"
      className={cn(
        "relative w-full border-b border-border bg-white bg-cover bg-center pb-16 md:pb-20",
        className
      )}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <Image
        src={heroImage}
        alt=""
        role="presentation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 0%, #fff 30%, transparent 70%)",
        }}
      />

      <Container className="relative z-10 flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-20">
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
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span className="text-muted-foreground/80">Work pass & việc làm</span>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span
            className="font-semibold text-foreground/80"
            aria-current="page"
          >
            TEP - Training Employment Pass
          </span>
        </nav>

        <div className="max-w-2xl">
          {/* Main Title */}
          <h1
            id="work-pass-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            {content?.title ? (
              content.title
            ) : (
              <>
                TEP - Training
                <span className="mt-1 block">Employment Pass Singapore</span>
              </>
            )}
          </h1>

          {/* Description Paragraph */}
          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px] md:leading-relaxed">
            {content?.description ||
              "Cơ hội làm việc và tích lũy kinh nghiệm thực tế tại Singapore cho sinh viên quốc tế và người trẻ có tiềm năng."}
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={content?.primaryButtonHref || "#dat-lich"}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              {content?.primaryButtonLabel || "Đặt lịch tư vấn miễn phí"}
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
              href={content?.secondaryButtonHref || "#quy-trinh"}
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              {content?.secondaryButtonLabel || "Tìm hiểu quy trình"}
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
      </Container>

      <StudyAbroadStatBar
        stats={[
          ...stats,
          {
            icon: GoogleIcon,
            value: "Google 4.9/5",
            label: "250+ đánh giá",
          },
        ]}
      />
    </section>
  )
}
