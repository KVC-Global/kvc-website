"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import type { KhoaHocOnlineFaqs } from "@/sanity/service-pages"
import { cn } from "@/lib/utils"

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Bằng cấp online có giá trị như bằng offline không?",
    answer:
      "Có. Các chương trình học online tại KVC Global được cấp bởi cơ sở giáo dục được công nhận tại Anh Quốc. Bằng cấp có giá trị pháp lý và học thuật tương đương chương trình học trực tiếp, được nhiều nhà tuyển dụng và trường đại học quốc tế công nhận.",
  },
  {
    question: "Hình thức thi và đánh giá như thế nào?",
    answer:
      "Đánh giá kết hợp bài tập, tiểu luận, dự án và bài kiểm tra trực tuyến có giám thị. Mỗi chương trình có cấu trúc đánh giá riêng được hướng dẫn chi tiết ngay từ đầu khóa học.",
  },
  {
    question: "Thời gian học linh hoạt ra sao?",
    answer:
      "Học viên chủ động sắp xếp lịch học theo tiến độ cá nhân. Đa số chương trình cung cấp tài liệu ghi hình và tài liệu đọc có thể truy cập bất cứ lúc nào, phù hợp cho cả người đi làm và học sinh quốc tế.",
  },
  {
    question: "Có hỗ trợ xin visa sau khi hoàn thành không?",
    answer:
      "Có. Đội ngũ tư vấn KVC Global đồng hành xuyên suốt — từ nhập học, hỗ trợ hồ sơ học thuật đến tư vấn visa và lộ trình định cư phù hợp với mục tiêu cá nhân của bạn.",
  },
]

export function OnlineFaq({
  className,
  data,
}: {
  className?: string
  data?: KhoaHocOnlineFaqs
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)
  const faqs = data?.faqs?.length ? data.faqs : FAQS
  const title = data?.title ?? "Giải đáp thắc mắc về học online"

  return (
    <section
      aria-labelledby="faq-heading"
      className={cn("w-full bg-white py-20 sm:py-24", className)}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#C8913C] uppercase">
            {data?.eyebrow ?? "Câu hỏi thường gặp"}
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {title}
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-white">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex
            return (
              <div
                key={item.question ?? index}
                className="first:rounded-t-2xl last:rounded-b-2xl"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 ease-out hover:bg-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540] sm:px-7"
                  >
                    <span className="font-display text-base font-bold text-foreground sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-[#C8913C] transition-transform duration-300 ease-out",
                        isOpen && "rotate-180",
                      )}
                      strokeWidth={2.25}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={!isOpen}
                >
                  <div className="px-6 pb-6 text-sm leading-relaxed text-foreground/75 sm:px-7 sm:text-base">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
