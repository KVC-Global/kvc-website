"use client"

import Image from "next/image"
import {
  Clock,
  Wallet,
  FileText,
  Briefcase,
  TrendingUp,
  Check,
} from "lucide-react"

import { cn } from "@/lib/utils"

const ENIcon = (props: any) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-blue font-heading text-[11px] font-extrabold text-brand-blue tracking-tight select-none">
    EN
  </div>
)

const BENEFITS = [
  {
    icon: Clock,
    title: "Tiết kiệm thời gian",
    description:
      "Hoàn thành chương trình và nhận bằng chỉ trong 1 năm, ngắn hơn nhiều so với các lộ trình du học truyền thống.",
  },
  {
    icon: Wallet,
    title: "Vừa học vừa có thu nhập",
    description:
      "Trợ cấp thực tập từ 800 - 1.500 SGD/tháng, giúp trang trải một phần chi phí sinh hoạt.",
  },
  {
    icon: FileText,
    title: "Học phí linh hoạt",
    description:
      "Học phí có thể được đóng theo từng đợt, giảm áp lực tài chính cho gia đình.",
  },
  {
    icon: ENIcon,
    title: "Không yêu cầu IELTS",
    description:
      "Phù hợp với các bạn chưa có chứng chỉ tiếng Anh quốc tế, sẽ được học bổ trợ trong quá trình học.",
  },
  {
    icon: Briefcase,
    title: "Kinh nghiệm thực tế",
    description:
      "Thực tập tại doanh nghiệp, nhà hàng, khách sạn quốc tế ngay từ khi còn đi học.",
  },
  {
    icon: TrendingUp,
    title: "Cơ hội phát triển lâu dài",
    description:
      "Liên thông lên Cử nhân hoặc tìm kiếm việc làm, chuyển đổi sang các loại work pass phù hợp.",
  },
] as const

export function StudyAbroadDetails({ className }: { className?: string }) {
  return (
    <div className={cn("w-full bg-brand-light py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-[1280px] px-6">
        {/* Section 1: Introduction (Diploma 6+6 là gì?) */}
        <section
          aria-labelledby="intro-heading"
          className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
        >
          {/* Left Column: Image */}
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-brand shadow-lg lg:col-span-5">
            <Image
              src="/images/singapore-merlion-sunset.jpg"
              alt="Tượng Merlion và Marina Bay Sands tại Singapore"
              fill
              sizes="(max-w-1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col lg:col-span-7">
            <h2
              id="intro-heading"
              className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
            >
              Chương trình Diploma 6+6 là gì?
            </h2>

            <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
              <p>
                <strong className="font-semibold text-brand-blue">Diploma 6+6</strong> là mô hình đào tạo nghề tại Singapore, kết hợp giữa:
              </p>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-3.5" aria-label="Cấu trúc chương trình">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                    <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                  </div>
                  <span>
                    <strong className="font-semibold text-brand-blue">6 tháng</strong> học lý thuyết tại trường
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                    <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                  </div>
                  <span>
                    <strong className="font-semibold text-brand-blue">6 tháng</strong> thực tập hưởng lương tại các doanh nghiệp uy tín ở Singapore
                  </span>
                </li>
              </ul>

              <p className="mt-6">
                Sau khi hoàn thành, học viên nhận bằng Diploma quốc tế, tương đương bằng Cao đẳng tại Việt Nam, được công nhận và có giá trị liên thông lên Cử nhân tại Singapore và nhiều quốc gia khác.
              </p>

              <p className="mt-4">
                Đây là lộ trình được nhiều bạn trẻ Việt Nam lựa chọn vì thời gian học ngắn, chi phí hợp lý và có cơ hội tạo thu nhập ngay trong quá trình học.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Why Choose Us (Vì sao nên chọn Diploma 6+6?) */}
        <section
          aria-labelledby="benefits-heading"
          className="mt-20 md:mt-28"
        >
          <h2
            id="benefits-heading"
            className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            Vì sao nên chọn Diploma 6+6?
          </h2>

          {/* Cards Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(10,37,64,0.1)]"
                >
                  {/* Icon Container */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light">
                    <benefit.icon className="h-7 w-7 text-brand-blue" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-[16px] font-bold text-brand-blue sm:text-[17px]">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
