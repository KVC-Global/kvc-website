export type SanityImage = Record<string, unknown>

export type StudyAbroadStat = {
  _key?: string
  value?: string
  label?: string
  icon?: string
}

export type StudyAbroadHeroContent = {
  eyebrow?: string
  title?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  backgroundImage?: SanityImage
  stats?: StudyAbroadStat[]
}

export type StudyAbroadIntroContent = {
  title?: string
  highlightText?: string
  bullets?: string[]
  paragraphs?: string[]
  image?: SanityImage
  imageAlt?: string
}

export type StudyAbroadWhyItem = {
  _key?: string
  icon?: string
  title?: string
  description?: string
}

export type StudyAbroadWhyContent = {
  title?: string
  items?: StudyAbroadWhyItem[]
}

export type StudyAbroadMajorItem = {
  _key?: string
  icon?: string
  name?: string
}

export type StudyAbroadMajorsContent = {
  title?: string
  items?: StudyAbroadMajorItem[]
}

export type StudyAbroadRequirementsContent = {
  title?: string
  conditions?: string[]
  tipText?: string
  image?: SanityImage
  imageAlt?: string
}

export type StudyAbroadProspectsContent = {
  title?: string
  opportunities?: string[]
  image?: SanityImage
  imageAlt?: string
}

export type StudyAbroadSupportStep = {
  _key?: string
  icon?: string
  text?: string
}

export type StudyAbroadSupportContent = {
  title?: string
  steps?: StudyAbroadSupportStep[]
}

export type StudyAbroadTestimonialItem = {
  _key?: string
  name?: string
  role?: string
  avatar?: SanityImage
  rating?: number
  quote?: string
}

export type StudyAbroadTestimonialsContent = {
  title?: string
  testimonials?: StudyAbroadTestimonialItem[]
}

export type StudyAbroadFaqItem = {
  _key?: string
  question?: string
  answer?: string
}

export type StudyAbroadFaqsContent = {
  title?: string
  faqs?: StudyAbroadFaqItem[]
}

export type StudyAbroadRelatedServiceItem = {
  _id?: string
  icon?: string
  title?: string
  ctaText?: string
  href?: string
}

export type StudyAbroadRelatedServicesContent = {
  title?: string
  services?: StudyAbroadRelatedServiceItem[]
}

export type StudyAbroadSeoContent = {
  title?: string
  description?: string
  shareImage?: SanityImage
}

export type StudyAbroadPageContent = {
  _id?: string
  language?: string
  hero?: StudyAbroadHeroContent
  intro?: StudyAbroadIntroContent
  why?: StudyAbroadWhyContent
  majors?: StudyAbroadMajorsContent
  requirements?: StudyAbroadRequirementsContent
  prospects?: StudyAbroadProspectsContent
  support?: StudyAbroadSupportContent
  testimonials?: StudyAbroadTestimonialsContent
  faqs?: StudyAbroadFaqsContent
  relatedServices?: StudyAbroadRelatedServicesContent
  seo?: StudyAbroadSeoContent
}
