import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { urlFor } from "@/sanity/image"
import { getDictionaryServer, getLocale } from "@/lib/i18n-server"

const ACCENT = "var(--color-secondary)"

export type SanityService = {
  title: string
  description: string
  slug?: { current: string }
  icon?: string
  image?: any
  alt?: string
  href?: string
}

function ServiceCard({
  service,
  defaultServices,
  t,
}: {
  service: SanityService
  defaultServices: ReadonlyArray<SanityService>
  t: any
}) {
  const href = service.href || `/${service.slug?.current || ""}`

  // Look up fallback image/alt from localized defaultServices array by matching title or slug
  const fallbackService = defaultServices.find(
    (s) =>
      s.title.toLowerCase() === service.title.toLowerCase() ||
      (service.slug?.current && s.slug?.current === service.slug.current)
  )
  const fallbackImage = fallbackService?.image || "/images/singapore-student.jpeg"
  const fallbackAlt = fallbackService?.alt || service.title

  const imageUrl =
    service.image && typeof service.image === "object"
      ? urlFor(service.image).url()
      : (service.image as string) || fallbackImage
  const altText = service.alt || fallbackAlt

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm bg-white p-5 text-foreground shadow-[0_18px_40px_-22px_rgba(29,66,124,0.35)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-brand-blue-mid hover:text-white hover:shadow-[0_28px_60px_-22px_rgba(29,66,124,0.45)]"
      )}
    >
      <h3 className="font-display text-[22px] leading-tight font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
        {service.title}
      </h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/75 transition-colors duration-300 group-hover:text-white/80">
        {service.description}
      </p>

      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <a
        href={href}
        className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold tracking-[0.16em] uppercase"
      >
        <span className="relative inline-block leading-none">
          <span className="block pb-1 text-brand-gold transition-colors duration-300 group-hover:hidden">
            {t.services.cardLearnMore}
          </span>
          <span className="hidden pb-1 text-white transition-colors duration-300 group-hover:block">
            {t.services.cardRegister}
          </span>
          <span
            aria-hidden="true"
            className="absolute right-0 bottom-0 left-0 h-px bg-secondary transition-colors duration-300 group-hover:bg-white"
          />
        </span>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 text-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
          strokeWidth={2.75}
        />
      </a>
    </article>
  )
}

export async function SiteServices({
  className,
  services,
}: {
  className?: string
  services?: ReadonlyArray<SanityService>
}) {
  const t = await getDictionaryServer()

  const defaultServices: ReadonlyArray<SanityService> = [
    {
      title: "Business Visa",
      description: t.services.businessDesc,
      image:
        "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=720&h=540&q=80&auto=format&fit=crop",
      alt: t.services.businessAlt,
      href: "#business-visa",
    },
    {
      title: "Student Visa",
      description: t.services.studentDesc,
      image: "/images/singapore-student.jpeg",
      alt: t.services.studentAlt,
      href: "#student-visa",
    },
    {
      title: "Work Visa",
      description: t.services.workDesc,
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=720&h=540&q=80&auto=format&fit=crop",
      alt: t.services.workAlt,
      href: "#work-visa",
    },
    {
      title: "Tourist Visa",
      description: t.services.touristDesc,
      image:
        "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=720&h=540&q=80&auto=format&fit=crop",
      alt: t.services.touristAlt,
      href: "#tourist-visa",
    },
  ]

  const activeServices = services || defaultServices

  return (
    <section
      aria-labelledby="services-heading"
      className={cn("w-full bg-white py-20 sm:py-24", className)}
    >
      <Container>
        <div className="text-center">
          <p className="font-sans text-[13px] font-bold tracking-[0.28em] text-brand-gold uppercase">
            {t.services.tagline}
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-3xl leading-[1.15] font-bold tracking-tight text-primary sm:text-4xl md:text-[40px]"
          >
            {t.services.title}
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-[3px] w-16 rounded-full bg-brand-gold"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {activeServices.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              defaultServices={defaultServices}
              t={t}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

// Expose brand tokens for cross-component consistency if needed elsewhere.
export const SITE_SERVICES_BRAND = { ACCENT } as const
