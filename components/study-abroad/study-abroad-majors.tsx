"use client"

import { Laptop } from "lucide-react"
import type { StudyAbroadMajorsContent } from "@/sanity/study-abroad-page"
import { studyAbroadIcons } from "./study-abroad-icons"

const MAJORS = [
  {
    name: "Tourism & Hospitality Management",
    icon: "Hotel",
  },
  {
    name: "Food & Beverage Management / Operations",
    icon: "Utensils",
  },
  {
    name: "Logistics & Retail Management",
    icon: "Truck",
  },
  {
    name: "Công nghệ Thông tin (IT)",
    icon: "Laptop",
  },
  {
    name: "Trí tuệ nhân tạo (AI)",
    icon: "Brain",
  },
  {
    name: "Robotics",
    icon: "Bot",
  },
  {
    name: "An ninh mạng (Cybersecurity)",
    icon: "ShieldCheck",
  },
  {
    name: "Và nhiều ngành hấp dẫn khác",
    icon: "PlusCircle",
  },
] as const

export function StudyAbroadMajors({ content }: { content?: StudyAbroadMajorsContent }) {
  const items = content?.items?.length
    ? content.items
    : MAJORS

  return (
    <section
      aria-labelledby="majors-heading"
      className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-[0_18px_40px_-22px_rgba(15,27,45,0.15)] flex flex-col lg:col-span-6"
    >
      <div className="text-center mb-8">
        <h2
          id="majors-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          {content?.title || "Ngành học phổ biến"}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((major, idx) => {
          const iconName = major.icon
          const Icon = iconName ? studyAbroadIcons[iconName] : undefined
          
          return (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center border border-border/60 bg-white rounded-lg p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:text-white hover:shadow-[0_12px_30px_-10px_rgba(29,66,124,0.3)] min-h-[140px]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light transition-colors group-hover:bg-white/10 shrink-0">
                {Icon ? (
                  <Icon className="h-5 w-5 text-brand-gold transition-colors duration-300 group-hover:text-[#f8bc62]" strokeWidth={1.75} />
                ) : (
                  <Laptop className="h-5 w-5 text-brand-gold transition-colors duration-300 group-hover:text-[#f8bc62]" strokeWidth={1.75} />
                )}
              </div>
              <span className="font-heading text-[12px] md:text-[13px] font-bold text-brand-blue group-hover:text-white transition-colors leading-tight">
                {major.name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
