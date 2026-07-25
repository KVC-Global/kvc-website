import { defineQuery } from "next-sanity"

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && language == $lang][0]{
    "hero": heroSection{
      eyebrow, titleLine1, titleLine2, description,
      primaryButtonLabel, primaryButtonHref,
      secondaryButtonLabel, secondaryButtonHref,
      backgroundImage, backgroundImageAlt
    },
    "stats": statsSection.items[]{_key, value, label, icon},
    "about": aboutSection{
      eyebrow, title, description, image, imageAlt, ctaLabel, ctaHref
    },
    "partnersContent": partnersSection{eyebrow, title},
    "servicesContent": servicesSection{eyebrow, title, description},
    "whyProcessContent": whyProcessSection{
      why{eyebrow, title, cta},
      process{eyebrow, title, ariaLabel}
    },
    "testimonialsContent": testimonialsSection{eyebrow, title},
    "whyReasons": whyProcessSection.why.reasons[]{_key, icon, title, description},
    "processSteps": whyProcessSection.process.steps[]{_key, icon, title, description},
    "googleReviews": testimonialsSection.googleReviews{
      rating, reviewCount, reviewUrl,
      reviews[]{_key, name, initial, color, text}
    },
    seo{title, description, image},
    "featuredServices": servicesSection.services[]->{
      _id, title, description, slug, icon, image, alt
    },
    "featuredPartners": partnersSection.partners[]->{
      _id, name, logo, website
    },
    "featuredTestimonials": testimonialsSection.testimonials[]->{
      _id, name, role, company, quote, image, rating
    }
  }
`)

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial" && (!defined(language) || language == $lang)] | order(name asc)`
)

export const PARTNERS_QUERY = defineQuery(
  `*[_type == "partner" && (!defined(language) || language == $lang)] | order(name asc)`
)

export const SERVICES_QUERY = defineQuery(
  `*[_type == "service" && (!defined(language) || language == $lang)] | order(title asc)`
)

export const FAQS_QUERY = defineQuery(`*[_type == "faq"] | order(order asc)`)
