"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  ChevronRight,
  Clock,
  Eye,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
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
  {
    country: "Việt Nam",
    role: "Chi nhánh Việt Nam",
    address:
      "456 Xô Viết Nghệ Tĩnh, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh",
    phone: "(+84) 911942409",
    email: "info@kvcglobal.vn",
    hours: "Thứ 2 - Thứ 6, 08:00-17:00",
    mapUrl:
      "https://maps.google.com/?q=456+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh",
    mapQ: "456+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh",
    image: "/images/dat-nuoc-singapore-01.jpg",
  },
  // TODO: Hide Singapore data for production
  // {
  //   country: "Singapore",
  //   role: "Văn phòng Singapore",
  //   address: "Chinatown Point, 133 New Bridge Rd #22-01/02, Singapore 059413",
  //   phone: "(+65) 6789 0000",
  //   email: "info@kvcglobal.vn",
  //   hours: "Thứ 2 – Thứ 6, 9:00 – 18:00",
  //   mapUrl:
  //     "https://maps.google.com/?q=Chinatown+Point,+133+New+Bridge+Rd,+Singapore+059413",
  //   mapQ: "Chinatown+Point,+133+New+Bridge+Rd,+Singapore+059413",
  //   image: "/images/singapore1-5221.jpg",
  // },
] as const

function OfficeCard({
  office,
  reverse,
}: {
  office: (typeof OFFICES)[number]
  reverse: boolean
}) {
  const phoneHref = office.phone.replace(/[^\d+]/g, "")
  const detailsPosition = reverse ? "lg:col-start-8" : "lg:col-start-1"
  const imagePosition = reverse ? "lg:col-start-1" : "lg:col-start-6"

  return (
    <article className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_240px] lg:gap-5">
      <div
        className={`rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 ${detailsPosition}`}
      >
        <p className="font-heading text-xs font-bold tracking-[0.18em] text-brand-gold uppercase">
          {office.country}
        </p>
        <h3 className="mt-2 font-heading text-xl font-bold text-brand-blue sm:text-2xl">
          {office.role}
        </h3>
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-brand-dark/65">
          Kết nối trực tiếp với đội ngũ KVC Global để được hỗ trợ tại văn phòng
          gần bạn.
        </p>

        <ul className="mt-6 space-y-4">
          <li className="flex items-start gap-3">
            <MapPin
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
              strokeWidth={1.5}
            />
            <span className="font-body text-sm text-brand-dark/80">
              {office.address}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone
              className="h-5 w-5 shrink-0 text-brand-gold"
              strokeWidth={1.5}
            />
            <a
              href={`tel:${phoneHref}`}
              className="font-body text-sm text-brand-blue underline underline-offset-2 transition-colors hover:text-brand-gold"
            >
              {office.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail
              className="h-5 w-5 shrink-0 text-brand-gold"
              strokeWidth={1.5}
            />
            <a
              href={`mailto:${office.email}`}
              className="font-body text-sm text-brand-blue underline underline-offset-2 transition-colors hover:text-brand-gold"
            >
              {office.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Clock
              className="h-5 w-5 shrink-0 text-brand-gold"
              strokeWidth={1.5}
            />
            <span className="font-body text-sm text-brand-dark/80">
              {office.hours}
            </span>
          </li>
        </ul>
      </div>

      <div
        className={`relative min-h-60 overflow-hidden rounded-lg border border-border bg-white shadow-sm lg:col-span-5 lg:row-start-2 ${detailsPosition}`}
      >
        <iframe
          src={`https://www.google.com/maps?q=${office.mapQ}&output=embed&z=15`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Bản đồ ${office.role}`}
          className="absolute inset-0 h-full w-full"
        />
        <a
          href={office.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-sm bg-white px-4 py-2.5 text-xs font-semibold text-brand-blue shadow-md ring-1 ring-black/5 transition-colors hover:text-brand-gold"
        >
          Mở Google Maps
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div
        className={`relative min-h-80 overflow-hidden rounded-lg bg-brand-blue shadow-sm lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:min-h-[560px] ${imagePosition}`}
      >
        <Image
          src={office.image}
          alt={`Văn phòng KVC Global tại ${office.country}`}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-blue/55 via-transparent to-transparent"
        />
        <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
          <p className="font-heading text-sm font-semibold text-white">
            KVC Global · {office.country}
          </p>
          <span className="rounded-sm bg-brand-gold px-3 py-1.5 font-heading text-xs font-bold text-white">
            {office.country}
          </span>
        </div>
      </div>
    </article>
  )
}

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

      {/* ───────────────────── About / Vision / Mission ───────── */}
      <section
        id="gioi-thieu"
        aria-labelledby="gioi-thieu-heading"
        className="w-full bg-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
      >
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="grid items-stretch gap-10 lg:grid-cols-[0.86fr_1fr] lg:gap-16"
          >
            <div className="order-2 flex flex-col justify-center">
              <motion.div variants={fadeUp}>
                <h2
                  id="gioi-thieu-heading"
                  className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl"
                >
                  Về KVC Global
                </h2>
                <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-brand-dark/70 sm:text-[17px]">
                  KVC Global đồng hành cùng cá nhân và doanh nghiệp trên hành
                  trình học tập, làm việc và đầu tư tại Singapore. Chúng tôi
                  cung cấp tư vấn rõ ràng, chuyên nghiệp và minh bạch, giúp
                  khách hàng tự tin đưa ra quyết định phù hợp với mục tiêu của
                  mình.
                </p>
              </motion.div>

              <div className="mt-10 space-y-5 sm:mt-12">
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-[48px_1fr] gap-4 rounded-lg border border-border bg-brand-light/50 p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-blue-mid text-brand-gold-light">
                    <Eye
                      aria-hidden="true"
                      className="h-6 w-6"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-blue">
                      Tầm nhìn
                    </h3>
                    <p className="mt-2 font-body text-base leading-relaxed text-brand-dark/80">
                      Trở thành đơn vị tư vấn đáng tin cậy, giúp khách hàng
                      thuận lợi tiếp cận cơ hội học tập, nghề nghiệp và phát
                      triển tại Singapore.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-[48px_1fr] gap-4 rounded-lg border border-border bg-brand-light/50 p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-blue-mid text-brand-gold-light">
                    <Target
                      aria-hidden="true"
                      className="h-6 w-6"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-blue">
                      Sứ mệnh
                    </h3>
                    <p className="mt-2 font-body text-base leading-relaxed text-brand-dark/80">
                      Cung cấp giải pháp tư vấn đúng quy trình, đúng quy định,
                      đồng thời tối giản sự phức tạp để mỗi hồ sơ được xử lý
                      minh bạch và nhất quán.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={fadeUp}
              className="relative order-1 min-h-[420px] overflow-hidden rounded-2xl bg-brand-blue sm:min-h-[540px] lg:min-h-[680px]"
            >
              <Image
                src="/images/singapore1-5221.jpg"
                alt="Tượng Merlion tại Singapore"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ───────────────────── Story section ───────────────────── */}
      <section
        id="cau-chuyen"
        className="w-full bg-white py-10 sm:py-12 lg:py-16"
      >
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-brand-light px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
            >
              <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
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
                      chuyên nghiệp cho các cá nhân và tổ chức có nhu cầu học
                      tập, làm việc hoặc đầu tư tại Singapore. Chúng tôi tập
                      trung vào việc đảm bảo mỗi hồ sơ được thực hiện đúng quy
                      trình, đúng quy định pháp lý, hạn chế tối đa rủi ro phát
                      sinh trong quá trình xử lý.
                    </p>
                    <p className="text-base leading-relaxed text-brand-dark/80">
                      Qua quá trình hoạt động, KVC Global đã phát triển năng lực
                      tư vấn trên cả hai lĩnh vực trọng tâm — giáo dục và doanh
                      nghiệp — với đội ngũ am hiểu hệ thống giáo dục Singapore
                      cũng như các quy định của ACRA, MOM và ICA. Mỗi dịch vụ
                      được triển khai dựa trên quy trình rà soát và kiểm tra rõ
                      ràng, nhằm đảm bảo kết quả nhất quán cho khách hàng.
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
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── Offices section ─────────────────── */}
      <section
        aria-labelledby="about-offices-heading"
        className="w-full bg-white py-10 sm:py-12 lg:py-16"
      >
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
            <h2
              id="about-offices-heading"
              className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl"
            >
              Gần bạn hơn ở mỗi điểm đến
            </h2>
            <span
              aria-hidden="true"
              className="mt-4 h-1 w-12 rounded-sm bg-brand-gold"
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="mt-12 space-y-8 lg:mt-14"
          >
            {OFFICES.map((office, index) => (
              <motion.div key={office.country} variants={fadeUp}>
                <OfficeCard office={office} reverse={index % 2 !== 0} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ───────────────────── Partners (reuse) ────────────────── */}
      <SitePartners className="bg-brand-light" />
    </div>
  )
}
