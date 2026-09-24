export function formatPostDate(date: string | undefined, locale: "vi" | "en") {
  if (!date) return ""
  return new Date(date).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function blogPostHref(slug: string | undefined, locale: "vi" | "en") {
  return slug ? `/${locale}/tin-tuc/${slug}` : "#"
}
