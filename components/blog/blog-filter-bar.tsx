"use client"

import { motion } from "framer-motion"
import { Search, Tag, X } from "lucide-react"

import { useDictionary, useLocale } from "@/lib/i18n-client"
import {
  type BlogCategoryId,
  type BlogFilterTab,
  type BlogQuickTag,
} from "@/lib/blog"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

export function BlogFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
  searchQuery,
  onSearchChange,
  quickTags,
  selectedTag,
  onSelectTag,
  totalFiltered,
  totalAll,
  onClearFilter,
  className,
}: {
  categories: BlogFilterTab[]
  activeCategory: BlogCategoryId
  onSelectCategory: (category: BlogCategoryId) => void
  categoryCounts: Record<string, number>
  searchQuery: string
  onSearchChange: (query: string) => void
  quickTags: BlogQuickTag[]
  selectedTag: string | null
  onSelectTag: (tag: BlogQuickTag | null) => void
  totalFiltered: number
  totalAll: number
  onClearFilter: () => void
  className?: string
}) {
  const locale = useLocale()
  const t = useDictionary()

  const isFiltered =
    activeCategory !== "all" ||
    searchQuery.trim() !== "" ||
    selectedTag !== null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
      className={cn(
        "sticky top-20 z-20 border-y border-border/70 bg-white/95 py-4 backdrop-blur-md transition-all sm:py-4.5",
        className
      )}
    >
      <Container>
        <div className="flex flex-col gap-3.5">
          {/* Top row: Category Pills + Search input */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Category tabs with fluid layoutId animation */}
            <div
              role="tablist"
              aria-label={t.blog.filterCategory}
              className="-mx-4 no-scrollbar flex items-center gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {categories.map((tab) => {
                const isActive = activeCategory === tab.id
                const count = categoryCounts[tab.id] ?? 0

                return (
                  <motion.button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      onSelectCategory(tab.id)
                    }}
                    className={cn(
                      "group relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-heading text-xs font-semibold tracking-wide transition-all sm:text-sm",
                      isActive
                        ? "text-white"
                        : "bg-slate-100/80 text-brand-dark/70 hover:bg-slate-200/70 hover:text-brand-blue-mid"
                    )}
                  >
                    {/* Fluid sliding pill background for active tab */}
                    {isActive && (
                      <motion.span
                        layoutId="activeFilterPill"
                        className="absolute inset-0 rounded-full bg-brand-blue-mid shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}

                    <span className="relative z-10">{tab.label[locale]}</span>

                    {count > 0 && (
                      <span
                        className={cn(
                          "relative z-10 flex h-4 min-w-4 items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-colors",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 text-brand-dark/65 group-hover:bg-brand-blue-mid/10 group-hover:text-brand-blue-mid"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full shrink-0 sm:max-w-xs lg:w-76">
              <label htmlFor="blog-search-input" className="sr-only">
                {t.blog.searchPlaceholder}
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="blog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.blog.searchPlaceholder}
                className="w-full rounded-full border border-border/80 bg-white py-2 pr-9 pl-9.5 text-xs text-brand-dark transition-all placeholder:text-muted-foreground/70 focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-mid/20 focus:outline-none sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  aria-label={t.blog.clearFilter}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-brand-dark"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom row: Quick tags & active filter summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-2.5 text-xs">
            {/* Quick tags */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="flex items-center gap-1 font-heading text-[11px] font-bold tracking-wider text-brand-dark/60 uppercase">
                <Tag className="h-3 w-3 text-brand-gold" />
                {t.blog.trendingTagTitle}:
              </span>
              {quickTags.map((tag) => {
                const isSelected = selectedTag === tag.id

                return (
                  <motion.button
                    key={tag.id}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectTag(isSelected ? null : tag)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all",
                      isSelected
                        ? "border border-brand-blue-mid/30 bg-brand-blue-mid/10 font-bold text-brand-blue-mid shadow-xs"
                        : "border border-slate-200/80 bg-slate-100/90 text-brand-dark/65 hover:border-brand-blue-mid/20 hover:bg-brand-blue-mid/8 hover:text-brand-blue-mid"
                    )}
                  >
                    {tag.label}
                  </motion.button>
                )
              })}
            </div>

            {/* Active filter results count and pleasant clear button */}
            {isFiltered && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-brand-dark/75">
                  {locale === "en"
                    ? `Showing ${totalFiltered} of ${totalAll} articles`
                    : `Hiển thị ${totalFiltered} / ${totalAll} bài viết`}
                </span>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={onClearFilter}
                  className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-white px-2.5 py-1 text-xs font-medium text-brand-dark/70 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                  <span>{t.blog.clearFilter}</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </motion.div>
  )
}
