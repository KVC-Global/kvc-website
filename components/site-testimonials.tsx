"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, Quote, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/image"
import { useDictionary } from "@/lib/i18n-client"
import type {
  HomepageGoogleReviews,
  HomepageSectionHeading,
} from "@/sanity/home-page"

const ACCENT = "var(--color-secondary)"
const VISIBLE_COUNT = 3

export type SanityTestimonial = {
  name: string
  role?: string
  company?: string
  quote: string
  image?: any
  avatar?: string
  rating?: number
}

const TESTIMONIALS: ReadonlyArray<SanityTestimonial> = [
  {
    name: "Minh Anh",
    role: "Du học sinh",
    company: "NUS",
    quote:
      "Nhờ KVC Global từ A đến Z, tôi đã nhận được học bổng 50% tại NUS — điều mà tôi chưa từng nghĩ tới!",
  },
  {
    name: "Phương Linh",
    role: "Thực tập sinh MBA",
    quote:
      "Chương trình thực tập tại Singapore giúp tôi có trải nghiệm tuyệt vời và cơ hội phát triển bản thân.",
  },
  {
    name: "Hoàng Nam",
    role: "Doanh nhân",
    quote:
      "KVC đã hỗ trợ thành lập công ty tại Singapore nhanh chóng và đúng quy trình. Dịch vụ rất chuyên nghiệp!",
  },
  {
    name: "Thanh Huyền",
    role: "Định cư Singapore",
    quote:
      "Đội ngũ tư vấn tận tâm, thủ tục minh bạch. Tôi cảm thấy yên tâm trong suốt hành trình định cư của mình.",
  },
  {
    name: "Quốc Bảo",
    role: "Lao động tay nghề",
    quote:
      "Quy trình xử lý hồ sơ nhanh gọn, hỗ trợ 24/7. Tôi đã có việc làm ổn định chỉ sau 3 tháng.",
  },
  {
    name: "Mai Trang",
    role: "Khách hàng doanh nghiệp",
    quote:
      "KVC giúp chúng tôi mở rộng thị trường Singapore hiệu quả. Đối tác tin cậy và chuyên nghiệp.",
  },
  {
    name: "Thu Hà",
    role: "Phụ huynh học sinh",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&q=80&auto=format&fit=crop",
    quote:
      "Là phụ huynh, tôi hoàn toàn yên tâm khi gửi con cho KVC đồng hành. Con tôi nay đã nhập học tại PSB Academy.",
  },
  {
    name: "Đức Thịnh",
    role: "Kỹ sư xây dựng",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&q=80&auto=format&fit=crop",
    quote:
      "Sang Singapore làm việc với mức lương tốt hơn hẳn. KVC hỗ trợ tôi từ hồ sơ đến khi nhận việc.",
  },
  {
    name: "Lan Anh",
    role: "Du học sinh — PSB Academy",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&q=80&auto=format&fit=crop",
    quote:
      "Môi trường học quốc tế, chương trình chuyên sâu. Cảm ơn KVC đã giúp tôi chọn đúng ngành, đúng trường.",
  },
]

type GoogleReview = {
  name: string
  initial: string
  color: string
  text: string
}

const GOOGLE_REVIEWS: ReadonlyArray<GoogleReview> = [
  {
    name: "Hồng Nhung",
    initial: "H",
    color: "var(--color-brand-blue)",
    text: "Dịch vụ rất chuyên nghiệp, đội ngũ tư vấn nhiệt tình. Hỗ trợ rất nhanh chóng. Cảm ơn KVC Global!",
  },
  {
    name: "Minh Kha",
    initial: "M",
    color: "var(--color-secondary)",
    text: "Nhờ KVC mà tôi đã hoàn thành tốt ước mơ du học Singapore. Mọi thứ đều rõ ràng và đáng tin cậy.",
  },
  {
    name: "Bích Ngọc",
    initial: "B",
    color: "#1A4D7A",
    text: "Tư vấn rõ ràng, cẩn thận, giúp con tôi đạt học bổng NUS. Cảm ơn đội ngũ KVC!",
  },
] as const

function Stars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div
      className="inline-flex items-center gap-0.5"
      aria-label={`${count} sao`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size, color: "#F8BC62" }}
          strokeWidth={0}
          fill="currentColor"
        />
      ))}
    </div>
  )
}

const FALLBACK_AVATARS: Record<string, string> = {
  "minh anh":
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&q=80&auto=format&fit=crop",
  "phương linh":
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&q=80&auto=format&fit=crop",
  "hoàng nam":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80&auto=format&fit=crop",
  "thanh huyền":
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&q=80&auto=format&fit=crop",
  "quốc bảo":
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80&auto=format&fit=crop",
  "mai trang":
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&q=80&auto=format&fit=crop",
}

function TestimonialCard({ testimonial }: { testimonial: SanityTestimonial }) {
  const nameKey = testimonial.name.toLowerCase().trim()
  const fallbackAvatar =
    FALLBACK_AVATARS[nameKey] ||
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&q=80&auto=format&fit=crop"

  const avatarUrl = testimonial.image
    ? urlFor(testimonial.image).url()
    : testimonial.avatar || fallbackAvatar

  const displayRole = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(" — ")

  return (
    <article className="flex h-full w-full shrink-0 flex-col rounded-lg bg-white p-5 text-brand-blue shadow-[0_18px_40px_-22px_rgba(0,0,0,0.5)] ring-1 ring-white/10 sm:min-h-[340px] sm:p-6">
      <div className="flex items-start gap-4">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg ring-2 ring-secondary/40">
          <Image
            src={avatarUrl}
            alt={testimonial.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 leading-tight">
          <Quote
            aria-hidden="true"
            className="h-5 w-5 text-brand-blue"
            strokeWidth={0}
            fill="currentColor"
          />
          <div className="mt-1.5 font-display text-[15px] font-bold text-brand-blue">
            {testimonial.name}
          </div>
          {displayRole && (
            <div className="mt-0.5 text-[12px] font-medium text-brand-blue/60">
              {displayRole}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-brand-blue/80 sm:text-[15px]">
        {testimonial.quote}
      </p>
    </article>
  )
}

function GoogleLogo() {
  return (
    <svg
      viewBox="0 0 272 92"
      role="img"
      aria-label="Google"
      className="h-10 w-auto sm:h-12"
    >
      <path
        fill="#4285F4"
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18Zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44Z"
      />
      <path
        fill="#EA4335"
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18Zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44Z"
      />
      <path
        fill="#FBBC05"
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25Zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36Z"
      />
      <path
        fill="#34A853"
        d="M225 3v65h-9.5V3h9.5Zm44.07 43.86 7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14Zm-23.27-7.98 19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93Z"
      />
      <path
        fill="#EA4335"
        d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01Z"
      />
    </svg>
  )
}

export function SiteTestimonials({
  className,
  testimonials = TESTIMONIALS,
  googleReviewsContent,
  content,
}: {
  className?: string
  testimonials?: ReadonlyArray<SanityTestimonial>
  googleReviewsContent?: HomepageGoogleReviews
  content?: HomepageSectionHeading
}) {
  const t = useDictionary()

  const defaultGoogleReviews: ReadonlyArray<GoogleReview> = [
    {
      name: t.testimonials.google.reviews.review1.name,
      initial: "H",
      color: "var(--color-brand-blue)",
      text: t.testimonials.google.reviews.review1.text,
    },
    {
      name: t.testimonials.google.reviews.review2.name,
      initial: "M",
      color: "var(--color-secondary)",
      text: t.testimonials.google.reviews.review2.text,
    },
    {
      name: t.testimonials.google.reviews.review3.name,
      initial: "B",
      color: "#1A4D7A",
      text: t.testimonials.google.reviews.review3.text,
    },
  ]
  const googleReviews: ReadonlyArray<GoogleReview> =
    googleReviewsContent?.reviews?.length
      ? googleReviewsContent.reviews.map((review) => ({
          name: review.name || "",
          initial: review.initial || review.name?.charAt(0) || "K",
          color: review.color || "var(--color-brand-blue)",
          text: review.text || "",
        }))
      : defaultGoogleReviews

  const [active, setActive] = useState(0)
  const pageCount = Math.ceil(testimonials.length / VISIBLE_COUNT)

  useEffect(() => {
    if (pageCount <= 1) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % pageCount)
    }, 6000)
    return () => clearInterval(id)
  }, [pageCount])

  return (
    <section
      aria-labelledby="testimonials-heading"
      className={cn(
        "mx-6 rounded-lg bg-brand-blue-mid py-10 sm:py-12",
        className
      )}
    >
      <div className="w-full px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] lg:gap-10">
          {/* Left: testimonials carousel */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[13px] font-bold tracking-[0.28em] text-brand-gold uppercase">
                  {content?.eyebrow || t.testimonials.tagline}
                </p>
                <h2
                  id="testimonials-heading"
                  className="mt-10 max-w-xl font-display text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-[40px]"
                >
                  {content?.title || t.testimonials.title}
                </h2>
              </div>
              <a
                href="#testimonials"
                className="hidden shrink-0 items-center gap-2 pt-2 text-[13px] font-semibold tracking-[0.18em] whitespace-nowrap text-white/80 uppercase transition-colors hover:text-brand-gold sm:inline-flex"
              >
                {t.testimonials.btnMore}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>

            <div className="mt-10 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="w-full shrink-0 px-2 sm:w-1/2 sm:px-3 lg:w-1/3"
                  >
                    <TestimonialCard testimonial={t} />
                  </div>
                ))}
              </div>
            </div>

            {pageCount > 1 ? (
              <div
                className="mt-6 flex items-center justify-center gap-2"
                role="tablist"
                aria-label={t.testimonials.ariaLabel}
              >
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    aria-label={`${t.testimonials.pageLabel} ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      active === i
                        ? "w-8 bg-brand-gold"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* Right: Google reviews */}
          <aside
            aria-label={t.testimonials.google.tagline}
            className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8"
          >
            <p className="font-sans text-[12px] font-bold tracking-[0.28em] text-brand-gold uppercase">
              {t.testimonials.google.tagline}
            </p>

            <div className="mt-4">
              <GoogleLogo />
            </div>

            <div className="mt-5 flex gap-2">
              <span className="font-display text-5xl leading-none font-bold text-white">
                {googleReviewsContent?.rating ?? 4.8}
              </span>
              <div>
                <div>
                  <Stars size={20} />
                </div>
                <p className="text-[13px] text-white/65">
                  Dựa trên{" "}
                  <span className="font-semibold text-white">
                    {googleReviewsContent?.reviewCount ?? 500}
                  </span>{" "}
                  đánh giá
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-5 border-t border-white/10 pt-6">
              {googleReviews.map((review) => (
                <li key={review.name} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: review.color }}
                  >
                    {review.initial}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-white">
                      {review.name}
                    </div>
                    <div>
                      <Stars size={11} />
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-white/70">
                      {review.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={googleReviewsContent?.reviewUrl || "#google-reviews"}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-5 py-3 text-[13px] font-semibold tracking-[0.16em] text-brand-blue uppercase shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-secondary/90 hover:shadow-md"
            >
              {t.testimonials.google.btn}
              <ArrowRight className="h-4 w-4" strokeWidth={2.75} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

// Expose brand tokens for cross-component consistency if needed elsewhere.
export const SITE_TESTIMONIALS_BRAND = { ACCENT } as const
