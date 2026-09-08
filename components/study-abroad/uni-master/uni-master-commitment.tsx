"use client"

import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UniMasterCommitmentContent } from "@/sanity/uni-master-page"
import { uniMasterIcons } from "./uni-master-icons"

const COMMITMENTS = [
  {
    icon: "ShieldCheck",
    title: "Tư vấn minh bạch",
    description: "Không áp đặt một lộ trình cố định hay một trường cố định. Tư vấn lộ trình cá nhân hóa dựa trên học lực và khả năng chi trả thực tế.",
  },
  {
    icon: "Heart",
    title: "Lợi ích học viên hàng đầu",
    description: "Đề xuất trường học và chương trình đào tạo dựa trên lợi ích thực tế của gia đình, không phụ thuộc vào chính sách riêng của bất kỳ đối tác nào.",
  },
  {
    icon: "Sparkles",
    title: "Đồng hành xuyên suốt",
    description: "Hỗ trợ học viên hoàn thiện hồ sơ đăng ký học, luyện tập phỏng vấn, xử lý visa Student Pass trọn gói và hỗ trợ hòa nhập tại Singapore.",
  },
] as const

export function UniMasterCommitment({
  className,
  content,
}: {
  className?: string
  content?: UniMasterCommitmentContent
}) {
  const items = content?.items?.length
    ? content.items
    : COMMITMENTS

  return (
    <section
      aria-labelledby="commitment-heading"
      className={cn("mt-20 md:mt-28 w-full", className)}
    >
      <div className="text-center mb-12">
        <h2
          id="commitment-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          {content?.title || "Cam kết từ KVC Global"}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
        {items.map((comm, idx) => {
          const iconName = comm.icon
          const Icon = iconName ? uniMasterIcons[iconName] : undefined
          const num = String(idx + 1).padStart(2, "0")

          return (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-lg border border-border/60 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border/10 dark:bg-card"
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
                <h3 className="mt-4 font-heading text-[16px] font-bold text-brand-blue leading-snug dark:text-foreground">
                  {comm.title}
                </h3>
                <p className="mt-2 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
                  {comm.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
