"use client"

import {
  MessageSquareMore,
  ClipboardList,
  FolderOpen,
  Send,
  FileCheck,
  Building2,
} from "lucide-react"

const STEPS = [
  {
    icon: MessageSquareMore,
    title: "Tư vấn & đánh giá",
    description: "Đánh giá hồ sơ và nhu cầu, đề xuất lộ trình phù hợp.",
  },
  {
    icon: ClipboardList,
    title: "Tìm kiếm & ứng tuyển",
    description: "KVC kết nối với doanh nghiệp và hỗ trợ ứng tuyển.",
  },
  {
    icon: FolderOpen,
    title: "Chuẩn bị hồ sơ",
    description: "Hướng dẫn và chuẩn bị toàn bộ hồ sơ cần thiết.",
  },
  {
    icon: Send,
    title: "Nộp hồ sơ",
    description: "Nộp hồ sơ xin TEP lên Bộ Nhân lực Singapore (MOM).",
  },
  {
    icon: FileCheck,
    title: "Nhận IPA & nhập cảnh",
    description: "Nhận In-Principle Approval và chuẩn bị nhập cảnh.",
  },
  {
    icon: Building2,
    title: "Bắt đầu làm việc",
    description: "Sang Singapore và bắt đầu chương trình đào tạo.",
  },
] as const

export function WorkPassProcess() {
  return (
    <section aria-labelledby="process-heading" className="mt-20 md:mt-28 w-full">
      <div className="text-center mb-12">
        <h2
          id="process-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          2. Quy trình thực hiện TEP
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-secondary"
        />
      </div>

      <div
        className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4"
        role="list"
        aria-label="Quy trình thực hiện TEP 6 bước"
      >
        {/* Dashed Connecting Line behind the circles on large screens */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[36px] right-[8%] left-[8%] hidden h-px border-t-2 border-dashed border-brand-gold/30 lg:block"
        />

        {STEPS.map((step, index) => {
          const Icon = step.icon
          const num = String(index + 1).padStart(2, "0")
          return (
            <div
              key={index}
              role="listitem"
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Circle */}
              <div className="relative z-10 inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-blue shadow-[0_12px_28px_-12px_rgba(10,37,64,0.45)] transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-7 w-7 text-brand-gold" strokeWidth={1.6} />
              </div>

              {/* Step Number */}
              <div
                className="mt-5 font-display text-[15px] font-bold tracking-[0.18em] text-brand-gold"
                aria-hidden="true"
              >
                {num}
              </div>

              {/* Step Title */}
              <h3 className="mt-2 font-heading text-[16px] font-bold text-brand-blue leading-snug">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-2.5 max-w-[200px] font-body text-xs md:text-sm leading-relaxed text-brand-dark/70">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
