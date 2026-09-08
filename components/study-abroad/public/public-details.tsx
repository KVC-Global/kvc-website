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

      {/* 2. Why - Wide background with content aligned to default container */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-1 sm:px-1 md:px-2 lg:px-2 xl:max-w-[1376px] 2xl:max-w-[1536px]">
            <PublicStudyAbroadWhy
              className="mt-0 md:mt-0"
              content={content?.why}
            />
          </div>
        </div>
      </Container>

      {/* 3. Pathways - Default container, no card */}
      <Container className={className}>
        <PublicStudyAbroadPathways content={content?.pathways} />
      </Container>

      {/* 4. Requirements - Wide background with content aligned to default container */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-1 sm:px-1 md:px-2 lg:px-2 xl:max-w-[1376px] 2xl:max-w-[1536px]">
            <PublicStudyAbroadRequirements
              className="mt-0 md:mt-0"
              content={content?.requirements}
            />
          </div>
        </div>
      </Container>

      {/* 5. Work Rules - Default container, no card */}
      <Container className={className}>
        <PublicStudyAbroadWorkRules content={content?.workRules} />
      </Container>

      {/* 6. Support - Wide background with content aligned to default container */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-1 sm:px-1 md:px-2 lg:px-2 xl:max-w-[1376px] 2xl:max-w-[1536px]">
            <PublicStudyAbroadSupport
              className="mt-0 md:mt-0"
              content={content?.support}
            />
          </div>
        </div>
      </Container>

      {/* 7. FAQs - Default container, no card */}
      <Container className={className}>
        <PublicStudyAbroadFaqs content={content?.faqs} />
      </Container>

      {/* 8. Services - Wide background with content aligned to default container */}
      <Container className="mt-16 max-w-none px-4 sm:px-5 md:mt-24 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-muted py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full px-1 sm:px-1 md:px-2 lg:px-2 xl:max-w-[1376px] 2xl:max-w-[1536px]">
            <PublicStudyAbroadServices content={content?.relatedServices} />
          </div>
        </div>
      </Container>
    </div>
  )
}
