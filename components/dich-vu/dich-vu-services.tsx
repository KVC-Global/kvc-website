"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Globe2,
  GraduationCap,
  Headphones,
  Landmark,
  MapPin,
  Scale,
  Users,
} from "lucide-react"

import type { DichVuServiceCategories, DichVuServiceAccordion, DichVuServiceAccordionSection, DichVuSingaporeSubTab as DichVuSingaporeSubTabType } from "@/sanity/service-pages"
import { urlFor } from "@/sanity/image"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/* ─── Animation variants ─── */
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const inView = { once: true, margin: "-80px" } as const

/* ─── Data ─── */

interface ServiceItem {
  title: string
  items: string[]
}

interface AccordionSection {
  id: string
  icon: typeof MapPin
  tag: string
  heading: string
  headingAccent: string
  background: string
  intro: string[]
  services: ServiceItem[]
  audience?: { label: string; items: string[] }
  benefits?: { label: string; items: string[] }
  cta: { href: string; label: string; icon?: typeof GraduationCap }
  image: string
  imageAlt: string
  singaporeSubTabs?: DichVuSingaporeSubTabType[]
  crossLinkText?: string
}

interface SingaporeSubTab {
  id: string
  label: string
  intro: string[]
  services: ServiceItem[]
  audience?: { label: string; items: string[] }
  benefits?: { label: string; items: string[] }
  icon: typeof Building2
}

const SINGAPORE_SUB_TABS: SingaporeSubTab[] = [
  {
    id: "sg-company",
    label: "Thành lập công ty & cơ cấu doanh nghiệp",
    icon: Building2,
    intro: [
      "Singapore là trung tâm tài chính và thương mại hàng đầu châu Á với môi trường kinh doanh minh bạch, hệ thống pháp lý ổn định và chính sách hỗ trợ doanh nghiệp quốc tế. KVC Global đồng hành cùng khách hàng từ bước lập kế hoạch đến khi doanh nghiệp đi vào hoạt động.",
    ],
    services: [
      {
        title: "Dịch vụ bao gồm",
        items: [
          "Tư vấn mô hình doanh nghiệp phù hợp.",
          "Thành lập công ty tại Singapore.",
          "Cơ cấu cổ đông và vốn đầu tư.",
          "Bổ nhiệm Company Secretary theo quy định.",
          "Dịch vụ Nominee Director (nếu cần).",
          "Đăng ký địa chỉ doanh nghiệp.",
          "Hỗ trợ mở tài khoản ngân hàng doanh nghiệp.",
          "Đăng ký CorpPass và các thủ tục hành chính.",
          "Dịch vụ kế toán, thuế và tuân thủ hàng năm.",
        ],
      },
    ],
    benefits: [
      "Quy trình nhanh chóng và minh bạch.",
      "Tư vấn phù hợp với từng mô hình kinh doanh.",
      "Đồng hành từ thành lập đến vận hành lâu dài.",
    ],
  },
  {
    id: "sg-workpass",
    label: "Work pass & Visa cho chủ doanh nghiệp và nhân sự",
    icon: Users,
    intro: [
      "Bên cạnh việc thành lập doanh nghiệp, KVC Global hỗ trợ các thủ tục về giấy phép lao động và định cư, giúp doanh nghiệp dễ dàng bố trí nhân sự và phát triển hoạt động tại Singapore.",
    ],
    services: [
      {
        title: "Dịch vụ bao gồm",
        items: [
          "Employment Pass (EP).",
          "EntrePass dành cho doanh nhân.",
          "S Pass.",
          "Dependant Pass cho người thân.",
          "Long-Term Visit Pass.",
          "Gia hạn và quản lý Work Pass.",
          "Tư vấn lộ trình xin Permanent Residence (PR).",
          "Hỗ trợ hồ sơ và quy trình theo quy định của Singapore.",
        ],
      },
    ],
    audience: {
      label: "Đối tượng phù hợp",
      items: [
        "Chủ doanh nghiệp.",
        "Nhà đầu tư.",
        "Chuyên gia nước ngoài.",
        "Doanh nghiệp tuyển dụng nhân sự quốc tế.",
      ],
    },
  },
  {
    id: "sg-office",
    label: "Văn phòng, bất động sản & hỗ trợ tuyển dụng nhân sự",
    icon: Headphones,
    intro: [
      "Để doanh nghiệp nhanh chóng ổn định hoạt động sau khi thành lập, KVC Global cung cấp các dịch vụ hỗ trợ về cơ sở hạ tầng và nguồn nhân lực.",
    ],
    services: [
      {
        title: "Văn phòng doanh nghiệp",
        items: [
          "Văn phòng đại diện.",
          "Địa chỉ đăng ký doanh nghiệp.",
          "Phòng họp và không gian làm việc.",
        ],
      },
      {
        title: "Bất động sản",
        items: [
          "Thuê nhà cho chủ doanh nghiệp và chuyên gia.",
          "Tìm kiếm văn phòng thương mại.",
          "Hỗ trợ thuê mặt bằng kinh doanh.",
        ],
      },
      {
        title: "Tuyển dụng nhân sự",
        items: [
          "Kết nối ứng viên phù hợp.",
          "Tuyển dụng nhân sự địa phương và quốc tế.",
          "Tư vấn quy trình tuyển dụng.",
          "Hỗ trợ onboarding và quản trị nhân sự.",
        ],
      },
    ],
  },
]

const ACCORDION_SECTIONS: AccordionSection[] = [
  {
    id: "vietnam",
    icon: MapPin,
    tag: "Việt Nam",
    heading: "Thành lập & vận hành",
    headingAccent: "công ty tại Việt Nam",
    background: "bg-white",
    intro: [
      "Việt Nam là một trong những nền kinh tế phát triển năng động tại Đông Nam Á, thu hút ngày càng nhiều doanh nghiệp và nhà đầu tư quốc tế. KVC Global hỗ trợ khách hàng triển khai toàn bộ quy trình thành lập và vận hành doanh nghiệp theo đúng quy định pháp luật.",
    ],
    services: [
      {
        title: "Dịch vụ bao gồm",
        items: [
          "Tư vấn lựa chọn loại hình doanh nghiệp phù hợp.",
          "Thành lập công ty có vốn trong nước hoặc vốn đầu tư nước ngoài (FDI).",
          "Xin Giấy chứng nhận đăng ký đầu tư (IRC) và Giấy chứng nhận đăng ký doanh nghiệp (ERC).",
          "Đăng ký giấy phép kinh doanh và các giấy phép chuyên ngành.",
          "Đăng ký mã số thuế, hóa đơn điện tử và tài khoản ngân hàng doanh nghiệp.",
          "Tư vấn kế toán, thuế và tuân thủ pháp lý.",
          "Hỗ trợ vận hành doanh nghiệp sau thành lập.",
        ],
      },
    ],
    audience: {
      label: "Phù hợp với",
      items: [
        "Nhà đầu tư nước ngoài.",
        "Doanh nghiệp muốn mở rộng sang Việt Nam.",
        "Startup và doanh nghiệp vừa và nhỏ.",
        "Doanh nghiệp quốc tế cần hiện diện pháp lý tại Việt Nam.",
      ],
    },
    cta: { href: "/lien-he", label: "Tư vấn thành lập công ty" },
    image: "/images/dat-nuoc-singapore-01.jpg",
    imageAlt: "Thành lập công ty tại Việt Nam cùng KVC Global",
  },
  {
    id: "singapore",
    icon: Landmark,
    tag: "Singapore",
    heading: "Thành lập công ty, Work Pass &",
    headingAccent: "giải pháp doanh nghiệp toàn diện",
    background: "bg-brand-light",
    intro: [
      "Singapore là cửa ngõ chiến lược để doanh nghiệp vươn ra thị trường quốc tế. KVC Global cung cấp dịch vụ trọn gói từ thành lập công ty, xin giấy phép lao động, đến hỗ trợ văn phòng và tuyển dụng — tất cả trong một giải pháp tích hợp.",
    ],
    services: [], // Singapore uses sub-tabs
    cta: { href: "/lien-he", label: "Khám phá giải pháp Singapore" },
    image: "/images/singapore-flyer.jpg",
    imageAlt: "Dịch vụ doanh nghiệp tại Singapore",
  },
  {
    id: "cross",
    icon: Building2,
    tag: "Dịch vụ liên kết chéo",
    heading: "Tư vấn giáo dục cho",
    headingAccent: "gia đình chủ doanh nghiệp",
    background: "bg-white",
    intro: [
      "KVC Global tin rằng sự phát triển của doanh nghiệp luôn song hành với kế hoạch giáo dục của gia đình. Vì vậy, chúng tôi cung cấp dịch vụ tư vấn giáo dục quốc tế dành riêng cho con em của chủ doanh nghiệp, chuyên gia và nhà đầu tư.",
    ],
    services: [
      {
        title: "Dịch vụ bao gồm",
        items: [
          "Tư vấn trường công lập / tư thục tại Singapore và các quốc gia khác.",
          "Chương trình OSSD Canada.",
          "Chương trình dự bị đại học.",
          "Du học Anh, Canada, Úc, Singapore và nhiều quốc gia khác.",
          "Tư vấn lộ trình học từ phổ thông đến đại học.",
          "Hỗ trợ hồ sơ nhập học và visa.",
        ],
      },
    ],
    cta: {
      href: "/du-hoc",
      label: "Tìm hiểu chương trình du học",
      icon: GraduationCap,
    },
    image: "/images/student-portrait.jpg",
    imageAlt: "Tư vấn du học cho gia đình doanh nhân",
  },
]

/* ─── Helpers ─── */

function getIconComponent(iconName?: string) {
  if (!iconName) return undefined
  const icons = { Building2, Users, Headphones, GraduationCap, Landmark, MapPin, Globe2, Scale, Briefcase }
  return (icons as Record<string, React.ComponentType>)[iconName]
}

/* ─── Sub-components ─── */

/** Animated chevron that rotates when open. */
function AccordionChevron({ open }: { open: boolean }) {
  return (
    <motion.div
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue"
    >
      <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
    </motion.div>
  )
}

/** Bullet list with check icons. */
function ServiceCheckList({ services }: { services: ServiceItem[] }) {
  return (
    <div className="space-y-6">
      {services.map((group) => (
        <div key={group.title}>
          <h4 className="mb-3 font-heading text-sm font-bold tracking-wide text-brand-blue uppercase">
            {group.title}
          </h4>
          <ul className="space-y-2.5">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold"
                  strokeWidth={2.5}
                />
                <span className="text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Pill / tag list for audience or benefits. */
function TagList({
  label,
  items,
  variant = "audience",
}: {
  label: string
  items: string[]
  variant?: "audience" | "benefit"
}) {
  const isAudience = variant === "audience"
  return (
    <div className="mt-6">
      <h4
        className={cn(
          "mb-3 font-heading text-sm font-bold tracking-wide uppercase",
          isAudience ? "text-brand-blue" : "text-green-700"
        )}
      >
        {label}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={cn(
              "inline-block rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm",
              isAudience
                ? "bg-brand-blue-mid/10 text-brand-blue-mid"
                : "bg-green-50 text-green-700"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Singapore sub-tab content area. */
function SingaporeSubTabs({ cmsData }: { cmsData?: DichVuSingaporeSubTabType[] }) {
  // Build sub-tabs from CMS or use hardcoded fallback
  const subTabs: SingaporeSubTab[] =
    cmsData && cmsData.length > 0
      ? cmsData.map((t) => ({
          id: t.label?.toLowerCase().replace(/\s+/g, "-") ?? "",
          label: t.label ?? "",
          icon: getIconComponent(t.icon) ?? Building2,
          intro: t.intro ?? [],
          services: (t.services ?? []).map((s) => ({ title: s.title ?? "", items: s.items ?? [] })),
          audience: t.audience?.items?.length
            ? { label: t.audience.label ?? "", items: t.audience.items }
            : undefined,
          benefits: t.benefits?.items?.length ? { label: t.benefits.label ?? "Lợi ích", items: t.benefits.items } : undefined,
        }))
      : SINGAPORE_SUB_TABS

  const [activeTab, setActiveTab] = useState(subTabs[0]?.id ?? "")
  const current = subTabs.find((t) => t.id === activeTab)!

  return (
    <div className="mt-6">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {subTabs.map((tab) => {
          const TabIcon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm",
                isActive
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-muted/60 text-brand-dark/70 hover:bg-muted hover:text-brand-dark"
              )}
            >
              <TabIcon className="h-4 w-4" strokeWidth={1.75} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">
                {tab.label.length > 28
                  ? tab.label.slice(0, 28) + "…"
                  : tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="pt-5"
        >
          {current.intro.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-brand-dark/80 sm:text-base"
            >
              {p}
            </p>
          ))}

          <div className="mt-5">
            <ServiceCheckList services={current.services} />
          </div>

          {current.benefits && (
            <TagList
              label={current.benefits.label}
              items={current.benefits.items}
              variant="benefit"
            />
          )}

          {current.audience && (
            <TagList
              label={current.audience.label}
              items={current.audience.items}
              variant="audience"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ─── Main accordion panel ─── */

function AccordionPanel({
  section,
  open,
  onToggle,
  idx,
}: {
  section: AccordionSection
  open: boolean
  onToggle: () => void
  idx: number
}) {
  const Icon = section.icon
  const isEven = idx % 2 !== 0
  const isSingapore = section.id === "singapore"

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "overflow-hidden rounded-lg border border-border/80 bg-white shadow-xs transition-all duration-300 dark:border-border/10 dark:bg-card",
        open && "shadow-md border-brand-gold/40"
      )}
    >
      {/* ── Header (clickable toggle) ── */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-muted/30 sm:gap-5 sm:px-8 sm:py-6"
        aria-expanded={open}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand-light sm:h-14 sm:w-14">
          <Icon className="h-6 w-6 text-brand-gold" strokeWidth={2} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-gold uppercase sm:text-sm">
            {section.tag}
          </p>
          <h3 className="mt-0.5 font-heading text-lg font-extrabold tracking-tight text-brand-blue sm:text-xl md:text-2xl">
            {section.heading}{" "}
            <span className="text-brand-gold">{section.headingAccent}</span>
          </h3>
        </div>

        <AccordionChevron open={open} />
      </button>

      {/* ── Expandable content ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "grid items-start gap-8 px-5 pb-8 pt-2 sm:px-8 sm:pb-10 md:grid-cols-2",
                isEven && "md:*:last:order-first"
              )}
            >
              {/* Text column */}
              <div className="flex flex-col">
                {section.intro.map((p, i) => (
                  <p
                    key={i}
                    className={cn(
                      "text-sm leading-relaxed text-brand-dark/80 sm:text-base",
                      i > 0 && "mt-3"
                    )}
                  >
                    {p}
                  </p>
                ))}

                {/* Singapore gets sub-tabs; others get regular check-list */}
                {isSingapore ? (
                  <SingaporeSubTabs cmsData={section.singaporeSubTabs} />
                ) : (
                  <div className="mt-5">
                    <ServiceCheckList services={section.services} />
                  </div>
                )}

                {section.audience && (
                  <TagList
                    label={section.audience.label}
                    items={section.audience.items}
                    variant="audience"
                  />
                )}

                {/* Cross-link paragraph for education section */}
                {(section.crossLinkText || section.id === "cross") && (
                  <p className="mt-5 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                    {section.crossLinkText ??
                      `Thông qua mạng lưới đối tác giáo dục quốc tế, KVC Global giúp các gia đình xây dựng lộ trình học tập phù hợp với mục tiêu dài hạn của con em, tương tự mô hình kết hợp giữa tư vấn giáo dục và phát triển sự nghiệp được nhiều đơn vị quốc tế triển khai.`}
                  </p>
                )}

                {section.cta && (
                  <Link
                    href={section.cta.href}
                    className="group mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid hover:shadow-lg sm:px-7 sm:py-3.5"
                  >
                    {"icon" in section.cta && section.cta.icon && (
                      <GraduationCap className="h-4 w-4" />
                    )}
                    {section.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>

              {/* Image column */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-[0_24px_60px_-24px_rgba(15,27,45,0.18)] sm:aspect-[3/2]">
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Main export ─── */

export function DichVuServices({
  className,
  data,
  accordionData,
}: {
  className?: string
  data?: DichVuServiceCategories
  accordionData?: DichVuServiceAccordion
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const cmsCategories = data?.categories
  const sectionEyebrow = data?.eyebrow ?? "DỊCH VỤ CỦA CHÚNG TÔI"
  const sectionTitle = data?.title ?? "Giải pháp theo từng thị trường"

  // Build CMS accordion sections when available
  const hardcodedSectionMap = new Map(ACCORDION_SECTIONS.map((s) => [s.tag, s]))
  const cmsAccordionSections: AccordionSection[] | null =
    accordionData?.sections && accordionData.sections.length > 0
      ? accordionData.sections.map((sec, idx) => {
          const isSingapore = sec.tag === "Singapore"
          const fallback = hardcodedSectionMap.get(sec.tag ?? "")
          return {
            id: sec.tag?.toLowerCase().replace(/\s+/g, "-") ?? `section-${idx}`,
            icon: isSingapore ? Landmark : sec.tag === "Việt Nam" ? MapPin : Building2,
            tag: sec.tag ?? "",
            heading: sec.heading ?? "",
            headingAccent: sec.headingAccent ?? "",
            background: idx % 2 === 0 ? "bg-white" : "bg-brand-light",
            intro: sec.intro ?? [],
            services: (sec.services ?? []).map((s) => ({
              title: s.title ?? "",
              items: s.items ?? [],
            })),
            audience: sec.audience?.items?.length
              ? { label: sec.audience.label ?? "", items: sec.audience.items }
              : undefined,
            benefits: sec.benefits?.items?.length ? { label: sec.benefits.label ?? "Lợi ích", items: sec.benefits.items } : undefined,
            cta: {
              href: sec.ctaHref ?? "#",
              label: sec.ctaLabel ?? "",
              ...(sec.ctaIcon ? { icon: getIconComponent(sec.ctaIcon) } : {}),
            },
            image: sec.image ? urlFor(sec.image).url() : (fallback?.image ?? ""),
            imageAlt: sec.imageAlt || (fallback?.imageAlt ?? ""),
            ...(isSingapore ? { singaporeSubTabs: sec.singaporeSubTabs ?? [] } : {}),
            ...(sec.crossLinkText ? { crossLinkText: sec.crossLinkText } : {}),
          }
        })
      : null

  const displayAccordionSections = cmsAccordionSections ?? ACCORDION_SECTIONS

  return (
    <>
      {/* ─── Section header ─── */}
      <section className={cn("w-full bg-white pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 dark:bg-background", className)}>
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-3 block text-center font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              {sectionEyebrow}
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl dark:text-foreground">
              {sectionTitle}
            </h2>
            <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
          </motion.div>
        </Container>
      </section>

      {/* ─── CMS Category Cards (when available) ─── */}
      {cmsCategories && cmsCategories.length > 0 && (
        <section className="w-full bg-white pb-10 sm:pb-16 dark:bg-background">
          <Container>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cmsCategories.map((cat) => (
                <motion.div
                  key={cat._key ?? cat.title}
                  variants={fadeUp}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-lg dark:border-border/10 dark:bg-card"
                >
                  {/* Image */}
                  {cat.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={urlFor(cat.image).width(600).height(375).url()}
                        alt={cat.imageAlt ?? cat.title ?? "Service category"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {cat.icon && (() => {
                      const IconComp = getIconComponent(cat.icon)
                      return IconComp ? (
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-mid/10">
                          <IconComp className="h-5 w-5 text-brand-gold" strokeWidth={1.75} />
                        </div>
                      ) : null
                    })()}
                    <h3 className="font-heading text-lg font-bold tracking-tight text-brand-blue dark:text-foreground">
                      {cat.title}
                    </h3>
                    {cat.description && (
                      <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-muted-foreground">
                        {cat.description}
                      </p>
                    )}

                    {/* Spacer pushes link to bottom */}
                    <div className="mt-4 flex-1" />

                    {cat.href && (
                      <Link
                        href={cat.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold transition-colors hover:text-brand-blue"
                      >
                        Tìm hiểu thêm
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      {/* ─── Accordion cards (detailed breakdown) ─── */}
      <section className={cn("w-full bg-white pb-20 sm:pb-24 md:pb-28 dark:bg-background", cmsCategories && cmsCategories.length > 0 && "pt-0")}>
        <Container>
          {cmsCategories && cmsCategories.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              className="mb-10 flex flex-col items-center text-center"
            >
              <span className="mb-2 block font-heading text-xs font-bold tracking-wider text-brand-blue/60 uppercase">
                {accordionData?.eyebrow ?? "CHI TIẾT DỊCH VỤ"}
              </span>
              <span aria-hidden="true" className="mx-auto block h-[2px] w-12 rounded-full bg-brand-gold/40" />
            </motion.div>
          )}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="mx-auto flex max-w-5xl flex-col gap-5 sm:gap-6"
          >
            {displayAccordionSections.map((section, idx) => (
              <AccordionPanel
                key={section.id}
                section={section}
                open={openId === section.id}
                onToggle={() => toggle(section.id)}
                idx={idx}
              />
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
