"use client"

import { Container } from "@/components/ui/container"
import { UniMasterIntro } from "./uni-master-intro"
import { UniMasterWhy } from "./uni-master-why"
import { UniMasterAudience } from "./uni-master-audience"
import { UniMasterCommitment } from "./uni-master-commitment"
import { UniMasterServices } from "./uni-master-services"

export function UniMasterStudyAbroadDetails({ className }: { className?: string }) {
  return (
    <div className="w-full bg-white pt-10 pb-16 md:pt-12 md:pb-24 dark:bg-background">
      {/* 1. Intro - Default container, no card */}
      <Container className={className}>
        <UniMasterIntro />
      </Container>

      {/* 2. Why - Wrapped in a rounded-lg bg-muted card */}
      <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none mt-16 md:mt-24">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <UniMasterWhy className="mt-0 md:mt-0" />
        </div>
      </Container>

      {/* 3. Audience - Default container, no card */}
      <Container className={className}>
        <UniMasterAudience />
      </Container>

      {/* 4. Commitment - Wrapped in a rounded-lg bg-muted card */}
      <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none mt-16 md:mt-24">
        <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <UniMasterCommitment className="mt-0 md:mt-0" />
        </div>
      </Container>

      {/* 5. Services - Default container, no card */}
      <Container className={className}>
        <UniMasterServices />
      </Container>
    </div>
  )
}
