"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Play } from "lucide-react"
import { urlFor } from "@/sanity/image"
import type { StudyAbroadIntroContent } from "@/sanity/study-abroad-page"


function getEmbedUrl(url: string) {
  try {
    const parsed = new URL(url)
    if (!parsed.searchParams.has("autoplay")) {
      parsed.searchParams.set("autoplay", "1")
    }
    return parsed.toString()
  } catch {
    return url
  }
}

export function StudyAbroadIntro({ content }: { content?: StudyAbroadIntroContent }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const videoUrl = content?.videoUrl
  const videoPosterUrl = content?.videoPoster
    ? urlFor(content.videoPoster).url()
    : content?.image
      ? urlFor(content.image).url()
      : "/images/singapore-merlion-sunset.jpg"

  const videoCaption =
    content?.videoTitle ||
    content?.imageAlt ||
    "Chương trình Diploma 6+6 tại Singapore"

  const isEmbedVideo = Boolean(
    videoUrl &&
      (videoUrl.includes("/embed/") || videoUrl.includes("player.vimeo.com"))
  )
  const bullets = content?.bullets?.length
    ? content.bullets
    : [
        "6 tháng học lý thuyết tại trường",
        "6 tháng thực tập hưởng lương tại các doanh nghiệp uy tín ở Singapore",
      ]

  const paragraphs = content?.paragraphs?.length
    ? content.paragraphs
    : [
        "Sau khi hoàn thành, học viên nhận bằng Diploma quốc tế, tương đương bằng Cao đẳng tại Việt Nam, được công nhận và có giá trị liên thông lên Cử nhân tại Singapore và nhiều quốc gia khác.",
        "Đây là lộ trình được nhiều bạn trẻ Việt Nam lựa chọn vì thời gian học ngắn, chi phí hợp lý và có cơ hội tạo thu nhập ngay trong quá trình học.",
      ]

  return (
    <section
      aria-labelledby="intro-heading"
      className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
    >
      {/* Left Column: Video (9:16 format ratio) */}
      <div className="w-full lg:col-span-5">
        <div className="relative mx-auto w-full max-w-[26rem] overflow-hidden rounded-lg border border-border/60 bg-brand-blue shadow-[0_24px_60px_-32px_rgba(13,49,94,0.45)]">
          <div className="relative aspect-[9/16]">
            {isPlaying && videoUrl ? (
              isEmbedVideo ? (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title={videoCaption}
                  className="absolute inset-0 h-full w-full object-cover border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  aria-label={videoCaption}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={videoUrl}
                  poster={videoPosterUrl}
                  autoPlay
                  controls
                  playsInline
                  preload="none"
                >
                  Trình duyệt của bạn không hỗ trợ phát video.
                </video>
              )
            ) : (
              <div className="absolute inset-0">
                <Image
                  src={videoPosterUrl}
                  alt={videoCaption}
                  fill
                  sizes="(max-width: 640px) 90vw, 416px"
                  className="object-cover object-center opacity-75"
                />
                <div className="absolute inset-0 bg-brand-blue/45" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
                  {videoUrl ? (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label={`Phát video: ${videoCaption}`}
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
                    {videoCaption}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Text Content */}
      <div className="flex flex-col lg:col-span-7">
        <h2
          id="intro-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          {content?.title || "Chương trình Diploma 6+6 là gì?"}
        </h2>

        <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
          <p>
            {content?.highlightText ? (
              content.highlightText
            ) : (
              <>
                <strong className="font-semibold text-brand-blue">Diploma 6+6</strong> là mô hình đào tạo nghề tại Singapore, kết hợp giữa:
              </>
            )}
          </p>

          {/* Bullet Points */}
          <ul className="mt-4 space-y-3.5" aria-label="Cấu trúc chương trình">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                  <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                </div>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {paragraphs.map((para, idx) => (
            <p key={idx} className="mt-6">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
