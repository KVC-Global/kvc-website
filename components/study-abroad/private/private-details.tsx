"use client"

import { Container } from "@/components/ui/container"
import type { PrivateStudyPageContent } from "@/sanity/private-study-page"
import { PrivateStudyAbroadIntro } from "./private-intro"
import { PrivateStudyAbroadWhy } from "./private-why"
import { PrivateStudyAbroadSchools } from "./private-schools"
import { PrivateStudyAbroadRequirements } from "./private-requirements"
import { PrivateStudyAbroadSupport } from "./private-support"
import { PrivateStudyAbroadFaqs } from "./private-faqs"
import { PrivateStudyAbroadServices } from "./private-services"

import { cn } from "@/lib/utils"

export function PrivateStudyAbroadDetails({
  className,
  content,
}: {
  className?: string
  content?: PrivateStudyPageContent
}) {
  return (
    <div className="w-full bg-white pt-36 pb-16 sm:pt-40 md:pt-44 md:pb-24 dark:bg-background">
      {/* 1. Intro - Default container, no card */}
      <Container className={className}>
        <PrivateStudyAbroadIntro content={content?.intro} />
      </Container>

      {/* 2. Why - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <PrivateStudyAbroadWhy className="mt-0 md:mt-0" content={content?.why} />
        </div>
      </Container>

      {/* 3. Schools - Default container, no card */}
      <Container className={cn("mt-16 md:mt-24", className)}>
        <PrivateStudyAbroadSchools content={content?.schools} />
      </Container>

      {/* 4. Requirements - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <PrivateStudyAbroadRequirements className="mt-0 md:mt-0" content={content?.requirements} />
        </div>
      </Container>

      {/* 5. Support - Default container, no card */}
      <Container className={cn("mt-16 md:mt-24", className)}>
        <PrivateStudyAbroadSupport content={content?.support} />
      </Container>

      {/* 6. FAQs - Wrapped in a rounded-lg bg-muted card */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <PrivateStudyAbroadFaqs className="mt-0 md:mt-0" content={content?.faqs} />
        </div>
      </Container>

      {/* 7. Services - Default container, no card */}
      <Container className={className}>
        <PrivateStudyAbroadServices content={content?.relatedServices} />
      </Container>
    </div>
  )
}
