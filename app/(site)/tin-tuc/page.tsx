import type { Metadata } from "next"

import { BlogHero } from "@/components/blog/blog-hero"
import { BlogGrid } from "@/components/blog/blog-grid"
import { getDictionaryServer, getLocale } from "@/lib/i18n-server"
import type { BlogPostCard } from "@/sanity/blog"
import { sanityFetch } from "@/sanity/live"
import { localizedAlternates } from "@/lib/seo"
import { BLOG_POSTS_QUERY } from "@/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getDictionaryServer()

  return {
    title: t.blog.seoTitle,
    description: t.blog.seoDescription,
    alternates: localizedAlternates("/tin-tuc", locale),
    openGraph: {
      title: t.blog.seoTitle,
      description: t.blog.seoDescription,
      images: [
        {
          url: "/images/thumb-sharing.png",
          width: 1200,
          height: 630,
          alt: "KVC Global",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.blog.seoTitle,
      description: t.blog.seoDescription,
      images: ["/images/thumb-sharing.png"],
    },
  }
}

export default async function BlogPage() {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: BLOG_POSTS_QUERY,
    params: { lang: locale },
  })
  const posts = (data as BlogPostCard[] | null) ?? []

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
    </>
  )
}
