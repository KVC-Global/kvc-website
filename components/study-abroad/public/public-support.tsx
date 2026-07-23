"use client"

import { Compass, FolderOpen, BookOpen, UserCheck, Smile } from "lucide-react"

const STEPS = [
  {
    icon: Compass,
    title: "Tư vấn lộ trình & định cư",
    description: "Định hướng cấp học, chương trình học phù hợp và phân tích cơ hội xin PR dài hạn cho cả gia đình.",
  },
  {
    icon: FolderOpen,
    title: "Hoàn thiện hồ sơ MOE/ICA",
    description: "Hỗ trợ dịch thuật, hoàn thiện hồ sơ đăng ký nhập học lên MOE và xin Thẻ học sinh (Student Pass).",
  },
  {
    icon: BookOpen,
    title: "Luyện thi AEIS & tiếng Anh",
    description: "Kết nối các chương trình ôn luyện AEIS/S-AEIS và Cambridge CEQ chuyên sâu cùng giảng viên uy tín.",
  },
  {
    icon: UserCheck,
    title: "Chỗ ở & giám hộ uy tín",
    description: "Tìm kiếm người giám hộ Singapore hợp pháp và căn hộ/homestay an toàn cho học sinh dưới 18 tuổi.",
  },
  {
    icon: Smile,
    title: "Hòa nhập học đường",
    description: "Hỗ trợ học sinh làm quen với môi trường sống, kỷ luật trường công lập và kết nối bạn bè tại Singapore.",
  },
] as const

export function PublicStudyAbroadSupport() {
  return (
    <section
      aria-labelledby="support-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <div className="text-center mb-12">
        <h2
          id="support-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          KVC Global đồng hành cùng gia đình như thế nào?
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-stretch">
        {STEPS.map((step, idx) => {
          const Icon = step.icon
          const num = String(idx + 1).padStart(2, "0")
          return (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-lg border border-border/60 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border/10 dark:bg-card"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-light group-hover:bg-brand-blue/5 transition-colors">
                    <Icon className="h-5 w-5 text-brand-gold" strokeWidth={2} />
                  </div>
                  <span className="font-display text-[13px] font-bold tracking-wider text-secondary">
                    {num}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-[15px] font-bold text-brand-blue leading-snug dark:text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
