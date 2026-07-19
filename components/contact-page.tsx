import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/ui/container"

/* ───────────────── Office data ───────────────── */
const OFFICES = [
  {
    country: "Việt Nam",
    role: "Chi nhánh Việt Nam",
    address:
      "456 Xô Viết Nghệ Tĩnh, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh",
    phone: "(+84) 1900 8888",
    email: "info@kvcglobal.vn",
    hours: "Thứ 2 – Thứ 7, 8:30 – 17:30",
    mapUrl:
      "https://maps.google.com/?q=456+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh",
    mapQ: "456+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh",
    image: "/images/dat-nuoc-singapore-01.jpg",
  },
  {
    country: "Singapore",
    role: "Văn phòng Singapore",
    address: "Chinatown Point, 133 New Bridge Rd #22-01/02, Singapore 059413",
    phone: "(+65) 6789 0000",
    email: "info@kvcglobal.vn",
    hours: "Thứ 2 – Thứ 6, 9:00 – 18:00",
    mapUrl:
      "https://maps.google.com/?q=Chinatown+Point,+133+New+Bridge+Rd,+Singapore+059413",
    mapQ: "Chinatown+Point,+133+New+Bridge+Rd,+Singapore+059413",
    image: "/images/singapore1-5221.jpg",
  },
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
  index,
}: {
  office: (typeof OFFICES)[number]
  index: number
}) {
  const isReversed = index % 2 !== 0

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5 lg:flex-row ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image side */}
      <div className="relative h-64 w-full shrink-0 lg:h-auto lg:w-2/5">
        <Image
          src={office.image}
          alt={`Văn phòng KVC Global tại ${office.country}`}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
        />
        <div className="absolute bottom-4 left-4">
          <span className="inline-block rounded-sm bg-brand-gold px-3 py-1 font-heading text-xs font-bold text-white">
            {office.country}
          </span>
        </div>
      </div>

      {/* Details + map side */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-heading text-lg font-bold text-brand-blue">
          {office.role}
        </h3>
        <ul className="mt-5 space-y-3">
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
            <span className="font-body text-sm text-brand-dark/80">
              {office.phone}
            </span>
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

        {/* Map embed */}
        <div className="mt-6 overflow-hidden rounded-sm">
          <iframe
            src={`https://www.google.com/maps?q=${office.mapQ}&output=embed&z=15`}
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Bản đồ ${office.role}`}
            className="rounded-sm"
          />
        </div>

        <a
          href={office.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-gold"
        >
          Xem trên Google Maps
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}

/* ───────────────── Main page component ───────────────── */
export function ContactPage() {
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
                Hãy kết nối với chúng tôi
              </h2>
              <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                Đội ngũ KVC Global luôn sẵn sàng lắng nghe và tư vấn giải pháp
                phù hợp nhất cho hành trình Singapore của bạn.
              </p>

              <div className="mt-10 space-y-6">
                {OFFICES.map((office) => (
                  <OfficeInfoCard key={office.country} office={office} />
                ))}
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
              {OFFICES.map((office, i) => (
                <OfficeCard key={office.country} office={office} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
