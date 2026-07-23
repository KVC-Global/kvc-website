"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "Kỳ thi AEIS/S-AEIS là gì và ôn luyện thế nào?",
    answer: "AEIS (Admissions Exercise for International Students) là kỳ thi quốc gia do Bộ Giáo dục Singapore tổ chức vào tháng 9 hàng năm để tuyển học sinh quốc tế vào các trường công lập (Tiểu học 2-5 và Trung học 1-3). S-AEIS tổ chức bổ sung vào tháng 2. Đề thi gồm môn Toán và Tiếng Anh (hoặc chứng chỉ CEQ cho tiểu học), đòi hỏi ôn luyện chuyên sâu trước tối thiểu 6-12 tháng.",
  },
  {
    question: "Học sinh học trường công lập có cơ hội định cư PR không?",
    answer: "Có, đây là lợi thế lớn của hệ thống công lập Singapore. Học sinh quốc tế cư trú hợp pháp tại Singapore từ 2 năm trở lên và đã đỗ ít nhất một kỳ thi quốc gia (như PSLE, GCE O-Level, N-Level hoặc A-Level) hoàn toàn đủ điều kiện tự nộp hồ sơ xin Thường trú nhân (PR).",
  },
  {
    question: "MOE Tuition Grant hỗ trợ học phí thế nào cho du học sinh?",
    answer: "MOE Tuition Grant là chương trình hỗ trợ học phí đáng kể của chính phủ Singapore dành cho sinh viên quốc tế học hệ Cao đẳng (Polytechnic) hoặc Đại học công lập. Sau khi nhận hỗ trợ, sinh viên cam kết làm việc cho doanh nghiệp đăng ký tại Singapore trong thời gian 3 năm sau khi tốt nghiệp.",
  },
  {
    question: "Phụ huynh sang Singapore theo diện thăm thân đi kèm con có được đi làm không?",
    answer: "Thẻ thăm thân dài hạn (LTVP) dành cho mẹ hoặc bà đi kèm học sinh dưới 18 tuổi không cho phép đi làm việc tự do. Nếu tìm được công ty bảo lãnh phù hợp, phụ huynh phải làm thủ tục xin Giấy phép lao động (Work Permit hoặc S Pass) theo quy định của MOM mới được đi làm hợp pháp.",
  },
  {
    question: "Học phí trường công lập Singapore được đóng như thế nào?",
    answer: "Học phí của học sinh quốc tế tại các trường công lập Singapore được quy định cụ thể bởi MOE và đóng theo định kỳ hàng tháng (thông qua tài khoản ngân hàng liên kết GIRO hoặc thanh toán trực tiếp), giúp giảm bớt áp lực tài chính đóng gộp cho gia đình.",
  },
  {
    question: "KVC Global hỗ trợ gia đình làm thủ tục giám hộ ra sao?",
    answer: "KVC Global cung cấp dịch vụ người giám hộ hợp pháp cư trú tại Singapore đáp ứng đầy đủ tiêu chí của MOE (là công dân Singapore hoặc thường trú nhân). Người giám hộ sẽ hỗ trợ ký kết giấy tờ, tham gia họp phụ huynh, giữ kết nối chặt chẽ giữa nhà trường và gia đình tại Việt Nam.",
  },
] as const

export function PublicStudyAbroadFaqs({ className }: { className?: string }) {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({})
  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <section
      aria-labelledby="faq-heading"
      className={cn("mt-20 md:mt-28 w-full", className)}
    >
      <div className="text-left mb-8">
        <h2
          id="faqs-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          Câu hỏi thường gặp
        </h2>
        <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold mx-0" />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 mt-8">
        {/* Left Column (FAQs 0, 1, 2) */}
        <div className="flex flex-col gap-4">
          {FAQS.slice(0, 3).map((faq, index) => {
            const globalIdx = index
            const isOpen = !!openFaqs[globalIdx]
            return (
              <div
                key={globalIdx}
                className="bg-white border border-border/60 rounded-lg overflow-hidden transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
              >
                <button
                  onClick={() => toggleFaq(globalIdx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-heading text-[14px] md:text-[15px] font-bold text-brand-blue hover:text-secondary transition-colors duration-200 cursor-pointer"
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
                    <div className="p-5 md:p-6 pt-0 leading-relaxed border-t border-border/20">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column (FAQs 3, 4, 5) */}
        <div className="flex flex-col gap-4">
          {FAQS.slice(3, 6).map((faq, index) => {
            const globalIdx = index + 3
            const isOpen = !!openFaqs[globalIdx]
            return (
              <div
                key={globalIdx}
                className="bg-white border border-border/60 rounded-lg overflow-hidden transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
              >
                <button
                  onClick={() => toggleFaq(globalIdx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-heading text-[14px] md:text-[15px] font-bold text-brand-blue hover:text-secondary transition-colors duration-200 cursor-pointer"
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
                    <div className="p-5 md:p-6 pt-0 leading-relaxed border-t border-border/20">
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
