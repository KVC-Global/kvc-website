"use client"

import { GraduationCap, UserCheck, Briefcase, HeartHandshake } from "lucide-react"
import { cn } from "@/lib/utils"

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: "Học sinh tốt nghiệp THPT",
    desc: "Các bạn học sinh muốn bắt đầu ngay hành trình Đại học tại Singapore để lấy bằng quốc tế rút ngắn thời gian.",
  },
  {
    icon: UserCheck,
    title: "Học sinh Cao đẳng / Đại học",
    desc: "Cựu học viên muốn học liên thông chuyển tiếp (Top-up) lấy bằng Đại học hoặc tiếp tục học nâng cao lên Thạc sĩ.",
  },
  {
    icon: Briefcase,
    title: "Người đã đi làm",
    desc: "Anh/chị đang làm việc mong muốn bổ sung bằng Thạc sĩ quốc tế để gia tăng lợi thế thăng tiến trong sự nghiệp.",
  },
  {
    icon: HeartHandshake,
    title: "Gia đình cân đối tài chính",
    desc: "Phụ huynh hướng đến môi trường đào tạo quốc tế an toàn nhưng vẫn muốn cân đối và tối ưu hóa ngân sách chi phí.",
  },
] as const

export function UniMasterAudience({ className }: { className?: string }) {
  return (
    <section
      id="doi-tuong"
      aria-labelledby="audience-heading"
      className={cn("mt-20 md:mt-28 w-full", className)}
    >
      <div className="text-center mb-12">
        <h2
          id="audience-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          Đối tượng phù hợp chương trình
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-stretch">
        {AUDIENCES.map((aud, idx) => {
          const Icon = aud.icon
          return (
            <div
              key={idx}
              className="bg-white border border-border/60 rounded-lg p-6 shadow-sm flex gap-4 items-start dark:border-border/10 dark:bg-card hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-light">
                <Icon className="h-5 w-5 text-brand-gold" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-heading text-[15px] font-bold text-brand-blue dark:text-foreground">
                  {aud.title}
                </h3>
                <p className="mt-2 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
                  {aud.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
