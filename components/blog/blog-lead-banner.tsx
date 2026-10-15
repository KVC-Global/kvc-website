"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

import { useDictionary, useLocale } from "@/lib/i18n-client"
import { cn } from "@/lib/utils"

export function BlogLeadBanner({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useDictionary()
  const contactHref = locale === "en" ? "/en/lien-he" : "/vi/lien-he"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn(
        "relative col-span-full my-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-brand-blue via-brand-blue-mid to-brand-blue-mid p-6 text-white shadow-xl sm:p-8 lg:p-10",
        className
      )}
    >
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-heading text-[11px] font-semibold tracking-wider text-brand-gold-light backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>KVC Global Advisory</span>
          </div>

          <h3 className="mt-3 font-heading text-xl leading-snug font-extrabold sm:text-2xl lg:text-3xl">
            {t.blog.leadBannerTitle}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
            {t.blog.leadBannerDesc}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold-light" />
              {locale === "en"
                ? "1-on-1 profile evaluation"
                : "Thẩm định hồ sơ 1:1"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold-light" />
              {locale === "en"
                ? "Visa & Work Pass pathway"
                : "Lộ trình Visa & Pass tối ưu"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold-light" />
              {locale === "en"
                ? "Scholarships up to 50%"
                : "Săn học bổng lên tới 50%"}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={contactHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-heading text-sm font-bold text-brand-blue-mid shadow-md transition-all duration-300 hover:bg-slate-50 hover:shadow-lg"
            >
              <span>{t.blog.leadBannerCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
