"use client"

import { cn } from "@/lib/utils"
import { Globe, Award, ShieldCheck, TrendingUp } from "lucide-react"


const BENEFITS = [
  {
    icon: Globe,
    title: "Môi trường đa văn hóa",
    description:
      "Học sinh được học tập và sinh hoạt cùng bạn bè đến từ hàng chục quốc gia, phát triển tư duy toàn cầu từ sớm.",
  },
  {
    icon: Award,
    title: "Bằng cấp quốc tế giá trị",
    description:
      "Hệ thống chứng chỉ IB, IGCSE, AP, A-Level là nền tảng vững chắc để xét tuyển thẳng vào các trường đại học danh tiếng thế giới.",
  },
  {
    icon: ShieldCheck,
    title: "An toàn, gần Việt Nam",
    description:
      "Chỉ cách Việt Nam khoảng 2-3 giờ bay, Singapore sở hữu môi trường sống và học tập an toàn bậc nhất thế giới.",
  },
  {
    icon: TrendingUp,
    title: "Lộ trình dài hạn",
    description:
      "Lộ trình học liên tục mở ra cơ hội chuyển tiếp đại học quốc tế, làm việc và định cư lâu dài tại Singapore.",
  },
] as const

export function PrivateStudyAbroadWhy({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="private-why-heading"
      className={cn("mt-20 md:mt-28 w-full", className)}
    >
      <h2
        id="private-why-heading"
        className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
      >
        Vì sao chọn du học tư thục tại Singapore?
      </h2>
      <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit, idx) => {
          const Icon = benefit.icon
          return (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md dark:border-border/10 dark:bg-card"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-light group-hover:bg-brand-blue/5 transition-colors">
                  <Icon className="h-6 w-6 text-brand-gold" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-brand-blue dark:text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
