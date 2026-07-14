"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react"

import { cn } from "@/lib/utils"

const ACCENT = "var(--secondary)"
const NAVY = "var(--color-brand-blue)"

const CTA_IMAGE =
  "https://images.pexels.com/photos/35421791/pexels-photo-35421791.jpeg?auto=compress&w=1920&q=80"

const SERVICES_LINKS = [
  { label: "Tư vấn du học", href: "#tu-van-du-hoc" },
  { label: "Thực tập Singapore", href: "#thuc-tap-singapore" },
  { label: "Thành lập doanh nghiệp", href: "#thanh-lap-doanh-nghiep" },
  { label: "Tư vấn di trú & định cư", href: "#tu-van-di-tru" },
]

const ABOUT_LINKS = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Đội ngũ", href: "#doi-ngu" },
  { label: "Đối tác", href: "#doi-tac" },
  { label: "Giá trị cốt lõi", href: "#gia-tri-cot-loi" },
  { label: "Quy trình làm việc", href: "#quy-trinh-lam-viec" },
]

const SUPPORT_LINKS = [
  { label: "Câu hỏi thường gặp", href: "#faq" },
  { label: "Chính sách bảo mật", href: "#chinh-sach-bao-mat" },
  { label: "Điều khoản sử dụng", href: "#dieu-khoan-su-dung" },
]

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "(+84) 28 7300 6769",
    href: "tel:+842873006769",
  },
  {
    icon: Mail,
    label: "hello@kvcglobal.com",
    href: "mailto:hello@kvcglobal.com",
  },
  {
    icon: MapPin,
    label: "Tầng 6, 65 Lê Lợi, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam",
    href: "https://maps.google.com/?q=65+L%C3%AA+L%E1%BB%A3i%2C+Qu%E1%BA%ADn+1",
  },
  {
    icon: MapPin,
    label: "20 Collyer Quay, #11-05 Singapore 049319",
    href: "https://maps.google.com/?q=20+Collyer+Quay+%2311-05+Singapore+049319",
  },
]

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

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
      <h3 className="font-heading text-[15px] font-semibold tracking-[0.18em] text-foreground uppercase">
      {children}
    </h3>
  )
}

function LinkList({
  links,
  className,
}: {
  links: ReadonlyArray<{ label: string; href: string }>
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col gap-3 text-[15px]", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function CtaBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-lg",
        className
      )}
    >
      <div className="relative h-[320px] sm:h-[300px] md:h-[280px]">
        <Image
          src={CTA_IMAGE}
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover object-[center_35%]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #FCE4C4 0%, #F8DCC2 25%, rgba(248,220,194,0.55) 45%, rgba(248,220,194,0.15) 60%, rgba(248,220,194,0) 72%)",
          }}
        />

        <div className="relative mr-auto flex h-full w-full max-w-7xl items-center px-15">
          <div className="max-w-xl">
            <h2
              id="footer-cta-heading"
              className="font-heading text-2xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-3xl md:text-[34px]"
            >
              <span className="block uppercase">Sẵn sàng bắt đầu</span>
              <span className="block uppercase">hành trình của bạn?</span>
            </h2>

            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground/80 sm:text-base">
              Đội ngũ KVC Global luôn sẵn sàng lắng nghe và tư vấn lộ trình phù
              hợp nhất cho bạn và gia đình.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#dat-lich-tu-van"
                className="group inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ background: NAVY }}
              >
                <CalendarCheck className="h-4 w-4" strokeWidth={2.25} />
                Đặt lịch tư vấn ngay
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>

              <Link
                href="#chat-chuyen-vien"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/25 bg-white/90 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-white hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
                Chat với chuyên viên
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CollapsibleFooterSection({
  heading,
  className,
  children,
}: {
  heading: string
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const apply = () => setOpen(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return (
    <details
      open={open}
      onToggle={(event) =>
        setOpen((event.target as HTMLDetailsElement).open)
      }
      className={cn("group", className)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm py-2 -mx-2 px-2 transition-colors duration-200 ease-out hover:bg-foreground/[0.03] lg:cursor-default lg:pointer-events-none lg:hover:bg-transparent [&::-webkit-details-marker]:hidden">
        <ColumnHeading>{heading}</ColumnHeading>
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-foreground/70 transition-transform duration-300 ease-out group-open:rotate-180 lg:hidden"
        />
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-4 lg:mt-5">{children}</div>
        </div>
      </div>
    </details>
  )
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-white text-foreground", className)}>
      <div className="px-4 pt-12 sm:px-6 sm:pt-16">
        <CtaBanner />
      </div>

      <div className="w-full px-4 sm:px-6">
        <div className="mt-14 grid grid-cols-1 gap-10 pb-10 sm:mt-16 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
                <Link
                  href="/"
                  aria-label="KVC Global — Trang chủ"
                  className="inline-flex items-center no-underline"
                >
                  <Image
                    src="/images/KVC_LOGO_SVG/Blue%20Horizontal%20Logo_KVC.svg.svg"
                    alt="KVC Global"
                    width={200}
                    height={44}
                    className="h-9 w-auto shrink-0 sm:h-11"
                    loading="lazy"
                  />
                </Link>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-foreground/75">
              KVC Global — Đồng hành cùng bạn trên hành trình học tập, làm việc,
              kinh doanh và định cư tại Singapore và nhiều quốc gia khác.
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-primary focus-visible:-translate-y-0.5 focus-visible:text-primary focus-visible:outline-none"
                      style={{ background: "rgba(10, 37, 64, 0.08)" }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

              <CollapsibleFooterSection
                heading="Dịch vụ"
                className="lg:col-span-2"
              >
                <LinkList links={SERVICES_LINKS} />
              </CollapsibleFooterSection>

              <CollapsibleFooterSection
                heading="Về chúng tôi"
                className="lg:col-span-2"
              >
                <LinkList links={ABOUT_LINKS} />
              </CollapsibleFooterSection>

              <CollapsibleFooterSection
                heading="Hỗ trợ"
                className="lg:col-span-2"
              >
                <LinkList links={SUPPORT_LINKS} />
              </CollapsibleFooterSection>

              <CollapsibleFooterSection
                heading="Liên hệ"
                className="lg:col-span-3"
              >
                <ul className="flex flex-col gap-3 text-[15px]">
              {CONTACT_ITEMS.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={`${item.label}-${index}`} className="flex gap-3">
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2}
                      aria-hidden
                    />
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-foreground/80 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-foreground/80">{item.label}</span>
                    )}
                  </li>
                )
              })}
                </ul>
              </CollapsibleFooterSection>
            </div>

        <div
          aria-hidden="true"
          className="h-px w-full"
          style={{ background: "rgba(10, 37, 64, 0.12)" }}
        />

        <div className="flex flex-col items-start justify-between gap-2 py-6 text-[13px] text-foreground/65 sm:flex-row sm:items-center">
          <p>© 2024 KVC Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
