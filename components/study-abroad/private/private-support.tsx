"use client"

import { HelpCircle } from "lucide-react"
import type { PrivateStudySupportContent } from "@/sanity/private-study-page"
import { privateStudyIcons } from "./private-study-icons"

const STEPS = [
  {
    icon: "Compass",
    title: "Phân tích & định hướng",
    description: "Tư vấn chọn trường, khối lớp phù hợp với năng lực học sinh và ngân sách của gia đình.",
  },
  {
    icon: "FolderOpen",
    title: "Chuẩn bị hồ sơ",
    description: "Hỗ trợ dịch thuật công chứng học bạ, hoàn thiện hồ sơ đăng ký nhập học chỉn chu.",
  },
  {
    icon: "FileCheck",
    title: "Thủ tục di trú",
    description: "Hướng dẫn nộp hồ sơ xin Thị thực học sinh (Student Pass) với tỷ lệ thành công cao.",
  },
  {
    icon: "UserCheck",
    title: "Giám hộ hợp pháp",
    description: "Cung cấp dịch vụ người giám hộ uy tín (Legal Guardian) bắt buộc cho học sinh dưới 18 tuổi.",
  },
  {
    icon: "Home",
    title: "Giải pháp lưu trú",
    description: "Tư vấn tìm kiếm homestay chất lượng hoặc thuê căn hộ an toàn, thuận tiện đi lại.",
  },
  {
    icon: "Users",
    title: "Hỗ trợ thân nhân",
    description: "Tư vấn thủ tục xin Thẻ thăm thân dài hạn (Long-Term Visit Pass) cho phụ huynh đi cùng con.",
  },
  {
    icon: "Handshake",
    title: "Đồng hành lâu dài",
    description: "Hỗ trợ ổn định sinh hoạt ban đầu, giữ kết nối với nhà trường và cập nhật thông tin học bổng.",
  },
] as const

export function PrivateStudyAbroadSupport({ content }: { content?: PrivateStudySupportContent }) {
  const items = content?.items?.length
    ? content.items
    : STEPS

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
          {content?.title || "KVC Global đồng hành cùng gia đình như thế nào?"}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 justify-items-stretch">
        {items.map((step, idx) => {
          const iconName = step.icon
          const Icon = iconName ? privateStudyIcons[iconName] : undefined
          const num = String(idx + 1).padStart(2, "0")

          return (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-lg border border-border/60 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border/10 dark:bg-card"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-light group-hover:bg-brand-blue/5 transition-colors">
                    {Icon ? (
                      <Icon className="h-5 w-5 text-brand-gold" strokeWidth={2} />
                    ) : (
                      <HelpCircle className="h-5 w-5 text-brand-gold" strokeWidth={2} />
                    )}
                  </div>
                  <span className="font-display text-[13px] font-bold tracking-wider text-secondary">
                    {num}
                  </span>
                </div>
                <h3 className="mt-4 flex min-h-[2.75rem] items-center font-heading text-[15px] font-bold text-brand-blue leading-snug line-clamp-2 dark:text-foreground">
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
