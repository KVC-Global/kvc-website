"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Newspaper,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import type { BlogPostCard } from "@/sanity/blog"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import {
  blogPostHref,
  formatPostDate,
  getBlogCategoryLabel,
  getBlogReadingTime,
} from "@/lib/blog"
import { urlFor } from "@/sanity/image"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const spotlightContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
}

const cardSlideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const listStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const listItemVariant: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
}

export function BlogSpotlight({
  spotlightPost,
  trendingPosts,
  className,
}: {
  spotlightPost: BlogPostCard
  trendingPosts: BlogPostCard[]
  className?: string
}) {
  const locale = useLocale()
  const t = useDictionary()

  if (!spotlightPost) return null

  const spotlightHref = blogPostHref(spotlightPost.slug?.current, locale)
  const spotlightImg = spotlightPost.mainImage
    ? urlFor(spotlightPost.mainImage).width(1200).height(750).url()
    : null
  const spotlightDate = formatPostDate(spotlightPost.publishedAt, locale)
  const spotlightCategory = getBlogCategoryLabel(spotlightPost, locale)
  const spotlightReadingTime = getBlogReadingTime(spotlightPost, locale)
  const spotlightAuthor = spotlightPost.authorName || "KVC Global"

  return (
    <section
      aria-labelledby="blog-spotlight-heading"
      className={cn("w-full bg-white pb-10 sm:pb-14", className)}
    >
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={spotlightContainer}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
        >
          {/* Cover Story / Bài Tiêu Điểm (60% Desktop) */}
          <motion.article
            variants={cardSlideUp}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-white p-3.5 shadow-sm transition-shadow duration-300 hover:border-brand-blue-mid/40 hover:shadow-xl sm:p-5 lg:col-span-7"
          >
            <div>
              <Link
                href={spotlightHref}
                className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-brand-light sm:aspect-[16/9]"
              >
                {spotlightImg ? (
                  <Image
                    src={spotlightImg}
                    alt={
                      spotlightPost.mainImageAlt || spotlightPost.title || ""
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-blue-mid">
                    <Newspaper
                      className="h-12 w-12 text-brand-gold-light"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Spotlight Badge */}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-brand-blue-mid/90 px-3 py-1 text-xs font-semibold text-brand-gold-light shadow-md backdrop-blur-md sm:top-4 sm:left-4">
                  <Sparkles className="h-3.5 w-3.5 text-brand-gold-light" />
                  {t.blog.spotlightBadge}
                </span>

                {/* Category Badge */}
                <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-wider text-brand-blue-mid uppercase shadow-sm backdrop-blur-md sm:top-4 sm:right-4">
                  {spotlightCategory}
                </span>
              </Link>

              <div className="pt-4 sm:pt-5">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-muted-foreground">
                  {spotlightDate && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={spotlightPost.publishedAt}>
                        {spotlightDate}
                      </time>
                    </span>
                  )}
                  {spotlightDate && <span>•</span>}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {spotlightReadingTime}
                  </span>
                </div>

                {/* Title */}
                <Link href={spotlightHref} className="block">
                  <h2
                    id="blog-spotlight-heading"
                    className="mt-2.5 font-heading text-xl leading-snug font-extrabold text-brand-blue transition-colors group-hover:text-brand-blue-mid sm:text-2xl lg:text-[26px]"
                  >
                    {spotlightPost.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                {spotlightPost.excerpt && (
                  <p className="mt-2.5 line-clamp-3 font-body text-sm leading-relaxed text-brand-dark/75 sm:text-[15px]">
                    {spotlightPost.excerpt}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom bar: Author + Pleasant Blue Button */}
            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 sm:mt-6">
              <span className="text-xs font-medium text-brand-dark/65">
                {spotlightAuthor}
              </span>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={spotlightHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue-mid px-4.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:bg-brand-blue hover:shadow-md"
                >
                  <span>{t.blog.readMore}</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.article>

          {/* Right Rail: Trending / Đọc nhiều nhất (40% Desktop) */}
          <motion.div
            variants={cardSlideUp}
            className="flex flex-col justify-between rounded-2xl border border-border/70 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/50 p-5 shadow-sm sm:p-6 lg:col-span-5 lg:p-7"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue-mid/10 text-brand-blue-mid">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-brand-blue">
                    {t.blog.mostReadTitle}
                  </h3>
                </div>
                <span className="rounded-full bg-brand-blue-mid/10 px-2.5 py-0.5 font-heading text-[11px] font-bold tracking-wider text-brand-blue-mid uppercase">
                  {t.blog.weeklyTop}
                </span>
              </div>

              {/* Articles list with staggered entrance */}
              <motion.div
                variants={listStagger}
                className="divide-y divide-border/60"
              >
                {trendingPosts.map((post, idx) => {
                  const href = blogPostHref(post.slug?.current, locale)
                  const category = getBlogCategoryLabel(post, locale)
                  const date = formatPostDate(post.publishedAt, locale)
                  const readingTime = getBlogReadingTime(post, locale)

                  return (
                    <motion.div
                      key={post._id || post.slug?.current || idx}
                      variants={listItemVariant}
                    >
                      <Link
                        href={href}
                        className="group/item flex items-start gap-4 py-4.5 transition-colors first:pt-4 last:pb-0"
                      >
                        {/* Stylized index numeral */}
                        <span className="font-heading text-2xl font-extrabold text-brand-blue-mid/30 transition-colors duration-300 group-hover/item:text-brand-gold sm:text-3xl">
                          0{idx + 1}
                        </span>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground">
                            <span className="font-heading font-semibold tracking-wide text-brand-blue-mid uppercase">
                              {category}
                            </span>
                            {date && (
                              <>
                                <span>•</span>
                                <time dateTime={post.publishedAt}>{date}</time>
                              </>
                            )}
                          </div>

                          <h4 className="mt-1 line-clamp-2 font-heading text-sm leading-snug font-bold text-brand-blue transition-colors group-hover/item:text-brand-blue-mid sm:text-[15px]">
                            {post.title}
                          </h4>

                          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {readingTime}
                          </span>
                        </div>

                        {/* Harmonious hover arrow button */}
                        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/80 bg-white text-muted-foreground transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:border-brand-blue-mid group-hover/item:bg-brand-blue-mid group-hover/item:text-white">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Quick helper note */}
            <div className="mt-6 rounded-xl border border-border/60 bg-white/80 p-3.5 text-xs text-brand-dark/75 shadow-xs">
              <p className="leading-relaxed">
                <span className="font-bold text-brand-blue-mid">
                  KVC Global Insights:
                </span>{" "}
                {locale === "en"
                  ? "Curated guides, official MoM work pass updates and Singapore university admissions."
                  : "Cẩm nang chọn trường, học bổng và cập nhật chính sách Work Pass mới nhất từ MoM Singapore."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
