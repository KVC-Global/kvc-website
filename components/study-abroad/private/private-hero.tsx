import Link from "next/link"
import { School, Milestone, GraduationCap, CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import Image from "next/image"

const HERO_IMAGE = "/images/private-school-hero.jpg"

const STATS = [
  { icon: School, value: "Mầm non – Lớp 12", label: "bậc đào tạo" },
  { icon: Milestone, value: "18 tháng – 18 tuổi", label: "độ tuổi học sinh" },
  { icon: GraduationCap, value: "IB, AP, A-Level...", label: "chương trình quốc tế" },
  { icon: CheckCircle, value: "Trọn gói thủ tục", label: "tư vấn & hồ sơ" },
] as const

export function PrivateStudyAbroadHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="private-hero-heading"
      className={cn("relative w-full border-b border-border bg-white", className)}
    >
      {/* Desktop Background Image (Right side) */}
      <div className="absolute inset-y-0 right-0 z-0 hidden w-full overflow-hidden lg:block lg:w-[52%]">
        <Image
          src={HERO_IMAGE}
          alt="Lớp học trường quốc tế tại Singapore"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft blend transition from white background (left) to image */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-30 bg-gradient-to-r from-white via-white/50 to-transparent"
        />
      </div>

      <Container className="relative flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-0">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:mb-8 md:text-sm"
        >
          <Link
            href="/"
            className="hover:text-foreground transition-colors duration-200"
          >
            Trang chủ
          </Link>
          <span className="select-none text-muted-foreground/60">&gt;</span>
          <Link
            href="/du-hoc"
            className="hover:text-foreground transition-colors duration-200"
          >
            Du học
          </Link>
          <span className="select-none text-muted-foreground/60">&gt;</span>
          <span className="font-semibold text-foreground/80" aria-current="page">
            Du học tư thục Singapore
          </span>
        </nav>

        <div className="max-w-2xl">
          <span className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
            DU HỌC TƯ THỰC SINGAPORE
          </span>

          <h1
            id="private-hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            Môi trường quốc tế,
            <span className="mt-1 block">
              mở cánh cửa tương lai toàn cầu
            </span>
          </h1>

          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
            Hệ thống các trường quốc tế chất lượng hàng đầu tại Singapore đào tạo mọi độ tuổi từ Mầm non đến Trung học phổ thông, chuẩn bị hành trang tối ưu cho học sinh.
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
              href="#truong-tieu-bieu"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Xem các trường tiêu biểu
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

        <div className="relative z-20 mt-10 w-full sm:mt-12 lg:mt-16 xl:mt-20">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border shadow-[0_12px_40px_-15px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:grid-cols-2 lg:w-fit lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 bg-white px-5 py-4 transition-all duration-300 ease-out hover:bg-brand-light sm:px-6 sm:py-5 lg:min-w-[240px]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-light">
                    <Icon className="h-5 w-5 text-secondary" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-sm font-bold text-brand-blue sm:text-[15px]">
                      {stat.value}
                    </span>
                    <span className="font-body text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
