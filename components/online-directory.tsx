"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, GraduationCap } from "lucide-react"

import { cn } from "@/lib/utils"

type Program = {
  title: string
  href: string
  tag?: string
}

type Category = {
  id: string
  label: string
  description: string
  programs: Program[]
}

const CATEGORIES: Category[] = [
  {
    id: "ossd",
    label: "OSSD Ontario",
    description:
      "Tốt nghiệp Trung học Ontario — bằng cấp được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
    programs: [
      {
        title: "OSSD Ontario Secondary School Diploma",
        href: "/du-hoc/osd-ontario",
        tag: "Highlight",
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
      },
      {
        title: "Level 4 Business Management",
        href: "/du-hoc/othm-level-4-business-management",
      },
      {
        title: "Level 5 Business Management",
        href: "/du-hoc/othm-level-5-business-management",
      },
      {
        title: "Level 6 Extended Business Management",
        href: "/du-hoc/othm-level-6-extended-business-management",
      },
      {
        title: "Level 6 Extended Logistics, Supply Chain & Management",
        href: "/du-hoc/othm-level-6-extended-logistics-supply-chain-management",
      },
      {
        title: "Level 7 Strategic Management & Leadership",
        href: "/du-hoc/othm-level-7-strategic-management-leadership",
      },
      {
        title: "Level 7 Logistics, Supply Chain & Management",
        href: "/du-hoc/othm-level-7-logistics-supply-chain-management",
      },
      {
        title: "Level 7 Accounting & Finance",
        href: "/du-hoc/othm-level-7-accounting-finance",
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
      },
      {
        title: "Level 4 Accounting & Finance",
        href: "/du-hoc/qualifi-level-4-accounting-finance",
      },
      {
        title: "Level 5 Accounting & Finance",
        href: "/du-hoc/qualifi-level-5-accounting-finance",
      },
      {
        title: "Level 7 Accounting & Finance",
        href: "/du-hoc/qualifi-level-7-accounting-finance",
      },
      {
        title: "Level 7 Strategic Management & Leadership",
        href: "/du-hoc/qualifi-level-7-strategic-management-leadership",
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

export function OnlineDirectory({ className }: { className?: string }) {
  const [activeId, setActiveId] = React.useState<string>(CATEGORIES[0].id)
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0]

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

          {active.id === "ossd" ? (
            <div className="mt-6">
              <Link
                href={active.programs[0].href}
                className="group block overflow-hidden rounded-2xl bg-[#0A2540] p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(10,37,64,0.45)] sm:p-10"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#C8913C]/15 px-3 py-1 font-sans text-[11px] font-semibold tracking-[0.18em] text-[#C8913C] uppercase">
                      <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} />
                      {active.programs[0].tag}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                      {active.programs[0].title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      Bằng tốt nghiệp được công nhận quốc tế, mở cánh cửa vào các
                      trường đại học hàng đầu thế giới.
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 font-sans text-sm font-semibold text-[#C8913C]">
                    Xem chi tiết
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {active.programs.map((program) => (
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
          )}
        </div>
      </div>
    </section>
  )
}
