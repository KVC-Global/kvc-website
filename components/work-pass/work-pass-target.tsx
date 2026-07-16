"use client"

import { GraduationCap, Briefcase, Users, Target } from "lucide-react"

const TARGETS = [
  {
    icon: GraduationCap,
    title: "Sinh viên quốc tế mới tốt nghiệp",
    description: "Muốn tích lũy kinh nghiệm làm việc thực tế tại Singapore.",
  },
  {
    icon: Briefcase,
    title: "Người trẻ muốn phát triển sự nghiệp quốc tế",
    description: "Muốn làm việc trong môi trường chuyên nghiệp, đa văn hóa.",
  },
  {
    icon: Users,
    title: "Doanh nghiệp",
    description: "Có nhu cầu tuyển dụng và đào tạo nhân sự tiềm năng.",
  },
  {
    icon: Target,
    title: "Người muốn chuyển đổi sự nghiệp",
    description: "Tìm kiếm cơ hội học hỏi và phát triển kỹ năng mới.",
  },
] as const

export function WorkPassTarget() {
  return (
    <section aria-labelledby="target-heading" className="w-full">
      <div className="text-center mb-10">
        <h2
          id="target-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          1. Ai nên chọn TEP?
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-secondary"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TARGETS.map((target, index) => {
          const Icon = target.icon
          return (
            <div
              key={index}
              className="flex flex-col items-start rounded-[20px] border border-border bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(10,37,64,0.1)] min-h-[200px]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-light">
                <Icon className="h-6 w-6 text-brand-gold" strokeWidth={1.75} />
              </div>

              <h3 className="font-heading text-base font-bold text-brand-blue leading-snug">
                {target.title}
              </h3>

              <p className="mt-3 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
                {target.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
