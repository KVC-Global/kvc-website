import type { SanityImage } from "./home-page"

export type PageHero = {
  breadcrumbHome?: string
  breadcrumbCurrent?: string
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

export type PageOffice = {
  _key?: string
  country?: string
  role?: string
  description?: string
  address?: string
  phone?: string
  email?: string
  hours?: string
  mapUrl?: string
  mapQuery?: string
  image?: SanityImage
  imageAlt?: string
}

export type PageSeo = {
  title?: string
  description?: string
  image?: SanityImage
}

export type SanityPartner = {
  _id?: string
  name: string
  logo?: SanityImage
  website?: string
}

export type AboutPageData = {
  hero?: PageHero
  stats?: Array<{
    _key?: string
    icon?: string
    value?: string
    label?: string
  }>
  story?: {
    eyebrow?: string
    title?: string
    description?: string
    image?: SanityImage
    imageAlt?: string
    visionTitle?: string
    visionDescription?: string
    missionTitle?: string
    missionDescription?: string
  }
  values?: {
    eyebrow?: string
    title?: string
    description?: string
    items?: Array<{
      _key?: string
      icon?: string
      title?: string
      description?: string
    }>
  }
  testimonials?: {
    eyebrow?: string
    title?: string
    description?: string
    reviews?: Array<{
      _key?: string
      name?: string
      role?: string
      quote?: string
      image?: SanityImage
      rating?: number
    }>
  }
  partners?: { eyebrow?: string; title?: string; partners?: SanityPartner[] }
  offices?: {
    eyebrow?: string
    title?: string
    description?: string
    offices?: PageOffice[]
  }
  seo?: PageSeo
}

export type ContactPageData = {
  hero?: PageHero
  info?: {
    title?: string
    description?: string
    phone?: string
    email?: string
    address?: string
    officeHoursTitle?: string
    weekdayHours?: string
    weekendHours?: string
    socialTitle?: string
    socialDescription?: string
    socialLinks?: Array<{
      _key?: string
      label?: string
      url?: string
      network?: string
    }>
  }
  form?: {
    title?: string
    description?: string
    nameLabel?: string
    emailLabel?: string
    phoneLabel?: string
    serviceLabel?: string
    messageLabel?: string
    consentLabel?: string
    submitLabel?: string
    serviceOptions?: Array<{ _key?: string; label?: string; value?: string }>
  }
  offices?: {
    eyebrow?: string
    title?: string
    description?: string
    offices?: PageOffice[]
  }
  seo?: PageSeo
}
