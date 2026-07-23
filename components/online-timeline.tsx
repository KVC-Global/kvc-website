"use client"

import * as React from "react"
import { motion, useInView, Variants } from "framer-motion"
import { ChevronDown, Clock, Calendar, ListChecks, UserCheck } from "lucide-react"

import { cn } from "@/lib/utils"

// ─── types ──────────────────────────────────────────────────────────────────

export interface TimelineProgram {
  name: string
  duration: string
  start: string
  subjects: string[]
  entry: string
  level?: string
}

// ─── animation variants ────────────────────────────────────────────────────

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
}

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 90, damping: 18, mass: 1 },
  },
}

// ─── helpers ────────────────────────────────────────────────────────────────

function splitName(name: string): { level: string; rest: string } {
  const m = name.match(/^(Level\s+\d+(?:\s+Extended)?)/i)
  if (m) return { level: m[1], rest: name.slice(m[1].length).trim() }
  const acro = name.match(/^([A-Z]{2,}(?:\s*\(Hons\))?(?:\s*–.*?)?)/)
  if (acro) return { level: acro[1], rest: name.slice(acro[1].length).replace(/^[–\s]+/, "").trim() }
  return { level: "", rest: name }
}

/** Get a numeric level for progression sizing (3-7 for Levels, fixed values for degrees) */
function getLevelWeight(name: string): number {
  const m = name.match(/Level\s+(\d+)/i)
  if (m) return parseInt(m[1], 10)
  if (/MBA|MSc|Master/i.test(name)) return 7
  if (/BA\s*\(Hons\)/i.test(name)) return 6
  return 4
}

// ─── card sub-component ─────────────────────────────────────────────────────

function TimelineCard({
  program,
  index,
  total,
}: {
  program: TimelineProgram
  index: number
  total: number
}) {
  const { level, rest } = splitName(program.name)
  const isEven = index % 2 === 0
  const levelWeight = getLevelWeight(program.name)

  const [expanded, setExpanded] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(cardRef, { once: true, margin: "-80px" })

  React.useEffect(() => {
    if (inView) setExpanded(true)
  }, [inView])

  // ── progression values ──────────────────────────────────────────────────
  // Gold edge thickness grows with level (2px → 3px)
  const edgeWidth = levelWeight >= 7 ? "3px" : "2px"
  // Dot size grows subtly (12px → 18px)
  const dotSize = 12 + (levelWeight - 3) * 1.2
  // Gold intensity deepens
  const goldAlpha = 0.55 + (levelWeight - 3) * 0.07

  return (
    <motion.li
      variants={timelineItemVariants}
      className="group/timeline relative flex flex-col items-start justify-between sm:flex-row sm:items-center"
    >
      {/* Sentinel for scroll detection */}
      <div ref={cardRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ── Center rail dot ── */}
      <div
        className="absolute left-6 z-10 mt-12 flex -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-blue-mid shadow-md transition-all duration-500 ease-out sm:left-1/2 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2"
        style={{
          width: dotSize,
          height: dotSize,
          boxShadow: expanded
            ? `0 0 0 4px rgba(184,134,11,${goldAlpha - 0.2}), 0 2px 8px rgba(10,37,64,0.25)`
            : `0 2px 6px rgba(10,37,64,0.2)`,
        }}
      >
        {/* Inner dot highlight */}
        <div
          className="rounded-full bg-white/40 transition-opacity duration-300"
          style={{
            width: dotSize * 0.35,
            height: dotSize * 0.35,
            opacity: expanded ? 0 : 1,
          }}
        />
      </div>

      {/* ── Level tag (opposite side on desktop) ── */}
      {level && (
        <div
          className={cn(
            "hidden sm:block sm:w-[calc(50%-2.5rem)]",
            isEven ? "order-2 pl-10 text-left" : "pr-10 text-right"
          )}
        >
          <span
            className="inline-block rounded-sm px-3 py-1 font-sans text-xs font-semibold tracking-[0.15em] uppercase text-white shadow-sm transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, #0A2540, #1A3A5C)`,
              letterSpacing: "0.18em",
            }}
          >
            {level}
          </span>
        </div>
      )}

      {/* ── Card ── */}
      <div
        className={cn(
          "w-full pl-16 sm:w-[calc(50%-2.5rem)] sm:pl-0",
          isEven ? "sm:pr-10" : "sm:order-2 sm:pl-10"
        )}
      >
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "group/card relative block w-full overflow-hidden rounded-sm text-left transition-all duration-500 ease-out",
            // Gold edge facing center
            isEven ? "border-r" : "border-l",
            "bg-[#FDFBF7]",
            "hover:-translate-y-1",
            "shadow-[0_1px_3px_rgba(10,37,64,0.06),0_1px_2px_rgba(10,37,64,0.04)]",
            "hover:shadow-[0_8px_24px_-8px_rgba(184,134,11,0.2),0_2px_4px_rgba(10,37,64,0.06)]"
          )}
          style={{
            borderColor: `rgba(184,134,11,${goldAlpha})`,
            borderWidth: edgeWidth,
          }}
        >
          {/* ── Card header ── */}
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5">
            <div className="flex-1">
              {/* Mobile level badge */}
              {level && (
                <span
                  className="mb-2.5 inline-block rounded-sm px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-white sm:hidden"
                  style={{ background: "linear-gradient(135deg, #0A2540, #1A3A5C)" }}
                >
                  {level}
                </span>
              )}
              <h3 className="font-display text-lg leading-snug font-bold tracking-tight text-[#0A2540] sm:text-xl">
                {rest}
              </h3>
            </div>
            <ChevronDown
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0 transition-all duration-400",
                expanded
                  ? "rotate-180 text-[#B8860B]"
                  : "text-[#0A2540]/25 group-hover/card:text-[#B8860B]/60"
              )}
              strokeWidth={1.75}
            />
          </div>

          {/* ── Expandable details ── */}
          <div
            className={cn(
              "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="bg-[#F5F0E8] px-6 pb-6 pt-5">
                {/* Duration & Start badges */}
                <div className="flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#5C6B5C]/10 px-3 py-1.5 font-body text-xs font-medium text-[#5C6B5C]">
                    <Clock className="h-3 w-3" strokeWidth={1.75} />
                    {program.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#5C6B5C]/10 px-3 py-1.5 font-body text-xs font-medium text-[#5C6B5C]">
                    <Calendar className="h-3 w-3" strokeWidth={1.75} />
                    {program.start}
                  </span>
                </div>

                {/* Subjects */}
                <div className="mt-6">
                  <h4 className="flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.06em] text-[#0A2540]/60 uppercase">
                    <ListChecks className="h-3.5 w-3.5 text-[#B8860B]/70" strokeWidth={1.75} />
                    Môn học
                  </h4>
                  <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {program.subjects.map((s, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 font-body text-[13px] leading-relaxed text-[#2D2D34]/80"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#B8860B]/50" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Entry requirements */}
                <div className="mt-6 border-l-2 border-[#B8860B]/25 pl-4">
                  <h4 className="flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.06em] text-[#0A2540]/60 uppercase">
                    <UserCheck className="h-3.5 w-3.5 text-[#B8860B]/70" strokeWidth={1.75} />
                    Điều kiện đầu vào
                  </h4>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-[#2D2D34]/75">
                    {program.entry}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </motion.li>
  )
}

// ─── main component ─────────────────────────────────────────────────────────

export function ExpandableTimeline({
  programs,
  className,
}: {
  programs: TimelineProgram[]
  className?: string
}) {
  return (
    <div className={cn("relative mt-16", className)}>
      {/* Center rail */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-6 w-px bg-gradient-to-b from-[#B8860B]/0 via-[#B8860B]/30 to-[#B8860B]/0 sm:left-1/2 sm:-translate-x-1/2"
      />

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative space-y-14 sm:space-y-20"
      >
        {programs.map((program, index) => (
          <TimelineCard
            key={index}
            program={program}
            index={index}
            total={programs.length}
          />
        ))}
      </motion.ol>
    </div>
  )
}
