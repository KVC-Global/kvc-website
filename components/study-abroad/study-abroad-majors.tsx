"use client"

import { Hotel, Utensils, Truck, Laptop, Brain, Bot, ShieldCheck, PlusCircle } from "lucide-react"

const MAJORS = [
  {
    name: "Tourism & Hospitality Management",
    icon: Hotel,
  },
  {
    name: "Food & Beverage Management / Operations",
    icon: Utensils,
  },
  {
    name: "Logistics & Retail Management",
    icon: Truck,
  },
  {
    name: "Công nghệ Thông tin (IT)",
    icon: Laptop,
  },
  {
    name: "Trí tuệ nhân tạo (AI)",
    icon: Brain,
  },
  {
    name: "Robotics",
    icon: Bot,
  },
  {
    name: "An ninh mạng (Cybersecurity)",
    icon: ShieldCheck,
  },
  {
    name: "Và nhiều ngành hấp dẫn khác",
    icon: PlusCircle,
  },
] as const

export function StudyAbroadMajors() {
  return (
    <section
      aria-labelledby="majors-heading"
      className="bg-white border border-border rounded-lg p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col lg:col-span-6"
    >
      <div className="text-center mb-8">
        <h2
          id="majors-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          Ngành học phổ biến
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-secondary" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {MAJORS.map((major, idx) => {
          const Icon = major.icon
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center border border-border/60 bg-white hover:bg-brand-light/40 rounded-md p-4 text-center transition-all duration-300 hover:shadow-xs group min-h-[140px]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light group-hover:bg-white transition-colors">
                <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
              </div>
              <span className="font-heading text-[12px] md:text-[13px] font-bold text-brand-blue leading-tight">
                {major.name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
