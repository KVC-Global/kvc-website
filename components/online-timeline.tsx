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

/** Numeric weight for progression sizing */
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
}: {
  program: TimelineProgram
  index: number
}) {
  const { level } = splitName(program.name)
  const isEven = index % 2 === 0
  const levelWeight = getLevelWeight(program.name)

  const [expanded, setExpanded] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(cardRef, { once: true, margin: "-80px" })

  React.useEffect(() => {
    if (inView) setExpanded(true)
  }, [inView])

  return (
    <motion.li
      variants={timelineItemVariants}
      className="group/timeline relative flex flex-col items-start justify-between sm:flex-row sm:items-center"
    >
      {/* Sentinel for scroll detection */}
      <div ref={cardRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ── Center rail dot ── */}
      <div
        className={cn(
          "absolute left-6 z-10 mt-12 flex -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-blue-mid shadow-sm transition-all duration-500 ease-out sm:left-1/2 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2",
          expanded && "shadow-[0_0_0_4px_rgba(200,145,60,0.15)]"
        )}
        style={{ width: 14 + (levelWeight - 3), height: 14 + (levelWeight - 3) }}
      />

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
          className="group/card block w-full overflow-hidden rounded-lg border border-border bg-white text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
        >
          {/* ── Card header ── */}
          <div className="flex items-start justify-between gap-4 p-6">
            <div className="flex-1">
              {level && (
                <span className="mb-2 block font-sans text-[11px] font-semibold tracking-wider text-brand-gold uppercase sm:hidden">
                  {level}
                </span>
              )}
              <h3 className="font-display text-xl leading-snug font-bold text-brand-blue">
                {program.name}
              </h3>
            </div>
            <ChevronDown
              className={cn(
                "mt-1 h-5 w-5 shrink-0 transition-transform duration-300",
                expanded ? "rotate-180 text-brand-gold" : "text-brand-blue/30"
              )}
              strokeWidth={2}
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
              <div className="border-t border-border bg-brand-light px-6 pb-6 pt-5">
                {/* Duration & Start badges */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-mid/10 px-3 py-1.5 font-body text-sm font-medium text-brand-blue-mid">
                    <Clock className="h-3.5 w-3.5 text-brand-gold" />
                    {program.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-mid/10 px-3 py-1.5 font-body text-sm font-medium text-brand-blue-mid">
                    <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                    {program.start}
                  </span>
                </div>

                {/* Subjects */}
                <div className="mt-5">
                  <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue">
                    <ListChecks className="h-4 w-4 text-brand-gold" strokeWidth={1.75} />
                    Môn học
                  </h4>
                  <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {program.subjects.map((s, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-brand-dark/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Entry requirements */}
                <div className="mt-5 rounded-md bg-brand-gold/5 border border-brand-gold/20 p-4">
                  <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue">
                    <UserCheck className="h-4 w-4 text-brand-gold" strokeWidth={1.75} />
                    Điều kiện đầu vào
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-dark/75">
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
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute top-0 left-6 w-px bg-gradient-to-b from-brand-blue-mid/20 via-brand-blue-mid/40 to-transparent sm:left-1/2 sm:-translate-x-1/2"
      />

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative space-y-12 sm:space-y-16"
      >
        {programs.map((program, index) => (
          <TimelineCard key={index} program={program} index={index} />
        ))}
      </motion.ol>
    </div>
  )
}
