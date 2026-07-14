import Image from "next/image"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const STATS = [
  { value: "98%", label: "Tỷ lệ thành công" },
  { value: "10+", label: "Năm kinh nghiệm" },
] as const

const BULLETS = [
  "Tư vấn Du học & Việc làm",
  "Dịch vụ Doanh nghiệp",
  "Định cư Singapore",
] as const

const MAIN_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1500&q=80&auto=format&fit=crop"

const SECONDARY_IMAGE =
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop"

const CEO_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop"

const ACCENT = "var(--color-secondary)"

function ProgressRing({ value }: { value: string }) {
  const size = 120
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const arc = circumference * 0.92
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={value}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F3D8D6"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ACCENT}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl font-bold text-secondary">
          {value}
        </span>
      </div>
    </div>
  )
}

export function SiteAbout({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="about-heading"
      className={cn("w-full bg-white py-20 sm:py-24", className)}
    >
      <Container className="grid gap-12 md:grid-cols-[9fr_11fr] md:gap-16 md:items-start">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute right-[-18px] top-6 hidden h-[calc(100%-3rem)] w-px bg-secondary sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute -right-4 top-6 hidden h-px w-16 bg-secondary sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-4 left-6 hidden h-px w-16 bg-secondary sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[-18px] hidden h-24 w-px bg-secondary sm:block"
          />

          <div className="relative overflow-hidden rounded-xl shadow-[0_30px_60px_-20px_rgba(15,27,45,0.25)]">
            <Image
              src={MAIN_IMAGE}
              alt="Cặp đôi doanh nhân tư vấn visa tại văn phòng"
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-12 right-2 w-[58%] overflow-hidden rounded-lg border-[3px] border-white shadow-[0_20px_40px_-12px_rgba(15,27,45,0.3)] sm:-bottom-16 sm:right-6 sm:w-[52%]">
            <Image
              src={SECONDARY_IMAGE}
              alt="Đội ngũ tư vấn KVC Global đang làm việc"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.24em] text-secondary">
            Về công ty
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-display text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl md:text-[44px]"
          >
            Chào mừng đến với KVC Global
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            KVC Global là đối tác đáng tin cậy của bạn trong việc cung cấp các
            giải pháp toàn diện về học tập, làm việc, kinh doanh và định cư tại
            Singapore.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-full bg-secondary"
            />
            <span
              aria-hidden="true"
              className="inline-block h-px w-12 bg-secondary"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-8 sm:gap-10">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex shrink-0 items-center gap-4"
              >
                <ProgressRing value={stat.value} />
                <span className="max-w-[110px] text-[15px] font-semibold leading-snug text-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <ul className="mt-10 space-y-3">
            {BULLETS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[15px] font-medium text-foreground"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center text-secondary">
                  <Check className="h-5 w-5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#gioi-thieu"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-secondary/90 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Giới thiệu về chúng tôi
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <div className="flex items-center gap-3">
              <Image
                src={CEO_AVATAR}
                alt="Người sáng lập KVC Global"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-md"
              />
              <div className="leading-tight">
                <div className="font-display text-base font-bold text-foreground">
                  Salman Ahmed
                </div>
                <div className="font-sans text-xs font-semibold uppercase tracking-wide text-secondary">
                  CEO &amp; Founder
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
