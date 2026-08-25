"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { useState } from "react"

import type { DichVuVideoSection } from "@/sanity/service-pages"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

export function DichVuVideo({
  className,
  data,
}: {
  className?: string
  data?: DichVuVideoSection
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  const eyebrow = data?.eyebrow ?? "Khám Phá KVC Global"
  const title = data?.title ?? "Giải pháp toàn diện của chúng tôi"
  const videoUrl = data?.videoUrl

  return (
    <section
      aria-labelledby="dich-vu-video-heading"
      className={cn(
        "w-full bg-white py-16 md:py-24 dark:bg-background",
        className
      )}
    >
      <Container>
        <div className="mb-10 text-center">
          <span className="mb-3 block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
            {eyebrow}
          </span>
          <h2
            id="dich-vu-video-heading"
            className="font-heading text-xl font-bold text-brand-blue sm:text-2xl dark:text-foreground"
          >
            {title}
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
          />
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border/60 bg-brand-blue shadow-[0_24px_60px_-32px_rgba(13,49,94,0.45)]">
            {isPlaying && videoUrl ? (
              <video
                aria-label={title}
                className="absolute inset-0 h-full w-full object-cover"
                src={videoUrl}
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
                  src="/images/thumb-sharing.png"
                  alt="KVC Global tại Singapore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover object-center opacity-75"
                />
                <div className="absolute inset-0 bg-brand-blue/45" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
                  {videoUrl ? (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label={`Phát video: ${title}`}
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
                  <p className="max-w-md font-heading text-base font-bold sm:text-xl">
                    Khám phá KVC Global qua video
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
