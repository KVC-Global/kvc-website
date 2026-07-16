import { Clock, Globe2, PiggyBank, Headset } from "lucide-react"

import { cn } from "@/lib/utils"

const BENEFITS = [
  {
    icon: Clock,
    title: "Linh hoạt thời gian",
    description:
      "Học mọi lúc, mọi nơi theo tiến độ cá nhân — phù hợp cho người đi làm và học sinh quốc tế.",
  },
  {
    icon: Globe2,
    title: "Bằng cấp quốc tế",
    description:
      "Bằng cấp được công nhận tại Anh Quốc và nhiều quốc gia, mở rộng cơ hội nghề nghiệp toàn cầu.",
  },
  {
    icon: PiggyBank,
    title: "Tiết kiệm chi phí",
    description:
      "Học phí tối ưu so với du học trực tiếp, không cần chi phí sinh hoạt ở nước ngoài.",
  },
  {
    icon: Headset,
    title: "Hỗ trợ tận tâm",
    description:
      "Đội ngũ tư vấn đồng hành suốt lộ trình — từ nhập học đến xin visa và định cư.",
  },
] as const

export function OnlineBenefits({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="benefits-heading"
      className={cn("w-full bg-[#F4F7FA] py-20 sm:py-24", className)}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#C8913C] uppercase">
            Lợi ích
          </p>
          <h2
            id="benefits-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Tại sao chọn học online cùng KVC Global
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-border bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(15,27,45,0.16)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F7FA] text-[#0A2540] transition-colors duration-300 ease-out group-hover:bg-[#0A2540] group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
