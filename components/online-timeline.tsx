"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { ChevronDown, Clock, Calendar, ListChecks, UserCheck } from "lucide-react"

import { cn } from "@/lib/utils"

// ─── types ──────────────────────────────────────────────────────────────────

export interface TimelineProgram {
  name: string
  duration: string
  start: string
  subjects: string[]
  entry: string
  level?: string // e.g. "Level 3", "MBA", "BA (Hons)"
}

// ─── animation variants ────────────────────────────────────────────────────

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
}

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Extract a display label from the program name.
 * e.g. "Level 3 Diploma in Business Management" → { level: "Level 3", rest: "Diploma in Business Management" }
 */
function splitName(name: string): { level: string; rest: string } {
  const m = name.match(/^(Level\s+\d+(?:\s+Extended)?)/i)
  if (m) return { level: m[1], rest: name.slice(m[1].length).trim() }
  // For non-Level programs like MBA, MSc, BA — extract the first all-caps acronym part
  const acro = name.match(/^([A-Z]{2,}(?:\s*\(Hons\))?(?:\s*–.*?)?)/)
  if (acro) return { level: acro[1], rest: name.slice(acro[1].length).replace(/^[–\s]+/, "").trim() }
  return { level: "", rest: name }
}

// ─── component ──────────────────────────────────────────────────────────────

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
        className="absolute top-0 left-6 w-px bg-gradient-to-b from-[#0A2540]/20 via-[#0A2540]/40 to-transparent sm:left-1/2 sm:-translate-x-1/2"
      />

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative space-y-12 sm:space-y-16"
      >
        {programs.map((program, index) => {
          const { level, rest } = splitName(program.name)
          const isEven = index % 2 === 0
          const [expanded, setExpanded] = React.useState(false)

          return (
            <motion.li
              key={index}
              variants={timelineItemVariants}
              className="group/timeline relative flex flex-col items-start justify-between sm:flex-row sm:items-start"
            >
              {/* Step dot */}
              <div className="absolute left-6 z-10 mt-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-blue-mid shadow-sm transition-transform duration-300 ease-out group-hover/timeline:scale-125 sm:left-1/2 sm:mt-10" />

              {/* Level tag (opposite side on desktop) */}
              {level && (
                <div
                  className={cn(
                    "hidden w-full sm:block sm:w-[calc(50%-2.5rem)]",
                    isEven ? "order-2 pl-10 text-left" : "pr-10 text-right"
                  )}
                >
                  <span className="inline-block rounded-md bg-brand-blue-mid px-3 py-1 font-sans text-sm font-semibold text-white shadow-sm">
                    {level}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={cn(
                  "w-full pl-16 sm:w-[calc(50%-2.5rem)] sm:pl-0",
                  isEven ? "sm:pr-10" : "sm:order-2 sm:pl-10"
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="group/card block w-full overflow-hidden rounded-lg border border-border bg-white text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#0A2540]/20 hover:shadow-xl"
                >
                  {/* Card header (always visible) */}
                  <div className="flex items-start justify-between gap-4 p-6">
                    <div className="flex-1">
                      {level && (
                        <span className="mb-2 block font-sans text-[11px] font-semibold tracking-wider text-brand-gold uppercase sm:hidden">
                          {level}
                        </span>
                      )}
                      <h3 className="font-display text-xl leading-snug font-bold text-foreground">
                        {rest}
                      </h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-brand-blue/40 transition-transform duration-300",
                        expanded && "rotate-180"
                      )}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Expandable details */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-border/50 px-6 pb-6">
                        {/* Duration & Start */}
                        <div className="mt-4 flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1.5 font-body text-sm font-medium text-brand-dark/75">
                            <Clock className="h-3.5 w-3.5 text-brand-gold" />
                            {program.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1.5 font-body text-sm font-medium text-brand-dark/75">
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
                          <p className="mt-1.5 text-sm leading-relaxed text-brand-dark/70">
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
        })}
      </motion.ol>
    </div>
  )
}
