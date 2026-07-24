"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  FileText,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react"
import { motion, Variants } from "framer-motion"

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
  // TODO:: hide for production
  // {
  //   title: "Singapore — Trụ sở chính",
  //   image: "/images/singapore1-5221.jpg",
  //   address: "1 Raffles Place, #20-61, Singapore 048616",
  //   contacts: [
  //     { icon: Phone, text: "+65 6123 4567" },
  //     { icon: Mail, text: "singapore@kvcglobal.com" },
  //     { icon: MapPin, text: "Thứ 2 – Thứ 6, 9:00 – 18:00" },
  //   ],
  //   mapUrl: "https://maps.google.com",
  // },
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

// ─── Motion variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const inView = { once: true, margin: "-80px" } as const

export function AboutPage() {
  const hasSingleOffice = OFFICES.length === 1

  return (
    <div className="bg-background">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative w-full border-b border-border bg-white"
      >
        {/* Desktop Background Image (Right side) */}
        <div className="absolute inset-y-0 right-0 z-0 hidden w-full overflow-hidden lg:block lg:w-[52%]">
          <Image
            src="/images/study-abroad-hero.jpg"
            alt="Đội ngũ KVC Global làm việc tại Singapore"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
          {/* Soft blend transition from white background (left) to image */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent"
          />
        </div>

        {/* Main Content Container */}
        <Container className="relative z-10 pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm"
          >
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Trang chủ
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span
              className="font-semibold text-foreground/80"
              aria-current="page"
            >
              Giới thiệu
            </span>
          </nav>

          {/* Mobile/Tablet Image Display (Shown only on small/medium screens) */}
          <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-lg sm:h-[280px] md:h-[340px] lg:hidden">
            <Image
              src="/images/study-abroad-hero.jpg"
              alt="Đội ngũ KVC Global làm việc tại Singapore"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Content Box */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-full lg:max-w-[55%]"
          >
            {/* Subtitle / Tag */}
            <motion.span
              variants={fadeUp}
              className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
            >
              Giới thiệu về KVC Global
            </motion.span>

            {/* Main Title */}
            <motion.h1
              variants={fadeUp}
              id="about-hero-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
            >
              Đồng hành cùng bạn
              <span className="mt-1 block">chạm tới tương lai mới</span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px] md:leading-relaxed"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </motion.p>

            {/* Call to Actions (CTAs) */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="#lien-he"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid"
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
                href="#cau-chuyen"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Tìm hiểu thêm
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
            </motion.div>
          </motion.div>
        </Container>

        {/* Stats Grid — centered on the hero → story boundary, straddling both.
            Outer wrapper owns the straddle positioning (translate-y-1/2);
            inner motion wrapper owns the entrance animation so framer-motion's
            transform never overrides the straddle. */}
        <div className="relative z-20 lg:absolute lg:right-0 lg:bottom-0 lg:left-0 lg:translate-y-1/2">
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            <Container>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-16px_rgba(15,27,45,0.25),0_8px_16px_-8px_rgba(15,27,45,0.12)] ring-1 ring-black/5 sm:rounded-3xl">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {HERO_STATS.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        variants={fadeUp}
                        className="relative flex items-center justify-center gap-3 bg-white px-4 py-5 text-left transition-colors duration-300 ease-out sm:gap-4 sm:px-6 sm:py-6 md:min-h-[150px] md:py-7"
                      >
                        <Icon
                          className="h-10 w-10 shrink-0 text-brand-gold-light sm:h-11 sm:w-11"
                          strokeWidth={1.75}
                        />
                        <div className="flex min-w-0 flex-col md:gap-1.5">
                          <div className="font-display text-xl font-bold text-primary sm:text-3xl">
                            {stat.value}
                          </div>
                          <div className="truncate font-sans text-sm font-semibold tracking-[0.12em] text-foreground/70 uppercase sm:text-xs">
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden md:block"
                >
                  {[25, 50, 75].map((left) => (
                    <span
                      key={left}
                      className="absolute"
                      style={{
                        backgroundColor: "#c8913c",
                        height: 48,
                        left: `${left}%`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 2,
                      }}
                    />
                  ))}
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 md:hidden"
                >
                  <span
                    className="absolute"
                    style={{
                      backgroundColor: "#d6b46d",
                      height: 40,
                      left: "50%",
                      top: "25%",
                      transform: "translate(-50%, -50%)",
                      width: 1,
                    }}
                  />
                  <span
                    className="absolute"
                    style={{
                      backgroundColor: "#d6b46d",
                      height: 40,
                      left: "50%",
                      top: "75%",
                      transform: "translate(-50%, -50%)",
                      width: 1,
                    }}
                  />
                  <span
                    className="absolute"
                    style={{
                      backgroundColor: "#d6b46d",
                      height: 1,
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 40,
                    }}
                  />
                </div>
              </div>
            </Container>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────── Story section ───────────────────── */}
      <section
        id="cau-chuyen"
        className="w-full bg-brand-light pt-20 pb-20 sm:pt-24 sm:pb-24 md:pt-28"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <Container className="grid items-center gap-12 md:grid-cols-2">
            <motion.div variants={fadeUp} className="flex flex-col">
              <p className="text-sm font-semibold tracking-[0.24em] text-brand-gold uppercase">
                Câu chuyện KVC Global
              </p>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
                Hơn một thập kỷ đồng hành
                <span className="block text-brand-gold">
                  cùng những ước mơ vươn xa
                </span>
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-base leading-relaxed text-brand-dark/80">
                  KVC Global được thành lập nhằm cung cấp giải pháp tư vấn
                  chuyên nghiệp cho các cá nhân và tổ chức có nhu cầu học tập,
                  làm việc hoặc đầu tư tại Singapore. Chúng tôi tập trung vào
                  việc đảm bảo mỗi hồ sơ được thực hiện đúng quy trình, đúng quy
                  định pháp lý, hạn chế tối đa rủi ro phát sinh trong quá trình
                  xử lý.
                </p>
                <p className="text-base leading-relaxed text-brand-dark/80">
                  Qua quá trình hoạt động, KVC Global đã phát triển năng lực tư
                  vấn trên cả hai lĩnh vực trọng tâm — giáo dục và doanh nghiệp
                  — với đội ngũ am hiểu hệ thống giáo dục Singapore cũng như các
                  quy định của ACRA, MOM và ICA. Mỗi dịch vụ được triển khai dựa
                  trên quy trình rà soát và kiểm tra rõ ràng, nhằm đảm bảo kết
                  quả nhất quán cho khách hàng.
                </p>
              </div>
              <Link
                href="#lien-he"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-brand-blue-mid px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg"
              >
                Tìm hiểu về dịch vụ
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative aspect-[3/2] w-full overflow-hidden rounded-lg shadow-[0_24px_60px_-24px_rgba(15,27,45,0.18)]"
            >
              <Image
                src="/images/singapore-merlion-sunset.jpg"
                alt="Đội ngũ KVC Global tại Singapore"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
          </Container>
        </motion.div>
      </section>

      {/* ───────────────────── Offices section ─────────────────── */}
      <section className="w-full bg-white py-20 sm:py-24">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="flex flex-col items-center text-center"
          >
            <p className="text-sm font-semibold tracking-[0.24em] text-brand-gold uppercase">
              Văn phòng
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
              Gần bạn hơn ở mỗi điểm đến
            </h2>
            <span className="mt-4 h-1 w-12 rounded-sm bg-brand-gold" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className={`mt-14 grid gap-8 ${hasSingleOffice ? "mx-auto max-w-5xl" : "lg:grid-cols-2"}`}
          >
            {OFFICES.map((office) => (
              <motion.div
                key={office.title}
                variants={fadeUp}
                className={`flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_18px_50px_-24px_rgba(15,27,45,0.22)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_70px_-24px_rgba(15,27,45,0.28)] lg:flex-row ${hasSingleOffice ? "lg:min-h-[420px]" : ""}`}
              >
                <div
                  className={`relative h-64 w-full shrink-0 sm:h-72 lg:h-auto ${hasSingleOffice ? "lg:w-[52%]" : "lg:w-[45%]"}`}
                >
                  <Image
                    src={office.image}
                    alt={office.title}
                    fill
                    sizes={
                      hasSingleOffice
                        ? "(max-width: 1024px) 100vw, 520px"
                        : "(max-width: 640px) 100vw, 45vw"
                    }
                    className="object-cover"
                  />
                </div>
                <div
                  className={`flex flex-1 flex-col justify-center p-8 ${hasSingleOffice ? "sm:p-10 lg:p-12" : ""}`}
                >
                  <h3
                    className={`font-heading font-bold text-brand-gold ${hasSingleOffice ? "text-2xl" : "text-xl"}`}
                  >
                    {office.title}
                  </h3>
                  <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
                      strokeWidth={1.5}
                    />
                    {office.address}
                  </p>

                  <ul className="mt-6 space-y-3.5">
                    {office.contacts.map((contact) => {
                      const Icon = contact.icon
                      return (
                        <li
                          key={contact.text}
                          className="flex items-center gap-3 text-sm text-brand-dark/80 sm:text-base"
                        >
                          <Icon
                            className="h-5 w-5 shrink-0 text-brand-gold"
                            strokeWidth={1.5}
                          />
                          {contact.text}
                        </li>
                      )
                    })}
                  </ul>

                  <Link
                    href={office.mapUrl}
                    className="group mt-8 inline-flex w-fit items-center gap-2 rounded-sm border border-brand-blue-mid px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 ease-out hover:bg-brand-blue-mid hover:text-white"
                  >
                    Xem bản đồ
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ───────────────────── Partners (reuse) ────────────────── */}
      <SitePartners />

      {/* ───────────────────── Licenses section ────────────────── */}
      <section className="w-full bg-white py-20 sm:py-24">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="flex flex-col items-center text-center"
          >
            <p className="text-sm font-semibold tracking-[0.24em] text-brand-gold uppercase">
              Giấy phép hoạt động
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
              Hoạt động hợp pháp, minh bạch
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {LICENSES.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex flex-col items-start gap-5 rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-brand-blue-mid">
                    <Icon
                      className="h-9 w-9 text-secondary"
                      strokeWidth={1.5}
                    />
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
                      className="group mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      Xem chi tiết
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}

            {/* Card 3 — framed certificates image (expands full only when alone in a row) */}
            <motion.div
              variants={fadeUp}
              className="relative min-h-[260px] overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 sm:col-span-2 sm:min-h-[340px] lg:col-span-1 lg:min-h-[300px]"
            >
              <Image
                src="/images/free-singapore-tour-for.jpg"
                alt="Các giấy phép và chứng nhận hoạt động của KVC Global"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
