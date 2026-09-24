"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import type { BlogPost } from "@/sanity/blog"
import { useLocale } from "@/lib/i18n-client"
import { useDictionary } from "@/lib/i18n-client"
import { formatPostDate } from "@/lib/blog"
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
  const coverUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(900).url()
    : null

  return (
    <section
      aria-labelledby="blog-post-heading"
      className={cn("w-full bg-muted pb-12 pt-28 sm:pb-14 sm:pt-32 md:pt-36", className)}
    >
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/tin-tuc"
              aria-label={t.blog.backToBlog}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white text-brand-blue-mid shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:text-brand-gold hover:shadow-md"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </Link>
          </motion.div>
          <div className="mx-auto mt-10 max-w-4xl text-center">
            {post.title && (
              <motion.h1
                variants={fadeUp}
                id="blog-post-heading"
                className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-[44px] md:leading-[1.12]"
              >
                {post.title}
              </motion.h1>
            )}
            {(date || post.authorName) && (
              <motion.div
                variants={fadeUp}
                className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm"
              >
                {date && (
                  <time
                    dateTime={post.publishedAt}
                    className="rounded-full border border-border/70 bg-white px-3 py-1 font-medium text-brand-blue-mid"
                  >
                    {date}
                  </time>
                )}
                {post.authorName && (
                  <span className="font-medium text-brand-dark/70">
                    {locale === "en" ? `By ${post.authorName}` : `Bởi ${post.authorName}`}
                  </span>
                )}
              </motion.div>
            )}
            {post.excerpt && (
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-brand-dark/75 sm:text-lg"
              >
                {post.excerpt}
              </motion.p>
            )}
          </div>
        </motion.div>
        {coverUrl && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mx-auto mt-10 max-w-5xl"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={coverUrl}
                alt={post.mainImageAlt || post.title || ""}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
