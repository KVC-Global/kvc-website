"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Newspaper } from "lucide-react"
import type { Variants } from "framer-motion"

import type { BlogPostCard as BlogPostCardData } from "@/sanity/blog"
import { useLocale } from "@/lib/i18n-client"
import {
  blogPostHref,
  formatPostDate,
  getBlogCategoryLabel,
  getBlogReadingTime,
} from "@/lib/blog"
import { urlFor } from "@/sanity/image"
import { cn } from "@/lib/utils"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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
  const href = blogPostHref(post.slug?.current, locale)
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(400).url()
    : null
  const date = formatPostDate(post.publishedAt, locale)
  const categoryLabel = getBlogCategoryLabel(post, locale)
  const readingTime = getBlogReadingTime(post, locale)

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      className={cn(
        "group overflow-hidden rounded-[10px] border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-lg",
        className
      )}
    >
      <Link href={href} className="flex h-full flex-col">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImageAlt || post.title || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-blue-mid">
              <Newspaper
                className="h-12 w-12 text-brand-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-muted-foreground">
            <span className="rounded-full bg-brand-gold-light/60 px-2 py-1 font-heading font-bold tracking-wide text-brand-blue uppercase">
              {categoryLabel}
            </span>
            {date && <time dateTime={post.publishedAt}>{date}</time>}
            <span aria-hidden="true">|</span>
            <span>{readingTime}</span>
          </div>
          {post.title && (
            <h3 className="mt-3 line-clamp-2 font-heading text-lg leading-snug font-bold text-brand-blue transition-colors group-hover:text-brand-blue-mid">
              {post.title}
            </h3>
          )}
          {post.excerpt && (
            <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-brand-dark/70">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
