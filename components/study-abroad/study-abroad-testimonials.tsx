"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const TESTIMONIALS = [
  {
    name: "Nguyễn Thảo Vy",
    role: "Sinh viên Diploma 6+6 – Ngành Hospitality",
    avatar: "/images/student-avatar-1.jpg",
    rating: 5,
    quote: "Sau 6 tháng học, mình đã được thực tập tại một khách sạn 5 sao. Trợ cấp giúp mình trang trải sinh hoạt phí, lại tích lũy được kinh nghiệm thực tế.",
  },
  {
    name: "Trần Minh Khoa",
    role: "Cựu học viên – F&B Management",
    avatar: "/images/student-avatar-2.jpg",
    rating: 5,
    quote: "Chương trình rất thực tế, giảng viên tận tâm. Giờ mình đã hoàn thành và đang làm việc chính thức tại Singapore.",
  },
  {
    name: "Lê Ngọc Hân",
    role: "Sinh viên Diploma 6+6 – IT",
    avatar: "/images/student-avatar-3.jpg",
    rating: 5,
    quote: "Không cần IELTS nên mình tự tin hơn khi bắt đầu. KVC hỗ trợ từ A-Z, rất chuyên nghiệp.",
  },
  {
    name: "Phạm Minh Hoàng",
    role: "Sinh viên Diploma 6+6 – Business Management",
    avatar: "/images/student-avatar-4.jpg",
    rating: 5,
    quote: "Chương trình thực tập 6 tháng giúp mình tiếp xúc môi trường quốc tế từ sớm. Mình học hỏi được rất nhiều về tư duy quản lý và tác phong chuyên nghiệp.",
  },
  {
    name: "Trần Thu Trang",
    role: "Sinh viên Diploma 6+6 – Ngành Tourism & Hospitality",
    avatar: "/images/student-avatar-1.jpg",
    rating: 5,
    quote: "KVC hỗ trợ mình rất nhiệt tình từ lúc định hướng ngành học đến khi hoàn thiện hồ sơ visa. Sang Singapore được đi thực tập ngay tại chuỗi nhà hàng lớn.",
  },
  {
    name: "Lê Quốc Bảo",
    role: "Cựu học viên – Ngành Logistics & Supply Chain",
    avatar: "/images/student-avatar-2.jpg",
    rating: 5,
    quote: "Mức lương thực tập tại Singapore giúp mình tự lập tài chính và hoàn trả một phần chi phí học tập. Đây là quyết định đúng đắn nhất của mình.",
  },
] as const

export function StudyAbroadTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const handleScroll = (dir: "left" | "right") => {
    const container = scrollRef.current
    if (container) {
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 24
        : 300
      const scrollAmount = dir === "left" ? -cardWidth : cardWidth
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const updateActiveDot = () => {
    const container = scrollRef.current
    if (container) {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 24
        : 300
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIdx(index)
    }
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <div className="text-center mb-10">
        <h2
          id="testimonials-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          Học viên nói gì về Diploma 6+6 tại KVC Global?
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-secondary" />
      </div>

      <div className="relative group/nav px-0 md:px-8">
        <button
          onClick={() => handleScroll("left")}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-brand-blue shadow-sm hover:bg-brand-light transition-all hover:scale-105 z-10 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
        </button>

        <div
          ref={scrollRef}
          onScroll={updateActiveDot}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none gap-6 py-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((testi, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[90%] sm:w-[46%] lg:w-[31.5%] border border-border bg-white rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300 relative flex flex-col justify-between overflow-hidden min-h-[220px]"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 right-4 font-serif text-[110px] leading-none text-brand-blue/5 select-none pointer-events-none"
              >
                “
              </span>

              <div className="flex gap-4 relative z-10">
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-border/80 shadow-xs bg-brand-light">
                  <Image
                    src={testi.avatar}
                    alt={testi.name}
                    fill
                    sizes="(max-w-768px) 56px, 64px"
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-2.5" aria-label={`Đánh giá ${testi.rating} sao`}>
                      {Array.from({ length: testi.rating }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-[14px]">★</span>
                      ))}
                    </div>

                    <blockquote className="font-body text-[13px] sm:text-[14px] leading-relaxed text-brand-dark/85 mb-4 italic">
                      "{testi.quote}"
                    </blockquote>
                  </div>

                  <div>
                    <cite className="font-heading text-sm font-bold text-brand-blue not-italic block">
                      {testi.name}
                    </cite>
                    <span className="font-body text-[11px] md:text-[12px] text-muted-foreground block mt-0.5">
                      {testi.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-brand-blue shadow-sm hover:bg-brand-light transition-all hover:scale-105 z-10 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8" aria-hidden="true">
        {TESTIMONIALS.map((_, idx) => {
          const isActive = activeIdx === idx
          return (
            <button
              key={idx}
              onClick={() => {
                const container = scrollRef.current
                if (container) {
                  const cardWidth = container.firstElementChild
                    ? (container.firstElementChild as HTMLElement).offsetWidth + 24
                    : 300
                  container.scrollTo({ left: cardWidth * idx, behavior: "smooth" })
                }
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                isActive ? "w-6 bg-secondary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          )
        })}
      </div>
    </section>
  )
}
