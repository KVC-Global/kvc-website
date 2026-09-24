import Image from "next/image"
import { PortableText, type PortableTextComponents } from "next-sanity"

import type { BlogPost } from "@/sanity/blog"
import { urlFor } from "@/sanity/image"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

type PortableImageValue = {
  asset?: { _ref?: string }
  alt?: string
}

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as PortableImageValue
      if (!image.asset?._ref) return null
      const url = urlFor(image).width(800).auto("format").url()
      if (!url) return null
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={image.alt || ""}
            width={800}
            height={533}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-lg object-cover"
          />
          {image.alt && (
            <figcaption className="mt-3 text-center text-sm text-brand-dark/60">
              {image.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export function BlogPostBody({
  post,
  className,
}: {
  post: BlogPost
  className?: string
}) {
  if (!post.body || post.body.length === 0) return null

  return (
    <section className={cn("w-full bg-muted pb-14 sm:pb-16", className)}>
      <Container>
        <article className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm sm:p-10 lg:p-14">
          <div className="prose prose-lg mx-auto max-w-none prose-p:leading-relaxed prose-p:text-brand-dark/80 prose-headings:font-heading prose-headings:text-brand-blue prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-bold prose-h3:mt-8 prose-h3:text-xl prose-a:font-semibold prose-a:text-brand-blue hover:prose-a:text-brand-blue-mid prose-strong:text-brand-dark prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:bg-muted/60 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-brand-dark/80 prose-li:text-brand-dark/80 prose-li:marker:text-brand-gold/60">
            <PortableText value={post.body} components={ptComponents} />
          </div>
        </article>
      </Container>
    </section>
  )
}
