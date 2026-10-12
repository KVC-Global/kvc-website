"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { BlogCard } from "@/components/blog/blog-card"
import { BlogHero } from "@/components/blog/blog-hero"
import { Container } from "@/components/ui/container"
import { useDictionary } from "@/lib/i18n-client"
import type { BlogPostCard } from "@/sanity/blog"

const PAGE_SIZE = 6

export function BlogArchive({ posts }: { posts: BlogPostCard[] }) {
  const t = useDictionary()
  const [currentPage, setCurrentPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const page = Math.min(currentPage, pageCount)
  const visiblePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <BlogHero />

      <section className="w-full bg-white pt-10 pb-10 sm:pt-12 sm:pb-12">
        <Container>
          <h1 className="font-heading text-3xl font-extrabold text-brand-blue sm:text-4xl">
            {t.blog.allTitle}
          </h1>
        </Container>
      </section>

      <section
        aria-labelledby="all-blog-posts-heading"
        className="w-full bg-white pb-14 sm:pb-16 lg:pb-20"
      >
        <Container>
          <h2 id="all-blog-posts-heading" className="sr-only">
            {t.blog.allTitle}
          </h2>

          {visiblePosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {visiblePosts.map((post) => (
                <BlogCard key={post._id || post.slug?.current} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-[10px] bg-brand-light px-5 py-16 text-center sm:px-8 sm:py-20">
              <h2 className="font-heading text-xl font-bold text-brand-blue">
                {t.blog.emptyTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-dark/80">
                {t.blog.emptyDescription}
              </p>
            </div>
          )}

          {pageCount > 1 && (
            <nav
              aria-label={t.blog.paginationLabel}
              className="mt-10 flex items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => setCurrentPage((value) => value - 1)}
                disabled={page === 1}
                aria-label={t.blog.previousPage}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-brand-blue transition-colors hover:border-brand-gold hover:text-brand-gold disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    aria-current={page === pageNumber ? "page" : undefined}
                    className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-light aria-[current=page]:bg-brand-blue-mid aria-[current=page]:text-white"
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => setCurrentPage((value) => value + 1)}
                disabled={page === pageCount}
                aria-label={t.blog.nextPage}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-brand-blue transition-colors hover:border-brand-gold hover:text-brand-gold disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </Container>
      </section>
    </>
  )
}
