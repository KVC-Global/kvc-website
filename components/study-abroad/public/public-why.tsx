"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { HelpCircle, Play } from "lucide-react"
import type { PublicStudyWhyContent } from "@/sanity/public-study-page"
import { urlFor } from "@/sanity/image"
import { publicStudyIcons } from "./public-study-icons"

const BENEFITS = [
  {
    icon: "Globe",
    title: "Chất lượng giáo dục đẳng cấp thế giới",
    description:
      "Chuẩn học thuật quốc tế nghiêm ngặt, chú trọng tư duy phản biện, giải quyết vấn đề và năng lực cá nhân.",
  },
  {
    icon: "Coins",
    title: "Học phí được hỗ trợ",
    description:
      "Cơ hội nhận hỗ trợ học phí ưu đãi thông qua chương trình MOE Tuition Grant của Bộ Giáo dục Singapore.",
  },
  {
    icon: "Milestone",
    title: "Lộ trình học thuật rõ ràng",
    description:
      "Tốt nghiệp công lập Singapore giúp dễ dàng xét tuyển thẳng vào các đại học công lập top đầu (NUS, NTU, SMU) hoặc các trường Polytechnic.",
  },
  {
    icon: "TrendingUp",
    title: "Cơ hội định cư lâu dài",
    description:
      "Học sinh tham gia ít nhất 1 kỳ thi quốc gia (PSLE, N/O/A-Level) và cư trú đủ thời gian có thể nộp đơn xin Thường trú nhân (PR) cho cả gia đình.",
  },
  {
    icon: "ShieldCheck",
    title: "Môi trường kỷ luật, an toàn",
    description:
      "Hệ thống công lập rèn luyện tính độc lập, tự giác cao trong môi trường xã hội văn minh và an toàn bậc nhất thế giới.",
  },
  {
    icon: "Users",
    title: "Cơ hội đồng hành cho phụ huynh",
    description:
      "Mẹ hoặc bà đi cùng chăm sóc học sinh dưới 18 tuổi được cấp Thẻ thăm thân dài hạn (LTVP), kết hợp học tập hoặc phát triển sự nghiệp.",
  },
] as const

export function PublicStudyAbroadWhy({
  className,
  content,
}: {
  className?: string
  content?: PublicStudyWhyContent
}) {
  const items = content?.items?.length ? content.items : BENEFITS

  const videoUrl = content?.videoUrl
  const posterUrl = content?.videoPoster
    ? urlFor(content.videoPoster).url()
    : "/images/student-portrait.jpg"
  const [isPlaying, setIsPlaying] = useState(false)

  const caption =
    content?.videoTitle || "Video giới thiệu du học công lập Singapore"

  return (
    <section
      aria-labelledby="public-why-heading"
      className={cn("mt-20 w-full md:mt-28", className)}
    >
      <h2
        id="public-why-heading"
        className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
      >
        {content?.title || "Vì sao chọn du học công lập tại Singapore?"}
      </h2>
      <span
        aria-hidden="true"
        className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16">
        {/* Left: benefit cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((benefit, idx) => {
            const iconName = benefit.icon
            const Icon = iconName ? publicStudyIcons[iconName] : undefined

            return (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md dark:border-border/10 dark:bg-card"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-light transition-colors group-hover:bg-brand-blue/5">
                    {Icon ? (
                      <Icon
                        className="h-6 w-6 text-brand-gold"
                        strokeWidth={2}
                      />
                    ) : (
                      <HelpCircle
                        className="h-6 w-6 text-brand-gold"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-brand-blue dark:text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: vertical video — matches the cards height on desktop */}
        <div>
          <div className="relative mx-auto w-full max-w-[30rem] overflow-hidden rounded-lg border border-border/60 bg-brand-blue shadow-[0_24px_60px_-32px_rgba(13,49,94,0.45)] lg:h-full lg:min-h-[24rem]">
            <div className="relative aspect-[9/16] lg:aspect-auto lg:h-full">
              {isPlaying && videoUrl ? (
                <video
                  aria-label={caption}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={videoUrl}
                  poster={posterUrl}
                  autoPlay
                  controls
                  playsInline
                  preload="none"
                >
                  Trình duyệt của bạn không hỗ trợ phát video.
                </video>
              ) : (
                <div className="absolute inset-0">
                  <Image
                    src={posterUrl}
                    alt={caption}
                    fill
                    sizes="(max-width: 640px) 90vw, 480px"
                    className="object-cover object-center opacity-75"
                  />
                  <div className="absolute inset-0 bg-brand-blue/45" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
                    {videoUrl ? (
                      <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        aria-label={`Phát video: ${caption}`}
                        className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-sm transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-20 sm:w-20"
                      >
                        <Play
                          aria-hidden="true"
                          className="ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8"
                          strokeWidth={1.75}
                        />
                      </button>
                    ) : (
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-sm sm:h-20 sm:w-20">
                        <Play
                          aria-hidden="true"
                          className="ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8"
                          strokeWidth={1.75}
                        />
                      </span>
                    )}
                    <p className="max-w-[16rem] font-heading text-base font-bold sm:text-xl">
                      {caption}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
