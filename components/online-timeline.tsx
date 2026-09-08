"use client"

import * as React from "react"
import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import {
  ChevronDown,
  Clock,
  Calendar,
  ListChecks,
  UserCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"

// Types

export interface TimelineProgram {
  name: string
  duration: string
  start: string
  subjects: string[]
  entry: string
  level?: string
}

// Animation variants

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

// Helpers

function splitName(name: string): { level: string; rest: string } {
  const m = name.match(/^(Level\s+\d+(?:\s+Extended)?)/i)
  if (m) return { level: m[1], rest: name.slice(m[1].length).trim() }
  const acro = name.match(/^([A-Z]{2,}(?:\s*\(Hons\))?(?:\s*–.*?)?)/)
  if (acro)
    return {
      level: acro[1],
      rest: name
        .slice(acro[1].length)
        .replace(/^[–\s]+/, "")
        .trim(),
    }
  return { level: "", rest: name }
}

function getLevelWeight(name: string): number {
  const m = name.match(/Level\s+(\d+)/i)
  if (m) return parseInt(m[1], 10)
  if (/MBA|MSc|Master/i.test(name)) return 7
  if (/BA\s*\(Hons\)/i.test(name)) return 6
  return 4
}

// Card sub-component

function TimelineCard({
  program,
  index,
}: {
  program: TimelineProgram
  index: number
}) {
  const isEven = index % 2 === 0
  const levelWeight = getLevelWeight(program.name)

  const [expanded, setExpanded] = React.useState(true)

  return (
    <motion.li
      variants={timelineItemVariants}
      className="group/timeline relative flex flex-col items-start sm:flex-row sm:items-center"
    >
      {/* Center rail dot */}
      <div
        className={cn(
          "absolute left-6 z-10 flex -translate-x-1/2 items-center justify-center rounded-full border-2 border-white shadow-sm transition-all duration-500 ease-out sm:top-1/2 sm:left-1/2 sm:mt-0 sm:-translate-y-1/2",
          expanded
            ? "bg-brand-gold shadow-[0_0_0_6px_rgba(200,145,60,0.12)]"
            : "bg-brand-blue-mid"
        )}
        style={{
          width: 14 + (levelWeight - 3),
          height: 14 + (levelWeight - 3),
        }}
      />

      {/* Card */}
      <div
        className={cn(
          "w-full pl-16 sm:w-[calc(50%-2.5rem)] sm:pl-0",
          isEven ? "sm:mr-auto sm:pr-10" : "sm:ml-auto sm:pl-10"
        )}
      >
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="group/card relative block w-full overflow-hidden rounded-xl border border-border/60 bg-white text-left shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-lg"
        >
          {/* Card header */}
          <div className="flex items-start justify-between gap-4 p-6">
            <div className="flex-1">
              <h3 className="font-heading text-lg leading-snug font-bold text-brand-blue sm:text-xl">
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

          {/* Expandable details */}
          <div
            className={cn(
              "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              expanded
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="border-t border-border bg-brand-light px-6 pt-5 pb-6">
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
                    <ListChecks
                      className="h-4 w-4 text-brand-gold"
                      strokeWidth={1.75}
                    />
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
                <div className="mt-5 rounded-lg border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
                  <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue">
                    <UserCheck
                      className="h-4 w-4 text-brand-gold"
                      strokeWidth={1.75}
                    />
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

// Main component

export function ExpandableTimeline({
  programs,
  className,
}: {
  programs: TimelineProgram[]
  className?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 5%"],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const glowTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    [0, 1, 1, 0]
  )
  const progressOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.98, 1],
    [0, 1, 1, 0]
  )

  return (
    <div ref={containerRef} className={cn("relative mt-16", className)}>
      {/* Static background rail */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-6 h-full w-px bg-brand-blue-mid/[0.08] sm:left-1/2 sm:-translate-x-1/2"
      />

      {/* Scroll-driven progress rail */}
      <motion.div
        aria-hidden="true"
        style={{ scaleY: lineScale, originY: 0, opacity: progressOpacity }}
        className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-brand-gold via-brand-blue-mid to-brand-gold sm:left-1/2 sm:-translate-x-1/2"
      />

      {/* Glow orb at progress tip */}
      <motion.div
        aria-hidden="true"
        style={{ top: glowTop, opacity: glowOpacity }}
        className="absolute left-6 z-20 h-3 w-3 -translate-x-[5px] -translate-y-1/2 rounded-full bg-brand-gold shadow-[0_0_16px_3px_rgba(200,145,60,0.45)] sm:left-1/2 sm:-translate-x-[6px]"
      />

      {/* Card list */}
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="relative space-y-14 sm:space-y-20"
      >
        {programs.map((program, index) => (
          <TimelineCard key={index} program={program} index={index} />
        ))}
      </motion.ol>
    </div>
  )
}
