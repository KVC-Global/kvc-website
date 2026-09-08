"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import * as LucideIcons from "lucide-react"
import {
  Building2,
  Globe2,
  GraduationCap,
  Scale,
  Users,
  Briefcase,
  Play,
} from "lucide-react"

import type {
  DichVuIntro as DichVuIntroData,
  DichVuVideoSection,
} from "@/sanity/service-pages"
import { urlFor } from "@/sanity/image"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

function getIcon(iconName?: string) {
  if (!iconName) return null
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType>)[iconName]
  return Icon || null
}

const PILLARS = [
  { icon: Building2, label: "Thành lập\ndoanh nghiệp" },
  { icon: Scale, label: "Pháp lý" },
  { icon: Users, label: "Nhân sự" },
  { icon: Globe2, label: "Nhập cư" },
  { icon: GraduationCap, label: "Giáo dục" },
] as const

const FALLBACK_PARAGRAPH_1 = `KVC Global cung cấp giải pháp tư vấn toàn diện dành cho doanh nghiệp, nhà đầu tư và chủ doanh nghiệp mong muốn mở rộng hoạt động tại Việt Nam và Singapore. Chúng tôi kết nối các dịch vụ về thành lập doanh nghiệp, pháp lý, nhân sự, nhập cư và giáo dục, giúp khách hàng xây dựng nền tảng kinh doanh vững chắc và phát triển bền vững tại thị trường quốc tế.`

const FALLBACK_PARAGRAPH_2 = `Với mạng lưới đối tác chiến lược tại Việt Nam và Singapore, KVC Global mang đến giải pháp One-Stop Business Solution, giúp doanh nghiệp tiết kiệm thời gian, tối ưu chi phí và tập trung vào tăng trưởng kinh doanh. Ý tưởng cung cấp giải pháp trọn gói từ thành lập doanh nghiệp, nhập cư, tuyển dụng đến giáo dục cũng là mô hình được nhiều đơn vị tư vấn quốc tế áp dụng.`

export function DichVuIntro({
  className,
  data,
  videoData,
}: {
  className?: string
  data?: DichVuIntroData
  videoData?: DichVuVideoSection
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const eyebrow = data?.eyebrow ?? "DỊCH VỤ CỐT LÕI"
  const title = data?.title ?? "Giải pháp toàn diện cho doanh nghiệp"
  const videoUrl = videoData?.videoUrl
  const videoCaption = videoData?.videoTitle ?? "Khám phá KVC Global qua video"
  const videoPosterUrl = videoData?.videoPoster
    ? urlFor(videoData.videoPoster).url()
    : "/images/thumb-sharing.png"
  const hasVideo = Boolean(videoUrl || videoData?.videoPoster)
  const displayPillars =
    data?.pillars && data.pillars.length > 0
      ? data.pillars.map((p) => ({
          icon: getIcon(p.icon) ?? Building2,
          label: p.label ?? "",
        }))
      : [...PILLARS]
  const paragraph1 = data?.paragraph1 ?? FALLBACK_PARAGRAPH_1
  const paragraph2 = data?.paragraph2 ?? FALLBACK_PARAGRAPH_2

  return (
    <section
      aria-label="Giới thiệu dịch vụ"
      className={cn("w-full bg-white pt-10 pb-16 md:pt-12 md:pb-24 dark:bg-background", className)}
    >
      <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-7xl"
          >
            {/* ── Section label & Header ── */}
            <motion.div variants={fadeUp} className="text-center">
              <span className="mb-3 block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
                {eyebrow}
              </span>
              <h2 className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl dark:text-foreground">
                {title}
              </h2>
              <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </motion.div>

            {/* ── Body: all content (left) + optional sticky video (right) ── */}
            <div
              className={cn(
                "mt-12 grid gap-8 lg:gap-16",
                hasVideo && "lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]"
              )}
            >
              <motion.div variants={stagger} className="flex flex-col">
                {/* ── Pillar cards ── */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {displayPillars.map((pillar) => {
                    const Icon = pillar.icon
                    return (
                      <div
                        key={pillar.label}
                        className={cn(
                          "group relative flex w-[calc(50%-0.5rem)] shrink-0 flex-col items-center gap-3 rounded-lg border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-md dark:border-border/10 dark:bg-card sm:w-[calc(33.333%-0.667rem)]",
                          !hasVideo && "md:w-[calc(20%-0.8rem)]"
                        )}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-light group-hover:bg-brand-blue/5 transition-colors">
                          <Icon className="h-6 w-6 text-brand-gold" strokeWidth={2} />
                        </div>
                        <span className="text-center font-heading text-[14px] font-bold leading-tight text-brand-blue dark:text-foreground mt-2">
                          {pillar.label}
                        </span>
                      </div>
                    )
                  })}
                </motion.div>

                {/* ── Paragraph 1 ── */}
                <motion.div
                  variants={fadeUp}
                  className={cn(
                    "mt-12",
                    hasVideo ? "text-left" : "text-center max-w-4xl mx-auto"
                  )}
                >
                  <p className="font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                    {paragraph1}
                  </p>
                </motion.div>

                {/* ── Divider ── */}
                <motion.div variants={fadeUp} className="mt-12 flex items-center gap-4">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  <Briefcase className="h-5 w-5 shrink-0 text-brand-gold" strokeWidth={1.75} />
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                </motion.div>

                {/* ── Paragraph 2 — highlighted card ── */}
                <motion.div
                  variants={fadeUp}
                  className="relative mt-12 overflow-hidden rounded-lg bg-brand-blue p-6 shadow-lg sm:p-8 md:p-10 dark:bg-card"
                >
                  {/* Decorative glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl"
                  />

                  <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <p className="font-body text-sm leading-relaxed text-white/90 sm:text-base dark:text-foreground">
                      {paragraph2}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent sm:left-8 sm:right-8"
                  />
                </motion.div>
              </motion.div>

              {/* ── Sticky portrait video (right) ── */}
              {hasVideo ? (
                <motion.div
                  variants={fadeUp}
                  className="lg:sticky lg:top-8 lg:self-start"
                >
                  <div className="relative mx-auto w-full max-w-[26rem] overflow-hidden rounded-lg border border-border/60 bg-brand-blue shadow-[0_24px_60px_-32px_rgba(13,49,94,0.45)]">
                    <div className="relative aspect-[9/16]">
                      {isPlaying && videoUrl ? (
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
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
