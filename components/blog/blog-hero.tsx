"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"

import { Container } from "@/components/ui/container"
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

export function BlogHero({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useDictionary()

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

      <Container className="relative z-10 flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-20">
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
      </Container>
    </section>
  )
}
