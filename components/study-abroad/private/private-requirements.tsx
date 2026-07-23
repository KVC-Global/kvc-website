"use client"

import { Check, FileText, Calendar, Compass, ShieldCheck } from "lucide-react"

const DOCS = [
  "Hộ chiếu (còn hiệu lực tối thiểu 6 tháng)",
  "Giấy khai sinh (bản dịch tiếng Anh công chứng)",
  "Học bạ của ít nhất 2 năm học gần nhất",
  "Sổ tiêm chủng (đối với học sinh dưới 12 tuổi)",
  "Giấy tờ bổ sung theo yêu cầu riêng của trường",
] as const

export function PrivateStudyAbroadRequirements() {
  return (
    <section
      aria-labelledby="reqs-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Side: Requirements */}
        <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2
                id="reqs-heading"
                className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
              >
                Yêu cầu về độ tuổi & học bạ
              </h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light">
                  <Calendar className="h-4 w-4 text-brand-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-[15px] font-bold text-brand-blue">Độ tuổi phù hợp</span>
                  <p className="font-body text-sm text-muted-foreground mt-1 leading-normal">
                    Mỗi trường có bảng quy đổi độ tuổi tương ứng với từng khối lớp riêng. Thông thường, học sinh bắt đầu học Lớp 1 (Grade 1) khi đủ 6 tuổi.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light">
                  <FileText className="h-4 w-4 text-brand-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-[15px] font-bold text-brand-blue">Học bạ & Học lực</span>
                  <p className="font-body text-sm text-muted-foreground mt-1 leading-normal">
                    Chuẩn bị học bạ của ít nhất 2 năm học gần nhất, được dịch thuật công chứng sang tiếng Anh để nộp hồ sơ xét duyệt.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light">
                  <Compass className="h-4 w-4 text-brand-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-[15px] font-bold text-brand-blue">Kiểm tra năng lực đầu vào</span>
                  <p className="font-body text-sm text-muted-foreground mt-1 leading-normal">
                    Tùy theo trường, học sinh có thể cần thực hiện một số bài kiểm tra đánh giá tư duy, đánh giá năng lực tiếng Anh, hoặc bài kiểm tra Toán & Đọc hiểu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Documents Preparation */}
        <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2
                className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
              >
                Hồ sơ đăng ký cần chuẩn bị
              </h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </div>

            <ul className="space-y-3.5" aria-label="Danh sách hồ sơ cần chuẩn bị">
              {DOCS.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <span className="font-body text-[14px] md:text-[15px] leading-relaxed text-brand-dark/90">
                    {doc}
                  </span>
                </li>
              ))}
            </ul>

            <div className="bg-brand-light border border-border/60 rounded-md p-4 flex gap-3 items-start mt-6">
              <ShieldCheck className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" strokeWidth={2} />
              <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal">
                <strong>Lưu ý giám hộ:</strong> Học sinh dưới 18 tuổi nếu không có phụ huynh đi cùng bắt buộc phải đăng ký người giám hộ hợp pháp cư trú tại Singapore theo quy định. KVC Global hỗ trợ cung cấp dịch vụ này.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
