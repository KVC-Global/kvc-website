"use client"

import { Container } from "@/components/ui/container"
import type { PublicStudyPageContent } from "@/sanity/public-study-page"
import { PublicStudyAbroadIntro } from "./public-intro"
import { PublicStudyAbroadWhy } from "./public-why"
import { PublicStudyAbroadPathways } from "./public-pathways"
import { PublicStudyAbroadRequirements } from "./public-requirements"
import { PublicStudyAbroadWorkRules } from "./public-work-rules"
import { PublicStudyAbroadSupport } from "./public-support"
import { PublicStudyAbroadFaqs } from "./public-faqs"
import { PublicStudyAbroadServices } from "./public-services"

export function PublicStudyAbroadDetails({
  className,
  content,
}: {
  className?: string
  content?: PublicStudyPageContent
}) {
  return (
    <div className="w-full bg-white pt-36 pb-16 sm:pt-40 md:pt-44 md:pb-24 dark:bg-background">
      {/* 1. Intro - Default container, no card */}
      <Container className={className}>
        <PublicStudyAbroadIntro content={content?.intro} />
      </Container>

      {/* 2. Why - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <PublicStudyAbroadWhy className="mt-0 md:mt-0" content={content?.why} />
        </div>
      </Container>

      {/* 3. Pathways - Default container, no card */}
      <Container className={className}>
        <PublicStudyAbroadPathways content={content?.pathways} />
      </Container>

      {/* 4. Requirements - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <PublicStudyAbroadRequirements className="mt-0 md:mt-0" content={content?.requirements} />
        </div>
      </Container>

      {/* 5. Work Rules - Default container, no card */}
      <Container className={className}>
        <PublicStudyAbroadWorkRules content={content?.workRules} />
      </Container>

      {/* 6. Support - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <PublicStudyAbroadSupport className="mt-0 md:mt-0" content={content?.support} />
        </div>
      </Container>

      {/* 7. FAQs - Default container, no card */}
      <Container className={className}>
        <PublicStudyAbroadFaqs content={content?.faqs} />
      </Container>

      {/* 8. Services & ContactForm Section - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <PublicStudyAbroadServices content={content?.relatedServices} />
        </div>
      </Container>
    </div>
  )
}
