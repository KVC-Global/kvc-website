"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { BookOpen, ChevronRight, FileCheck, ShieldCheck } from "lucide-react"

import { Container } from "@/components/ui/container"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import { cn } from "@/lib/utils"

const HERO_IMAGE = "/images/dat-nuoc-singapore-01.jpg"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const pillVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
}

export function BlogHero({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useDictionary()
  const homeHref = locale === "en" ? "/en" : "/"

  return (
    <section
      aria-labelledby="blog-hero-heading"
      className={cn(
        "relative w-full overflow-hidden border-b border-border/60 bg-white",
        className
      )}
    >
      {/* Background imagery with subtle brand gradient overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.14, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          role="presentation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white"
      />

      <Container className="relative z-10 pt-28 pb-10 sm:pt-32 sm:pb-12 md:pt-36 md:pb-14">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={itemFadeUp}
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <Link
              href={homeHref}
              className="transition-colors duration-200 hover:text-brand-blue-mid"
            >
              {t.nav.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 select-none" />
            <span
              className="font-semibold text-brand-blue-mid"
              aria-current="page"
            >
              {t.nav.blog}
            </span>
          </motion.nav>

          {/* Eyebrow badge */}
          <motion.div variants={itemFadeUp} className="mb-3.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3.5 py-1 font-heading text-xs font-semibold tracking-wide text-brand-gold">
              {t.blog.heroEyebrow}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemFadeUp}
            id="blog-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[46px] lg:leading-[1.12]"
          >
            {t.blog.heroTitle}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemFadeUp}
            className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-brand-dark/80 sm:text-base md:text-[17px]"
          >
            {t.blog.heroDescription}
          </motion.p>

          {/* Value Highlights */}
          <motion.div
            variants={itemFadeUp}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-medium text-brand-dark/75 sm:text-sm"
          >
            <motion.div
              variants={pillVariant}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-slate-100/70 py-1 pr-3 pl-1.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-blue-mid shadow-xs">
                <BookOpen className="h-3.5 w-3.5 text-brand-gold" />
              </span>
              <span>
                {locale === "en" ? "Curated Handbooks" : "Cẩm nang chuyên sâu"}
              </span>
            </motion.div>

            <motion.div
              variants={pillVariant}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-slate-100/70 py-1 pr-3 pl-1.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-blue-mid shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
              </span>
              <span>
                {locale === "en"
                  ? "Official MoM Policy"
                  : "Chính sách MoM chuẩn xác"}
              </span>
            </motion.div>

            <motion.div
              variants={pillVariant}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-slate-100/70 py-1 pr-3 pl-1.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-blue-mid shadow-xs">
                <FileCheck className="h-3.5 w-3.5 text-brand-gold" />
              </span>
              <span>
                {locale === "en" ? "Scholarship Guides" : "Học bổng & Định cư"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
