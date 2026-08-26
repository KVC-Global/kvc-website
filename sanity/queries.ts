import { defineQuery } from "next-sanity"

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && language == $lang][0]{
    header{
      comingSoonLabel,
      navItems[]{
        _key, label, link{destination, customHref},
        children[]{_key, label, description, isComingSoon, link{destination, customHref}}
      },
      cta{label, link{destination, customHref}}
    },
    footer{
      bio,
      cta{
        enabled, title, description,
        primaryButton{label, link{destination, customHref}},
        secondaryButton{label, link{destination, customHref}}
      },
      servicesColumn{heading, links[]{_key, label, link{destination, customHref}}},
      aboutColumn{heading, links[]{_key, label, link{destination, customHref}}},
      supportColumn{heading, links[]{_key, label, link{destination, customHref}}},
      contactHeading,
      legalLinks[]{_key, label, link{destination, customHref}},
      copyrightNotice
    },
    "company": *[_id == "company-info"][0]{
      phones[]{_key, label, number},
      email,
      "address": select($lang == "en" => addressEn, addressVi),
      mapUrl,
      socialLinks[]{_key, network, url}
    }
  }
`)

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
      title, description, officeHoursTitle, weekdayHours, weekendHours,
      socialTitle, socialDescription,
      "phone": coalesce(*[_id == "company-info"][0].phones[0].number, phone),
      "email": coalesce(*[_id == "company-info"][0].email, email),
      "address": coalesce(
        select($lang == "en" => *[_id == "company-info"][0].addressEn),
        *[_id == "company-info"][0].addressVi,
        address
      ),
      "socialLinks": coalesce(
        *[_id == "company-info"][0].socialLinks[]{_key, "label": network, url, network},
        socialLinks[]{_key, label, url, network}
      )
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
    videoSection{
      eyebrow, title, 
      "videoUrl": video.asset->url
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
    "relatedServices": servicesSection{
      title,
      services[]{
        _type == "reference" => @->{
          _id,
          title,
          ctaText,
          icon,
          href
        },
        _type != "reference" => {
          title,
          ctaText,
          icon,
          href
        }
      }
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
      videoEmbedUrl,
      videoTitle,
      videoPoster,
      testimonials[]{_key, name, role, avatar, rating, quote}
    },
    "faqs": faqsSection {
      title,
      faqs[]{_key, question, answer}
    },
    "relatedServices": servicesSection {
      title,
      services[]{
        _type == "reference" => @->{
          _id,
          title,
          ctaText,
          icon,
          href
        },
        _type != "reference" => {
          title,
          ctaText,
          icon,
          href
        }
      }
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
    "relatedServices": servicesSection {
      title,
      services[]{
        _type == "reference" => @->{
          _id,
          title,
          ctaText,
          icon,
          href
        },
        _type != "reference" => {
          title,
          ctaText,
          icon,
          href
        }
      }
    },
    seo{title, description, shareImage}
  }
`)

export const PRIVATE_STUDY_PAGE_QUERY = defineQuery(`
  *[_type == "privateStudyPage" && language == $lang][0] {
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
      paragraph1,
      paragraph2,
      paragraph3,
      image,
      imageAlt
    },
    "why": whySection {
      title,
      items[]{_key, icon, title, description}
    },
    "schools": schoolsSection {
      title,
      items[]{_key, id, name, desc, levels[]{_key, grade, age, fee}},
      tipText
    },
    "requirements": requirementsSection {
      title1,
      title2,
      ageTitle,
      ageDesc,
      academicTitle,
      academicDesc,
      entryTitle,
      entryDesc,
      conditions,
      tipText
    },
    "support": supportSection {
      title,
      items[]{_key, icon, title, description}
    },
    "faqs": faqsSection {
      title,
      items[]{_key, question, answer}
    },
    "relatedServices": servicesSection {
      title,
      services[]{
        _type == "reference" => @->{
          _id,
          title,
          ctaText,
          icon,
          href
        },
        _type != "reference" => {
          title,
          ctaText,
          icon,
          href
        }
      }
    },
    seo{title, description, shareImage}
  }
`)

export const PUBLIC_STUDY_PAGE_QUERY = defineQuery(`
  *[_type == "publicStudyPage" && language == $lang][0] {
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
      paragraph1,
      paragraph2,
      paragraph3,
      image,
      imageAlt
    },
    "why": whySection {
      title,
      items[]{_key, icon, title, description}
    },
    "pathways": pathwaysSection {
      title,
      cards[]{_key, eyebrow, title, description, conditions[]{_key, icon, boldText, normalText}},
      compareTitle,
      compareCard1{title, duration, objective, criteria, feeReference},
      compareCard2{title, duration, objective, criteria, feeReference}
    },
    "requirements": requirementsSection {
      title1,
      title2,
      conditions[]{_key, title, description},
      tipText1,
      costs[]{_key, item, fee},
      tipText2,
      scholarshipEyebrow,
      scholarshipTitle,
      scholarship1{title, target, benefit, duration, standard},
      scholarship2{title, target, benefit, duration, standard}
    },
    "workRules": workRulesSection {
      title,
      sectionTitle1,
      sectionDesc1,
      conditions1,
      sectionTitle2,
      conditions2,
      warningText
    },
    "support": supportSection {
      title,
      items[]{_key, icon, title, description}
    },
    "faqs": faqsSection {
      title,
      items[]{_key, question, answer}
    },
    "relatedServices": servicesSection {
      title,
      services[]{
        _type == "reference" => @->{
          _id,
          title,
          ctaText,
          icon,
          href
        },
        _type != "reference" => {
          title,
          ctaText,
          icon,
          href
        }
      }
    },
    seo{title, description, shareImage}
  }
`)
