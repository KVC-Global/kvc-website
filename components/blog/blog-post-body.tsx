"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  List,
  Phone,
  Share2,
  Sparkles,
} from "lucide-react"
import {
  PortableText,
  toPlainText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity"

import type { BlogPost } from "@/sanity/blog"
import { urlFor } from "@/sanity/image"
import { Container } from "@/components/ui/container"
import { useDictionary, useLocale } from "@/lib/i18n-client"
import { SITE_URL } from "@/lib/seo"
import { getBlogReadingTime } from "@/lib/blog"
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
      const url = urlFor(image).width(1200).auto("format").url()
      if (!url) return null
      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-border/70 bg-brand-light/30 shadow-sm sm:my-12">
          <Image
            src={url}
            alt={image.alt || ""}
            width={1200}
            height={700}
            sizes="(max-width: 1024px) 100vw, 760px"
            className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
          />
          {image.alt && (
            <figcaption className="border-t border-border/50 bg-slate-50/80 px-4 py-3 text-center font-body text-xs text-brand-dark/70 sm:py-3.5">
              {image.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

type HeadingItem = {
  id: string
  label: string
  level: "h2" | "h3"
}

function getBodyHeadings(body: PortableTextBlock[]): HeadingItem[] {
  return body
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h2" || block.style === "h3")
    )
    .map((block) => ({
      id: block._key || "",
      label: toPlainText(block),
      level: (block.style as "h2" | "h3") || "h2",
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
  const locale = useLocale()
  const t = useDictionary()

  const [activeId, setActiveId] = useState<string>("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const headings = useMemo(
    () => (post.body ? getBodyHeadings(post.body) : []),
    [post.body]
  )
  const slug = post.slug?.current
  const postUrl = slug ? `${SITE_URL}/${locale}/tin-tuc/${slug}` : SITE_URL
  const encodedUrl = encodeURIComponent(postUrl)
  const consultationHref = `/${locale}/lien-he`
  const authorName = post.authorName || "KVC Global"
  const authorRole = post.authorRole || t.blog.authorRole
  const authorImageUrl = post.authorImage
    ? urlFor(post.authorImage).width(120).height(120).fit("crop").url()
    : null
  const authorInitial = authorName.charAt(0).toLocaleUpperCase(locale)

  // 1. Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight || document.body.scrollHeight
      const clientHeight = el.clientHeight
      const totalScrollable = scrollHeight - clientHeight
      if (totalScrollable > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, (scrollTop / totalScrollable) * 100))
        )
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 2. Active TOC Heading Spy via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by top offset to pick highest visible
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
          )
          setActiveId(topEntry.target.id)
        }
      },
      {
        rootMargin: "-90px 0px -60% 0px",
        threshold: 0,
      }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  const copyLink = async () => {
    if (!navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(postUrl)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2200)
    } catch {
      // Ignored
    }
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 100
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
    setActiveId(id)
    setIsMobileTocOpen(false)
  }

  if (!post.body || post.body.length === 0) return null

  return (
    <>
      {/* Dynamic Reading Progress Bar at top of screen */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[3px] bg-transparent"
      >
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-brand-blue-mid via-brand-gold to-brand-gold-light shadow-xs transition-[width] duration-75 ease-out"
        />
      </div>

      <section
        className={cn(
          "w-full bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24",
          className
        )}
      >
        <Container>
          {/* Mobile Collapsible TOC Drawer (Visible on screens < lg) */}
          {headings.length > 0 && (
            <div className="mb-8 rounded-2xl border border-border/70 bg-slate-50/80 p-4 shadow-2xs lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                className="flex w-full items-center justify-between font-heading text-sm font-bold text-brand-blue"
                aria-expanded={isMobileTocOpen}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-blue-mid/10 text-brand-blue-mid">
                    <List className="h-4 w-4" />
                  </span>
                  <span>{t.blog.tocLabel}</span>
                  <span className="rounded-full bg-brand-blue-mid/10 px-2 py-0.5 text-[11px] font-semibold text-brand-blue-mid">
                    {headings.length}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-brand-dark/60 transition-transform duration-200",
                    isMobileTocOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {isMobileTocOpen && (
                <nav
                  aria-label={t.blog.tocLabel}
                  className="mt-3.5 border-t border-border/60 pt-3"
                >
                  <ol className="space-y-2 text-xs font-medium">
                    {headings.map((heading, index) => (
                      <li key={heading.id}>
                        <button
                          type="button"
                          onClick={() => scrollToHeading(heading.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors",
                            activeId === heading.id
                              ? "bg-brand-blue-mid/10 font-bold text-brand-blue-mid"
                              : "text-brand-dark/75 hover:bg-slate-200/50 hover:text-brand-blue"
                          )}
                        >
                          <span className="font-heading font-semibold text-muted-foreground">
                            {index + 1}.
                          </span>
                          <span className="line-clamp-1">{heading.label}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>
          )}

          {/* Balanced 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Column 1: Main Content (Optimal Reading Line Length ~740px) */}
            <article className="min-w-0 lg:col-span-8">
              {/* Executive Summary / Key Takeaways Box */}
              {post.keyTakeaways?.length ? (
                <div className="mb-10 overflow-hidden rounded-2xl border border-brand-gold/35 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 p-5 shadow-xs sm:p-7">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-gold">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <h2 className="font-heading text-base font-extrabold text-brand-blue sm:text-lg">
                      {t.blog.keyTakeawaysTitle}
                    </h2>
                    <span className="ml-auto rounded-full bg-brand-gold/15 px-2.5 py-0.5 font-heading text-[11px] font-bold tracking-wide text-brand-gold uppercase">
                      Executive Summary
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3.5">
                    {post.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={`${takeaway}-${index}`}
                        className="flex items-start gap-3 text-sm leading-relaxed text-brand-dark/85 sm:text-[15px]"
                      >
                        <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Rich Editorial Body */}
              <div className="prose max-w-none prose-slate prose-headings:font-heading prose-headings:text-brand-blue prose-p:font-body prose-p:leading-[1.8] prose-p:text-brand-dark/85 sm:prose-p:text-[17px] prose-a:font-semibold prose-a:text-brand-blue-mid prose-a:underline-offset-4 hover:prose-a:text-brand-blue prose-blockquote:my-8 prose-blockquote:rounded-r-2xl prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:bg-slate-50/90 prose-blockquote:px-5 prose-blockquote:py-3.5 prose-blockquote:font-serif prose-blockquote:text-brand-dark/90 prose-blockquote:italic prose-strong:font-bold prose-strong:text-brand-blue prose-ul:my-5 prose-ul:list-disc prose-ul:pl-5 prose-li:my-1.5 prose-li:text-brand-dark/80 prose-li:marker:text-brand-gold">
                {post.body.map((block) => {
                  if (
                    block._type === "block" &&
                    (block.style === "h2" || block.style === "h3")
                  ) {
                    const HeadingTag = block.style === "h2" ? "h2" : "h3"
                    const isH2 = block.style === "h2"
                    return (
                      <HeadingTag
                        key={block._key}
                        id={block._key}
                        className={cn(
                          "group relative scroll-mt-28 font-heading text-brand-blue transition-colors",
                          isH2
                            ? "mt-12 mb-4 border-b border-border/60 pb-2.5 text-2xl font-extrabold sm:text-[26px]"
                            : "mt-8 mb-3 text-xl font-bold sm:text-2xl"
                        )}
                      >
                        <span className="mr-2">{toPlainText(block)}</span>
                        <button
                          type="button"
                          onClick={() => scrollToHeading(block._key || "")}
                          aria-label={`Link to ${toPlainText(block)}`}
                          className="inline-block opacity-0 transition-opacity duration-200 group-hover:opacity-60 hover:!opacity-100"
                        >
                          #
                        </button>
                      </HeadingTag>
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

              {/* End-of-article Author Bio Card */}
              <div className="mt-14 rounded-2xl border border-border/70 bg-gradient-to-br from-slate-50/90 via-white to-slate-50/50 p-6 shadow-xs sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  {authorImageUrl ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-sm ring-4 ring-brand-blue-mid/10 sm:h-20 sm:w-20">
                      <Image
                        src={authorImageUrl}
                        alt={authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading text-xl font-bold text-white shadow-sm sm:h-20 sm:w-20 sm:text-2xl">
                      {authorInitial}
                    </div>
                  )}

                  <div className="flex-1">
                    <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
                      {t.blog.authorBioTitle}
                    </span>
                    <h3 className="mt-1 flex items-center gap-2 font-heading text-lg font-bold text-brand-blue sm:text-xl">
                      <span>{authorName}</span>
                      <CheckCircle2 className="h-4 w-4 text-brand-blue-mid" />
                    </h3>
                    <p className="text-xs font-medium text-brand-blue-mid sm:text-sm">
                      {authorRole}
                    </p>
                    <p className="mt-2.5 font-body text-xs leading-relaxed text-brand-dark/75 sm:text-sm">
                      {t.blog.authorBioDefault}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={consultationHref}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-mid px-4 py-2 font-heading text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-brand-blue"
                      >
                        <span>{t.blog.consultationCta}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* End-of-article Floating Share & Back Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
                <Link
                  href={`/${locale}/tin-tuc`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue-mid transition-colors hover:text-brand-blue sm:text-sm"
                >
                  <span>←</span>
                  <span>{t.blog.backToBlog}</span>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brand-dark/65">
                    {t.blog.shareTitle}:
                  </span>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-white text-brand-blue transition-colors hover:border-brand-blue-mid hover:bg-brand-blue-mid hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 fill-current"
                    >
                      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.5v3h2.7v8h3.3Z" />
                    </svg>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-white text-brand-blue transition-colors hover:border-brand-blue-mid hover:bg-brand-blue-mid hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 fill-current"
                    >
                      <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    onClick={copyLink}
                    aria-label={t.blog.copiedLink}
                    className="flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-white px-2.5 text-xs font-semibold text-brand-blue transition-colors hover:border-brand-blue-mid hover:text-brand-blue-mid"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-[11px] text-emerald-600">
                          {t.blog.copiedLink}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-brand-blue-mid" />
                        <span className="text-[11px]">Copy link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>

            {/* Column 2: Sticky Desktop Sidebar (TOC + High Converting KVC Widget) */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-6">
                {/* 1. Desktop Table of Contents Card */}
                {headings.length > 0 && (
                  <div className="rounded-2xl border border-border/70 bg-slate-50/70 p-5 shadow-xs backdrop-blur-xs">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-blue-mid/10 text-brand-blue-mid">
                          <List className="h-4 w-4" />
                        </span>
                        <h2 className="font-heading text-sm font-bold text-brand-blue">
                          {t.blog.tocTitle}
                        </h2>
                      </div>
                      <span className="rounded-full bg-brand-blue-mid/10 px-2 py-0.5 font-heading text-[10px] font-bold text-brand-blue-mid">
                        {headings.length} {locale === "en" ? "sections" : "mục"}
                      </span>
                    </div>

                    <nav
                      aria-label={t.blog.tocLabel}
                      className="mt-3.5 max-h-[360px] overflow-y-auto pr-1"
                    >
                      <ol className="space-y-1 text-xs">
                        {headings.map((heading, index) => {
                          const isActive = activeId === heading.id
                          const isSub = heading.level === "h3"
                          return (
                            <li key={heading.id}>
                              <button
                                type="button"
                                onClick={() => scrollToHeading(heading.id)}
                                className={cn(
                                  "group flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left transition-all",
                                  isSub ? "pl-5 text-[11.5px]" : "font-medium",
                                  isActive
                                    ? "border-l-2 border-brand-blue-mid bg-white font-bold text-brand-blue-mid shadow-xs ring-1 ring-border/80"
                                    : "text-brand-dark/75 hover:bg-white/70 hover:text-brand-blue"
                                )}
                              >
                                <span
                                  className={cn(
                                    "font-heading text-[11px] font-semibold",
                                    isActive
                                      ? "text-brand-blue-mid"
                                      : "text-muted-foreground/60"
                                  )}
                                >
                                  {index + 1}.
                                </span>
                                <span className="line-clamp-2 leading-relaxed">
                                  {heading.label}
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ol>
                    </nav>
                  </div>
                )}

                {/* 2. High-Converting KVC Consultation Widget */}
                <div className="overflow-hidden rounded-2xl border border-brand-blue-mid/20 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-mid p-5 text-white shadow-md">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/20 px-3 py-0.5 font-heading text-[11px] font-bold text-brand-gold-light">
                    <Sparkles className="h-3 w-3" />
                    <span>
                      {locale === "en"
                        ? "Free 1-on-1 Advisory"
                        : "Tư vấn 1:1 chuyên sâu"}
                    </span>
                  </div>

                  <h3 className="mt-3 font-heading text-base leading-snug font-extrabold text-white sm:text-lg">
                    {t.blog.consultationTitle}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-white/80">
                    {t.blog.consultationSubtitle}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-white/15 pt-3.5 text-xs text-white/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                      <span>
                        {locale === "en"
                          ? "Free Profile Evaluation"
                          : "Thẩm định hồ sơ miễn phí"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                      <span>
                        {locale === "en"
                          ? "Scholarships up to 100%"
                          : "Định hướng học bổng đến 100%"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                      <span>
                        {locale === "en"
                          ? "MoM Work Pass & Relocation"
                          : "Tư vấn Work Pass MoM Singapore"}
                      </span>
                    </li>
                  </ul>

                  <div className="mt-5 space-y-2.5">
                    <Link
                      href={consultationHref}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 py-2.5 font-heading text-xs font-bold text-brand-blue shadow-xs transition-all hover:bg-brand-gold-light"
                    >
                      <span>{t.blog.consultationCta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <a
                      href="tel:+84911942409"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-heading text-xs font-semibold text-white transition-colors hover:bg-white/20"
                    >
                      <Phone className="h-3.5 w-3.5 text-brand-gold-light" />
                      <span>Hotline: (+84) 911 942 409</span>
                    </a>
                  </div>
                </div>

                {/* 3. Compact Reading Info / Quick Share */}
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-white p-3.5 text-xs font-medium text-brand-dark/70 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-brand-blue-mid" />
                    <span>{getBlogReadingTime(post, locale)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-light hover:text-brand-gold"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 fill-current"
                      >
                        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.5v3h2.7v8h3.3Z" />
                      </svg>
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-light hover:text-brand-gold"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 fill-current"
                      >
                        <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
                      </svg>
                    </a>

                    <button
                      type="button"
                      onClick={copyLink}
                      aria-label={t.blog.copiedLink}
                      title="Copy link"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-light hover:text-brand-gold"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
