"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Newspaper } from "lucide-react"
import type { Variants } from "framer-motion"

import type { BlogPostCard as BlogPostCardData } from "@/sanity/blog"
import { useLocale } from "@/lib/i18n-client"
import { blogPostHref, formatPostDate } from "@/lib/blog"
import { urlFor } from "@/sanity/image"
import { useDictionary } from "@/lib/i18n-client"
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
  const t = useDictionary()
  const href = blogPostHref(post.slug?.current, locale)
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(400).url()
    : null
  const date = formatPostDate(post.publishedAt, locale)

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      className={cn(
        "group overflow-hidden rounded-lg border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-lg",
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
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-muted-foreground">
            {date && (
              <time
                dateTime={post.publishedAt}
                className="rounded-full bg-muted px-2.5 py-1 text-brand-blue-mid"
              >
                {date}
              </time>
            )}
            {post.authorName && (
              <span className="text-brand-dark/60">
                {locale === "en" ? `By ${post.authorName}` : `Bởi ${post.authorName}`}
              </span>
            )}
          </div>
          {post.title && (
            <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-brand-blue transition-colors group-hover:text-brand-blue-mid">
              {post.title}
            </h3>
          )}
          {post.excerpt && (
            <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-brand-dark/70">
              {post.excerpt}
            </p>
          )}
          <span className="mt-auto pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold">
              {t.blog.readMore}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
