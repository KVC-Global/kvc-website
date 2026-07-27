"use client"

import Link from "next/link"
import { Clock, Coins, FileCheck, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

import type { KhoaHocOnlineHero } from "@/sanity/service-pages"
import { getIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"

const STATS = [
  { icon: Clock, value: "Linh hoạt", label: "thời gian học" },
  { icon: Coins, value: "Tiết kiệm", label: "chi phí du học" },
  { icon: FileCheck, value: "Bằng cấp", label: "chính quy" },
  { icon: GraduationCap, value: "Liên thông", label: "quốc tế" },
] as const

export function OnlineHero({
  className,
  data,
}: {
  className?: string
  data?: KhoaHocOnlineHero
}) {
  const eyebrow =
    data?.eyebrow ?? "ĐÀO TẠO TRỰC TUYẾN"
  const title =
    data?.title ??
    "Học tập linh hoạt,\nphát triển sự nghiệp toàn cầu"
  const description =
    data?.description ??
    "Các chương trình đào tạo trực tuyến chất lượng quốc tế, giúp bạn vừa học vừa làm và lấy bằng cấp có giá trị toàn cầu."
  const primaryButtonLabel =
    data?.primaryButtonLabel ?? "Đăng ký tư vấn miễn phí"
  const primaryButtonHref = data?.primaryButtonHref ?? "#dang-ky"
  const secondaryButtonLabel =
    data?.secondaryButtonLabel ?? "Khám phá chương trình"
  const secondaryButtonHref = data?.secondaryButtonHref ?? "#chuong-trinh"

  const displayStats =
    data?.stats && data.stats.length > 0
      ? data.stats.map((s) => ({
          icon: getIcon(s.icon, Clock),
          value: s.value ?? "",
          label: s.label ?? "",
        }))
      : [...STATS]

  const titleLines = title.split("\n")

  return (
    <section
      aria-labelledby="online-hero-heading"
      className={cn(
        "relative w-full overflow-hidden bg-cover bg-center",
        className
      )}
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white from-50% to-transparent to-100%"
      />

      <Container className="relative flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-0">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:mb-8 md:text-sm"
        >
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Trang chủ
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span
            className="font-semibold text-foreground/80"
            aria-current="page"
          >
            Khóa Học Online
          </span>
        </motion.nav>

        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            id="online-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            {titleLines.map((line, i) => (
              <span key={i} className={i > 0 ? "mt-1 block" : ""}>
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href={primaryButtonHref}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid"
            >
              {primaryButtonLabel}
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
              href={secondaryButtonHref}
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-blue-mid bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:text-white hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid"
            >
              {secondaryButtonLabel}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 text-brand-blue transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-20 mt-10 w-full sm:mt-12 lg:mt-16 xl:mt-20"
        >
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border shadow-[0_12px_40px_-15px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:grid-cols-2 lg:w-fit lg:grid-cols-4">
            {displayStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label ?? index}
                  className="flex items-center gap-4 bg-white px-5 py-4 transition-all duration-300 ease-out hover:bg-brand-light sm:px-6 sm:py-5 lg:min-w-[240px]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-blue-mid">
                    <Icon
                      className="h-5 w-5 text-brand-gold-light"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-sm font-bold text-brand-blue sm:text-[15px]">
                      {stat.value}
                    </span>
                    <span className="font-body text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
