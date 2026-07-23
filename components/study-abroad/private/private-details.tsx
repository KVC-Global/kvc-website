"use client"

import { Container } from "@/components/ui/container"
import { PrivateStudyAbroadIntro } from "./private-intro"
import { PrivateStudyAbroadWhy } from "./private-why"
import { PrivateStudyAbroadSchools } from "./private-schools"
import { PrivateStudyAbroadRequirements } from "./private-requirements"
import { PrivateStudyAbroadSupport } from "./private-support"
import { PrivateStudyAbroadFaqs } from "./private-faqs"
import { PrivateStudyAbroadServices } from "./private-services"

export function PrivateStudyAbroadDetails({ className }: { className?: string }) {
  return (
    <div className="w-full bg-brand-light pt-24 pb-16 md:pt-32 md:pb-24 dark:bg-background">
      <Container className={className}>
        <PrivateStudyAbroadIntro />
        <PrivateStudyAbroadWhy />
        <PrivateStudyAbroadSchools />
        <PrivateStudyAbroadRequirements />
        <PrivateStudyAbroadSupport />
        <PrivateStudyAbroadFaqs />
        <PrivateStudyAbroadServices />
      </Container>
    </div>
  )
}
