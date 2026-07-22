"use client"

import Link from "next/link"
import { GraduationCap, Briefcase, IdCard, Building2 } from "lucide-react"

const SERVICES = [
  {
    icon: GraduationCap,
    title: "Du học Singapore",
    cta: "Tìm hiểu ngay",
    href: "/du-hoc",
  },
  {
    icon: Briefcase,
    title: "Work Holiday Pass",
    cta: "Khám phá ngay",
    href: "#",
  },
  {
    icon: IdCard,
    title: "Permanent Residency (PR)",
    cta: "Tìm hiểu ngay",
    href: "#",
  },
  {
    icon: Building2,
    title: "Thành lập doanh nghiệp",
    cta: "Tìm hiểu ngay",
    href: "#",
  },
] as const

export function WorkPassServices() {
  return (
    <section aria-labelledby="services-heading" className="mt-20 md:mt-28 w-full">
      <div className="text-center mb-12">
        <h2
          id="services-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          Các dịch vụ liên quan
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((srv, idx) => {
          const Icon = srv.icon
          return (
            <Link
              key={idx}
              href={srv.href}
              className="group flex cursor-pointer items-center gap-4 rounded-lg border border-border/60 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)]"
            >
              {/* Icon Frame */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid transition-colors duration-300 group-hover:bg-brand-blue">
                <Icon
                  className="h-5 w-5 text-brand-gold-light transition-transform duration-300 group-hover:scale-105"
                  strokeWidth={1.75}
                />
              </div>

              {/* Copy & Link */}
              <div className="flex flex-col">
                <h3 className="font-heading text-sm sm:text-base font-bold text-brand-blue group-hover:text-brand-gold transition-colors duration-200 leading-snug">
                  {srv.title}
                </h3>
                <span className="font-heading text-xs font-bold text-brand-gold mt-1 inline-flex items-center gap-1">
                  <span>{srv.cta}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
