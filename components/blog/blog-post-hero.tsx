"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
} from "lucide-react"

import type { BlogPost } from "@/sanity/blog"
import {
  formatPostDate,
  getBlogCategoryLabel,
  getBlogReadingTime,
} from "@/lib/blog"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import { SITE_URL } from "@/lib/seo"
import { urlFor } from "@/sanity/image"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
}

export function BlogPostHero({
  post,
  className,
}: {
  post: BlogPost
  className?: string
}) {
  const locale = useLocale()
  const t = useDictionary()
  const [isCopied, setIsCopied] = useState(false)

  const date = formatPostDate(post.publishedAt, locale)
  const categoryLabel = getBlogCategoryLabel(post, locale)
  const readingTime = getBlogReadingTime(post, locale)
  const coverUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(900).url()
    : null
  const slug = post.slug?.current
  const title = post.title || ""
  const postUrl = slug ? `${SITE_URL}/${locale}/tin-tuc/${slug}` : SITE_URL
  const encodedUrl = encodeURIComponent(postUrl)
  const encodedTitle = encodeURIComponent(title)
  const homeHref = locale === "en" ? "/en" : "/"
  const blogHref = `/${locale}/tin-tuc`
  const authorName = post.authorName || "KVC Global"
  const authorRole = post.authorRole || t.blog.authorRole
  const authorImageUrl = post.authorImage
    ? urlFor(post.authorImage).width(96).height(96).fit("crop").url()
    : null
  const authorInitial = authorName.charAt(0).toLocaleUpperCase(locale)
  const copyLabel =
    t.blog.copiedLink || (locale === "en" ? "Copied!" : "Đã sao chép!")

  const copyLink = async () => {
    if (!navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(postUrl)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2200)
    } catch {
      // Clipboard can be blocked in iframe/permission contexts
    }
  }

  return (
    <section
      aria-labelledby="blog-post-heading"
      className={cn(
        "relative w-full border-b border-border/50 bg-gradient-to-b from-slate-50/70 via-white to-white pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 lg:pb-20",
        className
      )}
    >
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          {/* Breadcrumb Navigation */}
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <Link
              href={homeHref}
              className="transition-colors duration-200 hover:text-brand-blue-mid"
            >
              {t.nav.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 select-none" />
            <Link
              href={blogHref}
              className="transition-colors duration-200 hover:text-brand-blue-mid"
            >
              {t.nav.blog}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 select-none" />
            <span
              aria-current="page"
              className="max-w-[260px] truncate font-semibold text-brand-blue-mid sm:max-w-md"
            >
              {title}
            </span>
          </motion.nav>

          {/* Badges & Meta info */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-muted-foreground"
          >
            <span className="inline-flex items-center rounded-full border border-brand-blue-mid/20 bg-brand-blue-mid/10 px-3 py-1 font-heading text-[11px] font-bold tracking-wider text-brand-blue-mid uppercase">
              {categoryLabel}
            </span>

            {date && (
              <span className="inline-flex items-center gap-1.5 text-brand-dark/75">
                <Calendar className="h-3.5 w-3.5 text-brand-blue-mid" />
                <time dateTime={post.publishedAt}>{date}</time>
              </span>
            )}

            <span aria-hidden="true" className="text-muted-foreground/50">
              •
            </span>

            <span className="inline-flex items-center gap-1.5 text-brand-dark/75">
              <Clock className="h-3.5 w-3.5 text-brand-blue-mid" />
              <span>{readingTime}</span>
            </span>
          </motion.div>

          {/* Headline */}
          {title && (
            <motion.h1
              variants={fadeUp}
              id="blog-post-heading"
              className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-brand-blue sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.2]"
            >
              {title}
            </motion.h1>
          )}

          {/* Editorial Excerpt */}
          {post.excerpt && (
            <motion.div
              variants={fadeUp}
              className="mt-5 rounded-r-xl border-l-4 border-brand-gold bg-slate-50/80 p-4 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base sm:leading-relaxed"
            >
              <p>{post.excerpt}</p>
            </motion.div>
          )}

          {/* Author Block & Social Share Toolbar */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              {authorImageUrl ? (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full shadow-xs ring-2 ring-brand-blue-mid/15">
                  <Image
                    src={authorImageUrl}
                    alt={authorName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading text-sm font-bold text-white shadow-xs">
                  {authorInitial}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-heading text-sm font-bold text-brand-blue">
                    {authorName}
                  </p>
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-brand-blue-mid"
                    aria-label="Verified consultant"
                  />
                </div>
                <p className="text-xs text-brand-dark/65">{authorRole}</p>
              </div>
            </div>

            {/* Social Share Group */}
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-semibold text-brand-dark/60 sm:inline-block">
                {t.blog.shareTitle || "Chia sẻ:"}
              </span>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on Facebook"
                title="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white text-brand-blue shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue-mid hover:bg-brand-blue-mid hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.5v3h2.7v8h3.3Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                title="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white text-brand-blue shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue-mid hover:bg-brand-blue-mid hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X"
                title="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white text-brand-blue shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue-mid hover:bg-brand-blue-mid hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
                </svg>
              </a>

              {/* Copy Link Button with dynamic feedback */}
              <button
                type="button"
                onClick={copyLink}
                aria-label={copyLabel}
                title={isCopied ? copyLabel : "Sao chép liên kết"}
                className={cn(
                  "relative flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold shadow-2xs transition-all duration-200",
                  isCopied
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-border/70 bg-white text-brand-blue hover:border-brand-blue-mid hover:text-brand-blue-mid"
                )}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{copyLabel}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-brand-blue-mid" />
                    <span className="hidden sm:inline">Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Cover Image */}
        {coverUrl && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mx-auto mt-8 max-w-5xl sm:mt-10"
          >
            <figure>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/60 bg-brand-light shadow-md sm:aspect-[21/10]">
                <Image
                  src={coverUrl}
                  alt={post.mainImageAlt || title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1120px"
                  className="object-cover object-center"
                />
              </div>
              {post.mainImageAlt && (
                <figcaption className="mt-2.5 text-center font-body text-xs text-muted-foreground">
                  {post.mainImageAlt}
                </figcaption>
              )}
            </figure>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
