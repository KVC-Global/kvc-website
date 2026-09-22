"use client"

import { motion, Variants } from "framer-motion"

import type { BlogPostCard as BlogPostCardData } from "@/sanity/blog"
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
  const t = useDictionary()

  if (posts.length === 0) {
    return (
      <section
        className={cn("w-full bg-white py-10 sm:py-12 lg:py-16", className)}
      >
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-brand-light px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-md rounded-lg border border-border/60 bg-white p-10 text-center shadow-sm">
              <h2 className="font-heading text-xl font-bold text-brand-blue">
                {t.blog.emptyTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-dark/80">
                {t.blog.emptyDescription}
              </p>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section
      className={cn("w-full bg-white py-10 sm:py-12 lg:py-16", className)}
    >
      <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
        <div className="rounded-lg bg-brand-light px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <BlogCard key={post._id || post.slug?.current} post={post} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
