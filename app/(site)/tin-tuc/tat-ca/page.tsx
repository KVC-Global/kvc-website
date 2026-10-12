import type { Metadata } from "next"

import { BlogArchive } from "@/components/blog/blog-archive"
import { getDictionaryServer, getLocale } from "@/lib/i18n-server"
import { localizedAlternates } from "@/lib/seo"
import type { BlogPostCard } from "@/sanity/blog"
import { sanityFetch } from "@/sanity/live"
import { BLOG_POSTS_QUERY } from "@/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getDictionaryServer()

  return {
    title: t.blog.allTitle,
    description: t.blog.seoDescription,
    alternates: localizedAlternates("/tin-tuc/tat-ca", locale),
  }
}

export default async function AllBlogPostsPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: BLOG_POSTS_QUERY,
    params: { lang: locale },
  })
  const posts = (data as BlogPostCard[] | null) ?? []

  return <BlogArchive posts={posts} />
}
