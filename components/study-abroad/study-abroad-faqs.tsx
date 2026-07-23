"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "Diploma 6+6 khác gì so với du học truyền thống?",
    answer: "Khác với du học truyền thống tập trung chủ yếu vào lý thuyết kéo dài 3-4 năm, Diploma 6+6 tối ưu hóa thời gian học trong 12 tháng. Trong đó có 6 tháng học lý thuyết song song thực hành, và 6 tháng thực tập hưởng lương bắt buộc tại các doanh nghiệp. Mô hình này giúp học viên vừa tiết kiệm chi phí, vừa tích lũy kinh nghiệm làm việc thực tế tại Singapore ngay khi tốt nghiệp.",
  },
  {
    question: "Học phí và chi phí sinh hoạt tại Singapore khoảng bao nhiêu?",
    answer: "Học phí trọn gói cho chương trình Diploma dao động khoảng 6.000 - 8.000 SGD tùy ngành học. Chi phí sinh hoạt (ăn ở, đi lại) tại Singapore trung bình khoảng 800 - 1.200 SGD/tháng. Tuy học phí và sinh hoạt phí ở Singapore cao hơn Việt Nam, mức thu nhập trong 6 tháng thực tập hưởng lương (800 - 1.500 SGD/tháng) hoàn toàn có thể giúp học viên tự trang trải phần lớn sinh hoạt phí.",
  },
  {
    question: "Sau 6 tháng thực tập, có được làm việc tiếp không?",
    answer: "Sau khi kết thúc 6 tháng thực tập, nếu hoàn thành tốt công việc và doanh nghiệp có nhu cầu, học viên có thể được gia hạn hợp đồng làm việc chính thức dưới dạng visa S Pass hoặc EP. Ngoài ra, học viên cũng có thể lựa chọn học chuyển tiếp liên thông lên Cử nhân (1.5 - 2 năm nữa) để nhận bằng Đại học quốc tế.",
  },
  {
    question: "Trợ cấp 800-1.500 SGD/tháng tại những doanh nghiệp nào?",
    answer: "Học viên được thực tập tại các đối tác liên kết uy tín của KVC Global và nhà trường tại Singapore, bao gồm các chuỗi khách sạn 4-5 sao quốc tế, các chuỗi nhà hàng ẩm thực lớn, các doanh nghiệp logistics hàng đầu hoặc các công ty dịch vụ/thương mại điện tử công nghệ.",
  },
  {
    question: "Nếu không đạt yêu cầu thực tập thì sao?",
    answer: "Trong trường hợp học viên chưa đáp ứng được yêu cầu của doanh nghiệp thực tập ban đầu, KVC Global phối hợp cùng bộ phận hỗ trợ sinh viên của nhà trường sẽ tiến hành bổ túc kiến thức, hướng dẫn lại kỹ năng phỏng vấn và sắp xếp phỏng vấn tại các doanh nghiệp đối tác khác để đảm bảo 100% học viên hoàn thành học phần thực tập hưởng lương.",
  },
  {
    question: "Có thể chuyển ngành khi đã nhập học không?",
    answer: "Trong thời gian học lý thuyết ở những tuần đầu tiên, học viên có thể làm đơn xin chuyển đổi ngành học nếu nhận thấy bản thân phù hợp hơn với ngành khác. KVC Global và nhà trường sẽ hướng dẫn các thủ tục hồ sơ cần thiết để chuyển đổi thuận tiện nhất mà không ảnh hưởng tới tiến độ visa du học.",
  },
] as const

export function StudyAbroadFaqs({ className }: { className?: string }) {
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
