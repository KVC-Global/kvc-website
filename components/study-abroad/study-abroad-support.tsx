"use client"

import { Compass, ClipboardList, FileSignature, UserCheck, Handshake } from "lucide-react"

const SUPPORT_STEPS = [
  {
    icon: Compass,
    text: "Tư vấn chọn trường, chọn ngành phù hợp",
  },
  {
    icon: ClipboardList,
    text: "Hỗ trợ chuẩn bị hồ sơ đầy đủ, đúng yêu cầu",
  },
  {
    icon: FileSignature,
    text: "Luyện phỏng vấn, xử lý hồ sơ visa tỉ mỉ",
  },
  {
    icon: UserCheck,
    text: "Đưa đón sân bay, ổn định nơi ở tại Singapore",
  },
  {
    icon: Handshake,
    text: "Đồng hành kết nối doanh nghiệp thực tập uy tín",
  },
] as const

export function StudyAbroadSupport() {
  return (
    <section
      aria-labelledby="journey-heading"
      className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-[0_18px_40px_-22px_rgba(15,27,45,0.15)] flex flex-col lg:col-span-7"
    >
      <div className="text-center mb-8">
        <h2
          id="journey-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          KVC Global đồng hành cùng bạn
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-2 mt-4">
        {SUPPORT_STEPS.map((step, idx) => {
          const Icon = step.icon
          const isLast = idx === SUPPORT_STEPS.length - 1
          return (
            <div key={idx} className="flex flex-col lg:flex-row items-center w-full min-w-0 lg:w-auto flex-1">
              <div className="group flex flex-col items-center border border-border/60 bg-white rounded-lg p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:text-white hover:shadow-[0_12px_30px_-10px_rgba(29,66,124,0.3)] min-h-[160px] w-full min-w-0 flex-1 justify-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light transition-colors group-hover:bg-white/10 shrink-0">
                  <Icon className="h-5 w-5 text-brand-gold transition-colors duration-300 group-hover:text-[#f8bc62]" strokeWidth={1.75} />
                </div>
                <span className="font-body text-[12px] md:text-[13px] font-bold text-brand-blue group-hover:text-white transition-colors leading-normal">
                  {step.text}
                </span>
              </div>

              {!isLast && (
                <div className="my-2 lg:my-0 lg:mx-2 shrink-0 self-center">
                  <svg
                    className="h-5 w-5 text-muted-foreground/60 block lg:hidden animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <svg
                    className="h-5 w-5 text-muted-foreground/60 hidden lg:block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
