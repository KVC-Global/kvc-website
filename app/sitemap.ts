import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { sanityFetch } from "@/sanity/live"
import { BLOG_SITEMAP_QUERY } from "@/sanity/queries"

const routes: Array<{
  path: string
  priority: number
  changeFrequency: "weekly" | "monthly" | "yearly"
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/du-hoc", priority: 0.9, changeFrequency: "monthly" },
  { path: "/du-hoc/cong-lap", priority: 0.8, changeFrequency: "monthly" },
  { path: "/du-hoc/tu-thuc", priority: 0.8, changeFrequency: "monthly" },
  { path: "/du-hoc/dai-hoc-thac-si", priority: 0.8, changeFrequency: "monthly" },
  { path: "/du-hoc/malaysia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/du-hoc/dai-loan", priority: 0.8, changeFrequency: "monthly" },
  { path: "/khoa-hoc-online/ossd", priority: 0.8, changeFrequency: "monthly" },
  { path: "/khoa-hoc-online/othm", priority: 0.8, changeFrequency: "monthly" },
  { path: "/khoa-hoc-online/qualifi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/khoa-hoc-online/wolverhampton", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work-pass", priority: 0.8, changeFrequency: "monthly" },
  { path: "/dich-vu", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gioi-thieu", priority: 0.6, changeFrequency: "yearly" },
  { path: "/lien-he", priority: 0.6, changeFrequency: "yearly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}/vi${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        vi: `${SITE_URL}/vi${path}`,
        en: `${SITE_URL}/en${path}`,
      },
    },
  }))

  const { data } = await sanityFetch({ query: BLOG_SITEMAP_QUERY })
  const postRoutes = (
    (data as Array<{ language?: string; _updatedAt?: string; slug?: string }> | null) ?? []
  )
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/${p.language === "en" ? "en" : "vi"}/tin-tuc/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))

  return [
    ...staticEntries,
    {
      url: `${SITE_URL}/vi/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          vi: `${SITE_URL}/vi/tin-tuc`,
          en: `${SITE_URL}/en/tin-tuc`,
        },
      },
    },
    ...postRoutes,
  ]
}
