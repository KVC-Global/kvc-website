"use client"

import Image from "next/image"
import { Check } from "lucide-react"

export function PrivateStudyAbroadIntro() {
  return (
    <section
      aria-labelledby="private-intro-heading"
      className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
    >
      {/* Left Column: Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg shadow-lg lg:col-span-5">
        <Image
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
          alt="Học sinh trong lớp học trường quốc tế tại Singapore"
          fill
          sizes="(max-w-1024px) 100vw, 42vw"
          className="object-cover object-center"
        />
      </div>

      {/* Right Column: Text Content */}
      <div className="flex flex-col lg:col-span-7">
        <h2
          id="private-intro-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          Giới thiệu du học tư thục Singapore
        </h2>

        <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
          <p className="mb-4">
            Singapore không chỉ là trung tâm tài chính hàng đầu châu Á mà còn là một trong những điểm đến giáo dục quốc tế uy tín nhất thế giới.
          </p>
          <p className="mb-4">
            Hệ thống trường quốc tế và tư thục tại Singapore đón nhận học sinh ở mọi độ tuổi — từ bậc mầm non đến hết trung học phổ thông (khoảng <strong className="font-semibold text-brand-blue">18 tháng đến 18 tuổi</strong>), giảng dạy các chương trình quốc tế danh tiếng như <strong className="font-semibold text-brand-blue">IB, IGCSE, AP, A-Level...</strong> được công nhận toàn cầu.
          </p>
          <p className="mb-4">
            KVC Global hỗ trợ tư vấn và kết nối phụ huynh, học sinh với các trường quốc tế phù hợp nhất tại Singapore, đồng hành xuyên suốt từ khâu chọn trường đến khi học sinh hoàn toàn ổn định học tập.
          </p>
        </div>
      </div>
    </section>
  )
}
