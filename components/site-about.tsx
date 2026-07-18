import Image from "next/image"
import { Award, Handshake, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

import styles from "./site-about.module.css"

type Stat = { value: string; label: string; color?: string }
const STATS: Stat[] = [
  { value: "88%", label: "Tư vấn chiến lược kinh doanh" },
  { value: "93%", label: "Mạng lưới giáo dục & công nghệ", color: "#F8BC62" },
]

const ICON_STATS = [
  {
    id: "exp-1",
    icon: Handshake,
    value: "15+ Năm",
    sub: "Kinh nghiệm thực chiến",
    tone: "blue" as const,
  },
  {
    id: "acra-1",
    icon: Award,
    value: "Top 1%",
    sub: "Đối tác ACRA Singapore",
    tone: "gold" as const,
  },
  {
    id: "exp-2",
    icon: Handshake,
    value: "15+ Năm",
    sub: "Kinh nghiệm thực chiến",
    tone: "blue" as const,
  },
  {
    id: "acra-2",
    icon: Award,
    value: "Top 1%",
    sub: "Đối tác ACRA Singapore",
    tone: "gold" as const,
  },
] as const

const MAIN_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1500&q=80&auto=format&fit=crop"

const ACCENT = "var(--color-secondary)"

function ProgressRing({
  value,
  color = ACCENT,
}: {
  value: string
  color?: string
}) {
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
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl font-bold" style={{ color }}>
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
      className={cn(
        "w-full bg-white py-10 sm:py-14 md:py-16 md:pb-25",
        className
      )}
    >
      <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div
          className="rounded-2xl border border-[#E6E9EE] bg-brand-light px-10 pt-12 shadow-[0_20px_50px_-25px_rgba(15,27,45,0.18)] sm:px-14 sm:pt-14 md:px-32 md:pt-16"
          style={{ paddingBottom: "clamp(6rem, 7vw, 8rem)" }}
        >
          <div className={styles.aboutGrid}>
            <div className="relative" style={{ paddingBottom: "2.5rem" }}>
              <div className="relative overflow-hidden rounded-xl shadow-[0_30px_60px_-20px_rgba(15,27,45,0.25)]">
                <Image
                  src={MAIN_IMAGE}
                  alt="Cặp đôi doanh nhân tư vấn visa tại văn phòng"
                  width={1200}
                  height={1500}
                  className={styles.mainImage}
                />
              </div>

              <div
                className="absolute bottom-0 flex flex-col items-start justify-center gap-4 rounded-xl px-6 py-6 shadow-[0_20px_40px_-16px_rgba(15,27,45,0.28)] sm:px-7"
                style={{
                  right: "-1rem",
                  width: "min(280px, calc(100% - 1rem))",
                  minHeight: "10rem",
                  backgroundColor: "#F8D39E",
                }}
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <ShieldCheck className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <p className="font-display text-base leading-snug font-bold text-primary sm:text-lg">
                  Trusted by Global Enterprises
                </p>
              </div>
            </div>

            <div className="flex h-full w-full max-w-2xl flex-col">
              <p className="font-sans text-[13px] font-bold tracking-[0.24em] text-brand-gold uppercase">
                Về công ty
              </p>
              <h2
                id="about-heading"
                className="mt-3 font-display text-3xl leading-[1.1] font-bold text-primary sm:text-4xl md:text-[44px]"
              >
                Chào mừng đến với KVC Global
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                KVC Global là đối tác đáng tin cậy của bạn trong việc cung cấp
                các giải pháp toàn diện về học tập, làm việc, kinh doanh và định
                cư tại Singapore.
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
                    <ProgressRing value={stat.value} color={stat.color} />
                    <span className="max-w-[110px] text-[15px] leading-snug font-semibold text-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <div>
                  <h3 className="font-sans text-[13px] font-bold tracking-[0.24em] text-brand-gold uppercase">
                    Những con số chứng minh năng lực
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-px w-full bg-border"
                  />
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  {ICON_STATS.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.id} className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                            item.tone === "blue"
                              ? "bg-brand-blue-mid text-white"
                              : "bg-secondary text-[#000F22]"
                          )}
                        >
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </span>
                        <div className="leading-tight">
                          <dt className="font-display text-base font-bold text-foreground">
                            {item.value}
                          </dt>
                          <dd className="font-sans text-[13px] text-foreground/70">
                            {item.sub}
                          </dd>
                        </div>
                      </div>
                    )
                  })}
                </dl>
              </div>

              <div className="mt-10">
                <a
                  href="#gioi-thieu"
                  className="group inline-flex items-center justify-center gap-2 rounded-md border-2 border-brand-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-brand-gold uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold hover:text-white hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                >
                  Về chúng tôi
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
