"use client"

import Image from "next/image"

export function PublicStudyAbroadIntro() {
  return (
    <section
      aria-labelledby="public-intro-heading"
      className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
    >
      {/* Left Column: Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg shadow-lg lg:col-span-5">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
          alt="Học sinh học tập tại hệ thống trường công lập Singapore"
          fill
          sizes="(max-w-1024px) 100vw, 42vw"
          className="object-cover object-center"
        />
      </div>

      {/* Right Column: Text Content */}
      <div className="flex flex-col lg:col-span-7">
        <h2
          id="public-intro-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          Hệ thống giáo dục công lập Singapore là gì?
        </h2>

        <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
          <p className="mb-4">
            Hệ thống giáo dục công lập Singapore được đánh giá là một trong những nền giáo dục cạnh tranh và chất lượng hàng đầu thế giới, do <strong className="font-semibold text-brand-blue">Bộ Giáo dục Singapore (MOE)</strong> quản lý chặt chẽ.
          </p>
          <p className="mb-4">
            Học sinh quốc tế, bao gồm học sinh Việt Nam, có thể theo học tại các trường công lập Singapore từ bậc <strong className="font-semibold text-brand-blue">Tiểu học đến Dự bị Đại học/Cao đẳng</strong>, với lộ trình rõ ràng để phát triển học thuật sâu rộng và hướng tới cơ hội định cư lâu dài.
          </p>
          <p className="mb-4">
            KVC Global đồng hành cùng phụ huynh và học sinh trong suốt hành trình: từ tư vấn lộ trình phù hợp, ôn thi luyện thi đầu vào (AEIS), hoàn thiện hồ sơ và xin Student Pass, đến hỗ trợ giám hộ và lưu trú lâu dài tại Singapore.
          </p>
        </div>
      </div>
    </section>
  )
}
