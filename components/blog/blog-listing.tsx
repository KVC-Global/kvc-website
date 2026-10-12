"use client"

import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogHero } from "@/components/blog/blog-hero"
import type { BlogPostCard } from "@/lib/blog"

export function BlogListing({ posts }: { posts: BlogPostCard[] }) {
  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
    </>
  )
}
