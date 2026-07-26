"use client"

import { GraduationCap } from "lucide-react"
import type { StudyAbroadServicesContent } from "@/sanity/study-abroad-page"
import { studyAbroadIcons } from "./study-abroad-icons"

const RELATED_SERVICES = [
  {
    title: "Du học Singapore",
    ctaText: "Tìm hiểu ngay",
    icon: "GraduationCap",
    href: "#",
  },
  {
    title: "Work Holiday Pass",
    ctaText: "Khám phá ngay",
    icon: "Briefcase",
    href: "#",
  },
  {
    title: "Permanent Residency (PR)",
    ctaText: "Tìm hiểu ngay",
    icon: "IdCard",
    href: "#",
  },
  {
    title: "Thành lập doanh nghiệp",
    ctaText: "Tìm hiểu ngay",
    icon: "Building2",
    href: "#",
  },
] as const

export function StudyAbroadServices({ content }: { content?: StudyAbroadServicesContent }) {
  const services = content?.services?.length
    ? content.services
    : RELATED_SERVICES

  return (
    <section
      aria-labelledby="related-services-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <div className="text-center mb-10">
        <h2
          id="related-services-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          {content?.title || "Các dịch vụ liên quan"}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {services.map((service, index) => {
          const iconName = service.icon
          const Icon = iconName ? studyAbroadIcons[iconName] : undefined

          return (
            <a
              key={index}
              href={service.href || "#"}
              className="flex items-center gap-4 bg-white border border-border/60 rounded-lg p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid transition-colors duration-300 group-hover:bg-brand-blue">
                {Icon ? (
                  <Icon className="h-5 w-5 text-brand-gold-light group-hover:scale-105 transition-transform duration-300" strokeWidth={1.75} />
                ) : (
                  <GraduationCap className="h-5 w-5 text-brand-gold-light group-hover:scale-105 transition-transform duration-300" strokeWidth={1.75} />
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-heading text-[14px] md:text-[15px] font-bold text-brand-blue leading-snug group-hover:text-brand-gold transition-colors duration-300">
                  {service.title}
                </span>
                <span className="font-body text-xs font-semibold text-brand-gold flex items-center gap-1.5 mt-1 leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                  {service.ctaText || "Tìm hiểu ngay"}
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
