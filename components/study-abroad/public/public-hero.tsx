import Link from "next/link"
import { Landmark, Compass, Coins, GraduationCap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { StudyAbroadStatBar } from "@/components/study-abroad/study-abroad-stat-bar"
import Image from "next/image"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"

const STATS = [
  { icon: Landmark, value: "Tiểu học – Dự bị ĐH", label: "hệ thống công lập" },
  { icon: Compass, value: "Kỳ thi AEIS", label: "tuyển sinh quốc gia" },
  { icon: Coins, value: "MOE Tuition Grant", label: "hỗ trợ học phí" },
  {
    icon: GraduationCap,
    value: "Xét Thường trú nhân",
    label: "cơ hội định cư PR",
  },
] as const

export function PublicStudyAbroadHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="public-hero-heading"
      className={cn(
        "relative w-full border-b border-border bg-white bg-cover bg-center pb-16 md:pb-20",
        className
      )}
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <Image
        src={HERO_IMAGE}
        alt="Trường công lập Singapore"
        fill
        priority
        sizes="100vw"
        className="animate-fade-in object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 0%, #fff 30%, transparent 70%)",
        }}
      />

      <Container className="relative flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-0">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:mb-8 md:text-sm"
        >
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Trang chủ
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <Link
            href="/du-hoc"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Du học
          </Link>
          <span className="text-muted-foreground/60 select-none">&gt;</span>
          <span
            className="font-semibold text-foreground/80"
            aria-current="page"
          >
            Du học công lập Singapore
          </span>
        </nav>

        <div className="max-w-2xl">
          <span className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
            DU HỌC CÔNG LẬP SINGAPORE
          </span>

          <h1
            id="public-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            Nền giáo dục đỉnh cao,
            <span className="mt-1 block">
              bước đệm định cư tương lai vững chắc
            </span>
          </h1>

          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
            Hệ thống giáo dục công lập uy tín hàng đầu thế giới dưới sự quản lý
            trực tiếp của Bộ Giáo dục Singapore (MOE), mở ra lộ trình phát triển
            học thuật vượt trội.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#dang-ky-tu-van"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Đăng ký tư vấn miễn phí
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
            </Link>

            <Link
              href="#lo-trinh"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Tìm hiểu lộ trình học
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>

      <StudyAbroadStatBar stats={STATS} />
    </section>
  )
}
