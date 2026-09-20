"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"

import { useDictionary } from "@/lib/i18n-client"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

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

export function BlogHero({ className }: { className?: string }) {
  const t = useDictionary()

  return (
    <section
      aria-labelledby="blog-hero-heading"
      className={cn(
        "w-full border-b border-border/60 bg-white pb-14 pt-28 sm:pb-16 sm:pt-32 md:pb-20 md:pt-36",
        className
      )}
    >
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm"
        >
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-foreground"
          >
            {t.nav.home}
          </Link>
          <span className="select-none text-muted-foreground/60">&gt;</span>
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
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
            >
              {t.blog.heroEyebrow}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              id="blog-hero-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.12]"
            >
              {t.blog.heroTitle}
            </motion.h1>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-lg font-body text-sm leading-relaxed text-brand-dark/80 sm:text-base lg:justify-self-end lg:text-right"
          >
            {t.blog.heroDescription}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}
