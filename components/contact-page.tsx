"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/ui/container"
import { useLocale, useDictionary } from "@/lib/i18n-client"

type SocialIconProps = {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}
type SocialLink = {
  label: string
  href: string
  icon: (props: SocialIconProps) => React.ReactElement
}

const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    label: "Facebook",
    href: "https://facebook.com/kvcglobal",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.8 8.43-4.94 8.43-9.94Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/kvcglobal",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@kvcglobal",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.49 3.5 12 3.5 12 3.5s-7.49 0-9.37.56A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.13 2.14C4.51 20.5 12 20.5 12 20.5s7.49 0 9.37-.56a3.02 3.02 0 0 0 2.13-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/kvcglobal",
    icon: ({ className, "aria-hidden": ariaHidden }: SocialIconProps) => (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden={ariaHidden}
        fill="currentColor"
      >
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    ),
  },
]

/* ───────────────── Office data ───────────────── */
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

/* ───────────────── Contact info card ───────────────── */
function OfficeInfoCard({ office }: { office: (typeof OFFICES)[number] }) {
  return (
    <div className="rounded-lg border border-border bg-brand-light/50 p-6 transition-all duration-300 hover:shadow-sm">
      <h3 className="font-heading text-base font-bold text-brand-blue">
        {office.role}
      </h3>
      <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold"
            strokeWidth={1.5}
          />
          <span className="font-body text-sm text-brand-dark/80">
            {office.address}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Phone
            className="h-4 w-4 shrink-0 text-brand-gold"
            strokeWidth={1.5}
          />
          <a
            href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
            className="font-body text-sm text-brand-blue underline underline-offset-2 transition-colors hover:text-brand-gold"
          >
            {office.phone}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail
            className="h-4 w-4 shrink-0 text-brand-gold"
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
            className="h-4 w-4 shrink-0 text-brand-gold"
            strokeWidth={1.5}
          />
          <span className="font-body text-sm text-brand-dark/80">
            {office.hours}
          </span>
        </li>
      </ul>
    </div>
  )
}

/* ───────────────── Office card for section 2 ───────────────── */
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
      {/* Details card */}
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

      {/* Map card */}
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

      {/* Image card */}
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

/* ───────────────── Main page component ───────────────── */
export function ContactPage() {
  const locale = useLocale()
  const t = useDictionary()
  return (
    <div>
      {/* ═══════════ Hero banner ═══════════ */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative w-full overflow-hidden bg-white"
      >
        <Image
          src="/du-lich-singapore-3-ngay-2-dem-cover.webp"
          alt="Toàn cảnh Singapore, nơi KVC Global đồng hành cùng khách hàng"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ transform: "scaleX(-1)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#fff_0%,#fff_30%,rgba(255,255,255,0.92)_42%,transparent_68%)]"
        />

        <Container className="relative flex min-h-[560px] flex-col justify-center pt-28 pb-20 sm:min-h-[600px] sm:pb-24 md:min-h-[640px]">
          <div className="max-w-2xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex items-center gap-1.5 text-sm font-medium text-brand-dark/65"
            >
              <Link
                href="/"
                className="transition-colors duration-200 hover:text-brand-blue"
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
              <span
                className="font-semibold text-brand-blue"
                aria-current="page"
              >
                Liên hệ
              </span>
            </nav>

            <h1
              id="contact-hero-heading"
              className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
            >
              <span className="block text-brand-blue">KẾT NỐI CÙNG</span>
              <span className="block text-brand-gold">KVC GLOBAL.</span>
            </h1>
            <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
              Chia sẻ mục tiêu của bạn. Đội ngũ KVC Global sẽ tư vấn lộ trình
              Singapore rõ ràng, phù hợp và minh bạch.
            </p>
            <a
              href="#gui-yeu-cau"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid/90 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Gửi yêu cầu tư vấn
              <ChevronRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </Container>
      </section>

      {/* ═══════════ Section 1: Contact Info + Form ═══════════ */}
      <section
        id="gui-yeu-cau"
        aria-labelledby="contact-form-heading"
        className="w-full bg-white"
      >
        <Container className="py-16 sm:py-20 lg:py-24">
          {/* Grid: contact info (left) + form (right) */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ── Left column: contact info ── */}
            <div className="lg:col-span-5">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
                {t.contact.getInTouch}
              </h2>
              <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                {t.contact.description}
              </p>

              {/* Contact Details */}
              <div className="mt-8 space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
                    strokeWidth={1.5}
                  />
                  <a
                    href="tel:+84911942409"
                    className="font-body text-sm text-brand-dark/80 transition-colors hover:text-brand-gold"
                  >
                    (+84) 911942409
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
                    strokeWidth={1.5}
                  />
                  <a
                    href="mailto:info@kvcglobal.vn"
                    className="font-body text-sm text-brand-dark/80 transition-colors hover:text-brand-gold"
                  >
                    info@kvcglobal.vn
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
                    strokeWidth={1.5}
                  />
                  <span className="font-body text-sm text-brand-dark/80">
                    {t.footer.addressVN}
                  </span>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8">
                <h3 className="font-heading text-sm font-bold tracking-wide text-brand-dark uppercase">
                  {t.contact.officeHours}:
                </h3>
                <div className="mt-3 space-y-1">
                  <p className="font-body text-sm text-brand-dark/80">
                    {locale === "vi"
                      ? "Thứ 2 - Thứ 6, 8:00 - 17:00"
                      : "Monday - Friday, 8:00 AM - 5:00 PM"}
                  </p>
                  <p className="font-body text-sm text-brand-dark/80">
                    {locale === "vi"
                      ? "Thứ 7 - Chủ nhật: Đóng cửa"
                      : "Saturday - Sunday: Closed"}
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-heading text-sm font-bold text-brand-dark">
                  {t.contact.connectWithUs}:
                </h3>
                <p className="mt-2 font-body text-sm text-brand-dark/70">
                  {t.contact.socialDescription}
                </p>
                <ul className="mt-4 flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon
                    return (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-mid text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand-gold/90 focus-visible:-translate-y-0.5 focus-visible:outline-none"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* ── Right column: inquiry form ── */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8 md:p-10">
                <h2
                  id="contact-form-heading"
                  className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
                >
                  Gửi yêu cầu tư vấn
                </h2>
                <p className="mt-2 font-body text-sm text-brand-dark/70">
                  Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong thời
                  gian sớm nhất.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════ Section 2: Offices + Maps ═══════════ */}
      <section
        aria-labelledby="offices-heading"
        className="w-full bg-white py-10 sm:py-12 lg:py-16"
      >
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="flex flex-col items-center text-center">
              <p className="text-sm font-semibold tracking-[0.24em] text-brand-gold uppercase">
                Văn phòng
              </p>
              <h2
                id="offices-heading"
                className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl"
              >
                Gần bạn hơn ở mỗi điểm đến
              </h2>
              <span
                aria-hidden="true"
                className="mt-4 h-1 w-12 rounded-sm bg-brand-gold"
              />
            </div>

            <div className="mt-12 space-y-8 lg:mt-14">
              {OFFICES.map((office, index) => (
                <OfficeCard
                  key={office.country}
                  office={office}
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
