import {
  Award,
  BadgeCheck,
  ClipboardList,
  FolderOpen,
  Globe,
  Handshake,
  MessageCircle,
  Send,
  Shield,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { getDictionaryServer, getLocale } from "@/lib/i18n-server"
import type {
  HomepageProcessStep,
  HomepageReason,
  HomepageWhyProcessContent,
} from "@/sanity/home-page"

const ACCENT = "var(--color-secondary)"

type Icon = typeof Shield

type Reason = {
  icon: Icon
  title: string
  description: string
}

type Step = {
  icon: Icon
  title: string
  description: string
}

const CMS_ICONS = {
  award: Award,
  badgecheck: BadgeCheck,
  clipboardlist: ClipboardList,
  folderopen: FolderOpen,
  globe: Globe,
  handshake: Handshake,
  messagecircle: MessageCircle,
  send: Send,
  shield: Shield,
} as const satisfies Record<string, Icon>

function resolveCmsIcon(icon: string | undefined, fallback: Icon): Icon {
  const key = icon?.trim().replace(/[ _-]/g, "").toLowerCase()
  return key ? (CMS_ICONS[key as keyof typeof CMS_ICONS] ?? fallback) : fallback
}

function ReasonItem({ reason }: { reason: Reason }) {
  const Icon = reason.icon
  return (
    <div className="group flex flex-col items-center text-center transition-transform duration-300 ease-out hover:-translate-y-1.5 lg:border-l lg:border-dashed lg:border-brand-gold/40 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
      <span
        aria-hidden="true"
        className="relative z-10 inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-light ring-1 ring-brand-gold transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-brand-gold group-hover:shadow-[0_12px_28px_-10px_rgba(200,145,60,0.55)]"
      >
        <Icon
          className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-white"
          strokeWidth={1.6}
        />
      </span>
      <h3 className="mt-5 font-display text-[19px] font-bold tracking-tight text-brand-blue">
        {reason.title}
      </h3>
      <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-brand-blue/70">
        {reason.description}
      </p>
    </div>
  )
}

function StepItem({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon
  const num = String(index + 1).padStart(2, "0")
  return (
    <div className="group relative flex flex-col items-center text-center transition-transform duration-300 ease-out hover:-translate-y-1.5">
      <div className="relative z-10 inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-blue-mid shadow-[0_12px_28px_-12px_rgba(29,66,124,0.45)] transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-secondary group-hover:shadow-[0_12px_28px_-10px_rgba(241,209,163,0.9)]">
        <Icon
          className="h-8 w-8 text-secondary transition-colors duration-300 group-hover:text-primary"
          strokeWidth={1.6}
        />
      </div>
      <div
        className="mt-5 font-display text-[15px] font-bold tracking-[0.18em] text-secondary"
        aria-hidden="true"
      >
        {num}
      </div>
      <h3 className="mt-2 font-display text-[17px] font-bold tracking-tight text-brand-blue">
        {step.title}
      </h3>
      <p className="mt-2 max-w-[220px] text-[13.5px] leading-relaxed text-brand-blue/70">
        {step.description}
      </p>
    </div>
  )
}

export async function SiteWhyProcess({
  className,
  reasons: reasonsContent,
  processSteps,
  content,
}: {
  className?: string
  reasons?: HomepageReason[]
  processSteps?: HomepageProcessStep[]
  content?: HomepageWhyProcessContent
}) {
  const t = await getDictionaryServer()
  const locale = await getLocale()

  const defaultReasons: ReadonlyArray<Reason> = [
    {
      icon: Shield,
      title: t.whyProcess.reasons.transparency.title,
      description: t.whyProcess.reasons.transparency.description,
    },
    {
      icon: Award,
      title: t.whyProcess.reasons.expertise.title,
      description: t.whyProcess.reasons.expertise.description,
    },
    {
      icon: Globe,
      title: t.whyProcess.reasons.partners.title,
      description: t.whyProcess.reasons.partners.description,
    },
    {
      icon: Handshake,
      title: t.whyProcess.reasons.commitment.title,
      description: t.whyProcess.reasons.commitment.description,
    },
  ]

  const reasons: ReadonlyArray<Reason> = reasonsContent?.length
    ? reasonsContent.map((reason) => ({
        icon: resolveCmsIcon(reason.icon, Shield),
        title: reason.title || "",
        description: reason.description || "",
      }))
    : defaultReasons

  const defaultSteps: ReadonlyArray<Step> = [
    {
      icon: MessageCircle,
      title: t.whyProcess.steps.step1.title,
      description: t.whyProcess.steps.step1.description,
    },
    {
      icon: ClipboardList,
      title: t.whyProcess.steps.step2.title,
      description: t.whyProcess.steps.step2.description,
    },
    {
      icon: FolderOpen,
      title: t.whyProcess.steps.step3.title,
      description: t.whyProcess.steps.step3.description,
    },
    {
      icon: Send,
      title: t.whyProcess.steps.step4.title,
      description: t.whyProcess.steps.step4.description,
    },
    {
      icon: BadgeCheck,
      title: t.whyProcess.steps.step5.title,
      description: t.whyProcess.steps.step5.description,
    },
  ]

  const steps: ReadonlyArray<Step> = processSteps?.length
    ? processSteps.map((step) => ({
        icon: resolveCmsIcon(step.icon, MessageCircle),
        title: step.title || "",
        description: step.description || "",
      }))
    : defaultSteps

  return (
    <section
      aria-labelledby="why-process-heading"
      className={cn("relative w-full bg-white py-20 sm:py-24", className)}
    >
      <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div
          className="rounded-lg border border-[#E6E9EE] bg-brand-light px-6 pt-14 shadow-[0_20px_50px_-25px_rgba(15,27,45,0.18)] sm:px-10 sm:pt-16 md:px-16"
          style={{ paddingBottom: "clamp(3rem, 5vw, 5rem)" }}
        >
          <div className="text-center">
            <p className="font-sans text-[13px] font-bold tracking-[0.28em] text-brand-gold uppercase">
              {content?.why?.eyebrow || t.whyProcess.whyTagline}
            </p>
            <h2
              id="why-process-heading"
              className="mt-3 font-display text-3xl leading-[1.15] font-bold tracking-tight text-brand-blue sm:text-4xl md:text-[40px]"
            >
              {content?.why?.title || t.whyProcess.whyTitle}
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-5 block h-[3px] w-16 rounded-full bg-brand-gold"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {reasons.map((reason) => (
              <ReasonItem key={reason.title} reason={reason} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={locale === "vi" ? "/vi/gioi-thieu" : "/en/gioi-thieu"}
              className="group inline-flex items-center justify-center gap-2 rounded-md border-2 border-brand-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-brand-gold uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold hover:text-white hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              {content?.why?.cta || t.whyProcess.cta}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-20 text-center sm:mt-24">
          <p className="font-sans text-[13px] font-bold tracking-[0.28em] text-brand-gold uppercase">
            {content?.process?.eyebrow || t.whyProcess.processTagline}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-[1.15] font-bold tracking-tight text-brand-blue sm:text-4xl md:text-[40px]">
            {content?.process?.title || t.whyProcess.processTitle}
          </h3>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-[3px] w-16 rounded-full bg-brand-gold"
          />
        </div>

        <div
          className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6"
          role="list"
          aria-label={
            content?.process?.ariaLabel || t.whyProcess.processAriaLabel
          }
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[35px] right-[10%] left-[10%] hidden h-px bg-secondary lg:block"
          />
          {steps.map((step, index) => (
            <div key={step.title} role="listitem">
              <StepItem step={step} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Expose brand tokens for cross-component consistency if needed elsewhere.
export const SITE_WHY_PROCESS_BRAND = { ACCENT } as const
