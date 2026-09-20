import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogPostHero } from "@/components/blog/blog-post-hero"
import { BlogPostBody } from "@/components/blog/blog-post-body"
import { BlogRelated } from "@/components/blog/blog-related"
import { getDictionaryServer, getLocale } from "@/lib/i18n-server"
import type { BlogPost, BlogPostCard } from "@/sanity/blog"
import { sanityFetch } from "@/sanity/live"
import { localizedAlternates } from "@/lib/seo"
import { BLOG_POST_QUERY, BLOG_RELATED_POSTS_QUERY } from "@/sanity/queries"
import { urlFor } from "@/sanity/image"

type PageProps = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const locale = await getLocale()
  const { data } = await sanityFetch({
    query: BLOG_POST_QUERY,
    params: { lang: locale, slug },
  })
  return { locale, post: data as BlogPost | null }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { locale, post } = await getPost(slug)
  const t = await getDictionaryServer()

  const title = post?.seo?.title || post?.title || t.blog.seoTitle
  const description =
    post?.seo?.description || post?.excerpt || t.blog.seoDescription
  const ogImage =
    post?.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
      : "/images/thumb-sharing.png"

  return {
    title,
    description,
    alternates: localizedAlternates(`/tin-tuc/${slug}`, locale),
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title || "KVC Global" }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const { locale, post } = await getPost(slug)

  if (!post) notFound()

  const { data: relatedData } = await sanityFetch({
    query: BLOG_RELATED_POSTS_QUERY,
    params: { lang: locale, slug },
  })
  const related = (relatedData as BlogPostCard[] | null) ?? []

  return (
    <>
      <BlogPostHero post={post} />
      <BlogPostBody post={post} />
      <BlogRelated posts={related} />
    </>
  )
}
