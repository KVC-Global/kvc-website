import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80&auto=format&fit=crop"

export function SiteHero({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "relative w-full overflow-hidden bg-cover bg-center",
        className
      )}
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <Image
        src={HERO_IMAGE}
        alt=""
        role="presentation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white from-50% to-transparent to-100%"
      />

      <Container className="relative flex min-h-[600px] flex-col justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:min-h-[640px] md:pt-36 md:pb-0">
        <div className="max-w-2xl">
          <h1
            id="hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
          >
            <span className="block text-primary">BEGIN SOMETHING</span>
            <span className="block text-brand-gold">GREATER.</span>
          </h1>

          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
            Khởi đầu hành trình định cư, làm việc và kinh doanh tại Singapore
            cùng đối tác tư vấn di trú hàng đầu. Chúng tôi biến giấc mơ toàn cầu
            của bạn thành hiện thực bền vững.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#du-hoc"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid/90 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Du học &amp; Việc làm Singapore
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
              href="#mo-cong-ty"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-brand-gold bg-white px-6 py-3.5 text-sm font-semibold text-brand-gold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Mở công ty tại Singapore
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </div>

      </Container>
    </section>
  )
}
