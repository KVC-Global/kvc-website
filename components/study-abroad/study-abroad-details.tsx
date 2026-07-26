"use client"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import type { StudyAbroadPageContent } from "@/sanity/study-abroad-page"
import { StudyAbroadIntro } from "./study-abroad-intro"
import { StudyAbroadWhy } from "./study-abroad-why"
import { StudyAbroadMajors } from "./study-abroad-majors"
import { StudyAbroadRequirements } from "./study-abroad-requirements"
import { StudyAbroadProspects } from "./study-abroad-prospects"
import { StudyAbroadSupport } from "./study-abroad-support"
import { StudyAbroadTestimonials } from "./study-abroad-testimonials"
import { StudyAbroadFaqs } from "./study-abroad-faqs"
import { StudyAbroadServices } from "./study-abroad-services"

export function StudyAbroadDetails({
  className,
  content,
}: {
  className?: string
  content?: StudyAbroadPageContent
}) {
  return (
    <div className="w-full bg-white pt-36 pb-16 sm:pt-40 md:pt-44 md:pb-24">
      {/* 1. Intro - Default container, no card */}
      <Container className={className}>
        <StudyAbroadIntro content={content?.intro} />
      </Container>

      {/* 2. Why - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <StudyAbroadWhy className="mt-0 md:mt-0" content={content?.why} />
        </div>
      </Container>

      {/* 3. Majors & Requirements Row - Default container, no card */}
      <Container className={cn("mt-16 md:mt-24", className)}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <StudyAbroadMajors content={content?.majors} />
          <StudyAbroadRequirements content={content?.requirements} />
        </div>
      </Container>

      {/* 4. Prospects & Support Row - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <StudyAbroadProspects content={content?.prospects} />
            <StudyAbroadSupport content={content?.support} />
          </div>
        </div>
      </Container>

      {/* 5. Testimonials - Default container, no card */}
      <Container className={className}>
        <StudyAbroadTestimonials content={content?.testimonials} />
      </Container>

      {/* 6. FAQs - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <StudyAbroadFaqs className="mt-0 md:mt-0" content={content?.faqs} />
        </div>
      </Container>

      {/* 7. Services - Default container, no card */}
      <Container className={className}>
        <StudyAbroadServices content={content?.services} />
      </Container>
    </div>
  )
}
