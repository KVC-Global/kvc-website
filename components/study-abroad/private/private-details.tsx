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

      {/* 2. Why - Wide background with content aligned to default container */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-1 sm:px-1 md:px-2 lg:px-2 xl:max-w-[1376px] 2xl:max-w-[1536px]">
            <PrivateStudyAbroadWhy
              className="mt-0 md:mt-0"
              content={content?.why}
            />
          </div>
        </div>
      </Container>

      {/* 3. Schools - Default container, no card */}
      <Container className={cn("mt-16 md:mt-24", className)}>
        <PrivateStudyAbroadSchools content={content?.schools} />
      </Container>

      {/* 4. Requirements - Wide background with content aligned to default container */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-1 sm:px-1 md:px-2 lg:px-2 xl:max-w-[1376px] 2xl:max-w-[1536px]">
            <PrivateStudyAbroadRequirements
              className="mt-0 md:mt-0"
              content={content?.requirements}
            />
          </div>
        </div>
      </Container>

      {/* 5. Support - Default container, no card */}
      <Container className={cn("mt-16 md:mt-24", className)}>
        <PrivateStudyAbroadSupport content={content?.support} />
      </Container>

      {/* 6. FAQs - Wide background with content aligned to default container */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-1 sm:px-1 md:px-2 lg:px-2 xl:max-w-[1376px] 2xl:max-w-[1536px]">
            <PrivateStudyAbroadFaqs
              className="mt-0 md:mt-0"
              content={content?.faqs}
            />
          </div>
        </div>
      </Container>

      {/* 7. Services - Default container, no card */}
      <Container className={className}>
        <PrivateStudyAbroadServices content={content?.relatedServices} />
      </Container>
    </div>
  )
}
