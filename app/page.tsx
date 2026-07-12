import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners } from "@/components/site-partners"
import { SiteServices } from "@/components/site-services"
import { SiteTestimonials } from "@/components/site-testimonials"
import { SiteWhyProcess } from "@/components/site-why-process"

export default function Page() {
  return (
    <>
      <SiteHero />
      <SitePartners />
      <SiteAbout />
      <SiteServices />
      <SiteWhyProcess />
      <SiteTestimonials />
    </>
  )
}
