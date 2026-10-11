"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { BLOG_CATEGORIES, type BlogCategoryId } from "@/lib/blog"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import { cn } from "@/lib/utils"

const HERO_IMAGE = "/images/dat-nuoc-singapore-01.jpg"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

export function BlogHero({
  className,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: {
  className?: string
  activeCategory: BlogCategoryId
  searchQuery: string
  onCategoryChange: (category: BlogCategoryId) => void
  onSearchChange: (query: string) => void
}) {
  const locale = useLocale()
  const t = useDictionary()
  const categoryLabels: Record<BlogCategoryId, string> = {
    all: t.blog.filters.all,
    "study-abroad": t.blog.filters.studyAbroad,
    work: t.blog.filters.work,
    scholarship: t.blog.filters.scholarship,
    residency: t.blog.filters.residency,
    experience: t.blog.filters.experience,
    news: t.blog.filters.news,
    event: t.blog.filters.event,
  }

  return (
    <section
      aria-labelledby="blog-hero-heading"
      className={cn(
        "relative w-full overflow-hidden border-b border-border bg-white bg-cover bg-center",
        className
      )}
    >
      <Image
        src={HERO_IMAGE}
        alt=""
        role="presentation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/85 md:bg-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #fff 0%, #fff 34%, rgba(255,255,255,.93) 48%, rgba(255,255,255,.5) 70%, rgba(255,255,255,0) 100%)",
        }}
      />

      <Container className="relative flex min-h-[560px] flex-col justify-center pt-28 pb-10 sm:pt-32 md:min-h-[600px] md:pt-36">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:mb-10 md:text-sm"
        >
          <Link
            href={locale === "en" ? "/en" : "/"}
            className="transition-colors duration-200 hover:text-foreground"
          >
            {t.nav.home}
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span
            className="font-semibold text-foreground/80"
            aria-current="page"
          >
            {t.nav.blog}
          </span>
        </nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
          >
            {t.blog.heroEyebrow}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            id="blog-hero-heading"
            className="max-w-xl font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[46px] lg:leading-[1.12]"
          >
            {t.blog.heroTitle}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl font-body text-sm leading-relaxed text-brand-dark/80 sm:text-base md:text-[17px]"
          >
            {t.blog.heroDescription}
          </motion.p>
        </motion.div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="relative w-full max-w-md shrink-0"
          >
            <label htmlFor="blog-search" className="sr-only">
              {t.blog.searchLabel}
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-brand-dark/60"
              aria-hidden="true"
            />
            <input
              id="blog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={t.blog.searchPlaceholder}
              className="h-12 w-full rounded-[10px] border border-border/70 bg-white/95 pr-4 pl-11 text-sm text-brand-dark shadow-sm transition outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-mid/15"
            />
          </form>

          <div
            role="group"
            aria-label={t.blog.categoryLabel}
            className="scrollbar-hide flex min-w-0 gap-2 overflow-x-auto pb-1"
          >
            {BLOG_CATEGORIES.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onCategoryChange(category)}
                  className={cn(
                    "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-brand-blue-mid bg-brand-blue-mid text-white"
                      : "border-border/80 bg-white/95 text-brand-dark hover:border-brand-blue-mid hover:text-brand-blue-mid"
                  )}
                >
                  {categoryLabels[category]}
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
