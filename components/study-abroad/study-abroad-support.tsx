"use client"

import { Compass as DefaultIcon } from "lucide-react"
import type { StudyAbroadSupportContent } from "@/sanity/study-abroad-page"
import { studyAbroadIcons } from "./study-abroad-icons"

const SUPPORT_STEPS = [
  {
    icon: "Compass",
    text: "Tư vấn chọn trường, chọn ngành phù hợp",
  },
  {
    icon: "ClipboardList",
    text: "Hỗ trợ chuẩn bị hồ sơ đầy đủ, đúng yêu cầu",
  },
  {
    icon: "FileSignature",
    text: "Luyện phỏng vấn, xử lý hồ sơ visa tỉ mỉ",
  },
  {
    icon: "UserCheck",
    text: "Đưa đón sân bay, ổn định nơi ở tại Singapore",
  },
  {
    icon: "Handshake",
    text: "Đồng hành kết nối doanh nghiệp thực tập uy tín",
  },
] as const

export function StudyAbroadSupport({
  content,
}: {
  content?: StudyAbroadSupportContent
}) {
  const steps = content?.steps?.length ? content.steps : SUPPORT_STEPS

  return (
    <section
      aria-labelledby="journey-heading"
      className="flex flex-col rounded-lg border border-border bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] md:p-8 lg:col-span-7"
    >
      <div className="mb-8">
        <h2
          id="journey-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          {content?.title || "KVC Global đồng hành cùng bạn"}
        </h2>
        <span
          aria-hidden="true"
          className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
        />
      </div>

      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {steps.map((step, idx) => {
          const iconName = step.icon
          const Icon = iconName ? studyAbroadIcons[iconName] : undefined
          const isLast = idx === steps.length - 1

          return (
            <li
              key={`${step.text}-${idx}`}
              className={`group flex min-h-24 items-center gap-4 rounded-md border border-border/60 bg-white p-4 transition-colors duration-200 hover:bg-brand-light/60 ${isLast ? "sm:col-span-2" : ""}`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-light transition-colors group-hover:bg-white">
                {Icon ? (
                  <Icon
                    className="h-5 w-5 text-brand-blue"
                    strokeWidth={1.75}
                  />
                ) : (
                  <DefaultIcon
                    className="h-5 w-5 text-brand-blue"
                    strokeWidth={1.75}
                  />
                )}
              </div>

              <p className="min-w-0 flex-1 font-body text-[13px] leading-relaxed font-bold text-brand-blue md:text-sm">
                {step.text}
              </p>

              <span
                aria-hidden="true"
                className="self-start font-display text-xs font-bold text-secondary/80 tabular-nums"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
