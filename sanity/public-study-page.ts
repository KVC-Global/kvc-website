export type SanityImage = Record<string, unknown>

export interface PublicStudyStatItem {
  value?: string
  label?: string
  icon?: string
}

export interface PublicStudyHeroContent {
  eyebrow?: string
  title?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  backgroundImage?: SanityImage
  stats?: PublicStudyStatItem[]
}

export interface PublicStudyIntroContent {
  title?: string
  paragraph1?: string
  paragraph2?: string
  paragraph3?: string
  image?: SanityImage
  imageAlt?: string
}

export interface PublicStudyWhyItem {
  icon?: string
  title?: string
  description?: string
}

export interface PublicStudyWhyContent {
  title?: string
  videoUrl?: string
  videoTitle?: string
  videoPoster?: SanityImage
  items?: PublicStudyWhyItem[]
}

export interface PublicStudyPathwayCondition {
  icon?: string
  boldText?: string
  normalText?: string
}

export interface PublicStudyPathwayCard {
  eyebrow?: string
  title?: string
  description?: string
  conditions?: PublicStudyPathwayCondition[]
}

export interface PublicStudyCompareCard {
  title?: string
  duration?: string
  objective?: string
  criteria?: string
  feeReference?: string
}

export interface PublicStudyPathwaysContent {
  title?: string
  cards?: PublicStudyPathwayCard[]
  compareTitle?: string
  compareCard1?: PublicStudyCompareCard
  compareCard2?: PublicStudyCompareCard
}

export interface PublicStudyRequirementCheck {
  title?: string
  description?: string
}

export interface PublicStudyCostItem {
  item?: string
  fee?: string
}

export interface PublicStudyScholarshipItem {
  title?: string
  target?: string
  benefit?: string
  duration?: string
  standard?: string
}

export interface PublicStudyRequirementsContent {
  title1?: string
  title2?: string
  conditions?: PublicStudyRequirementCheck[]
  tipText1?: string
  costs?: PublicStudyCostItem[]
  tipText2?: string
  scholarshipEyebrow?: string
  scholarshipTitle?: string
  scholarship1?: PublicStudyScholarshipItem
  scholarship2?: PublicStudyScholarshipItem
}

export interface PublicStudyWorkRulesContent {
  title?: string
  sectionTitle1?: string
  sectionDesc1?: string
  conditions1?: string[]
  sectionTitle2?: string
  conditions2?: string[]
  warningText?: string
}

export interface PublicStudySupportStep {
  icon?: string
  title?: string
  description?: string
}

export interface PublicStudySupportContent {
  title?: string
  items?: PublicStudySupportStep[]
}

export interface PublicStudyFaqItem {
  question?: string
  answer?: string
}

export interface PublicStudyFaqsContent {
  title?: string
  items?: PublicStudyFaqItem[]
}

export interface PublicStudyRelatedServiceItem {
  _id?: string
  icon?: string
  title?: string
  ctaText?: string
  href?: string
}

export interface PublicStudyRelatedServicesContent {
  title?: string
  services?: PublicStudyRelatedServiceItem[]
}

export interface PublicStudySeoContent {
  title?: string
  description?: string
  shareImage?: SanityImage
}

export interface PublicStudyPageContent {
  _id: string
  language?: string
  hero?: PublicStudyHeroContent
  intro?: PublicStudyIntroContent
  why?: PublicStudyWhyContent
  pathways?: PublicStudyPathwaysContent
  requirements?: PublicStudyRequirementsContent
  workRules?: PublicStudyWorkRulesContent
  support?: PublicStudySupportContent
  faqs?: PublicStudyFaqsContent
  relatedServices?: PublicStudyRelatedServicesContent
  seo?: PublicStudySeoContent
}
