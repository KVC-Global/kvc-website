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

export const DICH_VU_PAGE_QUERY = defineQuery(`
  *[_type == "dichVuPage" && language == $lang][0]{
    heroSection{
      backgroundImage, backgroundImageAlt,
      eyebrow, title,
      primaryButtonLabel, primaryButtonHref,
      secondaryButtonLabel, secondaryButtonHref,
      stats[]{_key, icon, value, label}
    },
    introSection{
      eyebrow, title,
      pillars[]{_key, icon, label},
      paragraph1, paragraph2
    },
    serviceCategories{eyebrow, title},
    accordionSections{
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
    seo{title, description}
  }
`)

// --- Online Program Subpages ---

export const ONLINE_PROGRAM_PAGE_QUERY = defineQuery(`
  *[_type == "onlineProgramPage" && language == $lang && slug == $slug][0]{
    heroSection{
      parentBreadcrumb, tagline, title, subtitle, description, breadcrumb,
      primaryButtonLabel, primaryButtonHref,
      "backgroundImage": coalesce(backgroundImage.asset->url, select(backgroundImage._type == "image" => null, backgroundImage))
    },
    introSection{
      title, paragraphs, highlights, imageAlt,
      "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
    },
    structureSection{title, subtitle, items[]{title, description}},
    whySection{title, items[]{icon, title, description}},
    supportSection{title, items},
    formatSection{title, items[]{icon, title, description}, checklist},
    audienceSection{title, items[]{icon, title, description}},
    progressionSection{
      title, body, tags, noteTitle, noteBody, imageAlt,
      "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
    },
    benefitsSection{
      title,
      items[]{
        title, description,
        "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
      }
    },
    processSection{title, steps[]{title, description}},
    ctaSection{title, body, buttonLabel, buttonHref},
    programsSection{title, items[]{name, duration, startDates, subjects, entryRequirements}},
    seo{title, description}
  }
`)

export const ONLINE_OSSD_PAGE_QUERY = defineQuery(`
  *[_type == "onlineOssdPage" && language == $lang][0]{
    heroSection{
      parentBreadcrumb, tagline, title, subtitle, description, breadcrumb,
      primaryButtonLabel, primaryButtonHref,
      "backgroundImage": coalesce(backgroundImage.asset->url, select(backgroundImage._type == "image" => null, backgroundImage))
    },
    introSection{
      title, paragraphs, highlights, imageAlt,
      "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
    },
    whySection{title, items[]{icon, title, description}},
    structureSection{title, subtitle, items[]{title, description}},
    subjectsSection{
      title,
      items[]{
        name,
        "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
      }
    },
    targetAudienceSection{title, items[]{icon, title, description}},
    benefitsSection{
      title,
      items[]{
        title, description,
        "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
      }
    },
    learningFormatsSection{title, items[]{icon, title, description}},
    stepsSection{title, steps[]{title, description}},
    parentReasonsSection{title, items},
    seo{title, description}
  }
`)

export const ONLINE_OTHM_PAGE_QUERY = defineQuery(`
  *[_type == "onlineOthmPage" && language == $lang][0]{
    heroSection{
      parentBreadcrumb, tagline, title, subtitle, description, breadcrumb,
      primaryButtonLabel, primaryButtonHref,
      "backgroundImage": coalesce(backgroundImage.asset->url, select(backgroundImage._type == "image" => null, backgroundImage))
    },
    introSection{
      title, paragraphs, highlights, imageAlt,
      "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
    },
    whySection{title, items[]{icon, title, description}},
    learningFormatsSection{title, items[]{icon, title, description}},
    targetAudienceSection{title, items[]{icon, title, description}},
    benefitsSection{
      title,
      items[]{
        title, description,
        "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
      }
    },
    stepsSection{title, steps[]{title, description}},
    programsSection{title, items[]{name, duration, startDates, subjects, entryRequirements}},
    seo{title, description}
  }
`)

export const ONLINE_QUALIFI_PAGE_QUERY = defineQuery(`
  *[_type == "onlineQualifiPage" && language == $lang][0]{
    heroSection{
      parentBreadcrumb, tagline, title, subtitle, description, breadcrumb,
      primaryButtonLabel, primaryButtonHref,
      "backgroundImage": coalesce(backgroundImage.asset->url, select(backgroundImage._type == "image" => null, backgroundImage))
    },
    introSection{
      title, paragraphs, highlights, imageAlt,
      "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
    },
    whySection{title, items[]{icon, title, description}},
    learningFormatsSection{title, items[]{icon, title, description}},
    targetAudienceSection{title, items[]{icon, title, description}},
    benefitsSection{
      title,
      items[]{
        title, description,
        "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
      }
    },
    stepsSection{title, steps[]{title, description}},
    progressionSection{
      title, body, tags, noteTitle, noteBody, imageAlt,
      "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
    },
    programsSection{title, items[]{name, duration, startDates, subjects, entryRequirements}},
    seo{title, description}
  }
`)

export const ONLINE_WOLVERHAMPTON_PAGE_QUERY = defineQuery(`
  *[_type == "onlineWolverhamptonPage" && language == $lang][0]{
    heroSection{
      parentBreadcrumb, tagline, title, subtitle, description, breadcrumb,
      primaryButtonLabel, primaryButtonHref,
      "backgroundImage": coalesce(backgroundImage.asset->url, select(backgroundImage._type == "image" => null, backgroundImage))
    },
    introSection{
      title, paragraphs, highlights, imageAlt,
      "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
    },
    whySection{title, items[]{icon, title, description}},
    kvcSupportSection{title, items},
    learningFormatsSection{title, items[]{icon, title, description}},
    targetAudienceSection{title, items[]{icon, title, description}},
    benefitsSection{
      title,
      items[]{
        title, description,
        "image": coalesce(image.asset->url, select(image._type == "image" => null, image))
      }
    },
    stepsSection{title, steps[]{title, description}},
    programsSection{title, items[]{name, duration, startDates, subjects, entryRequirements}},
    seo{title, description}
  }
`)
