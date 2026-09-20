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

export function BlogRelated({
  posts,
  className,
}: {
  posts: BlogPostCardData[]
  className?: string
}) {
  const t = useDictionary()

  if (posts.length === 0) return null

  return (
    <section
      aria-labelledby="blog-related-heading"
      className={cn("w-full bg-white py-14 sm:py-16", className)}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <h2
            id="blog-related-heading"
            className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            {t.blog.relatedTitle}
          </h2>
          <span
            aria-hidden="true"
            className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <BlogCard key={post._id || post.slug?.current} post={post} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
