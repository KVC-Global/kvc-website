# Khoa Hoc Online Sub-pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `khoa-hoc-online` into 4 sub-pages (OSSD, OTHM, Qualifi, Wolverhampton) with a nav dropdown/accordion.

**Architecture:** Next.js App Router pages under `khoa-hoc-online/` with a redirect from the parent. Each sub-page imports a single content component. The navbar gains a dropdown (desktop) and accordion (mobile) for "Khóa học Online" using the existing language-switcher dropdown pattern.

**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS + framer-motion + Lucide icons

## Global Constraints

- Follow existing codebase patterns: `"use client"` components with framer-motion animations, Container wrapper, cn() utility
- All routes are file-system routes without locale prefix (proxy.ts handles `/vi`/`/en`)
- Nav labels come from i18n dictionaries in `messages/vi.json` and `messages/en.json`
- Content is primarily Vietnamese; English translations are placeholder
- Each page exports its own `Metadata` for SEO
- Dropdown uses onClick toggle + click-outside + Escape close (matching language switcher pattern)

---
````

### Task 1: Update i18n dictionaries with sub-page nav labels

**Files:**
- Modify: `messages/vi.json`
- Modify: `messages/en.json`

**Interfaces:**
- Produces: `nav.ossd`, `nav.othm`, `nav.qualifi`, `nav.wolverhampton` keys in both dictionaries

- [ ] **Step 1: Add Vietnamese sub-page labels**

In `messages/vi.json`, update the `nav` object to include:

```json
"nav": {
  "home": "Trang chủ",
  "about": "Giới thiệu",
  "workPass": "Work pass & việc làm",
  "studyAbroad": "Du học",
  "onlineCourses": "Khóa học Online",
  "ossd": "OSSD Ontario",
  "othm": "OTHM",
  "qualifi": "Qualifi",
  "wolverhampton": "University of Wolverhampton",
  "enterprise": "Dịch vụ doanh nghiệp",
  "contact": "Liên hệ"
}
```

- [ ] **Step 2: Add English sub-page labels**

In `messages/en.json`, update the `nav` object to include:

```json
"nav": {
  "home": "Home",
  "about": "About Us",
  "workPass": "Work Pass & Employment",
  "studyAbroad": "Study Abroad",
  "onlineCourses": "Online Courses",
  "ossd": "OSSD Ontario",
  "othm": "OTHM",
  "qualifi": "Qualifi",
  "wolverhampton": "University of Wolverhampton",
  "enterprise": "Enterprise Services",
  "contact": "Contact"
}
```

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: No errors related to the dictionary types.

- [ ] **Step 4: Commit**

```bash
git add messages/vi.json messages/en.json
git commit -m "feat: add sub-page nav labels to i18n dictionaries

Co-Authored-By: Claude <noreply@anthropic.com>"
```

````

### Task 2: Add dropdown and accordion nav for Khóa học Online

**Files:**
- Modify: `components/site-header-nav.tsx`

**Interfaces:**
- Consumes: `nav.ossd`, `nav.othm`, `nav.qualifi`, `nav.wolverhampton` from dictionaries
- Produces: updated `SiteHeaderNav` with dropdown, updated `SiteHeaderMobileMenu` with accordion
- Internal types: `NavLink` type extended with optional `children` array

- [ ] **Step 1: Rewrite `site-header-nav.tsx` with dropdown support**

Replace the entire file content:

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useDictionary, useLocale } from "@/lib/i18n-client"

// ─── types ──────────────────────────────────────────────────────────────────

type SubLink = {
  href: string
  key: string
}

type NavLink = {
  href: string
  key: string
  children?: SubLink[]
}

const NAV_LINKS: NavLink[] = [
  { href: "/", key: "home" },
  { href: "/gioi-thieu", key: "about" },
  { href: "/work-pass", key: "workPass" },
  { href: "/du-hoc", key: "studyAbroad" },
  {
    href: "/khoa-hoc-online",
    key: "onlineCourses",
    children: [
      { href: "/khoa-hoc-online/ossd", key: "ossd" },
      { href: "/khoa-hoc-online/othm", key: "othm" },
      { href: "/khoa-hoc-online/qualifi", key: "qualifi" },
      { href: "/khoa-hoc-online/wolverhampton", key: "wolverhampton" },
    ],
  },
  { href: "/doanh-nghiep", key: "enterprise" },
  { href: "/lien-he", key: "contact" },
]

// ─── helpers ────────────────────────────────────────────────────────────────

function getLocalizedHref(href: string, locale: string) {
  const prefix = locale === "en" ? "/en" : "/vi"
  if (href === "/") return prefix
  return `${prefix}${href}`
}

function isActive(pathname: string, href: string) {
  if (href === "/vi" || href === "/en") {
    return pathname === "/vi" || pathname === "/en"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Check if any child link is active (for dropdown parent highlighting) */
function isChildActive(pathname: string, children: SubLink[], locale: string) {
  return children.some((child) => isActive(pathname, getLocalizedHref(child.href, locale)))
}

// ─── desktop dropdown ───────────────────────────────────────────────────────

function NavDropdown({
  link,
  locale,
  t,
}: {
  link: NavLink
  locale: string
  t: ReturnType<typeof useDictionary>
}) {
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLLIElement | null>(null)

  const parentHref = getLocalizedHref(link.href, locale)
  const parentActive = isActive(pathname, parentHref)
  const childActive = isChildActive(pathname, link.children!, locale)
  const active = parentActive || childActive

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <li key={link.href} ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group relative inline-flex items-center gap-1 py-1 font-body text-[15px] font-medium whitespace-nowrap transition-colors duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
          active && "text-brand-gold"
        )}
      >
        <span className="relative inline-block">
          {t.nav[link.key]}
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 rounded-full bg-brand-gold transition-transform duration-300 ease-out",
              active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            )}
          />
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul className="absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-sm border border-border bg-white py-1 shadow-lg">
          {link.children!.map((child) => {
            const childHref = getLocalizedHref(child.href, locale)
            const childItemActive = isActive(pathname, childHref)
            return (
              <li key={child.href}>
                <Link
                  href={childHref}
                  aria-current={childItemActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors hover:bg-muted",
                    childItemActive
                      ? "font-semibold text-brand-gold"
                      : "text-foreground"
                  )}
                >
                  {t.nav[child.key]}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

// ─── main nav component ─────────────────────────────────────────────────────

export function SiteHeaderNav({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useDictionary()
  const pathname = usePathname() ?? "/"

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-7 font-body text-[15px] font-medium text-primary">
        {NAV_LINKS.map((link) => {
          // Render dropdown for links with children
          if (link.children) {
            return <NavDropdown key={link.href} link={link} locale={locale} t={t} />
          }

          // Flat link (no children)
          const localizedHref = getLocalizedHref(link.href, locale)
          const label = t.nav[link.key]
          const active = isActive(pathname, localizedHref)
          return (
            <li key={link.href}>
              <Link
                href={localizedHref}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block py-1 whitespace-nowrap transition-colors duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                  active && "text-brand-gold"
                )}
              >
                <span className="relative inline-block">
                  {label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 rounded-full bg-brand-gold transition-transform duration-300 ease-out",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    )}
                  />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// ─── mobile menu ────────────────────────────────────────────────────────────

export function SiteHeaderMobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname() ?? "/"
  const locale = useLocale()
  const t = useDictionary()
  const [expandedKey, setExpandedKey] = React.useState<string | null>(null)

  React.useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  React.useEffect(() => {
    if (!open) {
      setExpandedKey(null)
      return
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div id="site-mobile-nav" className="fixed inset-0 z-50 bg-white xl:hidden">
      <div className="flex h-20 items-center justify-end px-6">
        <button
          type="button"
          aria-label={locale === "en" ? "Close menu" : "Đóng menu"}
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav aria-label="Mobile" className="px-6 pt-2">
        <ul className="flex flex-col gap-1 font-body text-lg text-foreground">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children
            const localizedHref = getLocalizedHref(link.href, locale)
            const label = t.nav[link.key]
            const active = hasChildren
              ? isChildActive(pathname, link.children!, locale) || isActive(pathname, localizedHref)
              : isActive(pathname, localizedHref)
            const isExpanded = expandedKey === link.key

            // Dropdown parent (accordion)
            if (hasChildren) {
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedKey(isExpanded ? null : link.key)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-3 text-left transition-all duration-300 ease-out hover:bg-muted hover:pl-5 hover:text-foreground focus-visible:bg-muted focus-visible:pl-5 focus-visible:text-foreground focus-visible:outline-none",
                      active && "bg-muted pl-5 font-semibold text-brand-gold"
                    )}
                  >
                    <span className="relative">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-y-2 left-0 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                          active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                        )}
                      />
                      {label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Sub-links */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="ml-4 border-l-2 border-border/60 py-1">
                        {link.children!.map((child) => {
                          const childHref = getLocalizedHref(child.href, locale)
                          const childActive = isActive(pathname, childHref)
                          return (
                            <li key={child.href}>
                              <Link
                                href={childHref}
                                aria-current={childActive ? "page" : undefined}
                                className={cn(
                                  "block rounded-md px-4 py-2.5 text-base transition-all duration-300 ease-out hover:bg-muted hover:pl-6 hover:text-foreground focus-visible:bg-muted focus-visible:pl-6 focus-visible:text-foreground focus-visible:outline-none",
                                  childActive && "bg-muted pl-6 font-semibold text-brand-gold"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "absolute inset-y-2 left-4 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                                    childActive ? "scale-y-100" : "scale-y-0"
                                  )}
                                />
                                {t.nav[child.key]}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            }

            // Flat link (no children)
            return (
              <li key={link.href}>
                <Link
                  href={localizedHref}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative block overflow-hidden rounded-md px-3 py-3 transition-all duration-300 ease-out hover:bg-muted hover:pl-5 hover:text-foreground focus-visible:bg-muted focus-visible:pl-5 focus-visible:text-foreground focus-visible:outline-none",
                    active && "bg-muted pl-5 font-semibold text-brand-gold"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-2 left-0 w-[3px] origin-top rounded-r-full bg-brand-gold transition-transform duration-300 ease-out",
                      active
                        ? "scale-y-100"
                        : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    )}
                  />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Start dev server and test desktop dropdown**

Run: `npm run dev`
Navigate to `http://localhost:3000/vi` and verify:
- "Khóa học Online" shows a chevron-down icon
- Clicking it toggles a dropdown with 4 items (OSSD Ontario, OTHM, Qualifi, University of Wolverhampton)
- Clicking outside or pressing Escape closes the dropdown
- Re-clicking the parent toggles it closed

- [ ] **Step 4: Test mobile accordion**

Set viewport to mobile width (< 1280px) and verify:
- Hamburger menu opens full-screen overlay
- "Khóa học Online" shows with a chevron
- Tapping expands 4 sub-links with border-left indent
- Tapping again collapses them
- Clicking a sub-link navigates and closes the menu

- [ ] **Step 5: Commit**

```bash
git add components/site-header-nav.tsx
git commit -m "feat: add dropdown and accordion nav for Khoa hoc Online sub-pages

Co-Authored-By: Claude <noreply@anthropic.com>"
```

````

### Task 3: Replace khoa-hoc-online page with redirect

**Files:**
- Modify: `app/(site)/khoa-hoc-online/page.tsx`

**Interfaces:**
- Consumes: Next.js `redirect` from `next/navigation`

- [ ] **Step 1: Replace page content with redirect**

Replace the file content of `app/(site)/khoa-hoc-online/page.tsx`:

```tsx
import { redirect } from "next/navigation"

export default function KhoaHocOnlinePage() {
  redirect("/khoa-hoc-online/ossd")
}
```

- [ ] **Step 2: Verify redirect works**

Start dev server: `npm run dev`
Navigate to `http://localhost:3000/vi/khoa-hoc-online`
Expected: Redirects to `http://localhost:3000/vi/khoa-hoc-online/ossd` (will 404 until Task 4, but the redirect itself should work)

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/khoa-hoc-online/page.tsx
git commit -m "feat: redirect khoa-hoc-online to ossd sub-page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

````

### Task 4: Create OSSD Ontario sub-page

**Files:**
- Create: `app/(site)/khoa-hoc-online/ossd/page.tsx`
- Create: `components/online-ossd.tsx`

**Interfaces:**
- Produces: `OssdPage` (default export, RSC), `OnlineOssd` ("use client" component)
- Consumes: `Container` from `@/components/ui/container`, `Metadata` from `next`

- [ ] **Step 1: Create the OSSD content component**

Create `components/online-ossd.tsx`:

```tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Check, ChevronRight, GraduationCap, Clock, Globe, Users, BookOpen, Star, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const HERO_BG = "https://images.unsplash.com/photo-1523050854058-8df9010c10f1?w=1920&q=80&auto=format&fit=crop"

const WHY_ITEMS = [
  {
    icon: Globe,
    title: "Bằng cấp được công nhận quốc tế",
    desc: "OSSD được các trường đại học tại Canada và nhiều quốc gia sử dụng làm căn cứ xét tuyển đầu vào.",
  },
  {
    icon: Star,
    title: "Tăng cơ hội vào đại học",
    desc: "Học sinh được đánh giá dựa trên quá trình học tập thay vì chỉ một kỳ thi duy nhất, giúp xây dựng hồ sơ học tập toàn diện.",
  },
  {
    icon: Users,
    title: "Phát triển kỹ năng toàn diện",
    desc: "Kỹ năng nghiên cứu, làm việc nhóm, thuyết trình, quản lý thời gian, tư duy độc lập.",
  },
  {
    icon: Clock,
    title: "Linh hoạt trong học tập",
    desc: "Học trực tuyến, lộ trình học cá nhân hóa, chuyển đổi tín chỉ nếu đủ điều kiện.",
  },
]

const STRUCTURE_ITEMS = [
  { title: "Hoàn thành 30 tín chỉ", desc: "Bao gồm các môn học bắt buộc và tự chọn theo định hướng nghề nghiệp và đại học. Đối với học sinh bắt đầu Grade 9 từ năm học 2024 trở đi, yêu cầu gồm 17 tín chỉ bắt buộc và 13 tín chỉ tự chọn; các khóa trước đó là 18 tín chỉ bắt buộc và 12 tín chỉ tự chọn." },
  { title: "Năng lực đọc viết", desc: "Học sinh cần đáp ứng yêu cầu về năng lực đọc – viết của tỉnh Ontario thông qua bài đánh giá hoặc khóa học thay thế theo quy định." },
  { title: "Hoạt động cộng đồng", desc: "Hoàn thành 40 giờ hoạt động cộng đồng (Community Involvement) nhằm phát triển trách nhiệm xã hội và kỹ năng thực tiễn." },
  { title: "Học trực tuyến", desc: "Theo quy định hiện hành, học sinh cần hoàn thành tối thiểu 2 tín chỉ học trực tuyến (trừ các trường hợp được miễn theo chính sách của Ontario)." },
]

const SUBJECTS = [
  "English", "Mathematics", "Science", "Business Studies",
  "Computer Science", "Social Sciences", "Canadian & World Studies", "Arts",
  "Health & Physical Education", "Technology", "French", "Economics", "Accounting",
]

const TARGET_AUDIENCE = [
  "Học sinh THCS chuẩn bị vào THPT.",
  "Học sinh THPT muốn chuyển sang chương trình quốc tế.",
  "Học sinh có kế hoạch du học Canada.",
  "Học sinh muốn xét tuyển vào các trường đại học quốc tế.",
  "Gia đình mong muốn con học theo chương trình giáo dục Canada.",
]

const BENEFITS = [
  { title: "Tư vấn lộ trình cá nhân", desc: "Đội ngũ chuyên gia hỗ trợ xây dựng kế hoạch học tập phù hợp với năng lực và mục tiêu của từng học sinh." },
  { title: "Hỗ trợ chọn môn", desc: "Tư vấn lựa chọn môn học phù hợp với ngành học tương lai, điều kiện xét tuyển đại học, khả năng học tập." },
  { title: "Đồng hành xuyên suốt", desc: "Theo dõi tiến độ học tập, hỗ trợ hồ sơ, tư vấn hoạt động ngoại khóa, chuẩn bị hồ sơ đại học." },
  { title: "Mở rộng cơ hội quốc tế", desc: "OSSD giúp học sinh xây dựng nền tảng để ứng tuyển vào nhiều trường đại học tại Canada và các quốc gia khác." },
]

const STEPS = [
  "Đăng ký tư vấn với KVC Global.",
  "Đánh giá học lực và hồ sơ hiện tại.",
  "Xây dựng lộ trình học OSSD phù hợp.",
  "Hoàn tất thủ tục nhập học.",
  "Bắt đầu chương trình và được hỗ trợ xuyên suốt đến khi hoàn thành bằng OSSD.",
]

const PARENT_REASONS = [
  "Tư vấn chuyên sâu về hệ thống giáo dục Canada.",
  "Xây dựng lộ trình học tập cá nhân hóa.",
  "Hỗ trợ lựa chọn môn học và định hướng đại học.",
  "Đồng hành trong quá trình học và chuẩn bị hồ sơ du học.",
  "Kết nối với các chương trình chuyển tiếp và tuyển sinh quốc tế.",
]

export function OnlineOssd({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white from-55% to-transparent" />
        <Container className="relative flex min-h-[580px] flex-col justify-center pt-28 pb-20 md:min-h-[640px]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm"
          >
            <Link href="/" className="transition-colors duration-200 hover:text-foreground">Trang chủ</Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <Link href="/khoa-hoc-online" className="transition-colors duration-200 hover:text-foreground">Khóa Học Online</Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="font-semibold text-foreground/80" aria-current="page">OSSD Ontario</span>
          </motion.div>

          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
            >
              OSSD CANADA
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl"
            >
              Bằng Tốt nghiệp Trung học Phổ thông Ontario
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]"
            >
              Mở cánh cửa vào các trường đại học hàng đầu tại Canada, Anh, Mỹ, Úc và nhiều quốc gia khác với chương trình OSSD được công nhận quốc tế.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-dark/75"
            >
              KVC Global mang đến chương trình OSSD theo hình thức học linh hoạt, giúp học sinh xây dựng hồ sơ học thuật vững chắc và tăng lợi thế khi xét tuyển đại học toàn cầu.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="#dang-ky"
                className="group inline-flex items-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg"
              >
                Đăng ký tư vấn miễn phí
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── OSSD là gì? ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <motion.div variants={fadeUpVariants} className="lg:col-span-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop"
                  alt="OSSD Ontario program"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">OSSD là gì?</h2>
              <p className="mt-5 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                Ontario Secondary School Diploma (OSSD) là bằng tốt nghiệp trung học phổ thông chính thức của tỉnh Ontario, Canada. Đây là chương trình giáo dục được công nhận rộng rãi bởi các trường đại học và cao đẳng tại Canada cũng như nhiều quốc gia trên thế giới.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                OSSD chú trọng phát triển toàn diện cho học sinh thông qua:
              </p>
              <ul className="mt-4 space-y-2.5">
                {["Kiến thức học thuật vững chắc.", "Tư duy phản biện và giải quyết vấn đề.", "Kỹ năng nghiên cứu và giao tiếp.", "Hoạt động ngoại khóa và trách nhiệm cộng đồng.", "Chuẩn bị sẵn sàng cho môi trường đại học quốc tế."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                      <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao chọn OSSD? ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Vì sao chọn chương trình OSSD?</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUpVariants}
                    className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-mid">
                      <Icon className="h-7 w-7 text-brand-gold-light" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-heading text-[16px] font-bold text-brand-blue">{item.title}</h3>
                    <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Cấu trúc chương trình ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Cấu trúc chương trình OSSD</h2>
              <p className="mt-3 font-body text-sm text-brand-dark/75">Để nhận bằng OSSD, học sinh cần hoàn thành các yêu cầu tốt nghiệp theo quy định của Bộ Giáo dục Ontario.</p>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {STRUCTURE_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="flex gap-4 rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid text-lg font-bold text-brand-gold-light">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-blue">{item.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-dark/75">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Các môn học ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Các môn học</h2>
              <p className="mt-3 font-body text-sm text-brand-dark/75">Học sinh có thể lựa chọn nhiều môn học thuộc các nhóm. Việc lựa chọn môn học sẽ được tư vấn dựa trên định hướng ngành nghề và trường đại học mong muốn.</p>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {SUBJECTS.map((subject, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="flex items-center gap-3 rounded-md border border-border bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-brand-gold" strokeWidth={1.75} />
                  <span className="font-body text-sm font-medium text-brand-blue">{subject}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Đối tượng phù hợp ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Đối tượng phù hợp</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-3xl">
              <ul className="space-y-4">
                {TARGET_AUDIENCE.map((item, i) => (
                  <motion.li key={i} variants={fadeUpVariants} className="flex items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-sm">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                      <Check className="h-4 w-4 text-brand-gold" strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85 sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Lợi ích tại KVC Global ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Lợi ích khi học OSSD tại KVC Global</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {BENEFITS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="flex gap-4 rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid">
                    <GraduationCap className="h-5 w-5 text-brand-gold-light" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-blue">{item.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-dark/75">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Hình thức học ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Hình thức học</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {["Chương trình theo chuẩn Ontario.", "Môi trường học hiện đại.", "Giáo viên đạt chuẩn giảng dạy.", "Đánh giá liên tục trong suốt quá trình học.", "Học tập linh hoạt theo kế hoạch cá nhân."].map((item, i) => (
                  <motion.div key={i} variants={fadeUpVariants} className="flex items-center gap-3 rounded-md border border-border bg-white p-4 shadow-sm">
                    <Check className="h-4 w-4 shrink-0 text-brand-gold" strokeWidth={3} />
                    <span className="font-body text-sm text-brand-dark/85">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Quy trình đăng ký ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Quy trình đăng ký</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-4xl">
              <div className="relative">
                <div aria-hidden="true" className="absolute top-8 left-8 right-8 h-0.5 bg-brand-blue-mid/20 hidden md:block" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                  {STEPS.map((step, i) => (
                    <motion.div key={i} variants={fadeUpVariants} className="relative flex flex-col items-center text-center">
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-mid text-xl font-bold text-white shadow-md">
                        {i + 1}
                      </div>
                      <p className="mt-4 font-body text-sm leading-relaxed text-brand-dark/85">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao phụ huynh chọn KVC? ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Vì sao phụ huynh lựa chọn KVC Global?</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-3xl">
              <ul className="space-y-4">
                {PARENT_REASONS.map((item, i) => (
                  <motion.li key={i} variants={fadeUpVariants} className="flex items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-sm">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                      <Check className="h-4 w-4 text-brand-gold" strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85 sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── CTA / Liên hệ ── */}
      <section className="bg-brand-blue-mid py-16 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.h2 variants={fadeUpVariants} className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Liên hệ KVC Global
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="mt-4 mx-auto max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base">
              KVC Global đồng hành cùng học sinh và phụ huynh từ bước lựa chọn chương trình OSSD đến quá trình hoàn thành bằng tốt nghiệp và chuẩn bị hồ sơ vào các trường đại học quốc tế.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-8">
              <Link
                href="/lien-he"
                className="group inline-flex items-center gap-2 rounded-sm bg-brand-gold px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-lg"
              >
                Liên hệ ngay để được tư vấn miễn phí
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.p>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create the OSSD page file**

Create `app/(site)/khoa-hoc-online/ossd/page.tsx`:

```tsx
import type { Metadata } from "next"
import { OnlineOssd } from "@/components/online-ossd"

export const metadata: Metadata = {
  title: "OSSD Ontario | KVC Global",
  description:
    "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario. Chương trình được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
  openGraph: {
    title: "OSSD Ontario | KVC Global",
    description:
      "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario. Chương trình được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "OSSD Ontario | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSSD Ontario | KVC Global",
    description:
      "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario. Chương trình được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function OssdPage() {
  return <OnlineOssd />
}
```

- [ ] **Step 3: Verify page renders**

Start dev server: `npm run dev`
Navigate to `http://localhost:3000/vi/khoa-hoc-online/ossd`
Expected: Full OSSD page renders with all sections.

- [ ] **Step 4: Verify redirect from parent route**

Navigate to `http://localhost:3000/vi/khoa-hoc-online`
Expected: Redirects to `/vi/khoa-hoc-online/ossd`.

- [ ] **Step 5: Verify nav active state**

On the OSSD page, check:
- Desktop nav: "Khóa học Online" is highlighted gold, dropdown shows "OSSD Ontario" as active
- Mobile nav: "Khóa học Online" accordion shows "OSSD Ontario" as active

- [ ] **Step 6: Commit**

```bash
git add app/\(site\)/khoa-hoc-online/ossd/page.tsx components/online-ossd.tsx
git commit -m "feat: create OSSD Ontario sub-page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

````

### Task 5: Create OTHM sub-page

**Files:**
- Create: `app/(site)/khoa-hoc-online/othm/page.tsx`
- Create: `components/online-othm.tsx`

**Interfaces:**
- Produces: `OthmPage` (RSC), `OnlineOthm` ("use client" component)
- Consumes: `Container`, `Metadata`

- [ ] **Step 1: Create the OTHM content component**

Create `components/online-othm.tsx` following the **exact same structure as Task 4's `online-ossd.tsx`** but with OTHM-specific content from the user's provided copy. Sections map as follows:

| Section | Content from user's OTHM copy |
|---------|------|
| Hero | Title: "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global", subtitle: "Mở rộng cơ hội nghề nghiệp..." |
| What is OTHM | OTHM is Ofqual-regulated, RQF framework, benefits list |
| Why KVC Global | 4 cards: Đào tạo chính hãng, Học Online 100%, Hỗ trợ học tập, Chi phí tối ưu |
| Hình thức học | 5 bullet items (100% Online, LMS, Tài liệu điện tử, Assignment, Giảng viên hỗ trợ) |
| Đối tượng phù hợp | 5 audience items |
| Lợi ích | 6 benefit check-mark items |
| Quy trình đăng ký | 5-step process |
| CTA | Same dark CTA section with contact link |
| Level Programs | Card grid (using CardGridLayout pattern from `online-directory.tsx`) with 8 programs: L3 Business Management (6 months, months 1,3,5,7,9,11, 6 subjects), L4 Business Management (12 months, 6 subjects), L5 Business Management (12 months, 6 subjects), L5 Extended Business Management (6 months, 12 subjects), L5 Extended Logistics Supply Chain & Management (9 months, 12 subjects), L7 Strategic Management & Leadership (3-9 months, 6 subjects), L7 Logistics Supply Chain & Management (9 months, 6 subjects), L7 Accounting & Finance (9 months, 6 subjects). Each program card shows: name, duration, start months, subjects list, entry requirements. |

Use the same imports, animation variants, brand color classes, Container wrapper, and section spacing as Task 4. The Level Programs section uses a grid of detailed cards (each card: border, shadow, program name as h3, duration/start/subjects in a list, entry requirements in a highlighted box).

- [ ] **Step 2: Create the OTHM page file**

Create `app/(site)/khoa-hoc-online/othm/page.tsx`:

```tsx
import type { Metadata } from "next"
import { OnlineOthm } from "@/components/online-othm"

export const metadata: Metadata = {
  title: "OTHM | KVC Global",
  description:
    "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global. Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.",
  openGraph: {
    title: "OTHM | KVC Global",
    description:
      "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global. Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "OTHM | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OTHM | KVC Global",
    description:
      "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global. Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function OthmPage() {
  return <OnlineOthm />
}
```

- [ ] **Step 3: Verify page renders**

Navigate to `http://localhost:3000/vi/khoa-hoc-online/othm`
Expected: Full OTHM page renders.

- [ ] **Step 4: Commit**

```bash
git add app/\(site\)/khoa-hoc-online/othm/page.tsx components/online-othm.tsx
git commit -m "feat: create OTHM sub-page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

````

### Task 6: Create Qualifi sub-page

**Files:**
- Create: `app/(site)/khoa-hoc-online/qualifi/page.tsx`
- Create: `components/online-qualifi.tsx`

**Interfaces:**
- Produces: `QualifiPage` (RSC), `OnlineQualifi` ("use client" component)

- [ ] **Step 1: Create the Qualifi content component**

Create `components/online-qualifi.tsx` following the **exact same structure as Task 4's `online-ossd.tsx`** but with Qualifi-specific content from the user's provided copy. Sections map as follows:

| Section | Content from user's Qualifi copy |
|---------|------|
| Hero | Title: "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global", subtitle: "Nâng tầm sự nghiệp với bằng cấp quốc tế..." |
| QUALIFI là gì? | Ofqual-regulated awarding organisation, benefits list (3 items) |
| Vì sao chọn KVC? | 4 cards: Đối tác đào tạo chuyên nghiệp, Học Online 100%, Giảng viên hỗ trợ, Chi phí hợp lý + Cơ hội học tiếp |
| Đối tượng phù hợp | 5 audience items |
| Hình thức học | 5 bullet items |
| Lợi ích | 6 benefit items with check marks |
| Quy trình đăng ký | 5-step process |
| CTA | Dark CTA section |
| Level Programs | Card grid with 6 programs: L3 Accounting & Finance (6 months, 3 subjects), L4 Accounting & Finance (12 months, 6 subjects), L5 Accounting & Finance (12 months, 6 subjects), L5 Extended Accounting & Finance (12 months, 12 subjects), L7 Accounting & Finance (9 months, 6 subjects), L7 Strategic Management & Leadership (3-9 months, 8 subjects). Each card shows: name, duration, start months, subjects, entry requirements. |

Same imports, variants, colors, and Container pattern as Task 4.

- [ ] **Step 2: Create the Qualifi page file**

Create `app/(site)/khoa-hoc-online/qualifi/page.tsx`:

```tsx
import type { Metadata } from "next"
import { OnlineQualifi } from "@/components/online-qualifi"

export const metadata: Metadata = {
  title: "QUALIFI | KVC Global",
  description:
    "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global. Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.",
  openGraph: {
    title: "QUALIFI | KVC Global",
    description:
      "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global. Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "QUALIFI | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QUALIFI | KVC Global",
    description:
      "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global. Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function QualifiPage() {
  return <OnlineQualifi />
}
```

- [ ] **Step 3: Verify page renders**

Navigate to `http://localhost:3000/vi/khoa-hoc-online/qualifi`

- [ ] **Step 4: Commit**

```bash
git add app/\(site\)/khoa-hoc-online/qualifi/page.tsx components/online-qualifi.tsx
git commit -m "feat: create Qualifi sub-page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

````

### Task 7: Create University of Wolverhampton sub-page

**Files:**
- Create: `app/(site)/khoa-hoc-online/wolverhampton/page.tsx`
- Create: `components/online-wolverhampton.tsx`

**Interfaces:**
- Produces: `WolverhamptonPage` (RSC), `OnlineWolverhampton` ("use client" component)

- [ ] **Step 1: Create the Wolverhampton content component**

Create `components/online-wolverhampton.tsx` following the **exact same structure as Task 4's `online-ossd.tsx`** but with Wolverhampton-specific content from the user's provided copy. Sections map as follows:

| Section | Content from user's Wolverhampton copy |
|---------|------|
| Hero | Title: "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton", subtitle about public university, online learning flexibility |
| Giới thiệu | About the university: public UK university, 190+ years history, 24,000+ students, practical orientation |
| Vì sao chọn? | 6 reason items (bằng cấp, quốc tế, linh hoạt, giảng viên, thực tiễn, 130+ quốc gia) |
| Vì sao qua KVC? | 6 support items (tư vấn, hồ sơ, hướng dẫn, theo dõi, luận văn, đồng hành) |
| Hình thức học | 5 bullet items |
| Đối tượng phù hợp | 5 audience items |
| Lợi ích | 6 benefit items |
| Quy trình đăng ký | 5-step process |
| CTA | Dark CTA section |
| Programs | Card grid with 5 programs: BA (Hons) Business Management (12 months, 4 subjects), MBA (6 months, 3 subjects), MSc Psychology (6 months, 3 subjects), MSc Project Management (6 months, 2 subjects), MSc Accounting & Finance (6 months, 2 subjects). Each card shows: name, duration, start months, subjects, entry requirements. |

Same imports, variants, colors, and Container pattern as Task 4.

- [ ] **Step 2: Create the Wolverhampton page file**

Create `app/(site)/khoa-hoc-online/wolverhampton/page.tsx`:

```tsx
import type { Metadata } from "next"
import { OnlineWolverhampton } from "@/components/online-wolverhampton"

export const metadata: Metadata = {
  title: "University of Wolverhampton | KVC Global",
  description:
    "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton. Nhận bằng cấp chính quy từ trường đại học công lập Vương quốc Anh.",
  openGraph: {
    title: "University of Wolverhampton | KVC Global",
    description:
      "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton. Nhận bằng cấp chính quy từ trường đại học công lập Vương quốc Anh.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "University of Wolverhampton | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "University of Wolverhampton | KVC Global",
    description:
      "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton. Nhận bằng cấp chính quy từ trường đại học công lập Vương quốc Anh.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function WolverhamptonPage() {
  return <OnlineWolverhampton />
}
```

- [ ] **Step 3: Verify page renders**

Navigate to `http://localhost:3000/vi/khoa-hoc-online/wolverhampton`

- [ ] **Step 4: Commit**

```bash
git add app/\(site\)/khoa-hoc-online/wolverhampton/page.tsx components/online-wolverhampton.tsx
git commit -m "feat: create University of Wolverhampton sub-page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

````

### Task 8: End-to-end verification

**Files:** (none — verification only)

- [ ] **Step 1: Verify all 4 pages render**

Navigate to each URL and confirm page renders without errors:
- `/vi/khoa-hoc-online/ossd`
- `/vi/khoa-hoc-online/othm`
- `/vi/khoa-hoc-online/qualifi`
- `/vi/khoa-hoc-online/wolverhampton`

- [ ] **Step 2: Verify redirect**

Navigate to `/vi/khoa-hoc-online` → redirects to `/vi/khoa-hoc-online/ossd`

- [ ] **Step 3: Verify desktop dropdown nav**

- Hover/click "Khóa học Online" → dropdown shows 4 items
- Click each item → navigates to correct page
- Active state gold highlight on parent when on any sub-page
- Active state on individual dropdown item when on that page
- Click outside closes dropdown
- Escape closes dropdown

- [ ] **Step 4: Verify mobile accordion nav**

- At < 1280px width: hamburger opens overlay
- "Khóa học Online" has chevron, expands to show 4 sub-links
- Each sub-link navigates and closes menu
- Tap again collapses sub-links
- Active state on expanded items

- [ ] **Step 5: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds without errors.

- [ ] **Step 7: Commit any final changes**

```bash
git add -A
git commit -m "chore: final verification of khoa-hoc-online sub-pages

Co-Authored-By: Claude <noreply@anthropic.com>"
```
