export type SanityImage = Record<string, unknown>

export type HomepageStat = {
  _key?: string
  value?: string
  label?: string
  icon?: string
}

export type HomepageHero = {
  eyebrow?: string
  titleLine1?: string
  titleLine2?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  backgroundImage?: SanityImage
  backgroundImageAlt?: string
}

export type HomepageAbout = {
  eyebrow?: string
  title?: string
  description?: string
  image?: SanityImage
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
}

export type HomepageReason = {
  _key?: string
  icon?: string
  title?: string
  description?: string
}

export type HomepageProcessStep = HomepageReason

export type HomepageGoogleReview = {
  _key?: string
  name?: string
  initial?: string
  color?: string
  text?: string
}

export type HomepageGoogleReviews = {
  rating?: number
  reviewCount?: number
  reviewUrl?: string
  reviews?: HomepageGoogleReview[]
}

export type HomepageSectionHeading = {
  eyebrow?: string
  title?: string
  description?: string
}

export type HomepageWhyProcessContent = {
  why?: HomepageSectionHeading & { cta?: string }
  process?: HomepageSectionHeading & { ariaLabel?: string }
}

export type HomepageSeo = {
  title?: string
  description?: string
  image?: SanityImage
}

export type HomePageData = {
  hero?: HomepageHero
  stats?: HomepageStat[]
  about?: HomepageAbout
  partnersContent?: HomepageSectionHeading
  servicesContent?: HomepageSectionHeading
  whyProcessContent?: HomepageWhyProcessContent
  testimonialsContent?: HomepageSectionHeading
  whyReasons?: HomepageReason[]
  processSteps?: HomepageProcessStep[]
  googleReviews?: HomepageGoogleReviews
  seo?: HomepageSeo
  featuredServices?: unknown[]
  featuredPartners?: unknown[]
  featuredTestimonials?: unknown[]
}
