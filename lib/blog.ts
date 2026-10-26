import type { BlogPostCard } from "@/sanity/blog"

export type { BlogPostCard } from "@/sanity/blog"

export const BLOG_CATEGORIES = [
  "all",
  "study-abroad",
  "work",
  "scholarship",
  "residency",
  "experience",
  "news",
  "event",
] as const

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]

const CATEGORY_KEYWORDS: Record<Exclude<BlogCategoryId, "all">, string[]> = {
  "study-abroad": [
    "du học",
    "study abroad",
    "ossd",
    "othm",
    "qualifi",
    "trường",
    "sinh viên",
  ],
  work: ["work pass", "employment pass", "s pass", "work permit"],
  scholarship: ["học bổng", "scholarship"],
  residency: ["định cư", "residency", "relocation", "mm2h"],
  experience: ["kinh nghiệm", "chi phí", "guide", "cost"],
  news: ["tin tức", "news"],
  event: ["sự kiện", "event"],
}

const CATEGORY_PRIORITY: Exclude<BlogCategoryId, "all">[] = [
  "scholarship",
  "experience",
  "residency",
  "work",
  "study-abroad",
  "event",
  "news",
]

export function getBlogCategory(post: BlogPostCard): BlogCategoryId {
  const category = post.category?.toLowerCase()
  if (category && BLOG_CATEGORIES.includes(category as BlogCategoryId)) {
    return category as BlogCategoryId
  }

  const searchableText =
    `${post.title || ""} ${post.excerpt || ""}`.toLocaleLowerCase()

  for (const categoryId of CATEGORY_PRIORITY) {
    if (
      CATEGORY_KEYWORDS[categoryId].some((keyword) =>
        searchableText.includes(keyword)
      )
    ) {
      return categoryId
    }
  }

  return "news"
}

export function getBlogCategoryLabel(post: BlogPostCard, locale: "vi" | "en") {
  const category = getBlogCategory(post)
  const labels = {
    vi: {
      "study-abroad": "Du học",
      work: "Việc làm",
      scholarship: "Học bổng",
      residency: "Định cư",
      experience: "Kinh nghiệm",
      news: "Tin tức",
      event: "Sự kiện",
    },
    en: {
      "study-abroad": "Study abroad",
      work: "Work",
      scholarship: "Scholarships",
      residency: "Residency",
      experience: "Insights",
      news: "News",
      event: "Events",
    },
  } as const

  return labels[locale][category === "all" ? "news" : category]
}

export function getBlogReadingTime(post: BlogPostCard, locale: "vi" | "en") {
  const minutes =
    post.readingTime ||
    Math.max(
      4,
      Math.min(
        8,
        Math.ceil(`${post.title || ""} ${post.excerpt || ""}`.length / 180)
      )
    )

  return locale === "en" ? `${minutes} min read` : `${minutes} phút đọc`
}

export function formatPostDate(date: string | undefined, locale: "vi" | "en") {
  if (!date) return ""
  return new Date(date).toLocaleDateString(
    locale === "en" ? "en-US" : "vi-VN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )
}

export function blogPostHref(slug: string | undefined, locale: "vi" | "en") {
  return slug ? `/${locale}/tin-tuc/${slug}` : "#"
}

export type BlogFilterTab = {
  id: BlogCategoryId
  label: { vi: string; en: string }
}

export const BLOG_FILTER_TABS: BlogFilterTab[] = [
  { id: "all", label: { vi: "Tất cả", en: "All" } },
  { id: "study-abroad", label: { vi: "Du học", en: "Study Abroad" } },
  { id: "work", label: { vi: "Work Pass & Việc làm", en: "Work & Career" } },
  { id: "scholarship", label: { vi: "Học bổng", en: "Scholarships" } },
  { id: "residency", label: { vi: "Định cư & Đời sống", en: "Residency" } },
  { id: "experience", label: { vi: "Kinh nghiệm", en: "Insights" } },
]

export type BlogQuickTag = {
  id: string
  label: string
  query: string
}

export const BLOG_QUICK_TAGS: BlogQuickTag[] = [
  { id: "singapore", label: "#Singapore", query: "Singapore" },
  { id: "work-pass", label: "#WorkPass", query: "work pass" },
  { id: "dai-hoc", label: "#ĐạiHọc", query: "đại học" },
  { id: "hoc-bong", label: "#HọcBổng", query: "học bổng" },
  { id: "chi-phi", label: "#ChiPhí", query: "chi phí" },
  { id: "ossd", label: "#OSSD", query: "ossd" },
]

export function matchPostSearch(post: BlogPostCard, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const title = (post.title || "").toLowerCase()
  const excerpt = (post.excerpt || "").toLowerCase()
  const category = (post.category || "").toLowerCase()
  return title.includes(q) || excerpt.includes(q) || category.includes(q)
}
