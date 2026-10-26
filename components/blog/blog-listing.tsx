"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ChevronLeft, ChevronRight, FileSearch, Sparkles } from "lucide-react"

import type { BlogPostCard } from "@/sanity/blog"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import {
  type BlogCategoryId,
  BLOG_FILTER_TABS,
  BLOG_QUICK_TAGS,
  type BlogQuickTag,
  getBlogCategory,
  matchPostSearch,
} from "@/lib/blog"
import { Container } from "@/components/ui/container"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogSpotlight } from "@/components/blog/blog-spotlight"
import { BlogFilterBar } from "@/components/blog/blog-filter-bar"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogLeadBanner } from "@/components/blog/blog-lead-banner"
import { cn } from "@/lib/utils"

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const PAGE_SIZE = 9

export function BlogListing({ posts }: { posts: BlogPostCard[] }) {
  const locale = useLocale()
  const t = useDictionary()

  // State
  const [activeCategory, setActiveCategory] = useState<BlogCategoryId>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: posts.length,
    }
    for (const post of posts) {
      const cat = getBlogCategory(post)
      counts[cat] = (counts[cat] || 0) + 1
    }
    return counts
  }, [posts])

  // Filter posts based on category, query, and tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (activeCategory !== "all") {
        const postCat = getBlogCategory(post)
        if (postCat !== activeCategory) return false
      }

      // Quick Tag filter
      if (selectedTag) {
        const tagObj = BLOG_QUICK_TAGS.find((tg) => tg.id === selectedTag)
        if (tagObj && !matchPostSearch(post, tagObj.query)) {
          return false
        }
      }

      // Search Query filter
      if (searchQuery.trim() !== "") {
        if (!matchPostSearch(post, searchQuery)) {
          return false
        }
      }

      return true
    })
  }, [posts, activeCategory, selectedTag, searchQuery])

  // Reset page when filter changes
  const handleSelectCategory = (cat: BlogCategoryId) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  const handleSearchChange = (q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
  }

  const handleSelectTag = (tag: BlogQuickTag | null) => {
    setSelectedTag(tag ? tag.id : null)
    setCurrentPage(1)
  }

  const handleClearFilter = () => {
    setActiveCategory("all")
    setSearchQuery("")
    setSelectedTag(null)
    setCurrentPage(1)
  }

  // Active filter state check
  const isFiltered =
    activeCategory !== "all" ||
    searchQuery.trim() !== "" ||
    selectedTag !== null

  // Spotlight & Trending posts for the default landing view
  const spotlightPost = posts[0]
  const trendingPosts = posts.slice(1, 4)

  // In default view, show latest posts starting from post #1
  const displaySource = isFiltered ? filteredPosts : posts.slice(1)
  const totalPages = Math.max(1, Math.ceil(displaySource.length / PAGE_SIZE))
  const paginatedPosts = displaySource.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  return (
    <>
      {/* 1. Editorial Hero Header with entrance cascade */}
      <BlogHero />

      {/* 2. Spotlight & Trending Section (Shown in initial view when posts exist) */}
      {!isFiltered && posts.length > 0 && (
        <BlogSpotlight
          spotlightPost={spotlightPost}
          trendingPosts={trendingPosts}
          className="pt-8 sm:pt-10"
        />
      )}

      {/* 3. Interactive Sticky Filter & Search Hub */}
      <div id="blog-catalog">
        <BlogFilterBar
          categories={BLOG_FILTER_TABS}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          categoryCounts={categoryCounts}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          quickTags={BLOG_QUICK_TAGS}
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          totalFiltered={filteredPosts.length}
          totalAll={posts.length}
          onClearFilter={handleClearFilter}
        />
      </div>

      {/* 4. Filtered Posts Grid Section */}
      <section
        id="blog-grid"
        aria-label={t.blog.latestTitle}
        className="w-full bg-white pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pb-24"
      >
        <Container>
          {/* Section Heading & Result Info */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
                {isFiltered
                  ? locale === "en"
                    ? "Filtered Results"
                    : "Kết quả chọn lọc"
                  : t.blog.latestTitle}
              </span>
              <h2 className="mt-1 font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                {isFiltered
                  ? activeCategory !== "all"
                    ? BLOG_FILTER_TABS.find((c) => c.id === activeCategory)
                        ?.label[locale] || t.blog.allTitle
                    : t.blog.allTitle
                  : t.blog.latestTitle}
              </h2>
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              {locale === "en"
                ? `Showing ${displaySource.length} articles`
                : `Hiển thị ${displaySource.length} bài viết`}
            </span>
          </div>

          {/* Grid with AnimatePresence fluid filter switching */}
          <AnimatePresence mode="wait">
            {paginatedPosts.length > 0 ? (
              <div key="posts-content">
                <motion.div
                  key={`${activeCategory}-${selectedTag}-${searchQuery}-${currentPage}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={gridContainerVariants}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {paginatedPosts.map((post, idx) => (
                    <div
                      key={post._id || post.slug?.current || idx}
                      className="contents"
                    >
                      <BlogCard post={post} />

                      {/* Insert conversion lead banner after the 3rd card on first page */}
                      {idx === 2 && currentPage === 1 && <BlogLeadBanner />}
                    </div>
                  ))}

                  {/* If fewer than 3 posts on first page, show the lead banner at the end */}
                  {paginatedPosts.length < 3 && currentPage === 1 && (
                    <BlogLeadBanner />
                  )}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    aria-label={t.blog.paginationLabel}
                    className="mt-12 flex items-center justify-center gap-2 pt-4"
                  >
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1))
                        document
                          .getElementById("blog-catalog")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }}
                      disabled={currentPage === 1}
                      aria-label={t.blog.previousPage}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-brand-dark/70 transition-colors hover:border-brand-blue-mid hover:text-brand-blue-mid disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </motion.button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <motion.button
                          key={pageNum}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setCurrentPage(pageNum)
                            document
                              .getElementById("blog-catalog")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }}
                          aria-current={
                            currentPage === pageNum ? "page" : undefined
                          }
                          className={cn(
                            "flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-heading text-xs font-bold transition-all sm:text-sm",
                            currentPage === pageNum
                              ? "bg-brand-blue-mid text-white shadow-sm ring-2 ring-brand-blue-mid/20"
                              : "border border-border/70 text-brand-dark/75 hover:border-brand-blue-mid/40 hover:bg-slate-100 hover:text-brand-blue-mid"
                          )}
                        >
                          {pageNum}
                        </motion.button>
                      )
                    )}

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                        document
                          .getElementById("blog-catalog")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }}
                      disabled={currentPage === totalPages}
                      aria-label={t.blog.nextPage}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-brand-dark/70 transition-colors hover:border-brand-blue-mid hover:text-brand-blue-mid disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </nav>
                )}
              </div>
            ) : (
              /* Empty Filter Search State */
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-lg rounded-2xl border border-dashed border-border/80 bg-slate-50/70 px-6 py-16 text-center sm:px-10 sm:py-20"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue-mid/10 text-brand-blue-mid">
                  <FileSearch className="h-7 w-7" />
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-brand-blue sm:text-xl">
                  {t.blog.noFilterResultsTitle}
                </h3>

                <p className="mt-2 font-body text-xs leading-relaxed text-brand-dark/75 sm:text-sm">
                  {t.blog.noFilterResultsDesc}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearFilter}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-blue-mid px-5 py-2.5 font-heading text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-blue"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-brand-gold-light" />
                    <span>{t.blog.clearFilter}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </>
  )
}
