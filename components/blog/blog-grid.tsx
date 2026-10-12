"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, Variants } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Sparkles,
} from "lucide-react"

import type { BlogPostCard as BlogPostCardData } from "@/sanity/blog"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import {
  blogPostHref,
  formatPostDate,
  getBlogCategoryLabel,
  getBlogReadingTime,
} from "@/lib/blog"
import { urlFor } from "@/sanity/image"
import { Container } from "@/components/ui/container"
import { BlogCard } from "@/components/blog/blog-card"
import { cn } from "@/lib/utils"

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

/** Posts shown in the latest grid before the "view more" toggle. */
const VISIBLE_COUNT = 6

function FeaturedPost({
  post,
  locale,
  featuredLabel,
  readMore,
}: {
  post: BlogPostCardData
  locale: "vi" | "en"
  featuredLabel: string
  readMore: string
}) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1000).height(650).url()
    : null
  const href = blogPostHref(post.slug?.current, locale)
  const date = formatPostDate(post.publishedAt, locale)
  const categoryLabel = getBlogCategoryLabel(post, locale)
  const readingTime = getBlogReadingTime(post, locale)

  return (
    <article className="grid w-full max-w-[1376px] gap-8 bg-white pt-8 pb-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
      <Link
        href={href}
        className="group relative aspect-[16/9] overflow-hidden rounded-[10px]"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImageAlt || post.title || ""}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-blue-mid">
            <Newspaper
              className="h-12 w-12 text-brand-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        )}
        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-brand-gold-light px-3.5 py-1.5 text-xs font-bold text-brand-blue">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {featuredLabel}
        </span>
      </Link>

      <div className="flex min-h-[400px] flex-col justify-center py-4 lg:py-8">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-muted-foreground">
          <span className="font-heading font-bold tracking-wide text-brand-gold uppercase">
            {categoryLabel}
          </span>
          {date && (
            <>
              <span aria-hidden="true">|</span>
              <time dateTime={post.publishedAt}>{date}</time>
            </>
          )}
          <span aria-hidden="true">|</span>
          <span>{readingTime}</span>
        </div>
        {post.title && (
          <h2 className="mt-4 max-w-[620px] font-heading text-[28px] leading-[1.12] font-extrabold text-brand-blue sm:text-3xl lg:text-[32px]">
            {post.title}
          </h2>
        )}
        {post.excerpt && (
          <p className="mt-4 line-clamp-3 max-w-[620px] text-sm leading-relaxed text-brand-dark/70 sm:text-base">
            {post.excerpt}
          </p>
        )}
        <Link
          href={href}
          className="group mt-6 inline-flex min-w-[210px] self-start items-center justify-center gap-2 rounded-[8px] bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid"
        >
          {readMore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mt-8 flex items-center justify-between lg:mt-auto lg:pt-8">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-blue-mid" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
          </div>
          <div className="flex gap-2" aria-hidden="true">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand-blue-mid">
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function BlogGrid({
  posts,
  className,
  isFiltered = false,
}: {
  posts: BlogPostCardData[]
  className?: string
  isFiltered?: boolean
}) {
  const locale = useLocale()
  const t = useDictionary()
  const [expanded, setExpanded] = useState(false)

  if (posts.length === 0) {
    return (
      <section
        aria-label={isFiltered ? t.blog.noResultsTitle : t.blog.emptyTitle}
        className={cn("w-full bg-white py-10 sm:py-12 lg:py-16", className)}
      >
        <Container>
          <div className="rounded-[10px] bg-brand-light px-5 py-16 text-center sm:px-8 sm:py-20">
            <h2 className="font-heading text-xl font-bold text-brand-blue">
              {isFiltered ? t.blog.noResultsTitle : t.blog.emptyTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-dark/80">
              {isFiltered
                ? t.blog.noResultsDescription
                : t.blog.emptyDescription}
            </p>
          </div>
        </Container>
      </section>
    )
  }

  const featuredPost = posts[0]
  const latestPosts = posts.slice(1)
  const visiblePosts = expanded
    ? latestPosts
    : latestPosts.slice(0, VISIBLE_COUNT)
  const hasOverflow = latestPosts.length > VISIBLE_COUNT

  return (
    <section
      id="blog-listing"
      aria-labelledby={
        latestPosts.length > 0 ? "blog-latest-heading" : undefined
      }
      aria-label={latestPosts.length === 0 ? t.blog.featuredLabel : undefined}
      className={cn("w-full bg-white pt-8 pb-14 sm:pb-16 lg:pb-20", className)}
    >
      <Container>
        <FeaturedPost
          post={featuredPost}
          locale={locale}
          featuredLabel={t.blog.featuredLabel}
          readMore={t.blog.readMore}
        />

        {latestPosts.length > 0 && (
          <>
            <div className="mt-14 flex items-end justify-between gap-4 sm:mt-16">
              <h2
                id="blog-latest-heading"
                className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
              >
                {t.blog.latestTitle}
              </h2>
              <Link
                href="#blog-latest-heading"
                className="hidden items-center gap-1.5 pb-1 text-sm font-semibold text-brand-blue-mid transition-colors hover:text-brand-gold sm:inline-flex"
              >
                {t.blog.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
            >
              {visiblePosts.map((post) => (
                <BlogCard key={post._id || post.slug?.current} post={post} />
              ))}
            </motion.div>

            {hasOverflow && !expanded && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid"
                >
                  {t.blog.viewMore}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  )
}
