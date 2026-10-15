"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ArrowUpRight, Calendar, Clock, Newspaper } from "lucide-react"

import type { BlogPostCard as BlogPostCardData } from "@/sanity/blog"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import {
  blogPostHref,
  formatPostDate,
  getBlogCategoryLabel,
  getBlogReadingTime,
} from "@/lib/blog"
import { urlFor } from "@/sanity/image"
import { cn } from "@/lib/utils"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function BlogCard({
  post,
  className,
}: {
  post: BlogPostCardData
  className?: string
}) {
  const locale = useLocale()
  const t = useDictionary()
  const href = blogPostHref(post.slug?.current, locale)
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(720).height(480).url()
    : null
  const date = formatPostDate(post.publishedAt, locale)
  const categoryLabel = getBlogCategoryLabel(post, locale)
  const readingTime = getBlogReadingTime(post, locale)

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className={cn(
        "group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-white p-3.5 shadow-sm transition-shadow duration-300 hover:border-brand-blue-mid/40 hover:shadow-xl sm:p-4",
        className
      )}
    >
      <Link href={href} className="flex h-full flex-col">
        {/* Thumbnail image with double-bezel curvature */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-brand-light">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImageAlt || post.title || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-blue-mid">
              <Newspaper
                className="h-10 w-10 text-brand-gold-light"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Floating category badge */}
          <span className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full border border-white/15 bg-brand-blue-mid/90 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-white uppercase shadow-sm backdrop-blur-md">
            {categoryLabel}
          </span>
        </div>

        {/* Content body */}
        <div className="flex flex-1 flex-col pt-4">
          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            {date && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.publishedAt}>{date}</time>
              </span>
            )}
            {date && <span>•</span>}
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime}
            </span>
          </div>

          {/* Title */}
          {post.title && (
            <h3 className="mt-2.5 line-clamp-2 font-heading text-base leading-snug font-bold text-brand-blue transition-colors group-hover:text-brand-blue-mid sm:text-lg">
              {post.title}
            </h3>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-brand-dark/70 sm:text-sm">
              {post.excerpt}
            </p>
          )}

          {/* Bottom action link */}
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3.5 text-xs font-semibold text-brand-blue-mid transition-colors group-hover:text-brand-blue">
            <span>{t.blog.readMore}</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-brand-blue-mid transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-brand-blue-mid group-hover:text-white">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
