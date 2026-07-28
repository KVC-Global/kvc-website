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

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && language == $lang][0]{
    "hero": heroSection,
    "stats": statsSection.items[]{_key, icon, value, label},
    "story": storySection,
    "values": valuesSection{eyebrow, title, description, items[]{_key, icon, title, description}},
    "testimonials": testimonialsSection{
      eyebrow, title, description,
      reviews[]{_key, name, role, quote, image, rating}
    },
    "partners": {
      "eyebrow": partnersSection.eyebrow,
      "title": partnersSection.title,
      "partners": select(
        count(partnersSection.partners) > 0 => partnersSection.partners[]->{_id, name, logo, website},
        *[_type == "partner"] | order(name asc){_id, name, logo, website}
      )
    },
    "offices": officesSection{
      eyebrow, title, description,
      offices[]{_key, country, role, description, address, phone, email, hours, mapUrl, mapQuery, image, imageAlt}
    },
    seo{title, description, image}
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage" && language == $lang][0]{
    "hero": heroSection,
    "info": infoSection{
      title, description, phone, email, address, officeHoursTitle, weekdayHours, weekendHours,
      socialTitle, socialDescription, socialLinks[]{_key, label, url, network}
    },
    "form": formSection{
      title, description, nameLabel, emailLabel, phoneLabel, serviceLabel, messageLabel,
      consentLabel, submitLabel, serviceOptions[]{_key, label, value}
    },
    "offices": officesSection{
      eyebrow, title, description,
      offices[]{_key, country, role, description, address, phone, email, hours, mapUrl, mapQuery, image, imageAlt}
    },
    seo{title, description, image}
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

// --- New Content Pages ---

export const KHOA_HOC_ONLINE_PAGE_QUERY = defineQuery(`
  *[_type == "khoaHocOnlinePage" && language == $lang][0]{
    heroSection{
      eyebrow, title, description,
      primaryButtonLabel, primaryButtonHref,
      secondaryButtonLabel, secondaryButtonHref,
      stats[]{_key, icon, value, label}
    },
    introSection{
      title, highlightText, paragraphs, bullets, image, imageAlt
    },
    programsSection{
      title,
      items[]{_key, icon, name, description, duration, highlights},
      requirements, prospects,
      supportSteps[]{_key, icon, text}
    },
    whySection{
      eyebrow, title,
      items[]{_key, icon, title, description}
    },
    ctaSection{title, description, buttonLabel, buttonHref},
    testimonialsSection{
      eyebrow, title,
      testimonials[]{_key, name, role, quote, rating}
    },
    servicesSection{
      eyebrow, title,
      "services": services[]{title, icon, href, ctaText}
    },
    faqsSection{eyebrow, title, faqs[]{_key, question, answer}},
    seo{title, description}
  }
`)

export const DICH_VU_PAGE_QUERY = defineQuery(`
  *[_type == "dichVuPage" && language == $lang][0]{
    heroSection{
      backgroundImage, backgroundImageAlt,
      eyebrow, title, description,
      primaryButtonLabel, primaryButtonHref,
      secondaryButtonLabel, secondaryButtonHref,
      stats[]{_key, icon, value, label}
    },
    introSection{
      eyebrow, title,
      pillars[]{_key, icon, label},
      paragraph1, paragraph2
    },
    serviceCategories{
      eyebrow, title,
      categories[]{_key, icon, title, description, href, image, imageAlt}
    },
    accordionSections{
      eyebrow,
      sections[]{
        _key, tag, heading, headingAccent,
        intro, image, imageAlt,
        services[]{title, items},
        audience{label, items},
        benefits{label, items},
        singaporeSubTabs[]{label, icon, intro, services[]{title, items}, audience{label, items}, benefits{label, items}},
        ctaLabel, ctaHref, ctaIcon, crossLinkText
      }
    },
    whySection{
      eyebrow, title,
      items[]{_key, icon, title, description}
    },
    processSection{
      eyebrow, title,
      steps[]{_key, icon, title, description}
    },
    testimonialsSection{
      eyebrow, title,
      testimonials[]{_key, name, role, quote, rating}
    },
    partnersSection{
      eyebrow, title,
      "partners": partners[]->{_id, name, logo, website}
    },
    faqsSection{eyebrow, title, faqs[]{_key, question, answer}},
    seo{title, description}
  }
`)

// --- Online Program Subpages ---

export const ONLINE_PROGRAM_PAGE_QUERY = defineQuery(`
  *[_type == "onlineProgramPage" && language == $lang && slug == $slug][0]{
    heroSection{
      tagline, title, subtitle, description, breadcrumb,
      primaryButtonLabel, primaryButtonHref
    },
    introSection{title, paragraphs, highlights},
    whySection{title, items[]{title, description}},
    formatSection{title, items},
    audienceSection{title, items},
    benefitsSection{title, items},
    processSection{title, steps[]{step}},
    ctaSection{title, body, buttonLabel, buttonHref},
    programsSection{title, items[]{name, duration, startDates, subjects, entryRequirements}},
    seo{title, description}
  }
`)
