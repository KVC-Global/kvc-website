"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { urlFor } from "@/sanity/image"
import type { UniMasterIntroContent } from "@/sanity/uni-master-page"

const CRITERIA = [
  "Hồ sơ học tập và năng lực hiện tại của học viên.",
  "Ngân sách đầu tư và mong muốn thực tế của gia đình.",
  "Định hướng nghề nghiệp và việc làm sau tốt nghiệp.",
] as const

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"

export function UniMasterIntro({ content }: { content?: UniMasterIntroContent }) {
  const imageUrl = content?.image
    ? urlFor(content.image).url()
    : DEFAULT_IMAGE

  const imageAlt = content?.imageAlt || "Nhóm sinh viên thảo luận học tập trong khuôn viên trường"

  const criteria = content?.criteria?.length
    ? content.criteria
    : CRITERIA

  return (
    <section
      aria-labelledby="uni-intro-heading"
      className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
    >
      {/* Left Column: Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg shadow-lg lg:col-span-5">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-w-1024px) 100vw, 42vw"
          className="object-cover object-center"
        />
      </div>

      {/* Right Column: Text Content */}
      <div className="flex flex-col lg:col-span-7">
        <h2
          id="uni-intro-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          {content?.title || "Giới thiệu lộ trình Đại học & Thạc sĩ Singapore"}
        </h2>

        <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
          <p className="mb-4">
            {content?.highlightText || "Với mạng lưới đối tác rộng khắp tại Singapore, KVC Global mang đến cho học viên nhiều lựa chọn về ngành học, lộ trình và chi phí. Mỗi lộ trình Đại học hay Thạc sĩ đều được tư vấn riêng, rõ ràng và cụ thể, dựa trên:"}
          </p>

          <ul className="space-y-2.5 mb-5" aria-label="Tiêu chí xây dựng lộ trình">
            {criteria.map((criterion, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-light text-brand-gold">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                <span className="font-semibold text-brand-blue">{criterion}</span>
              </li>
            ))}
          </ul>

          <p>
            {content?.remainingText || "Nhờ mạng lưới liên kết rộng lớn và đa dạng trường, KVC Global có thể linh hoạt đề xuất trường và ngành học phù hợp nhất với từng hồ sơ học viên, thay vì áp dụng một lộ trình cố định dập khuôn cho mọi học viên."}
          </p>
        </div>
      </div>
    </section>
  )
}
