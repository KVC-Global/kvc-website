import { cn } from "@/lib/utils"

type Partner = {
  name: string
  mark:
    | "shield"
    | "flame"
    | "eagle"
    | "ribbon"
    | "triangle"
    | "compass"
    | "leaf"
    | "k"
    | "globe"
  primary: string
  accent: string
  subtitle?: string
}

const PARTNERS: ReadonlyArray<Partner> = [
  {
    name: "NUS",
    subtitle: "National University of Singapore",
    mark: "shield",
    primary: "#003D7C",
    accent: "#EF7C00",
  },
  {
    name: "NTU",
    subtitle: "Nanyang Technological University",
    mark: "flame",
    primary: "#003C71",
    accent: "#E2231A",
  },
  {
    name: "SMU",
    subtitle: "Singapore Management University",
    mark: "eagle",
    primary: "#8B1A1A",
    accent: "#8B1A1A",
  },
  {
    name: "Kaplan",
    subtitle: "Kaplan Singapore",
    mark: "ribbon",
    primary: "#F39200",
    accent: "#0E2E5C",
  },
  {
    name: "ACRA",
    subtitle: "Accounting & Corporate Regulatory Authority",
    mark: "triangle",
    primary: "#C8102E",
    accent: "#0E2E5C",
  },
  {
    name: "INSEAD",
    subtitle: "The Business School for the World",
    mark: "compass",
    primary: "#0E2E5C",
    accent: "#0E2E5C",
  },
  {
    name: "PSB",
    subtitle: "PSB Academy",
    mark: "leaf",
    primary: "#F39200",
    accent: "#F39200",
  },
  {
    name: "KVC Global",
    subtitle: "Your Future, Our Mission",
    mark: "k",
    primary: "#0F1B2D",
    accent: "#B0332A",
  },
]

function PartnerMark({
  mark,
  primary,
  accent,
}: Pick<Partner, "mark" | "primary" | "accent">) {
  switch (mark) {
    case "shield":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <path
            d="M16 2 L28 6 V16 C28 23 22 28 16 30 C10 28 4 23 4 16 V6 Z"
            fill={primary}
          />
          <path d="M16 8 V24 M10 14 H22" stroke="#fff" strokeWidth="2.5" />
        </svg>
      )
    case "flame":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <path
            d="M16 2 C20 8 24 11 24 17 C24 23 20 28 16 28 C12 28 8 23 8 17 C8 11 12 8 16 2 Z"
            fill={primary}
          />
          <circle cx="16" cy="20" r="3" fill={accent} />
        </svg>
      )
    case "eagle":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <path
            d="M16 4 L20 12 L28 12 L21 17 L24 25 L16 20 L8 25 L11 17 L4 12 L12 12 Z"
            fill={primary}
          />
        </svg>
      )
    case "ribbon":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <path d="M6 6 H26 V18 L16 26 L6 18 Z" fill={primary} />
          <path
            d="M6 6 H16 V18 L6 18 Z M16 6 H26 V18 L16 18 Z"
            fill={accent}
            opacity="0.3"
          />
        </svg>
      )
    case "triangle":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <path d="M16 4 L28 26 H4 Z" fill={primary} />
          <path d="M16 12 L22 22 H10 Z" fill="#fff" />
        </svg>
      )
    case "compass":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke={primary}
            strokeWidth="2.5"
          />
          <path d="M16 4 L19 16 L16 28 L13 16 Z" fill={primary} />
        </svg>
      )
    case "leaf":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <path d="M6 26 C6 14 14 6 26 6 C26 18 18 26 6 26 Z" fill={primary} />
        </svg>
      )
    case "k":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <path
            d="M4 4 H10 V15 L20 4 H28 L17 16 L28 28 H20 L10 17 V28 H4 Z"
            fill={primary}
          />
          <circle cx="24" cy="6" r="2" fill={accent} />
        </svg>
      )
    case "globe":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
          <circle cx="16" cy="16" r="13" fill={primary} />
          <ellipse
            cx="16"
            cy="16"
            rx="6"
            ry="13"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <path d="M3 16 H29" stroke="#fff" strokeWidth="1.5" />
        </svg>
      )
  }
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      className={cn(
        "group flex h-[110px] w-[220px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-4 shadow-[0_2px_8px_-2px_rgba(15,27,45,0.08)] transition-all duration-300 ease-out hover:shadow-[0_12px_28px_-8px_rgba(15,27,45,0.18)]"
      )}
    >
      <PartnerMark
        mark={partner.mark}
        primary={partner.primary}
        accent={partner.accent}
      />
      <div className="text-center leading-tight">
        <div
          className="font-display text-[15px] font-bold tracking-wide"
          style={{ color: partner.primary }}
        >
          {partner.name}
        </div>
        {partner.subtitle ? (
          <div className="mt-0.5 font-sans text-[9px] font-medium tracking-[0.12em] text-[#1F2937]/60 uppercase">
            {partner.subtitle}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function SitePartners({ className }: { className?: string }) {
  const track = [...PARTNERS, ...PARTNERS]

  return (
    <section
      aria-labelledby="partners-heading"
      className={cn("w-full bg-[#EDF5E5] py-16 sm:py-20", className)}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#B0332A] uppercase">
            Đối tác
          </p>
          <h2
            id="partners-heading"
            className="mt-3 font-display text-2xl font-bold tracking-[0.18em] text-[#0F1B2D] uppercase sm:text-3xl"
          >
            Đối tác &amp; Trường liên kết hàng đầu
          </h2>
        </div>
      </div>

      <div
        className="relative mt-12 w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className={cn(
            "flex w-max gap-6 will-change-transform motion-reduce:animate-none",
            "animate-marquee hover:[animation-play-state:paused]"
          )}
          aria-label="Đối tác & trường liên kết"
        >
          {track.map((partner, index) => (
            <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
