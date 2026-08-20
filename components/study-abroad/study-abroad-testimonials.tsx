"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/image"
import type { StudyAbroadTestimonialsContent } from "@/sanity/study-abroad-page"

// Replace with a YouTube or Vimeo embed URL when final video is available.
// Example: https://www.youtube-nocookie.com/embed/VIDEO_ID
const TESTIMONIAL_VIDEO_EMBED_URL = ""

const TESTIMONIALS = [
  {
    name: "Nguyễn Thảo Vy",
    role: "Sinh viên Diploma 6+6 – Ngành Hospitality",
    avatar: "/images/student-avatar-1.jpg",
    rating: 5,
    quote:
      "Sau 6 tháng học, mình đã được thực tập tại một khách sạn 5 sao. Trợ cấp giúp mình trang trải sinh hoạt phí, lại tích lũy được kinh nghiệm thực tế.",
  },
  {
    name: "Trần Minh Khoa",
    role: "Cựu học viên – F&B Management",
    avatar: "/images/student-avatar-2.jpg",
    rating: 5,
    quote:
      "Chương trình rất thực tế, giảng viên tận tâm. Giờ mình đã hoàn thành và đang làm việc chính thức tại Singapore.",
  },
  {
    name: "Lê Ngọc Hân",
    role: "Sinh viên Diploma 6+6 – IT",
    avatar: "/images/student-avatar-3.jpg",
    rating: 5,
    quote:
      "Không cần IELTS nên mình tự tin hơn khi bắt đầu. KVC hỗ trợ từ A-Z, rất chuyên nghiệp.",
  },
  {
    name: "Phạm Minh Hoàng",
    role: "Sinh viên Diploma 6+6 – Business Management",
    avatar: "/images/student-avatar-4.jpg",
    rating: 5,
    quote:
      "Chương trình thực tập 6 tháng giúp mình tiếp xúc môi trường quốc tế từ sớm. Mình học hỏi được rất nhiều về tư duy quản lý và tác phong chuyên nghiệp.",
  },
  {
    name: "Trần Thu Trang",
    role: "Sinh viên Diploma 6+6 – Ngành Tourism & Hospitality",
    avatar: "/images/student-avatar-1.jpg",
    rating: 5,
    quote:
      "KVC hỗ trợ mình rất nhiệt tình từ lúc định hướng ngành học đến khi hoàn thiện hồ sơ visa. Sang Singapore được đi thực tập ngay tại chuỗi nhà hàng lớn.",
  },
  {
    name: "Lê Quốc Bảo",
    role: "Cựu học viên – Ngành Logistics & Supply Chain",
    avatar: "/images/student-avatar-2.jpg",
    rating: 5,
    quote:
      "Mức lương thực tập tại Singapore giúp mình tự lập tài chính và hoàn trả một phần chi phí học tập. Đây là quyết định đúng đắn nhất của mình.",
  },
] as const

function getClosestPositionIndex(positions: number[], scrollLeft: number) {
  return positions.reduce((closestIdx, position, idx) => {
    const closestDistance = Math.abs(positions[closestIdx] - scrollLeft)
    const currentDistance = Math.abs(position - scrollLeft)
    return currentDistance < closestDistance ? idx : closestIdx
  }, 0)
}

export function StudyAbroadTestimonials({
  content,
}: {
  content?: StudyAbroadTestimonialsContent
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [snapPositions, setSnapPositions] = useState<number[]>([])

  const testimonials = content?.testimonials?.length
    ? content.testimonials
    : TESTIMONIALS

  const calculateSnapPositions = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const cards = Array.from(container.children) as HTMLElement[]
    if (!cards.length) {
      setSnapPositions([])
      setActiveIdx(0)
      return
    }

    const firstCardOffset = cards[0].offsetLeft
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth)
    const positions = cards
      .map((card) => Math.min(card.offsetLeft - firstCardOffset, maxScroll))
      .filter(
        (position, idx, allPositions) =>
          idx === 0 || Math.abs(position - allPositions[idx - 1]) > 1
      )

    setSnapPositions(positions)
    setActiveIdx(getClosestPositionIndex(positions, container.scrollLeft))
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    calculateSnapPositions()

    const resizeObserver = new ResizeObserver(calculateSnapPositions)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [calculateSnapPositions, testimonials.length])

  const handleScroll = (dir: "left" | "right") => {
    const container = scrollRef.current
    if (!container || !snapPositions.length) return

    const currentIdx = getClosestPositionIndex(
      snapPositions,
      container.scrollLeft
    )
    const nextIdx = Math.max(
      0,
      Math.min(snapPositions.length - 1, currentIdx + (dir === "left" ? -1 : 1))
    )

    container.scrollTo({ left: snapPositions[nextIdx], behavior: "smooth" })
  }

  const updateActiveDot = () => {
    const container = scrollRef.current
    if (!container || !snapPositions.length) return

    setActiveIdx(getClosestPositionIndex(snapPositions, container.scrollLeft))
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mt-20 w-full md:mt-28"
    >
      <div className="mb-10 text-center">
        <h2
          id="testimonials-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          {content?.title || "Học viên nói gì về Diploma 6+6 tại KVC Global?"}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
        />
      </div>

      <div className="mx-auto mb-10 max-w-5xl md:mb-14">
        <div className="relative aspect-video overflow-hidden rounded-lg border border-border/60 bg-brand-blue shadow-[0_24px_60px_-32px_rgba(13,49,94,0.45)]">
          {TESTIMONIAL_VIDEO_EMBED_URL ? (
            <iframe
              src={TESTIMONIAL_VIDEO_EMBED_URL}
              title="Video chia sẻ từ học viên KVC Global"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="absolute inset-0">
              <Image
                src="/images/student-portrait.jpg"
                alt="Học viên KVC Global chia sẻ trải nghiệm du học"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-center opacity-75"
              />
              <div className="absolute inset-0 bg-brand-blue/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-sm sm:h-20 sm:w-20">
                  <Play
                    aria-hidden="true"
                    className="ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8"
                    strokeWidth={1.75}
                  />
                </span>
                <p className="max-w-md font-heading text-base font-bold sm:text-xl">
                  Câu chuyện du học từ học viên KVC Global
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="group/nav relative px-0 md:px-8">
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={activeIdx === 0 || snapPositions.length <= 1}
          aria-label="Previous testimonial"
          className="absolute top-1/2 left-0 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-brand-blue shadow-sm transition-all hover:scale-105 hover:bg-brand-light disabled:pointer-events-none disabled:opacity-40 md:flex"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
        </button>

        <div
          ref={scrollRef}
          onScroll={updateActiveDot}
          className="flex snap-x snap-mandatory [scrollbar-width:none] scrollbar-none gap-6 overflow-x-auto scroll-smooth px-1 py-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testi, idx) => {
            const avatarUrl = testi.avatar
              ? typeof testi.avatar === "string"
                ? testi.avatar
                : urlFor(testi.avatar).url()
              : "/images/student-avatar-1.jpg"

            return (
              <div
                key={idx}
                className="relative flex min-h-[220px] w-[90%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-lg border border-border/60 bg-white p-6 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_28px_50px_-22px_rgba(0,0,0,0.25)] sm:w-[46%] lg:w-[31.5%]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2 right-4 font-serif text-[110px] leading-none text-brand-blue/5 select-none"
                >
                  “
                </span>

                <div className="relative z-10 flex gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand-light shadow-xs ring-2 ring-secondary/40 sm:h-16 sm:w-16">
                    <Image
                      src={avatarUrl}
                      alt={testi.name || ""}
                      fill
                      sizes="(max-w-768px) 56px, 64px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div
                        className="mb-2.5 flex gap-0.5"
                        aria-label={`Đánh giá ${testi.rating} sao`}
                      >
                        {Array.from({ length: testi.rating || 5 }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-current text-[#F8BC62]"
                              strokeWidth={0}
                            />
                          )
                        )}
                      </div>

                      <blockquote className="mb-4 font-body text-[13px] leading-relaxed text-brand-dark/85 italic sm:text-[14px]">
                        &ldquo;{testi.quote}&rdquo;
                      </blockquote>
                    </div>

                    <div>
                      <cite className="block font-heading text-sm font-bold text-brand-blue not-italic">
                        {testi.name}
                      </cite>
                      <span className="mt-0.5 block font-body text-[11px] text-muted-foreground md:text-[12px]">
                        {testi.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={
            activeIdx === snapPositions.length - 1 || snapPositions.length <= 1
          }
          aria-label="Next testimonial"
          className="absolute top-1/2 right-0 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-brand-blue shadow-sm transition-all hover:scale-105 hover:bg-brand-light disabled:pointer-events-none disabled:opacity-40 md:flex"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </div>

      {snapPositions.length > 1 ? (
        <div
          className="mt-8 flex justify-center gap-2"
          role="group"
          aria-label="Điều hướng đánh giá"
        >
          {snapPositions.map((position, idx) => {
            const isActive = activeIdx === idx
            return (
              <button
                key={position}
                type="button"
                onClick={() => {
                  scrollRef.current?.scrollTo({
                    left: position,
                    behavior: "smooth",
                  })
                }}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all duration-300",
                  isActive
                    ? "w-8 bg-brand-gold"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Đi đến nhóm đánh giá ${idx + 1}`}
                aria-current={isActive ? "true" : undefined}
              />
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
