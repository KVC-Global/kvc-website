import { redirect } from "next/navigation"

// import { SiteAbout } from "@/components/site-about"
// import { SiteHero } from "@/components/site-hero"
// import { SitePartners } from "@/components/site-partners"
// import { SiteServices } from "@/components/site-services"
// import { SiteTestimonials } from "@/components/site-testimonials"
// import { SiteWhyProcess } from "@/components/site-why-process"

// export default function Page() {
//   return (
//     <>
//       <SiteHero />
//       <SitePartners />
//       <SiteAbout />
//       <SiteServices />
//       <SiteWhyProcess />
//       <SiteTestimonials />
//     </>
//   )
// }

// TODO: replace with feature flag check (e.g. `if (flags.showLanding) return <SiteLanding />`)
export default function Page() {
  redirect("/coming-soon")
}
