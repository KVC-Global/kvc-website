"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"

import type { BlogPostCard as BlogPostCardData } from "@/sanity/blog"
import { useLocale } from "@/lib/i18n-client"
import { useDictionary } from "@/lib/i18n-client"
import { Container } from "@/components/ui/container"
import { BlogCard } from "@/components/blog/blog-card"
import { cn } from "@/lib/utils"

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export function BlogGrid({
  posts,
  className,
}: {
  posts: BlogPostCardData[]
  className?: string
}) {
  const locale = useLocale()
  const t = useDictionary()

  if (posts.length === 0) {
    return (
      <section
        className={cn("w-full bg-muted py-20 sm:py-24", className)}
      >
        <Container>
          <div className="mx-auto max-w-md rounded-lg border border-border/60 bg-white p-10 text-center shadow-sm">
            <h2 className="font-heading text-xl font-bold text-brand-blue">
              {t.blog.emptyTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-dark/80">
              {t.blog.emptyDescription}
            </p>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section
      className={cn("w-full bg-muted py-14 sm:py-16", className)}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <BlogCard key={post._id || post.slug?.current} post={post} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
