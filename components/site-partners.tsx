import Image from "next/image"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { urlFor } from "@/sanity/image"
import { getDictionaryServer } from "@/lib/i18n-server"

export type SanityPartner = {
  name: string
  logo?: any
  website?: string
}

const PARTNERS: ReadonlyArray<SanityPartner> = [
  { name: "NUS" },
  { name: "NTU" },
  { name: "SMU" },
  { name: "Kaplan" },
  { name: "ACRA" },
  { name: "INSEAD" },
  { name: "PSB" },
  { name: "KVC Global" },
]

function PartnerCard({ partner }: { partner: SanityPartner }) {
  const logoUrl = partner.logo ? urlFor(partner.logo).url() : "/images/SMU-Logo.png"
  return (
    <div
      className={cn(
        "group flex h-[160px] w-[280px] shrink-0 items-center justify-center rounded-xl px-4"
      )}
    >
      {partner.website ? (
        <a href={partner.website} target="_blank" rel="noopener noreferrer">
          <Image
            src={logoUrl}
            alt={partner.name}
            width={200}
            height={200}
            className="h-40 w-auto object-contain transition-opacity hover:opacity-85"
          />
        </a>
      ) : (
        <Image
          src={logoUrl}
          alt={partner.name}
          width={200}
          height={200}
          className="h-40 w-auto object-contain"
        />
      )}
    </div>
  )
}

export async function SitePartners({
  className,
  partners = PARTNERS,
}: {
  className?: string
  partners?: ReadonlyArray<SanityPartner>
}) {
  const t = await getDictionaryServer()
  const track = [...partners, ...partners]

  return (
    <section
      aria-labelledby="partners-heading"
      className={cn("w-full bg-white pt-28 pb-12 sm:pt-32", className)}
    >
      <Container>
        <div className="text-center">
          <h2
            id="partners-heading"
            className="mt-1 font-display text-base font-bold tracking-[0.18em] text-primary uppercase"
          >
            {t.partners.title}
          </h2>
        </div>
      </Container>

      <div
        className="relative mt-8 w-full overflow-hidden pb-8"
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
          aria-label={t.partners.ariaLabel}
        >
          {track.map((partner, index) => (
            <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
