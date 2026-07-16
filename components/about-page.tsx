import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  Calendar,
  FileText,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react"

import { SitePartners } from "@/components/site-partners"
import { Container } from "@/components/ui/container"

/**
 * About / "Giới thiệu" page.
 *
 * Color mapping (per design spec):
 *   - Primary Dark  -> `primary` / `brand-blue`  (#0a2540 navy)
 *   - Accent        -> `secondary`              (gold/cream, used for
 *                     subtitles, highlighted text, icons, separators)
 *   - Surface       -> `brand-light` / `white`   (cards, shadows)
 *
 * Images are placeholders sourced from /public/images — swap with real
 * photography (team, offices, certificates, cityscape) when available.
 */

const HERO_STATS = [
  { icon: Award, value: "10+ năm", label: "Kinh nghiệm" },
  { icon: Users, value: "2.000+", label: "Khách hàng" },
  { icon: ShieldCheck, value: "100%", label: "Minh bạch" },
  { icon: Globe2, value: "24/7", label: "Hỗ trợ" },
] as const

const OFFICES = [
  {
    title: "Singapore — Trụ sở chính",
    image: "/images/singapore1-5221.jpg",
    address: "1 Raffles Place, #20-61, Singapore 048616",
    contacts: [
      { icon: Phone, text: "+65 6123 4567" },
      { icon: Mail, text: "singapore@kvcglobal.com" },
      { icon: MapPin, text: "Thứ 2 – Thứ 6, 9:00 – 18:00" },
    ],
    mapUrl: "https://maps.google.com",
  },
  {
    title: "Việt Nam — Chi nhánh TP.HCM",
    image: "/images/dat-nuoc-singapore-01.jpg",
    address: "Tầng 8, Tòa nhà Bitexco, Q.1, TP. Hồ Chí Minh",
    contacts: [
      { icon: Phone, text: "+84 28 3982 4567" },
      { icon: Mail, text: "vietnam@kvcglobal.com" },
      { icon: MapPin, text: "Thứ 2 – Thứ 7, 8:30 – 17:30" },
    ],
    mapUrl: "https://maps.google.com",
  },
] as const

const LICENSES = [
  {
    icon: FileText,
    title: "Giấy phép tư vấn du học",
    text: "Cấp bởi Sở Giáo dục & Đào tạo, cho phép hoạt động tư vấn du học hợp pháp tại Việt Nam.",
    href: "#",
  },
  {
    icon: ScrollText,
    title: "Giấy phép kinh doanh Singapore",
    text: "Đăng ký hoạt động doanh nghiệp (ACRA) tại Singapore với đầy đủ tư cách pháp nhân.",
    href: "#",
  },
] as const

export function AboutPage() {
  return (
    <div className="bg-background">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative w-full overflow-hidden border-b border-border bg-white">
        <div className="absolute inset-y-0 right-0 z-0 hidden w-full lg:block lg:w-[52%]">
          <Image
            src="/images/study-abroad-hero.jpg"
            alt="Đội ngũ KVC Global làm việc tại Singapore"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-48 bg-linear-to-r from-white via-white/80 to-transparent" />
        </div>

        <Container className="relative z-10 py-8 md:py-16 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-foreground">
              Trang chủ
            </Link>
            <span className="text-muted-foreground/60">&gt;</span>
            <span className="font-semibold text-foreground" aria-current="page">
              Giới thiệu
            </span>
          </nav>

          <div className="relative mb-8 h-60 w-full overflow-hidden rounded-lg sm:h-90 md:h-105 lg:hidden">
            <Image
              src="/images/study-abroad-hero.jpg"
              alt="Đội ngũ KVC Global làm việc tại Singapore"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="max-w-full lg:max-w-[55%]">
            <span className="mb-3 inline-block rounded-full bg-brand-light px-3 py-1 text-xs font-bold tracking-[0.24em] text-secondary uppercase sm:text-sm">
              Giới thiệu về KVC Global
            </span>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]">
              Đồng hành cùng bạn
              <span className="mt-1 block">chạm tới tương lai mới</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px] md:leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#lien-he"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
              >
                Đăng ký tư vấn miễn phí
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#cau-chuyen"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-primary bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-md"
              >
                Tìm hiểu thêm
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Floating stats bar — overlaps the hero → story transition */}
          <div className="relative z-20 mt-12 w-full lg:mt-16 xl:mt-20">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border shadow-[0_24px_60px_-20px_rgba(15,27,45,0.22)] ring-1 ring-black/5 sm:grid-cols-4">
              {HERO_STATS.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-start gap-2 bg-white px-6 py-6 transition-colors duration-300 ease-out hover:bg-brand-light"
                  >
                    <Icon className="h-7 w-7 text-secondary" strokeWidth={1.5} />
                    <span className="font-heading text-2xl font-bold text-brand-blue">
                      {stat.value}
                    </span>
                    <span className="font-body text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── Story section ───────────────────── */}
      <section
        id="cau-chuyen"
        className="w-full bg-brand-light py-20 sm:py-24"
      >
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col">
            <p className="text-sm font-semibold tracking-[0.24em] text-secondary uppercase">
              Câu chuyện KVC Global
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
              Hơn một thập kỷ đồng hành
              <span className="block text-secondary">
                cùng những ước mơ vươn xa
              </span>
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-base leading-relaxed text-brand-dark/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-base leading-relaxed text-brand-dark/80">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <Link
              href="#lien-he"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-lg"
            >
              Tìm hiểu về dịch vụ
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(15,27,45,0.18)]">
            <Image
              src="/images/singapore-merlion-sunset.jpg"
              alt="Đội ngũ KVC Global tại Singapore"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </Container>
      </section>

      {/* ───────────────────── Offices section ─────────────────── */}
      <section className="w-full bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-semibold tracking-[0.24em] text-secondary uppercase">
              Văn phòng
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
              Gần bạn hơn ở mỗi điểm đến
            </h2>
            <span className="mt-4 h-1 w-12 rounded-full bg-secondary" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {OFFICES.map((office) => (
              <div
                key={office.title}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_18px_50px_-24px_rgba(15,27,45,0.22)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_70px_-24px_rgba(15,27,45,0.28)] sm:flex-row"
              >
                <div className="relative h-56 w-full shrink-0 sm:h-auto sm:w-[45%]">
                  <Image
                    src={office.image}
                    alt={office.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-heading text-xl font-bold text-secondary">
                    {office.title}
                  </h3>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-brand-dark/80">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                      strokeWidth={1.5}
                    />
                    {office.address}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {office.contacts.map((contact) => {
                      const Icon = contact.icon
                      return (
                        <li
                          key={contact.text}
                          className="flex items-center gap-3 text-sm text-brand-dark/80"
                        >
                          <Icon
                            className="h-4 w-4 shrink-0 text-secondary"
                            strokeWidth={1.5}
                          />
                          {contact.text}
                        </li>
                      )
                    })}
                  </ul>

                  <Link
                    href={office.mapUrl}
                    className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-secondary px-5 py-2.5 text-sm font-semibold text-secondary transition-all duration-300 ease-out hover:bg-secondary hover:text-white"
                  >
                    Xem bản đồ
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────── Partners (reuse) ────────────────── */}
      <SitePartners />

      {/* ───────────────────── Licenses section ────────────────── */}
      <section className="w-full bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-semibold tracking-[0.24em] text-secondary uppercase">
              Giấy phép hoạt động
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
              Hoạt động hợp pháp, minh bạch
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {LICENSES.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex flex-row items-start gap-5 rounded-xl bg-brand-light p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                    <Icon className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-heading text-lg font-bold text-brand-blue">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                    <Link
                      href={item.href}
                      className="group mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-secondary"
                    >
                      Xem chi tiết
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              )
            })}

            {/* Card 3 — framed certificates image */}
            <div className="relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
              <Image
                src="/images/free-singapore-tour-for.jpg"
                alt="Các giấy phép và chứng nhận hoạt động của KVC Global"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────── CTA ─────────────────────────── */}
      <section id="lien-he" className="w-full bg-white pb-24 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/study-abroad-hero.jpg"
              alt="Toàn cảnh thành phố Singapore"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Light overlay keeps the primary-dark heading legible */}
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-white/40" />

            <div className="relative w-full max-w-[60%] p-12 sm:p-16">
              <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-brand-blue sm:text-4xl md:text-5xl">
                Sẵn sàng bắt đầu
                <span className="block">hành trình của bạn?</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-dark/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#lien-he"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-lg"
                >
                  <Calendar className="h-4 w-4" />
                  Đặt lịch tư vấn
                </Link>
                <Link
                  href="#lien-he"
                  className="group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat với chúng tôi
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
