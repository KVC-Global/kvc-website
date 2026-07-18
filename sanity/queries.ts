import { defineQuery } from "next-sanity"

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial"] | order(name asc)`
)

export const PARTNERS_QUERY = defineQuery(
  `*[_type == "partner" && (!defined(language) || language == $lang)] | order(name asc)`
)

export const SERVICES_QUERY = defineQuery(
  `*[_type == "service"] | order(title asc)`
)

export const FAQS_QUERY = defineQuery(
  `*[_type == "faq"] | order(order asc)`
)
