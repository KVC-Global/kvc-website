import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const ACCENT = "var(--color-secondary)"

type Service = {
  title: string
  description: string
  image: string
  alt: string
  href: string
}

const SERVICES: ReadonlyArray<Service> = [
  {
    title: "Business Visa",
    description:
      "Đồng hành cùng doanh nhân trong hành trình mở rộng kinh doanh và định cư Singapore với giải pháp toàn diện.",
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=720&h=540&q=80&auto=format&fit=crop",
    alt: "Doanh nhân bắt tay hợp tác kinh doanh tại văn phòng",
    href: "#business-visa",
  },
  {
    title: "Student Visa",
    description:
      "Hỗ trợ sinh viên quốc tế nhập học tại các trường hàng đầu Singapore và xử lý visa nhanh chóng, an toàn.",
    image: "/images/singapore-student.jpeg",
    alt: "Sinh viên quốc tế trong lễ tốt nghiệp tại Singapore",
    href: "#student-visa",
  },
  {
    title: "Work Visa",
    description:
      "Giải pháp visa lao động chuyên nghiệp cho người đi làm việc tại Singapore cùng hỗ trợ định cư lâu dài.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=720&h=540&q=80&auto=format&fit=crop",
    alt: "Chuyên gia làm việc với laptop tại không gian làm việc hiện đại",
    href: "#work-visa",
  },
  {
    title: "Tourist Visa",
    description:
      "Thủ tục visa du lịch đơn giản, nhanh gọn để bạn và gia đình khám phá Singapore bất cứ lúc nào.",
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=720&h=540&q=80&auto=format&fit=crop",
    alt: "Du khách khám phá khu phố Singapore hiện đại",
    href: "#tourist-visa",
  },
] as const

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm bg-white p-5 text-foreground shadow-[0_18px_40px_-22px_rgba(10,37,64,0.35)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-brand-blue hover:text-white hover:shadow-[0_28px_60px_-22px_rgba(10,37,64,0.45)]"
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
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <a
        href={service.href}
        className="mt-auto inline-flex items-center justify-between gap-3 pt-5 text-sm font-semibold tracking-[0.16em] text-foreground uppercase transition-colors duration-300 group-hover:text-secondary"
      >
        <span>Read More</span>
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:bg-secondary"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.75} />
        </span>
      </a>
    </article>
  )
}

export function SiteServices({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="services-heading"
      className={cn("w-full bg-muted py-20 sm:py-24", className)}
    >
      <Container>
        <div className="text-center">
          <p className="font-sans text-[13px] font-bold tracking-[0.28em] text-primary uppercase">
            Dịch vụ của chúng tôi
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-3xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-4xl md:text-[40px]"
          >
            Giải pháp toàn diện cho tương lai của bạn
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-[3px] w-16 rounded-full bg-secondary"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Container>
    </section>
  )
}

// Expose brand tokens for cross-component consistency if needed elsewhere.
export const SITE_SERVICES_BRAND = { ACCENT } as const
