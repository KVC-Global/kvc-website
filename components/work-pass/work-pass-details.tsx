"use client"

import { Container } from "@/components/ui/container"
import type { WorkPassPageData } from "@/sanity/work-pass-page"
import { WorkPassTarget } from "./work-pass-target"
import { WorkPassProcess } from "./work-pass-process"
import { WorkPassRequirements } from "./work-pass-requirements"
import { WorkPassFees } from "./work-pass-fees"
import { WorkPassReview } from "./work-pass-review"
import { WorkPassFaqs } from "./work-pass-faqs"
import { WorkPassServices } from "./work-pass-services"

export function WorkPassDetails({
  className,
  content,
}: {
  className?: string
  content?: WorkPassPageData
}) {
  return (
    <div className="w-full bg-brand-light pt-36 pb-16 sm:pt-40 md:pt-44 md:pb-24">
      <Container className={className}>
        <WorkPassTarget content={content?.target} />
        <WorkPassProcess content={content?.process} />
        <WorkPassRequirements content={content?.requirements} />
        <WorkPassFees content={content?.fees} />
        <WorkPassReview content={content?.review} />
        <WorkPassFaqs content={content?.faqs} />
        <WorkPassServices content={content?.relatedServices} />
      </Container>
    </div>
  )
}
