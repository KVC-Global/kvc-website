export type SanityImage = Record<string, unknown>

export interface UniMasterStatItem {
  value?: string
  label?: string
  icon?: string
}

export interface UniMasterHeroContent {
  eyebrow?: string
  title?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  backgroundImage?: SanityImage
  stats?: UniMasterStatItem[]
}

export interface UniMasterIntroContent {
  title?: string
  highlightText?: string
  criteria?: string[]
  remainingText?: string
  image?: SanityImage
  imageAlt?: string
}

export interface UniMasterWhyItem {
  icon?: string
  title?: string
  description?: string
}

export interface UniMasterWhyContent {
  title?: string
  items?: UniMasterWhyItem[]
}

export interface UniMasterAudienceItem {
  icon?: string
  title?: string
  desc?: string
}

export interface UniMasterAudienceContent {
  title?: string
  items?: UniMasterAudienceItem[]
}

export interface UniMasterCommitmentItem {
  icon?: string
  title?: string
  description?: string
}

export interface UniMasterCommitmentContent {
  title?: string
  items?: UniMasterCommitmentItem[]
}

export interface UniMasterRelatedServiceItem {
  _id?: string
  icon?: string
  title?: string
  ctaText?: string
  href?: string
}

export interface UniMasterRelatedServicesContent {
  title?: string
  services?: UniMasterRelatedServiceItem[]
}

export interface UniMasterSeoContent {
  title?: string
  description?: string
  shareImage?: SanityImage
}

export interface UniMasterPageContent {
  _id: string
  language?: string
  hero?: UniMasterHeroContent
  intro?: UniMasterIntroContent
  why?: UniMasterWhyContent
  audience?: UniMasterAudienceContent
  commitment?: UniMasterCommitmentContent
  relatedServices?: UniMasterRelatedServicesContent
  seo?: UniMasterSeoContent
}
