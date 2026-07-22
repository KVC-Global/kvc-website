import { defineQuery } from "next-sanity"

export const HOME_PAGE_QUERY = defineQuery(`{
  "services": select(
    count(*[_type == "homePage" && language == $lang][0].services) > 0 =>
      *[_type == "homePage" && language == $lang][0].services[]->{
        _id,
        title,
        description,
        slug,
        icon,
        image,
        alt
      },
    *[_type == "service" && (!defined(language) || language == $lang)] | order(title asc) {
      _id,
      title,
      description,
      slug,
      icon,
      image,
      alt
    }
  ),
  "partners": select(
    count(*[_type == "homePage" && language == $lang][0].partners) > 0 =>
      *[_type == "homePage" && language == $lang][0].partners[]->{
        _id,
        name,
        logo,
        website
      },
    *[_type == "partner" && (!defined(language) || language == $lang)] | order(name asc) {
      _id,
      name,
      logo,
      website
    }
  ),
  "testimonials": select(
    count(*[_type == "homePage" && language == $lang][0].testimonials) > 0 =>
      *[_type == "homePage" && language == $lang][0].testimonials[]->{
        _id,
        name,
        role,
        company,
        quote,
        image,
        rating
      },
    *[_type == "testimonial" && (!defined(language) || language == $lang)] | order(name asc) {
      _id,
      name,
      role,
      company,
      quote,
      image,
      rating
    }
  )
}`)

export const FAQS_QUERY = defineQuery(`*[_type == "faq"] | order(order asc)`)
