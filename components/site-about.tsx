import Image from "next/image"
import { Award, Handshake } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { getDictionaryServer, getLocale } from "@/lib/i18n-server"

type Stat = { value: string; label: string; color?: string }

const MAIN_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1500&q=80&auto=format&fit=crop"

const SECONDARY_IMAGE =
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop"

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

export async function SiteAbout({ className }: { className?: string }) {
  const t = await getDictionaryServer()
  const locale = await getLocale()

  const stats: Stat[] = [
    { value: "88%", label: t.about.statStrategy },
    { value: "93%", label: t.about.statNetwork, color: "#F8BC62" },
  ]

  const iconStats = [
    {
      id: "exp-1",
      icon: Handshake,
      value: t.about.expValue,
      sub: t.about.expSub,
      tone: "blue" as const,
    },
    {
      id: "acra-1",
      icon: Award,
      value: t.about.acraValue,
      sub: t.about.acraSub,
      tone: "gold" as const,
    },
    {
      id: "exp-2",
      icon: Handshake,
      value: t.about.expValue,
      sub: t.about.expSub,
      tone: "blue" as const,
    },
    {
      id: "acra-2",
      icon: Award,
      value: t.about.acraValue,
      sub: t.about.acraSub,
      tone: "gold" as const,
    },
  ] as const

  return (
    <section
      aria-labelledby="about-heading"
      className={cn("w-full bg-white py-20 sm:py-24", className)}
    >
      <Container className="grid gap-12 md:grid-cols-[9fr_11fr] md:items-start md:gap-16">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-6 right-[-18px] hidden h-[calc(100%-3rem)] w-px bg-secondary sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute top-6 -right-4 hidden h-px w-16 bg-secondary sm:block"
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
              alt={t.about.altImage1}
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="absolute right-2 -bottom-12 w-[58%] overflow-hidden rounded-lg border-[3px] border-white shadow-[0_20px_40px_-12px_rgba(15,27,45,0.3)] sm:right-6 sm:-bottom-16 sm:w-[52%]">
            <Image
              src={SECONDARY_IMAGE}
              alt={t.about.altImage2}
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="font-sans text-[13px] font-bold tracking-[0.24em] text-brand-gold uppercase">
            {t.about.tagline}
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-display text-3xl leading-[1.1] font-bold text-primary sm:text-4xl md:text-[44px]"
          >
            {t.about.title}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            {t.about.description}
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
            {stats.map((stat) => (
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
                {t.about.statsTitle}
              </h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-full bg-border"
              />
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {iconStats.map((item) => {
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
              href={locale === "vi" ? "/vi/gioi-thieu" : "/en/gioi-thieu"}
              className="group inline-flex items-center justify-center gap-2 rounded-md border-2 border-brand-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-brand-gold uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold hover:text-white hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              {t.about.btn}
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
      </Container>
    </section>
  )
}
