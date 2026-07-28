"use client"

import { HelpCircle } from "lucide-react"
import { useLocale } from "@/lib/i18n-client"
import type { PublicStudyRelatedServicesContent, PublicStudyRelatedServiceItem } from "@/sanity/public-study-page"
import { publicStudyIcons } from "./public-study-icons"

export function PublicStudyAbroadServices({ content }: { content?: PublicStudyRelatedServicesContent }) {
  const locale = useLocale()
  const isEn = locale === "en"
  const prefix = isEn ? "/en" : "/vi"

  const RELATED_SERVICES: PublicStudyRelatedServiceItem[] = [
    {
      title: "Du học tư thục Singapore",
      ctaText: "Tìm hiểu ngay",
      icon: "Building2",
      href: `${prefix}/du-hoc/tu-thuc`,
    },
    {
      title: "Diploma 6+6 Singapore",
      ctaText: "Khám phá ngay",
      icon: "GraduationCap",
      href: `${prefix}/du-hoc`,
    },
    {
      title: "Khóa học Online quốc tế",
      ctaText: "Tìm hiểu ngay",
      icon: "BookOpen",
      href: `${prefix}/khoa-hoc-online`,
    },
    {
      title: "Work Pass & Việc làm",
      ctaText: "Tìm hiểu ngay",
      icon: "Briefcase",
      href: `${prefix}/work-pass`,
    },
  ]

  const services = content?.services?.length
    ? content.services
    : RELATED_SERVICES

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
          {content?.title || (isEn ? "Related Services from KVC Global" : "Các dịch vụ liên quan từ KVC Global")}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {services.map((service, index) => {
          const iconName = service.icon
          const Icon = iconName ? publicStudyIcons[iconName] : undefined

          let href = service.href || "#"
          if (href.startsWith("/")) {
            if (isEn && !href.startsWith("/en")) {
              href = `/en${href}`
            } else if (!isEn && !href.startsWith("/vi")) {
              href = `/vi${href}`
            }
          }

          const ctaText = service.ctaText || (isEn ? "Learn more" : "Tìm hiểu ngay")

          return (
            <a
              key={index}
              href={href}
              className="flex items-center gap-4 bg-white border border-border/60 rounded-lg p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer dark:border-border/10 dark:bg-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid transition-colors duration-300 group-hover:bg-brand-blue">
                {Icon ? (
                  <Icon className="h-5 w-5 text-brand-gold-light group-hover:scale-105 transition-transform duration-300" strokeWidth={1.75} />
                ) : (
                  <HelpCircle className="h-5 w-5 text-brand-gold-light group-hover:scale-105 transition-transform duration-300" strokeWidth={1.75} />
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-heading text-[14px] md:text-[15px] font-bold text-brand-blue dark:text-foreground leading-snug group-hover:text-brand-gold transition-colors duration-300">
                  {service.title}
                </span>
                <span className="font-body text-xs font-semibold text-brand-gold flex items-center gap-1.5 mt-1 leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                  {ctaText}
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
