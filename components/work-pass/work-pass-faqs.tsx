"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { WorkPassFaqsContent } from "@/sanity/work-pass-page"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "TEP khác gì so với Employment Pass?",
    answer: "TEP (Training Employment Pass) dành cho sinh viên quốc tế hoặc người trẻ muốn thực tập, làm việc đào tạo ngắn hạn tại Singapore với thời hạn tối đa 3 tháng, không yêu cầu mức lương tối thiểu cao như Employment Pass (EP - dành cho chuyên gia có kinh nghiệm lâu năm với mức lương tối thiểu từ 5.000 SGD trở lên).",
  },
  {
    question: "Tôi có thể chuyển đổi từ TEP sang EP không?",
    answer: "Có thể. Sau khi hoàn thành kỳ thực tập TEP, nếu bạn được doanh nghiệp tiếp nhận đánh giá cao và đáp ứng đủ các tiêu chuẩn về bằng cấp, mức lương tối thiểu của Bộ Nhân lực Singapore (MOM), doanh nghiệp có thể hỗ trợ nộp hồ sơ xin chuyển đổi sang visa Employment Pass (EP) hoặc S Pass để làm việc chính thức lâu dài.",
  },
  {
    question: "Tôi có thể bảo lãnh người thân khi đi TEP không?",
    answer: "Không. Visa TEP không áp dụng chính sách bảo lãnh người thân (Dependant's Pass) đi cùng, do đây là diện visa thực tập và đào tạo ngắn hạn (tối đa 3 tháng).",
  },
  {
    question: "Thời hạn của TEP là bao lâu?",
    answer: "Thời hạn tối đa của visa TEP là 3 tháng (không được gia hạn thêm theo quy định của Bộ Nhân lực Singapore MOM).",
  },
  {
    question: "Nếu hồ sơ bị từ chối, tôi có thể nộp lại không?",
    answer: "Có thể. Doanh nghiệp bảo lãnh tại Singapore có thể làm đơn khiếu nại (Appeal) lên MOM hoặc nộp lại hồ sơ mới nếu bổ sung đầy đủ giấy tờ giải trình hoặc cải thiện các điều kiện chưa đạt yêu cầu.",
  },
  {
    question: "KVC Global có hỗ trợ tìm việc không?",
    answer: "Có. KVC Global đồng hành kết nối bạn trực tiếp với các doanh nghiệp uy tín tại Singapore, hỗ trợ luyện phỏng vấn, chuẩn bị hồ sơ xin visa TEP và các dịch vụ hỗ trợ sinh hoạt sau khi nhập cảnh Singapore.",
  },
] as const

export function WorkPassFaqs({ content }: { content?: WorkPassFaqsContent }) {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({})
  const faqs = content?.faqs?.length ? content.faqs : FAQS

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const half = Math.ceil(faqs.length / 2)
  const leftFaqs = faqs.slice(0, half)
  const rightFaqs = faqs.slice(half)

  return (
    <section aria-labelledby="faqs-heading" className="mt-20 md:mt-28 w-full">
      <div className="text-center mb-12">
        <h2
          id="faqs-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          {content?.title || "5. Câu hỏi thường gặp"}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {leftFaqs.map((faq, index) => {
            const globalIdx = index
            const isOpen = !!openFaqs[globalIdx]
            return (
              <div
                key={globalIdx}
                className="bg-white border border-border/60 rounded-[12px] overflow-hidden transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
              >
                <button
                  onClick={() => toggleFaq(globalIdx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-heading text-sm md:text-base font-bold text-brand-blue hover:text-secondary transition-colors duration-200 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-brand-blue/60 shrink-0 transition-transform duration-300",
                      isOpen && "transform rotate-180"
                    )}
                    strokeWidth={2.5}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out text-brand-dark/85 font-body text-xs md:text-sm",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 leading-relaxed border-t border-border/20">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {rightFaqs.map((faq, index) => {
            const globalIdx = index + half
            const isOpen = !!openFaqs[globalIdx]
            return (
              <div
                key={globalIdx}
                className="bg-white border border-border/60 rounded-[12px] overflow-hidden transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
              >
                <button
                  onClick={() => toggleFaq(globalIdx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-heading text-sm md:text-base font-bold text-brand-blue hover:text-secondary transition-colors duration-200 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-brand-blue/60 shrink-0 transition-transform duration-300",
                      isOpen && "transform rotate-180"
                    )}
                    strokeWidth={2.5}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out text-brand-dark/85 font-body text-xs md:text-sm",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 leading-relaxed border-t border-border/20">
                      {faq.answer}
                    </div>
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
