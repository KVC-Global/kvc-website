"use client"

import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import {
  PortableText,
  toPlainText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity"

import type { BlogPost } from "@/sanity/blog"
import { urlFor } from "@/sanity/image"
import { Container } from "@/components/ui/container"
import { useDictionary } from "@/lib/i18n-client"
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
      const url = urlFor(image).width(960).auto("format").url()
      if (!url) return null
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={image.alt || ""}
            width={960}
            height={640}
            sizes="(max-width: 1024px) 100vw, 960px"
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

function getBodyHeadings(body: PortableTextBlock[]) {
  return body
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h2" || block.style === "h3")
    )
    .map((block) => ({
      id: block._key || "",
      label: toPlainText(block),
    }))
    .filter((heading) => heading.id && heading.label)
}

export function BlogPostBody({
  post,
  className,
}: {
  post: BlogPost
  className?: string
}) {
  const t = useDictionary()

  if (!post.body || post.body.length === 0) return null

  const headings = getBodyHeadings(post.body)

  return (
    <section
      className={cn("w-full bg-white pb-14 sm:pb-16 lg:pb-20", className)}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,180px)_minmax(0,880px)] lg:justify-center lg:gap-x-28">
          {headings.length > 0 && (
            <aside className="lg:sticky lg:top-28 lg:-ml-6 lg:self-start">
              <h2 className="font-heading text-sm font-bold text-brand-blue">
                {t.blog.tocTitle}
              </h2>
              <nav aria-label={t.blog.tocLabel} className="mt-4">
                <ol className="space-y-3 text-sm leading-relaxed">
                  {headings.map((heading, index) => (
                    <li key={heading.id} className="text-brand-dark/65">
                      <Link
                        href={`#${heading.id}`}
                        className="hover:text-brand-blue"
                      >
                        {index + 1}. {heading.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <article className="max-w-[880px] min-w-0">
            {post.keyTakeaways?.length ? (
              <div className="mb-10 rounded-lg border border-brand-blue/10 bg-brand-light p-5 sm:p-6">
                <h2 className="font-heading text-lg font-bold text-brand-blue">
                  {t.blog.keyTakeawaysTitle}
                </h2>
                <ul className="mt-4 space-y-3">
                  {post.keyTakeaways.map((takeaway, index) => (
                    <li
                      key={`${takeaway}-${index}`}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="prose prose-base max-w-none prose-p:leading-relaxed prose-p:text-brand-dark/80 prose-a:font-semibold prose-a:text-brand-blue hover:prose-a:text-brand-blue-mid prose-blockquote:my-6 prose-blockquote:rounded-md prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:bg-muted/60 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-brand-dark/80 prose-blockquote:not-italic prose-strong:text-brand-dark prose-li:text-brand-dark/80 prose-li:marker:text-brand-gold/60">
              {post.body.map((block) => {
                if (
                  block._type === "block" &&
                  (block.style === "h2" || block.style === "h3")
                ) {
                  const Heading = block.style === "h2" ? "h2" : "h3"
                  return (
                    <Heading
                      key={block._key}
                      id={block._key}
                      className={cn(
                        "scroll-mt-28 font-heading text-brand-blue first:mt-0",
                        block.style === "h2"
                          ? "mt-10 text-2xl font-bold"
                          : "mt-8 text-xl font-bold"
                      )}
                    >
                      {toPlainText(block)}
                    </Heading>
                  )
                }

                return (
                  <PortableText
                    key={block._key}
                    value={[block]}
                    components={ptComponents}
                  />
                )
              })}
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
