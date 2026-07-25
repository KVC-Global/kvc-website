import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { SiteStatBar } from "@/components/site-stat-bar"
import { Container } from "@/components/ui/container"
import { getDictionaryServer } from "@/lib/i18n-server"
import { urlFor } from "@/sanity/image"
import type { HomepageHero, HomepageStat } from "@/sanity/home-page"

const HERO_IMAGE = "/du-lich-singapore-3-ngay-2-dem-cover.webp"

export async function SiteHero({
  className,
  content,
  stats,
}: {
  className?: string
  content?: HomepageHero
  stats?: HomepageStat[]
}) {
  const t = await getDictionaryServer()
  const heroImage = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : HERO_IMAGE

  return (
    <section
      aria-labelledby="hero-heading"
      className={cn("relative w-full bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <Image
        src={heroImage}
        alt={content?.backgroundImageAlt || ""}
        role={content?.backgroundImageAlt ? undefined : "presentation"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ transform: "scaleX(-1)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 0%, #fff 30%, transparent 70%)",
        }}
      />

      <Container className="relative flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-0">
        <div className="max-w-2xl">
          <h1
            id="hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            <span className="block text-primary">{content?.titleLine1 || t.hero.title1}</span>
            <span className="block text-[#D7B684]">{content?.titleLine2 || t.hero.title2}</span>
          </h1>

          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
            {content?.description || t.hero.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={content?.primaryButtonHref || "#du-hoc"}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid/90 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              {content?.primaryButtonLabel || t.hero.btnStudyWork}
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

            <a
              href={content?.secondaryButtonHref || "#mo-cong-ty"}
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              {content?.secondaryButtonLabel || t.hero.btnIncorporate}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </div>
      </Container>
      <SiteStatBar content={stats} />
    </section>
  )
}
