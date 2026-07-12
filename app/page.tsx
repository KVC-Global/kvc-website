import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners } from "@/components/site-partners"
import { SiteServices } from "@/components/site-services"

export default function Page() {
  return (
    <>
      <SiteHero />
      <SitePartners />
      <SiteAbout />
      <SiteServices />
    </>
  )
}
