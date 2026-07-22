"use client"

import Image from "next/image"
import { CheckCircle2, FileText } from "lucide-react"

const CONDITIONS = [
  "Tốt nghiệp Cao đẳng/Đại học trở lên.",
  "Có thư mời làm việc từ doanh nghiệp tại Singapore.",
  "Mức lương tối thiểu theo quy định của MOM.",
  "Sức khỏe tốt, không có tiền án tiền sự.",
] as const

const DOCUMENTS = [
  "Hộ chiếu (còn hạn ít nhất 6 tháng)",
  "Bằng cấp, bảng điểm",
  "CV (tiếng Anh)",
  "Thư mời làm việc từ doanh nghiệp Singapore",
  "Ảnh thẻ (theo tiêu chuẩn ICA)",
  "Các giấy tờ khác (nếu có)",
] as const

export function WorkPassRequirements() {
  return (
    <section aria-labelledby="requirements-heading" className="mt-20 md:mt-28 w-full">
      <div className="text-center mb-12">
        <h2
          id="requirements-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          3. Yêu cầu & điều kiện
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Column 1: Conditions Card */}
        <div className="flex flex-col border border-border bg-white rounded-[20px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300">
          <h3 className="font-heading text-lg font-bold text-brand-blue mb-6">
            Điều kiện
          </h3>
          <ul className="space-y-4" aria-label="Điều kiện tham gia">
            {CONDITIONS.map((cond, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
                <span className="font-body text-sm leading-relaxed text-brand-dark/90">
                  {cond}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Documents Card */}
        <div className="flex flex-col border border-border bg-white rounded-[20px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300">
          <h3 className="font-heading text-lg font-bold text-brand-blue mb-6">
            Hồ sơ cần chuẩn bị
          </h3>
          <ul className="space-y-4" aria-label="Hồ sơ cần chuẩn bị">
            {DOCUMENTS.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
                <span className="font-body text-sm leading-relaxed text-brand-dark/90">
                  {doc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Image Card */}
        <div className="relative overflow-hidden rounded-[20px] border border-border shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] min-h-[300px]">
          <Image
            src="/images/passport-and-docs.jpg"
            alt="Hộ chiếu và hồ sơ xin cấp visa TEP Singapore"
            fill
            sizes="(max-w-768px) 100vw, 33vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-102"
          />
        </div>
      </div>
    </section>
  )
}
