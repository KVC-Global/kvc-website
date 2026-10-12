"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Share2 } from "lucide-react"

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
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
  const authorRole = t.blog.authorRole
  const authorInitial = (post.authorName || "KVC Global")
    .charAt(0)
    .toLocaleUpperCase(locale)
  const copyLabel = locale === "en" ? "Copy link" : "Sao chép liên kết"
  const shareLabel = locale === "en" ? "Share" : "Chia sẻ"

  const copyLink = async () => {
    if (!navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(postUrl)
    } catch {
      // Clipboard can be unavailable in insecure or permission-blocked contexts.
    }
  }

  return (
    <section
      aria-labelledby="blog-post-heading"
      className={cn(
        "w-full bg-white pt-28 pb-12 sm:pt-32 sm:pb-14 md:pt-36",
        className
      )}
    >
      <Container>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm"
          >
            <Link
              href={homeHref}
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t.nav.home}
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <Link
              href={blogHref}
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t.nav.blog}
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span
              aria-current="page"
              className="font-semibold text-foreground/80"
            >
              {title}
            </span>
          </motion.nav>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
          >
            <span className="rounded-full bg-brand-gold-light/70 px-3 py-1 font-heading text-xs font-bold tracking-wide text-brand-gold uppercase">
              {categoryLabel}
            </span>
            {date && (
              <time
                dateTime={post.publishedAt}
                className="font-medium text-brand-dark/75"
              >
                {date}
              </time>
            )}
            <span aria-hidden="true" className="text-muted-foreground/60">
              •
            </span>
            <span className="font-medium text-brand-dark/75">
              {readingTime}
            </span>
          </motion.div>

          {title && (
            <motion.h1
              variants={fadeUp}
              id="blog-post-heading"
              className="mt-5 max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl lg:text-[44px] lg:leading-[1.15]"
            >
              {title}
            </motion.h1>
          )}

          {post.excerpt && (
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/75 sm:text-lg"
            >
              {post.excerpt}
            </motion.p>
          )}

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center justify-between gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading text-sm font-bold text-white">
                {authorInitial}
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-brand-blue">
                  {post.authorName || "KVC Global"}
                </p>
                <p className="text-xs text-brand-dark/60 sm:text-sm">
                  {authorRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="mr-1 text-sm font-medium text-brand-dark/70">
                {shareLabel}
              </span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-light hover:text-brand-gold"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.5v3h2.7v8h3.3Z" />
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-light hover:text-brand-gold"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-light hover:text-brand-gold"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={copyLink}
                aria-label={copyLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-light hover:text-brand-gold"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {coverUrl && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-10"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg sm:aspect-[21/9]">
              <Image
                src={coverUrl}
                alt={post.mainImageAlt || title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
