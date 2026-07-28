"use client"

import Image from "next/image"
import { Check, Lightbulb } from "lucide-react"
import { urlFor } from "@/sanity/image"
import type { StudyAbroadRequirementsContent } from "@/sanity/study-abroad-page"

const REQUIREMENTS = [
  "Tốt nghiệp THPT",
  "18 - 35 tuổi",
  "Có khả năng giao tiếp tiếng Anh cơ bản (không bắt buộc IELTS/TOEFL ngay từ đầu)",
  "Đáp ứng các yêu cầu về sức khỏe và nhân thân theo quy định",
] as const

const DEFAULT_IMAGE = "/images/student-portrait.jpg"

export function StudyAbroadRequirements({ content }: { content?: StudyAbroadRequirementsContent }) {
  const conditions = content?.conditions?.length
    ? content.conditions
    : REQUIREMENTS

  const imageUrl = content?.image
    ? urlFor(content.image).url()
    : DEFAULT_IMAGE

  const imageAlt = content?.imageAlt || "Du học sinh KVC Global"

  return (
    <section
      aria-labelledby="reqs-heading"
      className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-[0_18px_40px_-22px_rgba(15,27,45,0.15)] flex flex-col justify-between overflow-hidden relative lg:col-span-6"
    >
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="flex-1 z-10 flex flex-col justify-between gap-6 lg:max-w-[62%]">
          <div>
            <div className="text-center md:text-left mb-8">
              <h2
                id="reqs-heading"
                className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
              >
                {content?.title || "Điều kiện tham gia"}
              </h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold mx-auto md:mx-0" />
            </div>

            <ul className="space-y-4" aria-label="Điều kiện tham gia">
              {conditions.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <span className="font-body text-[14px] md:text-[15px] leading-relaxed text-brand-dark/90">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-light border border-border/60 rounded-md p-4 flex gap-3 items-start mt-6">
            <Lightbulb className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
            <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal">
              {content?.tipText || "KVC Global sẽ tư vấn chi tiết điều kiện đầu vào phù hợp với từng trường và ngành học học viên quan tâm."}
            </p>
          </div>
        </div>

        <div className="relative h-[250px] w-full shrink-0 flex items-end justify-center overflow-hidden rounded-md md:hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 hidden md:block md:w-[38%] lg:w-[35%] overflow-hidden z-0 pointer-events-none">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="25vw"
          className="object-cover object-bottom"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent lg:w-28"
        />
      </div>
    </section>
  )
}
