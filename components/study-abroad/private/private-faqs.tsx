"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "Độ tuổi nào là phù hợp nhất để đi du học tư thục tại Singapore?",
    answer: "Singapore đón nhận học sinh từ 18 tháng (bậc mầm non) đến hết trung học phổ thông (18 tuổi). Độ tuổi lý tưởng tùy thuộc vào định hướng định cư hoặc du học dài hạn của gia đình. Các em thường du học từ bậc tiểu học hoặc trung học cơ sở để sớm thích nghi với ngôn ngữ và văn hóa quốc tế.",
  },
  {
    question: "Học sinh dưới 18 tuổi đi du học cần người giám hộ như thế nào?",
    answer: "Theo quy định của Bộ Giáo dục Singapore, học sinh dưới 18 tuổi không sống cùng cha mẹ bắt buộc phải có người giám hộ hợp pháp cư trú tại Singapore. Người giám hộ sẽ hỗ trợ liên lạc với nhà trường, ký giấy tờ hành chính và chăm sóc học sinh khi cần thiết. KVC Global hỗ trợ cung cấp dịch vụ người giám hộ uy tín.",
  },
  {
    question: "Học phí trung bình tại các trường quốc tế Singapore là bao nhiêu?",
    answer: "Học phí dao động tùy theo trường và bậc học, thường từ 18.000 SGD đến hơn 50.000 SGD/năm. Các trường như AIS, SAIS hay Brighton College có cơ sở vật chất và chương trình giảng dạy chất lượng cao tương xứng với mức học phí đóng.",
  },
  {
    question: "Có cần chứng chỉ tiếng Anh (IELTS/TOEFL) khi đăng ký học không?",
    answer: "Các trường quốc tế không bắt buộc phải có chứng chỉ tiếng Anh quốc tế ngay từ đầu. Họ sẽ tổ chức bài kiểm tra năng lực tiếng Anh và Toán đầu vào để xếp lớp. Các trường đều có chương trình bổ trợ tiếng Anh (EAL/ESL) dành riêng cho học sinh quốc tế.",
  },
  {
    question: "Thủ tục xin Student Pass (Thị thực học sinh) có phức tạp không?",
    answer: "Sau khi học sinh nhận được thư mời nhập học chính thức từ trường, KVC Global sẽ hướng dẫn chuẩn bị và nộp hồ sơ xin Student Pass lên Cục Di trú Singapore (ICA). Thủ tục thường mất từ 2-4 tuần, KVC Global cam kết chuẩn bị hồ sơ tối ưu nhất.",
  },
  {
    question: "Phụ huynh có được sang Singapore sinh sống cùng con không?",
    answer: "Đối với học sinh dưới 12 tuổi học tại trường quốc tế, mẹ hoặc bà có thể xin Thẻ thăm thân dài hạn (Long-Term Visit Pass - LTVP) để cư trú tại Singapore chăm sóc con học tập. KVC Global hỗ trợ tư vấn và làm thủ tục xin LTVP này cho phụ huynh.",
  },
] as const

export function PrivateStudyAbroadFaqs() {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({})
  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <section
      aria-labelledby="faq-heading"
      className="mt-20 md:mt-28 w-full"
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
