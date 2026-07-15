"use client"

import { Container } from "@/components/ui/container"
import { StudyAbroadIntro } from "./study-abroad-intro"
import { StudyAbroadWhy } from "./study-abroad-why"
import { StudyAbroadMajors } from "./study-abroad-majors"
import { StudyAbroadRequirements } from "./study-abroad-requirements"
import { StudyAbroadProspects } from "./study-abroad-prospects"
import { StudyAbroadSupport } from "./study-abroad-support"
import { StudyAbroadTestimonials } from "./study-abroad-testimonials"
import { StudyAbroadFaqs } from "./study-abroad-faqs"
import { StudyAbroadServices } from "./study-abroad-services"

export function StudyAbroadDetails({ className }: { className?: string }) {
  return (
    <div className="w-full bg-brand-light py-16 md:py-24">
      <Container className={className}>
        <StudyAbroadIntro />
        <StudyAbroadWhy />
        
        {/* Majors & Requirements Side-by-Side Grid Row */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <StudyAbroadMajors />
          <StudyAbroadRequirements />
        </div>

        {/* Prospects & Support Side-by-Side Grid Row */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <StudyAbroadProspects />
          <StudyAbroadSupport />
        </div>

        <StudyAbroadTestimonials />
        <StudyAbroadFaqs />
        <StudyAbroadServices />
      </Container>
    </div>
  )
}
