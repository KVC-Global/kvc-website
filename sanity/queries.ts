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

export const WORK_PASS_PAGE_QUERY = defineQuery(`
  *[_type == "workPassPage" && language == $lang][0]{
    "hero": heroSection{
      title, description,
      primaryButtonLabel, primaryButtonHref,
      secondaryButtonLabel, secondaryButtonHref,
      backgroundImage,
      stats[]{_key, value, label, icon},
      googleReviewValue, googleReviewLabel
    },
    "target": targetSection{
      title,
      items[]{_key, icon, title, description}
    },
    "process": processSection{
      title,
      steps[]{_key, icon, title, description}
    },
    "requirements": requirementsSection{
      title,
      conditionsTitle,
      conditions,
      documentsTitle,
      documents,
      image,
      imageAlt
    },
    "fees": feesSection{
      title,
      feesTitle,
      feesCategoryHeader,
      feesCostHeader,
      feesList[]{_key, category, cost},
      feesNote,
      processingTitle,
      processingItems[]{_key, icon, title, description}
    },
    "review": reviewSection{
      testimonial{
        name, role, quote, image, rating
      },
      caseStudy{
        tagline, description, ctaLabel, ctaHref, image
      }
    },
    "faqs": faqsSection{
      title,
      faqs[]{_key, question, answer}
    },
    "services": servicesSection{
      title,
      services[]{_key, icon, title, cta, href}
    },
    seo{title, description, image}
  }
`)

export const STUDY_ABROAD_PAGE_QUERY = defineQuery(`
  *[_type == "studyAbroadPage" && language == $lang][0] {
    _id,
    language,
    "hero": heroSection {
      eyebrow,
      title,
      description,
      primaryButtonLabel,
      primaryButtonHref,
      secondaryButtonLabel,
      secondaryButtonHref,
      backgroundImage,
      stats[]{_key, value, label, icon}
    },
    "intro": introSection {
      title,
      highlightText,
      bullets,
      paragraphs,
      image,
      imageAlt
    },
    "why": whySection {
      title,
      items[]{_key, icon, title, description}
    },
    "majors": majorsSection {
      title,
      items[]{_key, icon, name}
    },
    "requirements": requirementsSection {
      title,
      conditions,
      tipText,
      image,
      imageAlt
    },
    "prospects": prospectsSection {
      title,
      opportunities,
      image,
      imageAlt
    },
    "support": supportSection {
      title,
      steps[]{_key, icon, text}
    },
    "testimonials": testimonialsSection {
      title,
      testimonials[]{_key, name, role, avatar, rating, quote}
    },
    "faqs": faqsSection {
      title,
      faqs[]{_key, question, answer}
    },
    "services": servicesSection {
      title,
      services[]{_key, title, ctaText, icon, href}
    },
    seo{title, description, shareImage}
  }
`)

export const UNI_MASTER_PAGE_QUERY = defineQuery(`
  *[_type == "uniMasterPage" && language == $lang][0] {
    _id,
    language,
    "hero": heroSection {
      eyebrow,
      title,
      description,
      primaryButtonLabel,
      primaryButtonHref,
      secondaryButtonLabel,
      secondaryButtonHref,
      backgroundImage,
      stats[]{_key, value, label, icon}
    },
    "intro": introSection {
      title,
      highlightText,
      criteria,
      remainingText,
      image,
      imageAlt
    },
    "why": whySection {
      title,
      items[]{_key, icon, title, description}
    },
    "audience": audienceSection {
      title,
      items[]{_key, icon, title, desc}
    },
    "commitment": commitmentSection {
      title,
      items[]{_key, icon, title, description}
    },
    "services": servicesSection {
      title,
      services[]{_key, title, ctaText, icon, href}
    },
    seo{title, description, shareImage}
  }
`)

