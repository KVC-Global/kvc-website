import type { PortableTextBlock } from "next-sanity"

export type SanityImage = Record<string, unknown>

export type BlogPostCard = {
  _id?: string
  title?: string
  slug?: { current?: string }
  mainImage?: SanityImage
  mainImageAlt?: string
  excerpt?: string
  publishedAt?: string
  authorName?: string
  category?: string | null
  readingTime?: number | null
}

export type BlogPost = BlogPostCard & {
  authorRole?: string
  authorImage?: SanityImage
  keyTakeaways?: string[]
  body?: PortableTextBlock[]
  seo?: {
    title?: string
    description?: string
  }
}
