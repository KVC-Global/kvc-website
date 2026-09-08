"use client"

import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StudyAbroadWhyContent } from "@/sanity/study-abroad-page"
import { studyAbroadIcons } from "./study-abroad-icons"

const ENIcon = ({ className }: { className?: string }) => (
  <div className={cn("flex h-7 w-7 items-center justify-center rounded-full border border-current font-heading text-[9px] font-extrabold tracking-tight select-none", className)}>
    EN
  </div>
)

const BENEFITS = [
  {
    icon: "Clock",
    title: "Tiết kiệm thời gian",
    description:
      "Hoàn thành chương trình và nhận bằng chỉ trong 1 năm, ngắn hơn nhiều so với các lộ trình du học truyền thống.",
  },
  {
    icon: "Wallet",
    title: "Vừa học vừa có thu nhập",
    description:
      "Trợ cấp thực tập từ 800 - 1.500 SGD/tháng, giúp trang trải một phần chi phí sinh hoạt.",
  },
  {
    icon: "FileText",
    title: "Học phí linh hoạt",
    description:
      "Học phí có thể được đóng theo từng đợt, giảm áp lực tài chính cho gia đình.",
  },
  {
    icon: "EN",
    title: "Không yêu cầu IELTS",
    description:
      "Phù hợp với các bạn chưa có chứng chỉ tiếng Anh quốc tế, sẽ được học bổ trợ trong quá trình học.",
  },
  {
    icon: "Briefcase",
    title: "Kinh nghiệm thực tế",
    description:
      "Thực tập tại doanh nghiệp, nhà hàng, khách sạn quốc tế ngay từ khi còn đi học.",
  },
  {
    icon: "TrendingUp",
    title: "Cơ hội phát triển lâu dài",
    description:
      "Liên thông lên Cử nhân hoặc tìm kiếm việc làm, chuyển đổi sang các loại work pass phù hợp.",
  },
] as const

export function StudyAbroadWhy({
  className,
  content,
}: {
  className?: string
  content?: StudyAbroadWhyContent
}) {
  const items = content?.items?.length
    ? content.items
    : BENEFITS

  return (
    <section
      aria-labelledby="why-heading"
      className={cn("mt-20 md:mt-28 w-full", className)}
    >
      <h2
        id="why-heading"
        className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
      >
        {content?.title || "Vì sao nên chọn Diploma 6+6?"}
      </h2>
      <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map((benefit, index) => {
          const iconName = benefit.icon
          const Icon = iconName ? studyAbroadIcons[iconName] : undefined
          
          return (
            <div
              key={index}
              className="group flex flex-col items-center rounded-lg border border-border/60 bg-white p-8 text-center shadow-[0_18px_40px_-22px_rgba(29,66,124,0.15)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-brand-blue-mid hover:text-white hover:shadow-[0_28px_60px_-22px_rgba(29,66,124,0.3)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light transition-colors duration-300 group-hover:bg-white/10 shrink-0">
                {iconName === "EN" ? (
                  <ENIcon className="h-7 w-7 text-brand-gold transition-colors duration-300 group-hover:text-[#f8bc62]" />
                ) : Icon ? (
                  <Icon className="h-7 w-7 text-brand-gold transition-colors duration-300 group-hover:text-[#f8bc62]" strokeWidth={1.75} />
                ) : (
                  <Clock className="h-7 w-7 text-brand-gold transition-colors duration-300 group-hover:text-[#f8bc62]" strokeWidth={1.75} />
                )}
              </div>

              <h3 className="font-heading text-[16px] font-bold text-brand-blue sm:text-[17px] transition-colors duration-300 group-hover:text-white">
                {benefit.title}
              </h3>

              <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm transition-colors duration-300 group-hover:text-white/80">
                {benefit.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
