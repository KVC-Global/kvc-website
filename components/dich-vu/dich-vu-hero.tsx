"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Building2, Globe2, Handshake, Users } from "lucide-react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const HERO_IMAGE = "/images/service-hero.jpg"

const STATS = [
  { icon: Building2, value: "500+", label: "Doanh nghiệp thành lập" },
  { icon: Globe2, value: "2", label: "Quốc gia hoạt động" },
  { icon: Users, value: "10.000+", label: "Nhân sự được hỗ trợ" },
  { icon: Handshake, value: "15+", label: "Năm kinh nghiệm" },
] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

export function DichVuHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="dich-vu-hero-heading"
      className={cn(
        "relative w-full border-b border-border bg-white bg-cover bg-center pb-16 md:pb-20",
        className
      )}
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <Image
        src={HERO_IMAGE}
        alt="Văn phòng KVC Global tại Singapore"
        fill
        priority
        sizes="100vw"
        className="animate-fade-in object-cover object-center"
        style={{ transform: "scaleX(-1)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 0%, #fff 30%, transparent 60%)",
        }}
      />

      {/* Main Content Container */}
      <Container className="relative flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-0">
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
          <span
            className="font-semibold text-foreground/80"
            aria-current="page"
          >
            Dịch vụ
          </span>
        </nav>

        {/* Content Box */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-full lg:max-w-[55%]"
        >
          {/* Subtitle / Tag */}
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
          >
            Giải pháp cho doanh nghiệp
          </motion.span>

          {/* Main Title */}
          <motion.h1
            variants={fadeUp}
            id="dich-vu-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            Đồng hành cùng doanh nghiệp
            <span className="mt-1 block">trên hành trình mở rộng toàn cầu</span>
          </motion.h1>

          {/* Call to Actions (CTAs) */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="#dich-vu"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Khám phá dịch vụ
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
              href="/lien-he"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
          </motion.div>
        </motion.div>
      </Container>

      {/* Stats Grid — centered on the hero → services boundary, straddling both. */}
      <div className="relative z-20 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:translate-y-1/2">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Container>
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-16px_rgba(15,27,45,0.25),0_8px_16px_-8px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:rounded-3xl">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      variants={fadeUp}
                      className="relative flex items-center justify-center gap-3 bg-white px-4 py-5 text-left transition-colors duration-300 ease-out sm:gap-4 sm:px-6 sm:py-6 lg:min-h-[150px] lg:py-7"
                    >
                      <Icon
                        className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
                        style={{ color: "#f8bc62" }}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <div className="flex min-w-0 flex-col lg:gap-1.5">
                        <div className="font-display text-xl font-bold text-primary sm:text-3xl">
                          {stat.value}
                        </div>
                        <div className="truncate font-sans text-sm font-semibold tracking-[0.12em] text-foreground/70 uppercase sm:text-xs">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Desktop vertical dividers */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden lg:block"
              >
                {[25, 50, 75].map((left) => (
                  <span
                    key={left}
                    className="absolute"
                    style={{
                      backgroundColor: "#c8913c",
                      height: 48,
                      left: `${left}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 2,
                    }}
                  />
                ))}
              </div>

              {/* Mobile cross dividers */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 lg:hidden"
              >
                <span
                  className="absolute"
                  style={{
                    backgroundColor: "#d6b46d",
                    height: 40,
                    left: "50%",
                    top: "25%",
                    transform: "translate(-50%, -50%)",
                    width: 1,
                  }}
                />
                <span
                  className="absolute"
                  style={{
                    backgroundColor: "#d6b46d",
                    height: 40,
                    left: "50%",
                    top: "75%",
                    transform: "translate(-50%, -50%)",
                    width: 1,
                  }}
                />
                <span
                  className="absolute"
                  style={{
                    backgroundColor: "#d6b46d",
                    height: 1,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 40,
                  }}
                />
              </div>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  )
}
