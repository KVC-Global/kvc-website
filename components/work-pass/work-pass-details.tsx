"use client"

import { Container } from "@/components/ui/container"
import { WorkPassTarget } from "./work-pass-target"
import { WorkPassProcess } from "./work-pass-process"
import { WorkPassRequirements } from "./work-pass-requirements"
import { WorkPassFees } from "./work-pass-fees"

export function WorkPassDetails({ className }: { className?: string }) {
  return (
    <div className="w-full bg-brand-light py-16 md:py-24">
      <Container className={className}>
        <WorkPassTarget />
        <WorkPassProcess />
        <WorkPassRequirements />
        <WorkPassFees />
      </Container>
    </div>
  )
}
