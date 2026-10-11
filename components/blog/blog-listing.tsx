"use client"

import { useState } from "react"

import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogHero } from "@/components/blog/blog-hero"
import {
  getBlogCategory,
  type BlogCategoryId,
  type BlogPostCard,
} from "@/lib/blog"

export function BlogListing({ posts }: { posts: BlogPostCard[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<BlogCategoryId>("all")
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      category === "all" || getBlogCategory(post) === category
    const searchableText =
      `${post.title || ""} ${post.excerpt || ""}`.toLocaleLowerCase()

    return matchesCategory && searchableText.includes(normalizedQuery)
  })

  return (
    <>
      <BlogHero
        activeCategory={category}
        searchQuery={query}
        onCategoryChange={setCategory}
        onSearchChange={setQuery}
      />
      <BlogGrid
        posts={filteredPosts}
        isFiltered={Boolean(normalizedQuery || category !== "all")}
      />
    </>
  )
}
