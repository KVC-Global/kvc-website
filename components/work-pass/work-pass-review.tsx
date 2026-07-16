"use client"

import Image from "next/image"
import { Star } from "lucide-react"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5.04c1.67 0 3.2.58 4.38 1.69l3.27-3.27C17.68 1.54 14.99 1 12 1 7.35 1 3.37 3.65 1.4 7.56l3.85 2.99c.9-2.69 3.42-4.51 6.75-4.51z"
      />
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.87 3.39-8.49z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.45c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.4 7.06A11.956 11.956 0 000 12c0 1.77.39 3.45 1.07 4.96l4.18-3.51z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-3.96 1.09-3.33 0-6.15-1.92-7.15-4.6L1.07 17.04C3.04 20.91 7.21 23 12 23z"
      />
    </svg>
  )
}

export function WorkPassReview() {
  return (
    <section aria-label="Đánh giá và Case Study" className="mt-8 md:mt-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Column 1: Testimonial Card */}
        <div className="relative flex flex-col sm:flex-row gap-6 items-center sm:items-start border border-brand-blue/10 bg-brand-blue text-white rounded-[20px] p-6 md:p-8 shadow-[0_12px_40px_-15px_rgba(10,37,64,0.35)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(10,37,64,0.45)]">
          {/* Quote mark decoration background */}
          <span
            aria-hidden="true"
            className="absolute top-2 right-6 font-serif text-[130px] leading-none text-white/5 select-none pointer-events-none"
          >
            “
          </span>

          {/* Left Avatar Section */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-brand-gold/40 shadow-lg bg-brand-light p-1">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/images/student-avatar-2.jpg"
                  alt="Nguyễn Hoàng Nam"
                  fill
                  sizes="112px"
                  className="object-cover object-center"
                />
              </div>
            </div>
            {/* Soft decorative badge underneath avatar */}
            <div className="mt-3 flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-brand-gold text-brand-gold" />
              ))}
            </div>
          </div>

          {/* Right Text Details */}
          <div className="flex-1 flex flex-col justify-between h-full z-10 text-center sm:text-left mt-4 sm:mt-0">
            <div>
              <blockquote className="font-body text-sm sm:text-base leading-relaxed text-white/90 italic mb-4">
                &ldquo;KVC Global đã hỗ trợ tôi đạt được TEP nhanh chóng và bắt đầu hành trình sự nghiệp tại Singapore. Đội ngũ tư vấn rất chuyên nghiệp và tận tâm.&rdquo;
              </blockquote>
            </div>

            <div className="mt-auto flex justify-between items-end">
              <div>
                <cite className="font-heading text-base font-bold text-brand-gold not-italic block">
                  Nguyễn Hoàng Nam
                </cite>
                <span className="font-body text-xs text-white/60 block mt-0.5">
                  Graduate Trainee tại Tech Company, Singapore
                </span>
              </div>

              {/* Google G Logo in bottom right */}
              <GoogleIcon className="h-6 w-6 shrink-0" />
            </div>
          </div>
        </div>

        {/* Column 2: Case Study Card */}
        <div className="grid grid-cols-1 sm:grid-cols-12 border border-border bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300 overflow-hidden items-stretch">
          {/* Left Column: Image */}
          <div className="relative sm:col-span-5 min-h-[200px] sm:min-h-full overflow-hidden">
            <Image
              src="/images/singapore-flyer.jpg"
              alt="Singapore Flyer và cảnh vịnh Marina Bay lúc hoàng hôn"
              fill
              sizes="(max-w-768px) 100vw, 20vw"
              className="object-cover object-center transition-transform duration-500 hover:scale-102"
            />
          </div>

          {/* Right Column: Content */}
          <div className="sm:col-span-7 p-6 md:p-8 flex flex-col justify-between h-full bg-white z-10">
            <div>
              <span className="font-heading text-sm font-bold text-brand-blue uppercase tracking-wider block mb-2">
                Case Study
              </span>
              <p className="font-body text-sm sm:text-base leading-relaxed text-brand-dark/85">
                Hỗ trợ 1,200+ ứng viên Việt Nam đạt TEP thành công trong 10 năm qua, định hướng sự nghiệp bền vững tại Singapore.
              </p>
            </div>

            <div className="mt-6 sm:mt-auto">
              <a
                href="#cau-chuyen"
                className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-brand-gold hover:text-brand-gold/90 transition-colors duration-200"
              >
                <span>Xem thêm câu chuyện</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
