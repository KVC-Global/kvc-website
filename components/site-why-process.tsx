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

const ACCENT = "var(--color-secondary)"

type Reason = {
  icon: typeof Shield
  title: string
  description: string
}

const REASONS: ReadonlyArray<Reason> = [
  {
    icon: Shield,
    title: "Mình bạch",
    description:
      "Quy trình rõ ràng, chi phí minh bạch, cam kết không phát sinh chi phí ẩn.",
  },
  {
    icon: Award,
    title: "Chuyên môn cao",
    description:
      "Đội ngũ chuyên gia giàu kinh nghiệm, hiểu rõ hệ thống quy trình Singapore & Việt Nam.",
  },
  {
    icon: Globe,
    title: "Đối tác quốc tế",
    description:
      "Mạng lưới đối tác trường học, tổ chức & doanh nghiệp uy tín trên toàn cầu.",
  },
  {
    icon: Handshake,
    title: "Đồng hành lâu dài",
    description:
      "Hỗ trợ toàn diện trước – trong – sau khi hành trình định cư, thành lập & học tập.",
  },
] as const

type Step = {
  icon: typeof MessageCircle
  title: string
  description: string
}

const STEPS: ReadonlyArray<Step> = [
  {
    icon: MessageCircle,
    title: "Tư vấn & đánh giá",
    description:
      "Lắng nghe nhu cầu, đánh giá hồ sơ và tư vấn giải pháp tối ưu.",
  },
  {
    icon: ClipboardList,
    title: "Lên lộ trình cá nhân hóa",
    description: "Xây dựng lộ trình phù hợp với mục tiêu của bạn.",
  },
  {
    icon: FolderOpen,
    title: "Chuẩn bị hồ sơ",
    description:
      "Hỗ trợ chuẩn bị và hoàn thiện hồ sơ chỉn chu, đầy đủ.",
  },
  {
    icon: Send,
    title: "Nộp hồ sơ & theo dõi",
    description:
      "Nộp hồ sơ và theo dõi tiến độ xử lý trong suốt quá trình.",
  },
  {
    icon: BadgeCheck,
    title: "Nhận kết quả & hỗ trợ sau",
    description:
      "Nhận kết quả và hỗ trợ bạn ổn định, phát triển lâu dài.",
  },
] as const

function ReasonItem({ reason }: { reason: Reason }) {
  const Icon = reason.icon
  return (
    <div className="flex flex-col items-center text-center">
      <span
        aria-hidden="true"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-brand-blue/15"
      >
        <Icon className="h-7 w-7 text-secondary" strokeWidth={1.6} />
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

function StepItem({
  step,
  index,
}: {
  step: Step
  index: number
}) {
  const Icon = step.icon
  const num = String(index + 1).padStart(2, "0")
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative z-10 inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-blue shadow-[0_12px_28px_-12px_rgba(10,37,64,0.45)]">
        <Icon className="h-7 w-7 text-secondary" strokeWidth={1.6} />
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

export function SiteWhyProcess({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="why-process-heading"
      className={cn("relative w-full bg-white py-20 sm:py-24", className)}
    >
      <Container>
        <div className="text-center">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.28em] text-secondary">
            Vì sao chọn KVC Global?
          </p>
          <h2
            id="why-process-heading"
            className="mt-3 font-display text-3xl font-bold leading-[1.15] tracking-tight text-brand-blue sm:text-4xl md:text-[40px]"
          >
            Đối tác đáng tin cậy cho hành trình của bạn
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-[3px] w-16 rounded-full bg-secondary"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {REASONS.map((reason) => (
            <ReasonItem key={reason.title} reason={reason} />
          ))}
        </div>

        <div className="mt-20 text-center sm:mt-24">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.28em] text-secondary">
            Quy trình đồng hành
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold leading-[1.15] tracking-tight text-brand-blue sm:text-4xl md:text-[40px]">
            5 bước đơn giản – Hành trình vững chắc
          </h3>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-[3px] w-16 rounded-full bg-secondary"
          />
        </div>

        <div
          className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6"
          role="list"
          aria-label="Quy trình đồng hành 5 bước"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] right-[10%] top-[35px] hidden h-px bg-brand-blue/15 lg:block"
          />
          {STEPS.map((step, index) => (
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
