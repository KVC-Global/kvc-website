"use client"

import { Container } from "@/components/ui/container"
import { PublicStudyAbroadIntro } from "./public-intro"
import { PublicStudyAbroadWhy } from "./public-why"
import { PublicStudyAbroadPathways } from "./public-pathways"
import { PublicStudyAbroadRequirements } from "./public-requirements"
import { PublicStudyAbroadWorkRules } from "./public-work-rules"
import { PublicStudyAbroadSupport } from "./public-support"
import { PublicStudyAbroadFaqs } from "./public-faqs"
import { PublicStudyAbroadServices } from "./public-services"

export function PublicStudyAbroadDetails({ className }: { className?: string }) {
  return (
    <div className="w-full bg-brand-light pt-24 pb-16 md:pt-32 md:pb-24 dark:bg-background">
      <Container className={className}>
        <PublicStudyAbroadIntro />
        <PublicStudyAbroadWhy />
        <PublicStudyAbroadPathways />
        <PublicStudyAbroadRequirements />
        <PublicStudyAbroadWorkRules />
        <PublicStudyAbroadSupport />
        <PublicStudyAbroadFaqs />
        <PublicStudyAbroadServices />
      </Container>
    </div>
  )
}
