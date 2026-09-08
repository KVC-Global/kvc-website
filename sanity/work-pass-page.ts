export type SanityImage = Record<string, unknown>

export type WorkPassStat = {
  _key?: string
  value?: string
  label?: string
  icon?: string
}

export type WorkPassHeroContent = {
  title?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  backgroundImage?: SanityImage
  stats?: WorkPassStat[]
  googleReviewValue?: string
  googleReviewLabel?: string
}

export type WorkPassTargetItem = {
  _key?: string
  icon?: string
  title?: string
  description?: string
}

export type WorkPassTargetContent = {
  title?: string
  items?: WorkPassTargetItem[]
}

export type WorkPassProcessStep = {
  _key?: string
  icon?: string
  title?: string
  description?: string
}

export type WorkPassProcessContent = {
  title?: string
  steps?: WorkPassProcessStep[]
}

export type WorkPassRequirementsContent = {
  title?: string
  conditionsTitle?: string
  conditions?: string[]
  documentsTitle?: string
  documents?: string[]
  image?: SanityImage
  imageAlt?: string
}

export type WorkPassFeeItem = {
  _key?: string
  category?: string
  cost?: string
}

export type WorkPassProcessingItem = {
  _key?: string
  icon?: string
  title?: string
  description?: string
}

export type WorkPassFeesContent = {
  title?: string
  feesTitle?: string
  feesCategoryHeader?: string
  feesCostHeader?: string
  feesList?: WorkPassFeeItem[]
  feesNote?: string
  processingTitle?: string
  processingItems?: WorkPassProcessingItem[]
}

export type WorkPassTestimonial = {
  name?: string
  role?: string
  quote?: string
  image?: SanityImage
  rating?: number
}

export type WorkPassCaseStudy = {
  tagline?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  image?: SanityImage
}

export type WorkPassReviewContent = {
  testimonial?: WorkPassTestimonial
  caseStudy?: WorkPassCaseStudy
}

export type WorkPassFaqItem = {
  _key?: string
  question?: string
  answer?: string
}

export type WorkPassFaqsContent = {
  title?: string
  faqs?: WorkPassFaqItem[]
}

export type WorkPassRelatedServiceItem = {
  _id?: string
  icon?: string
  title?: string
  ctaText?: string
  href?: string
}

export type WorkPassRelatedServicesContent = {
  title?: string
  services?: WorkPassRelatedServiceItem[]
}

export type WorkPassSeo = {
  title?: string
  description?: string
  image?: SanityImage
}

export type WorkPassPageData = {
  hero?: WorkPassHeroContent
  target?: WorkPassTargetContent
  process?: WorkPassProcessContent
  requirements?: WorkPassRequirementsContent
  fees?: WorkPassFeesContent
  review?: WorkPassReviewContent
  faqs?: WorkPassFaqsContent
  relatedServices?: WorkPassRelatedServicesContent
  seo?: WorkPassSeo
}
