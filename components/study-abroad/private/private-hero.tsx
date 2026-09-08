"use client"

import Link from "next/link"
import { School, Milestone, GraduationCap, CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { StudyAbroadStatBar } from "@/components/study-abroad/study-abroad-stat-bar"
import Image from "next/image"
import { useLocale, useDictionary } from "@/lib/i18n-client"
import { urlFor } from "@/sanity/image"
import type { PrivateStudyHeroContent } from "@/sanity/private-study-page"
import { privateStudyIcons } from "./private-study-icons"

const HERO_IMAGE = "/images/private-school-hero.jpg"

const STATS = [
  { icon: School, value: "Mầm non – Lớp 12", label: "bậc đào tạo" },
  { icon: Milestone, value: "18 tháng – 18 tuổi", label: "độ tuổi học sinh" },
  {
    icon: GraduationCap,
    value: "IB, AP, A-Level...",
    label: "chương trình quốc tế",
  },
  { icon: CheckCircle, value: "Trọn gói thủ tục", label: "tư vấn & hồ sơ" },
] as const

export function PrivateStudyAbroadHero({
  className,
  content,
}: {
  className?: string
  content?: PrivateStudyHeroContent
}) {
  const locale = useLocale()
  const isEn = locale === "en"
  const t = useDictionary()

  const heroImage = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : HERO_IMAGE

  const stats = content?.stats?.length
    ? content.stats.map((stat) => ({
        icon: stat.icon ? privateStudyIcons[stat.icon] || GraduationCap : GraduationCap,
        value: stat.value || "",
        label: stat.label || "",
      }))
    : STATS

  return (
    <section
      aria-labelledby="private-hero-heading"
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
        className="animate-fade-in object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 0%, #fff 30%, transparent 70%)",
        }}
      />

      <Container className="relative flex min-h-[580px] flex-col justify-center pt-28 pb-20 md:min-h-[640px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:mb-8 md:text-sm"
        >
          <Link
            href={isEn ? "/en" : "/"}
            className="transition-colors duration-200 hover:text-foreground"
          >
            {t.nav.home}
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <Link
            href={isEn ? "/en/du-hoc" : "/du-hoc"}
            className="transition-colors duration-200 hover:text-foreground"
          >
            {t.nav.studyAbroad}
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span
            className="font-semibold text-foreground/80"
            aria-current="page"
          >
            {content?.eyebrow || (isEn ? "Singapore Private School" : "Du học tư thục Singapore")}
          </span>
        </nav>

        <div className="max-w-2xl">
          <span className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
            {content?.eyebrow || "DU HỌC TƯ THỰC SINGAPORE"}
          </span>

          <h1
            id="private-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            {content?.title ? (
              content.title
            ) : (
              <>
                Môi trường quốc tế,
                <span className="mt-1 block">mở cánh cửa tương lai toàn cầu</span>
              </>
            )}
          </h1>

          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
            {content?.description ||
              "Hệ thống các trường quốc tế chất lượng hàng đầu tại Singapore đào tạo mọi độ tuổi từ Mầm non đến Trung học phổ thông, chuẩn bị hành trang tối ưu cho học sinh."}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={content?.primaryButtonHref || "#dang-ky-tu-van"}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid"
            >
              {content?.primaryButtonLabel || "Đăng ký tư vấn miễn phí"}
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
              href={content?.secondaryButtonHref || "#truong-tieu-bieu"}
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              {content?.secondaryButtonLabel || "Xem các trường tiêu biểu"}
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

      <StudyAbroadStatBar stats={stats} />
    </section>
  )
}
