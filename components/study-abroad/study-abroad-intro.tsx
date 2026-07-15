"use client"

import Image from "next/image"
import { Check } from "lucide-react"

export function StudyAbroadIntro() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
    >
      {/* Left Column: Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg shadow-lg lg:col-span-5">
        <Image
          src="/images/singapore-merlion-sunset.jpg"
          alt="Tượng Merlion và Marina Bay Sands tại Singapore"
          fill
          sizes="(max-w-1024px) 100vw, 42vw"
          className="object-cover object-center"
        />
      </div>

      {/* Right Column: Text Content */}
      <div className="flex flex-col lg:col-span-7">
        <h2
          id="intro-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          Chương trình Diploma 6+6 là gì?
        </h2>

        <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
          <p>
            <strong className="font-semibold text-brand-blue">Diploma 6+6</strong> là mô hình đào tạo nghề tại Singapore, kết hợp giữa:
          </p>

          {/* Bullet Points */}
          <ul className="mt-4 space-y-3.5" aria-label="Cấu trúc chương trình">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-secondary bg-secondary/10">
                <Check className="h-3 w-3 text-secondary" strokeWidth={3} />
              </div>
              <span>
                <strong className="font-semibold text-brand-blue">6 tháng</strong> học lý thuyết tại trường
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-secondary bg-secondary/10">
                <Check className="h-3 w-3 text-secondary" strokeWidth={3} />
              </div>
              <span>
                <strong className="font-semibold text-brand-blue">6 tháng</strong> thực tập hưởng lương tại các doanh nghiệp uy tín ở Singapore
              </span>
            </li>
          </ul>

          <p className="mt-6">
            Sau khi hoàn thành, học viên nhận bằng Diploma quốc tế, tương đương bằng Cao đẳng tại Việt Nam, được công nhận và có giá trị liên thông lên Cử nhân tại Singapore và nhiều quốc gia khác.
          </p>

          <p className="mt-4">
            Đây là lộ trình được nhiều bạn trẻ Việt Nam lựa chọn vì thời gian học ngắn, chi phí hợp lý và có cơ hội tạo thu nhập ngay trong quá trình học.
          </p>
        </div>
      </div>
    </section>
  )
}
