import { SiteAbout } from "@/components/site-about"
import { SiteHero } from "@/components/site-hero"
import { SitePartners } from "@/components/site-partners"

export default function Page() {
  return (
    <>
      <SiteHero />
      <SitePartners />
      <SiteAbout />
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16">
        <div className="rounded-2xl border border-dashed border-border bg-white/60 p-10 text-center text-sm text-muted-foreground">
          Nội dung trang chủ sẽ được bổ sung tại đây.
        </div>
      </div>
    </>
  )
}
