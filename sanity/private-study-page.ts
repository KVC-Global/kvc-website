export type SanityImage = Record<string, unknown>

export interface PrivateStudyStatItem {
  value?: string
  label?: string
  icon?: string
}

export interface PrivateStudyHeroContent {
  eyebrow?: string
  title?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  backgroundImage?: SanityImage
  stats?: PrivateStudyStatItem[]
}

export interface PrivateStudyIntroContent {
  title?: string
  paragraph1?: string
  paragraph2?: string
  paragraph3?: string
  image?: SanityImage
  imageAlt?: string
}

export interface PrivateStudyWhyItem {
  icon?: string
  title?: string
  description?: string
}

export interface PrivateStudyWhyContent {
  title?: string
  items?: PrivateStudyWhyItem[]
}

export interface PrivateStudySchoolLevel {
  grade?: string
  age?: string
  fee?: string
}

export interface PrivateStudySchoolItem {
  id?: string
  name?: string
  desc?: string
  levels?: PrivateStudySchoolLevel[]
}

export interface PrivateStudySchoolsContent {
  title?: string
  items?: PrivateStudySchoolItem[]
  tipText?: string
}

export interface PrivateStudyRequirementsContent {
  title1?: string
  title2?: string
  ageTitle?: string
  ageDesc?: string
  academicTitle?: string
  academicDesc?: string
  entryTitle?: string
  entryDesc?: string
  conditions?: string[]
  tipText?: string
}

export interface PrivateStudySupportStep {
  icon?: string
  title?: string
  description?: string
}

export interface PrivateStudySupportContent {
  title?: string
  items?: PrivateStudySupportStep[]
}

export interface PrivateStudyFaqItem {
  question?: string
  answer?: string
}

export interface PrivateStudyFaqsContent {
  title?: string
  items?: PrivateStudyFaqItem[]
}

export interface PrivateStudyRelatedServiceItem {
  _id?: string
  icon?: string
  title?: string
  ctaText?: string
  href?: string
}

export interface PrivateStudyRelatedServicesContent {
  title?: string
  services?: PrivateStudyRelatedServiceItem[]
}

export interface PrivateStudySeoContent {
  title?: string
  description?: string
  shareImage?: SanityImage
}

export interface PrivateStudyPageContent {
  _id: string
  language?: string
  hero?: PrivateStudyHeroContent
  intro?: PrivateStudyIntroContent
  why?: PrivateStudyWhyContent
  schools?: PrivateStudySchoolsContent
  requirements?: PrivateStudyRequirementsContent
  support?: PrivateStudySupportContent
  faqs?: PrivateStudyFaqsContent
  relatedServices?: PrivateStudyRelatedServicesContent
  seo?: PrivateStudySeoContent
}
