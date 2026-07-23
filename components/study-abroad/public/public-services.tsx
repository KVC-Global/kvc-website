"use client"

import { GraduationCap, Briefcase, BookOpen, Building2 } from "lucide-react"
import { useLocale } from "@/lib/i18n-client"

export function PublicStudyAbroadServices() {
  const locale = useLocale()
  const prefix = locale === "en" ? "/en" : "/vi"

  const RELATED_SERVICES = [
    {
      title: "Du học tư thục Singapore",
      ctaText: "Tìm hiểu ngay",
      icon: Building2,
      href: `${prefix}/du-hoc/tu-thuc`,
    },
    {
      title: "Diploma 6+6 Singapore",
      ctaText: "Khám phá ngay",
      icon: GraduationCap,
      href: `${prefix}/du-hoc`,
    },
    {
      title: "Khóa học Online quốc tế",
      ctaText: "Tìm hiểu ngay",
      icon: BookOpen,
      href: `${prefix}/khoa-hoc-online`,
    },
    {
      title: "Work Pass & Việc làm",
      ctaText: "Tìm hiểu ngay",
      icon: Briefcase,
      href: `${prefix}/work-pass`,
    },
  ] as const

  return (
    <section
      aria-labelledby="related-services-heading"
      className="w-full animate-fade-in"
    >
      <div className="text-center mb-10">
        <h2
          id="related-services-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          Các dịch vụ liên quan từ KVC Global
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {RELATED_SERVICES.map((service, index) => {
          const Icon = service.icon
          return (
            <a
              key={index}
              href={service.href}
              className="flex items-center gap-4 bg-white border border-border/60 rounded-lg p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer dark:border-border/10 dark:bg-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid transition-colors duration-300 group-hover:bg-brand-blue">
                <Icon className="h-5 w-5 text-brand-gold-light group-hover:scale-105 transition-transform duration-300" strokeWidth={1.75} />
              </div>

              <div className="flex flex-col">
                <span className="font-heading text-[14px] md:text-[15px] font-bold text-brand-blue dark:text-foreground leading-snug group-hover:text-brand-gold transition-colors duration-300">
                  {service.title}
                </span>
                <span className="font-body text-xs font-semibold text-brand-gold flex items-center gap-1.5 mt-1 leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                  {service.ctaText}
                  <span className="text-[10px]">→</span>
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
