"use client"

import { Container } from "@/components/ui/container"
import { WorkPassTarget } from "./work-pass-target"
import { WorkPassProcess } from "./work-pass-process"
import { WorkPassRequirements } from "./work-pass-requirements"
import { WorkPassFees } from "./work-pass-fees"
import { WorkPassReview } from "./work-pass-review"
import { WorkPassFaqs } from "./work-pass-faqs"
import { WorkPassServices } from "./work-pass-services"

export function WorkPassDetails({ className }: { className?: string }) {
  return (
    <div className="w-full bg-brand-light py-16 md:py-24">
      <Container className={className}>
        <WorkPassTarget />
        <WorkPassProcess />
        <WorkPassRequirements />
        <WorkPassFees />
        <WorkPassReview />
        <WorkPassFaqs />
        <WorkPassServices />
      </Container>
    </div>
  )
}
