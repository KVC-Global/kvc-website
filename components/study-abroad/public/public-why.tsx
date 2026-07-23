"use client"

import { Globe, Coins, Milestone, TrendingUp, ShieldCheck, Users } from "lucide-react"

const BENEFITS = [
  {
    icon: Globe,
    title: "Chất lượng giáo dục đẳng cấp thế giới",
    description:
      "Chuẩn học thuật quốc tế nghiêm ngặt, chú trọng tư duy phản biện, giải quyết vấn đề và năng lực cá nhân.",
  },
  {
    icon: Coins,
    title: "Học phí được hỗ trợ",
    description:
      "Cơ hội nhận hỗ trợ học phí ưu đãi thông qua chương trình MOE Tuition Grant của Bộ Giáo dục Singapore.",
  },
  {
    icon: Milestone,
    title: "Lộ trình học thuật rõ ràng",
    description:
      "Tốt nghiệp công lập Singapore giúp dễ dàng xét tuyển thẳng vào các đại học công lập top đầu (NUS, NTU, SMU) hoặc các trường Polytechnic.",
  },
  {
    icon: TrendingUp,
    title: "Cơ hội định cư lâu dài",
    description:
      "Học sinh tham gia ít nhất 1 kỳ thi quốc gia (PSLE, N/O/A-Level) và cư trú đủ thời gian có thể nộp đơn xin Thường trú nhân (PR) cho cả gia đình.",
  },
  {
    icon: ShieldCheck,
    title: "Môi trường kỷ luật, an toàn",
    description:
      "Hệ thống công lập rèn luyện tính độc lập, tự giác cao trong môi trường xã hội văn minh và an toàn bậc nhất thế giới.",
  },
  {
    icon: Users,
    title: "Cơ hội đồng hành cho phụ huynh",
    description:
      "Mẹ hoặc bà đi cùng chăm sóc học sinh dưới 18 tuổi được cấp Thẻ thăm thân dài hạn (LTVP), kết hợp học tập hoặc phát triển sự nghiệp.",
  },
] as const

export function PublicStudyAbroadWhy() {
  return (
    <section
      aria-labelledby="public-why-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <h2
        id="public-why-heading"
        className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
      >
        Vì sao chọn du học công lập tại Singapore?
      </h2>
      <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
