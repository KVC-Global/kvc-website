"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Play, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/image"
import type { StudyAbroadTestimonialsContent } from "@/sanity/study-abroad-page"

const AUTO_SCROLL_DELAY = 5000

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

function getSafeVideoEmbedUrl(value?: string) {
  if (!value) return null

  try {
    const url = new URL(value)
    const isYouTubeEmbed =
      ["www.youtube.com", "www.youtube-nocookie.com"].includes(url.hostname) &&
      url.pathname.startsWith("/embed/")
    const isVimeoEmbed =
      url.hostname === "player.vimeo.com" && url.pathname.startsWith("/video/")
    const isTikTokEmbed =
      url.hostname === "www.tiktok.com" &&
      (url.pathname.startsWith("/embed/") ||
        url.pathname.startsWith("/player/"))

    return url.protocol === "https:" &&
      (isYouTubeEmbed || isVimeoEmbed || isTikTokEmbed)
      ? url.toString()
      : null
  } catch {
    return null
  }
}

export function StudyAbroadTestimonials({
  content,
}: {
  content?: StudyAbroadTestimonialsContent
}) {
  const testimonials = content?.testimonials?.length
    ? content.testimonials
    : TESTIMONIALS
  const videoEmbedUrl = getSafeVideoEmbedUrl(content?.videoEmbedUrl)

  const scrollRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [maxScrollIdx, setMaxScrollIdx] = useState(0)

  // Compute the last card index that can actually reach the top of the viewport
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const compute = () => {
      const maxScroll = container.scrollHeight - container.clientHeight
      if (maxScroll <= 1) {
        setMaxScrollIdx(0)
        return
      }
      const cards = Array.from(container.children) as HTMLElement[]
      let lastValid = 0
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].offsetTop <= maxScroll) {
          lastValid = i
        } else {
          break
        }
      }
      setMaxScrollIdx(lastValid)
    }

    compute()
    const resizeObserver = new ResizeObserver(compute)
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [testimonials.length])

  // Auto-scroll: advance one card every AUTO_SCROLL_DELAY, loop at end
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const maxScroll = container.scrollHeight - container.clientHeight
    if (maxScroll <= 1) return

    const interval = setInterval(() => {
      if (isPausedRef.current) return

      const current = container.scrollTop
      if (current >= maxScroll - 2) {
        container.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const cards = Array.from(container.children) as HTMLElement[]
        const nextCard = cards.find((card) => card.offsetTop > current + 2)
        if (nextCard) {
          container.scrollTo({ top: nextCard.offsetTop, behavior: "smooth" })
        }
      }
    }, AUTO_SCROLL_DELAY)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Track which card is at the top during manual or auto scroll
  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const cards = Array.from(container.children) as HTMLElement[]
    const current = container.scrollTop
    for (let i = 0; i < cards.length; i++) {
      if (
        cards[i].offsetTop <= current + 4 &&
        (i === cards.length - 1 || cards[i + 1].offsetTop > current + 4)
      ) {
        setActiveIdx(i)
        break
      }
    }
  }, [])

  const scrollToCard = useCallback((idx: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[idx] as HTMLElement
    if (card) {
      container.scrollTo({ top: card.offsetTop, behavior: "smooth" })
    }
  }, [])

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

      <div className="grid gap-8 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
        {/* Left: vertical video — sticky on desktop */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="relative mx-auto w-full max-w-[30rem] overflow-hidden rounded-lg border border-border/60 bg-brand-blue shadow-[0_24px_60px_-32px_rgba(13,49,94,0.45)]">
            <div className="relative aspect-[9/16]">
              {videoEmbedUrl ? (
                <iframe
                  src={videoEmbedUrl}
                  title={
                    content?.videoTitle ||
                    "Video chia sẻ từ học viên KVC Global"
                  }
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <div className="absolute inset-0">
                  <Image
                    src={
                      content?.videoPoster
                        ? urlFor(content.videoPoster).url()
                        : "/images/student-portrait.jpg"
                    }
                    alt={
                      content?.videoTitle ||
                      "Học viên KVC Global chia sẻ trải nghiệm du học"
                    }
                    fill
                    sizes="(max-width: 640px) 90vw, 432px"
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
                    <p className="max-w-[16rem] font-heading text-base font-bold sm:text-xl">
                      {content?.videoTitle ||
                        "Câu chuyện du học từ học viên KVC Global"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: auto-scrolling testimonial list */}
        <div
          onMouseEnter={() => {
            isPausedRef.current = true
          }}
          onMouseLeave={() => {
            isPausedRef.current = false
          }}
          onFocus={() => {
            isPausedRef.current = true
          }}
          onBlur={() => {
            isPausedRef.current = false
          }}
        >
          <div className="relative">
          {/* Top & bottom fade gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-white to-transparent" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex max-h-[26rem] [scrollbar-width:none] flex-col gap-4 overflow-y-auto scroll-smooth [-ms-overflow-style:none] lg:max-h-[40rem] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Danh sách đánh giá học viên"
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
                  className="relative shrink-0 overflow-hidden rounded-lg border border-border/60 bg-white p-5 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_24px_46px_-22px_rgba(0,0,0,0.2)] sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1 right-3 font-serif text-[90px] leading-none text-brand-blue/5 select-none"
                  >
                    &ldquo;
                  </span>

                  <div className="relative z-10 flex gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-brand-light shadow-xs ring-2 ring-secondary/40 sm:h-14 sm:w-14">
                      <Image
                        src={avatarUrl}
                        alt={testi.name || ""}
                        fill
                        sizes="(max-width: 768px) 48px, 56px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div
                        className="mb-2 flex gap-0.5"
                        aria-label={`Đánh giá ${testi.rating || 5} sao`}
                      >
                        {Array.from({ length: testi.rating || 5 }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-current text-brand-gold-light"
                              strokeWidth={0}
                            />
                          )
                        )}
                      </div>

                      <blockquote className="mb-3 font-body text-[13px] leading-relaxed text-brand-dark/85 italic sm:text-sm">
                        &ldquo;{testi.quote}&rdquo;
                      </blockquote>

                      <div>
                        <cite className="block font-heading text-sm font-bold text-brand-blue not-italic">
                          {testi.name}
                        </cite>
                        <span className="mt-0.5 block font-body text-[11px] text-muted-foreground md:text-xs">
                          {testi.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          </div>

          {/* Progress dots — only for reachable scroll positions */}
          {maxScrollIdx > 0 ? (
            <div
              className="mt-5 flex justify-center gap-1.5"
              role="group"
              aria-label="Điều hướng đánh giá"
            >
              {Array.from({ length: maxScrollIdx + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  className={cn(
                    "h-2 cursor-pointer rounded-full transition-all duration-300",
                    activeIdx === idx
                      ? "w-6 bg-brand-gold"
                      : "w-2 bg-brand-blue-mid hover:bg-brand-blue"
                  )}
                  aria-label={`Đi đến đánh giá ${idx + 1}`}
                  aria-current={activeIdx === idx ? "true" : undefined}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
