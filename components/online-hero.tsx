"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Clock,
  Coins,
  FileCheck,
  GraduationCap,
} from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const STATS = [
  {
    icon: Clock,
    value: "Linh hoạt",
    label: "thời gian học",
  },
  {
    icon: Coins,
    value: "Tiết kiệm",
    label: "chi phí du học",
  },
  {
    icon: FileCheck,
    value: "Bằng cấp",
    label: "chính quy",
  },
  {
    icon: GraduationCap,
    value: "Liên thông",
    label: "quốc tế",
  },
] as const

export function OnlineHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="online-hero-heading"
      className={cn("relative w-full overflow-hidden bg-white border-b border-border", className)}
    >
      {/* Desktop Background Image (Right side) */}
      <div className="absolute inset-y-0 right-0 z-0 hidden w-full lg:block lg:w-[52%]">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"
          alt="Học viên trực tuyến"
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
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-8 md:py-16 lg:py-20">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm font-body"
        >
          <Link href="/" className="hover:text-foreground transition-colors duration-200">
            Trang chủ
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span className="text-foreground/80 font-semibold" aria-current="page">
            Khóa Học Online
          </span>
        </motion.nav>

        {/* Mobile/Tablet Image Display (Shown only on small/medium screens) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 h-[240px] w-full overflow-hidden rounded-lg sm:h-[360px] md:h-[420px] lg:hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"
            alt="Học viên trực tuyến"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Content Box */}
        <div className="max-w-full lg:max-w-[55%]">
          {/* Subtitle / Tag */}
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm mb-3"
          >
            ĐÀO TẠO TRỰC TUYẾN
          </motion.span>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            id="online-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            Học tập linh hoạt,
            <span className="block mt-1">phát triển sự nghiệp toàn cầu</span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px] md:leading-relaxed"
          >
            Các chương trình đào tạo trực tuyến chất lượng quốc tế,
            giúp bạn vừa học vừa làm và lấy bằng cấp có giá trị toàn cầu.
          </motion.p>

          {/* Call to Actions (CTAs) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <Link
              href="#dang-ky"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-gold px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#b07f32] hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
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
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              Khám phá chương trình
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
          </motion.div>
        </div>

        {/* Stats Grid Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-20 mt-12 w-full lg:mt-16 xl:mt-20"
        >
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
                      className="h-5 w-5 text-brand-gold"
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
        </motion.div>
      </div>
    </section>
  )
}
