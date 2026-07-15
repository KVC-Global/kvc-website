"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, GraduationCap } from "lucide-react"

import { cn } from "@/lib/utils"

type Program = {
  title: string
  href: string
  tag?: string
  description?: string
}

type Category = {
  id: string
  label: string
  description: string
  image?: string
  programs: Program[]
}

const CATEGORIES: Category[] = [
  {
    id: "ossd",
    label: "OSSD Ontario",
    description:
      "Tốt nghiệp Trung học Ontario, bằng cấp được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
    image: "/images/study-abroad-hero.jpg",
    programs: [
      {
        title: "OSSD Ontario Secondary School Diploma",
        href: "/du-hoc/osd-ontario",
        tag: "Highlight",
        description:
          "Chương trình trung học Ontario chuẩn quốc tế, được hơn 1.500 trường đại học toàn cầu công nhận. Phù hợp cho học sinh muốn du học Canada, Mỹ, Úc và châu Âu.",
      },
    ],
  },
  {
    id: "othm",
    label: "OTHM",
    description:
      "Chương trình quản trị kinh doanh & logistics cấp độ quốc tế được công nhận tại Anh.",
    programs: [
      {
        title: "Level 3 Business Management",
        href: "/du-hoc/othm-level-3-business-management",
        description: "Nền tảng kinh doanh cơ bản, tương đương A-Level.",
      },
      {
        title: "Level 4 Business Management",
        href: "/du-hoc/othm-level-4-business-management",
        description: "Kiến thức quản trị năm nhất đại học.",
      },
      {
        title: "Level 5 Business Management",
        href: "/du-hoc/othm-level-5-business-management",
        description: "Chuyên sâu quản trị doanh nghiệp và chiến lược.",
      },
      {
        title: "Level 6 Extended Business Management",
        href: "/du-hoc/othm-level-6-extended-business-management",
        description: "Tương đương bằng cử nhân, chuẩn bị cho thạc sĩ.",
      },
      {
        title: "Level 6 Extended Logistics, Supply Chain & Management",
        href: "/du-hoc/othm-level-6-extended-logistics-supply-chain-management",
        description: "Chuyên ngành logistics và chuỗi cung ứng toàn cầu.",
      },
      {
        title: "Level 7 Strategic Management & Leadership",
        href: "/du-hoc/othm-level-7-strategic-management-leadership",
        description: "Tư duy lãnh đạo chiến lược cấp cao.",
      },
      {
        title: "Level 7 Logistics, Supply Chain & Management",
        href: "/du-hoc/othm-level-7-logistics-supply-chain-management",
        description: "Thạc sĩ logistics và vận hành chuỗi cung ứng.",
      },
      {
        title: "Level 7 Accounting & Finance",
        href: "/du-hoc/othm-level-7-accounting-finance",
        description: "Kế toán tài chính cấp độ thạc sĩ quốc tế.",
      },
    ],
  },
  {
    id: "qualifi",
    label: "Qualifi",
    description:
      "Bằng cấp chuyên ngành kế toán & quản trị chiến lược được công nhận quốc tế.",
    programs: [
      {
        title: "Level 3 Accounting & Finance",
        href: "/du-hoc/qualifi-level-3-accounting-finance",
        description: "Nhập môn kế toán và tài chính doanh nghiệp.",
      },
      {
        title: "Level 4 Accounting & Finance",
        href: "/du-hoc/qualifi-level-4-accounting-finance",
        description: "Kế toán trung cấp, tương đương năm nhất đại học.",
      },
      {
        title: "Level 5 Accounting & Finance",
        href: "/du-hoc/qualifi-level-5-accounting-finance",
        description: "Phân tích tài chính và báo cáo quản trị nâng cao.",
      },
      {
        title: "Level 7 Accounting & Finance",
        href: "/du-hoc/qualifi-level-7-accounting-finance",
        description: "Kế toán tài chính cấp độ thạc sĩ.",
      },
      {
        title: "Level 7 Strategic Management & Leadership",
        href: "/du-hoc/qualifi-level-7-strategic-management-leadership",
        description: "Lãnh đạo và quản trị chiến lược tổ chức.",
      },
    ],
  },
  {
    id: "wolverhampton",
    label: "University of Wolverhampton",
    description:
      "Đại học công lập hàng đầu Anh Quốc với các chương trình cử nhân và thạc sĩ trực tuyến.",
    programs: [
      {
        title: "BA (Hons) Business Management",
        href: "/du-hoc/wolverhampton-ba-hons-business-management",
      },
      {
        title: "MBA Business Administration",
        href: "/du-hoc/wolverhampton-mba-business-administration",
      },
      {
        title: "MSc Psychology",
        href: "/du-hoc/wolverhampton-msc-psychology",
      },
      {
        title: "MSc Project Management",
        href: "/du-hoc/wolverhampton-msc-project-management",
      },
      {
        title: "MSc Accounting & Finance",
        href: "/du-hoc/wolverhampton-msc-accounting-finance",
      },
    ],
  },
]

// ─── helpers ────────────────────────────────────────────────────────────────

/** Extract the "Level N" prefix from a title, e.g. "Level 3 Business Management" → "Level 3" */
function extractLevel(title: string): string | null {
  const m = title.match(/^(Level\s+\d+)/i)
  return m ? m[1] : null
}

/** True when at least one program carries a "Level" prefix */
function hasLevelPrograms(programs: Program[]): boolean {
  return programs.some((p) => extractLevel(p.title) !== null)
}

/** True when the category has only one program (no sub-items to list) */
function isSingleProgram(programs: Program[]): boolean {
  return programs.length <= 1
}

// ─── layout components ──────────────────────────────────────────────────────

/** Layout A — Vertical timeline for Level-based courses */
function TimelineLayout({ programs }: { programs: Program[] }) {
  return (
    <div className="mt-8 relative">
      {/* Vertical rail */}
      <div className="absolute left-[30px] top-0 bottom-0 w-px bg-gradient-to-b from-[#0A2540]/20 via-[#C8913C]/30 to-transparent sm:left-[38px]" />

      <ol className="space-y-1">
        {programs.map((program, index) => {
          const level = extractLevel(program.title)
          const rest = level
            ? program.title.slice(level.length).trim()
            : program.title
          const isLast = index === programs.length - 1

          return (
            <li key={program.href}>
              <Link
                href={program.href}
                className="group relative flex items-start gap-5 rounded-xl px-3 py-3.5 transition-all duration-200 ease-out hover:bg-[#F4F7FA] sm:gap-6 sm:px-4"
              >
                {/* Step dot */}
                <span
                  className={cn(
                    "relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-200 ease-out sm:h-11 sm:w-11 sm:text-sm",
                    index === 0
                      ? "border-[#C8913C] bg-[#C8913C] text-white"
                      : isLast
                        ? "border-[#0A2540] bg-[#0A2540] text-white"
                        : "border-[#0A2540]/25 bg-white text-[#0A2540] group-hover:border-[#0A2540] group-hover:bg-[#0A2540] group-hover:text-white",
                  )}
                >
                  {level ? level.replace(/Level\s+/i, "") : index + 1}
                </span>

                {/* Content */}
                <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                  <div className="min-w-0">
                    {level && (
                      <span className="mb-0.5 block font-sans text-[10px] font-semibold tracking-[0.18em] text-[#C8913C] uppercase">
                        {level}
                      </span>
                    )}
                    <h3 className="font-display text-base font-bold leading-snug text-foreground sm:text-lg">
                      {rest}
                    </h3>
                    {program.description && (
                      <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                        {program.description}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[#C8913C] opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    strokeWidth={2.5}
                  />
                </div>
              </Link>

              {/* Connector spacing — subtle gap between items */}
              {!isLast && <div className="ml-[38px] h-1 sm:ml-[46px]" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** Layout B — Normal card grid for multi-programs without Level */
function CardGridLayout({ programs }: { programs: Program[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program) => (
        <Link
          key={program.href}
          href={program.href}
          className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#0A2540]/20 hover:shadow-[0_16px_36px_-14px_rgba(15,27,45,0.18)]"
        >
          <div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4F7FA] text-[#0A2540] transition-colors duration-300 ease-out group-hover:bg-[#0A2540] group-hover:text-white">
              <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
              {program.title}
            </h3>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#C8913C]">
            Xem chi tiết
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </span>
        </Link>
      ))}
    </div>
  )
}

/** Layout C — Image one side, text the other (single / no sub-programs) */
function ImageTextLayout({
  program,
  image,
  categoryLabel,
}: {
  program: Program
  image?: string
  categoryLabel: string
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(10,37,64,0.15)]">
      <div className="flex flex-col lg:flex-row lg:min-h-[320px]">
        {/* Image side */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden bg-[#F4F7FA] lg:h-auto lg:w-[45%]">
          {image ? (
            <Image
              src={image}
              alt={categoryLabel}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <GraduationCap className="h-20 w-20 text-[#0A2540]/15" strokeWidth={1} />
            </div>
          )}
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 via-transparent to-transparent lg:bg-gradient-to-r" />
        </div>

        {/* Text side */}
        <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
          {program.tag && (
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#C8913C]/12 px-3 py-1 font-sans text-[11px] font-semibold tracking-[0.18em] text-[#C8913C] uppercase">
              <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} />
              {program.tag}
            </span>
          )}

          <h3 className="font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            {program.title}
          </h3>

          {program.description && (
            <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground/65">
              {program.description}
            </p>
          )}

          <Link
            href={program.href}
            className="group/btn mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0A2540] px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0A2540]/90 hover:shadow-[0_12px_28px_-8px_rgba(10,37,64,0.45)]"
          >
            Xem chi tiết
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── main component ─────────────────────────────────────────────────────────

export function OnlineDirectory({ className }: { className?: string }) {
  const [activeId, setActiveId] = React.useState<string>(CATEGORIES[0].id)
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0]

  // Determine which layout to render
  const showTimeline = hasLevelPrograms(active.programs)
  const showImageText = isSingleProgram(active.programs)
  // otherwise: normal card grid

  return (
    <section
      id="directory"
      aria-labelledby="directory-heading"
      className={cn("w-full scroll-mt-28 bg-white py-20 sm:py-24", className)}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#C8913C] uppercase">
            Danh mục chương trình
          </p>
          <h2
            id="directory-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Chọn lộ trình học online phù hợp
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/75">
            Bốn nhóm chương trình đào tạo trực tuyến được công nhận quốc tế. Mỗi
            khóa liên kết tới trang chi tiết trong mục Du học.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Nhóm chương trình"
          className="mt-10 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
        >
          {CATEGORIES.map((category) => {
            const selected = category.id === activeId
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${category.id}`}
                id={`tab-${category.id}`}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-300 ease-out",
                  selected
                    ? "border-[#0A2540] bg-[#0A2540] text-white shadow-sm"
                    : "border-border bg-white text-foreground/80 hover:border-[#0A2540]/40 hover:text-foreground",
                )}
              >
                {category.label}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-8"
        >
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
            {active.description}
          </p>

          {/* Conditional layout */}
          {showTimeline ? (
            <TimelineLayout programs={active.programs} />
          ) : showImageText ? (
            <ImageTextLayout
              program={active.programs[0]}
              image={active.image}
              categoryLabel={active.label}
            />
          ) : (
            <CardGridLayout programs={active.programs} />
          )}
        </div>
      </div>
    </section>
  )
}
