import Image from "next/image"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

type Partner = {
  name: string
  subtitle?: string
}

const PARTNERS: ReadonlyArray<Partner> = [
  { name: "NUS", subtitle: "National University of Singapore" },
  { name: "NTU", subtitle: "Nanyang Technological University" },
  { name: "SMU", subtitle: "Singapore Management University" },
  { name: "Kaplan", subtitle: "Kaplan Singapore" },
  { name: "ACRA", subtitle: "Accounting & Corporate Regulatory Authority" },
  { name: "INSEAD", subtitle: "The Business School for the World" },
  { name: "PSB", subtitle: "PSB Academy" },
  { name: "KVC Global", subtitle: "Your Future, Our Mission" },
]

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      className={cn(
        "group flex h-[110px] w-[220px] shrink-0 items-center justify-center rounded-xl px-4"
      )}
    >
      <Image
        src="/images/SMU-Logo.png"
        alt={partner.name}
        width={200}
        height={200}
        className="h-20 w-auto object-contain"
      />
    </div>
  )
}

export function SitePartners({ className }: { className?: string }) {
  const track = [...PARTNERS, ...PARTNERS]

  return (
    <section
      aria-labelledby="partners-heading"
      className={cn("w-full bg-brand-light py-16 sm:py-20", className)}
    >
      <Container>
        <div className="text-center">
          <h2
            id="partners-heading"
            className="mt-3 font-display text-2xl font-bold tracking-[0.18em] text-primary uppercase sm:text-3xl"
          >
            Đối tác &amp; Trường liên kết hàng đầu
          </h2>
        </div>
      </Container>

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
