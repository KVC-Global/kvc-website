"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion, type Variants } from "framer-motion"

import type { BlogPostCard as BlogPostCardData } from "@/sanity/blog"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import { Container } from "@/components/ui/container"
import { BlogCard } from "@/components/blog/blog-card"
import { cn } from "@/lib/utils"

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export function BlogRelated({
  posts,
  className,
}: {
  posts: BlogPostCardData[]
  className?: string
}) {
  const locale = useLocale()
  const t = useDictionary()

  if (posts.length === 0) return null

  return (
    <section
      aria-labelledby="blog-related-heading"
      className={cn(
        "w-full border-t border-border/60 bg-gradient-to-b from-slate-50/60 via-slate-50/30 to-white py-14 sm:py-16 lg:py-20",
        className
      )}
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <div className="flex items-center gap-1.5 font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              <span>
                {locale === "en" ? "Explore More" : "Đọc tiếp & khám phá"}
              </span>
            </div>
            <h2
              id="blog-related-heading"
              className="mt-1 font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
            >
              {t.blog.relatedTitle}
            </h2>
          </div>

          <Link
            href={`/${locale}/tin-tuc`}
            className="group inline-flex items-center gap-1.5 font-heading text-xs font-bold text-brand-blue-mid transition-colors hover:text-brand-blue sm:text-sm"
          >
            <span>{t.blog.viewAll}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <BlogCard key={post._id || post.slug?.current} post={post} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
