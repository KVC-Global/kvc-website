"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { urlFor } from "@/sanity/image"
import type { StudyAbroadProspectsContent } from "@/sanity/study-abroad-page"

const GRADUATION_OPPORTUNITIES = [
  "Nhận bằng Diploma quốc tế, có giá trị liên thông toàn cầu.",
  "Tiếp tục học lên Cử nhân tại Singapore hoặc các nước khác.",
  "Tìm kiếm cơ hội việc làm chính thức tại Singapore, tùy năng lực và cơ hội thực tế tại thời điểm tốt nghiệp.",
  "Quay về Việt Nam làm việc với lợi thế bằng cấp quốc tế và kinh nghiệm thực tế.",
] as const

const DEFAULT_IMAGE = "/images/graduation-cap-transparent.png"

export function StudyAbroadProspects({ content }: { content?: StudyAbroadProspectsContent }) {
  const opportunities = content?.opportunities?.length
    ? content.opportunities
    : GRADUATION_OPPORTUNITIES

  const imageUrl = content?.image
    ? urlFor(content.image).url()
    : DEFAULT_IMAGE

  const imageAlt = content?.imageAlt || "Bằng tốt nghiệp và mũ cử nhân"

  return (
    <section
      aria-labelledby="prospects-heading"
      className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-[0_18px_40px_-22px_rgba(15,27,45,0.15)] flex flex-col justify-between overflow-hidden relative lg:col-span-5 min-h-[380px]"
    >
      <div className="relative z-10 flex flex-col justify-between h-full max-w-[72%] sm:max-w-[75%]">
        <div>
          <h2
            id="prospects-heading"
            className="font-heading text-xl font-bold text-brand-blue sm:text-2xl text-left"
          >
            {content?.title || "Sau khi tốt nghiệp, học viên có thể làm gì?"}
          </h2>
          <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />

          <ul className="mt-8 space-y-4" aria-label="Cơ hội sau tốt nghiệp">
            {opportunities.map((opp, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                  <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                </div>
                <span className="font-body text-[14px] md:text-[15px] leading-relaxed text-brand-dark/90">
                  {opp}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] lg:h-[205px] lg:w-[205px] pointer-events-none z-0 opacity-40">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-w-768px) 150px, 205px"
          className="object-contain object-bottom object-right"
        />
      </div>
    </section>
  )
}
