"use client"

import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UniMasterWhyContent } from "@/sanity/uni-master-page"
import { uniMasterIcons } from "./uni-master-icons"

const BENEFITS = [
  {
    icon: "Globe",
    title: "Chất lượng đào tạo quốc tế",
    description:
      "Hệ thống bằng cấp cử nhân và thạc sĩ được cấp trực tiếp bởi các đại học danh tiếng thế giới, công nhận toàn cầu.",
  },
  {
    icon: "MapPin",
    title: "Môi trường học tập đa văn hóa",
    description:
      "Singapore là trung tâm tài chính & giáo dục hàng đầu châu Á, sở hữu môi trường sống an toàn và văn minh.",
  },
  {
    icon: "BookOpen",
    title: "Lựa chọn ngành học đa dạng",
    description:
      "Đầy đủ các nhóm ngành xu hướng: Kinh doanh, IT, Truyền thông, Thiết kế, Du lịch & Khách sạn, Kỹ thuật.",
  },
  {
    icon: "Briefcase",
    title: "Cơ hội việc làm rộng mở",
    description:
      "Tốt nghiệp mở ra cơ hội chuyển đổi sang các loại Work Pass (S Pass, EP) làm việc chính thức tại Singapore.",
  },
  {
    icon: "Coins",
    title: "Tối ưu hóa chi phí du học",
    description:
      "Chi phí sinh hoạt và học phí hợp lý hơn nhiều so với Anh, Úc, Mỹ mà vẫn thụ hưởng chất lượng tương đương.",
  },
] as const

export function UniMasterWhy({
  className,
  content,
}: {
  className?: string
  content?: UniMasterWhyContent
}) {
  const items = content?.items?.length
    ? content.items
    : BENEFITS

  return (
    <section
      aria-labelledby="uni-why-heading"
      className={cn("mt-20 md:mt-28 w-full", className)}
    >
      <h2
        id="uni-why-heading"
        className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
      >
        {content?.title || "Vì sao nên học Đại học/Thạc sĩ tại Singapore?"}
      </h2>
      <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 justify-items-stretch">
        {items.map((benefit, idx) => {
          const iconName = benefit.icon
          const Icon = iconName ? uniMasterIcons[iconName] : undefined

          return (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md dark:border-border/10 dark:bg-card"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-light group-hover:bg-brand-blue/5 transition-colors">
                  {Icon ? (
                    <Icon className="h-6 w-6 text-brand-gold" strokeWidth={2} />
                  ) : (
                    <HelpCircle className="h-6 w-6 text-brand-gold" strokeWidth={2} />
                  )}
                </div>
                <h3 className="mt-5 font-heading text-[15px] font-bold text-brand-blue dark:text-foreground leading-snug">
                  {benefit.title}
                </h3>
                <p className="mt-3 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
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
