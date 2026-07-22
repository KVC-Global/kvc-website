# Design: Khoa Hoc Online — 4 Sub-pages + Dropdown Nav

**Date:** 2026-07-22
**Branch:** feat/courses-page
**Status:** Approved

## Overview

Restructure the single `khoa-hoc-online` page into 4 dedicated sub-pages (OSSD Ontario, OTHM, Qualifi, University of Wolverhampton), and convert the navbar "Khóa học Online" link into a dropdown menu.

## URL Structure

```
/khoa-hoc-online/ossd              → OSSD Ontario page
/khoa-hoc-online/othm              → OTHM page
/khoa-hoc-online/qualifi           → Qualifi page
/khoa-hoc-online/wolverhampton     → University of Wolverhampton page
/khoa-hoc-online                   → redirects to /khoa-hoc-online/ossd
```

All URLs are internal Next.js routes. Locale prefix (`/vi` or `/en`) is handled by `proxy.ts` middleware and transparent to the file-system routes.

## File Structure

### New files
```
app/(site)/khoa-hoc-online/
├── page.tsx                    → redirect to /khoa-hoc-online/ossd
├── ossd/page.tsx               → OSSD Ontario full content page
├── othm/page.tsx               → OTHM full content page
├── qualifi/page.tsx            → Qualifi full content page
└── wolverhampton/page.tsx      → Uni of Wolverhampton full content page

components/
├── online-ossd.tsx             → OSSD page content sections
├── online-othm.tsx             → OTHM page content sections
├── online-qualifi.tsx          → Qualifi page content sections
└── online-wolverhampton.tsx    → Wolverhampton page content sections
```

### Modified files
- `components/site-header-nav.tsx` — dropdown for desktop, accordion for mobile
- `messages/vi.json` — add sub-page nav labels
- `messages/en.json` — add sub-page nav labels
- `app/(site)/khoa-hoc-online/page.tsx` — replace content with redirect

### Unchanged (kept for future use)
- `components/online-hero.tsx`
- `components/online-directory.tsx`
- `components/online-details.tsx`
- `components/online-benefits.tsx`
- `components/online-cta.tsx`
- `components/online-faq.tsx`

## Navbar Dropdown

### Desktop
- "Khóa học Online" becomes a `<button>` that toggles a dropdown on click (and hover)
- Dropdown: a `<ul>` positioned absolutely below the nav item, with 4 `<Link>` items
- Active detection: parent item is highlighted gold when any sub-page path matches
- Clicking the parent label also navigates (to `/khoa-hoc-online/ossd` via redirect)
- Close on click outside, Escape key, or selecting a link

### Mobile
- "Khóa học Online" becomes an expandable accordion item in the full-screen overlay
- Tap toggles a chevron rotation and reveals 4 indented sub-links
- Active sub-link gets highlight styling
- Uses the existing mobile menu pattern (slide-from-left active indicator)

## i18n Additions

Add to `nav` object in both dictionaries:
```json
"ossd": "OSSD Ontario",
"othm": "OTHM",
"qualifi": "Qualifi",
"wolverhampton": "University of Wolverhampton"
```

## Sub-page Content

Each sub-page receives full content from the user's provided copy. Each page:
- Has its own `<Metadata>` export for SEO
- May share a common hero wrapper or build independently
- Content is Vietnamese (primary); English versions use placeholder text initially

### Page sections per sub-page (from user content):

**OSSD:** Hero → What is OSSD → Why OSSD → Structure (30 credits, literacy, community hours, online learning) → Subjects → Target audience → Benefits at KVC → Learning format → Registration process → Why parents choose KVC → Contact CTA

**OTHM:** Hero → What is OTHM → Why KVC → Learning format → Target audience → Benefits → Registration process → Contact CTA → Level programs (L3–L7 in card grids)

**Qualifi:** Hero → What is Qualifi → Why KVC → Target audience → Learning format → Benefits → Registration process → Contact CTA → Level programs (L3–L7 in card grids)

**Wolverhampton:** Hero → About the university → Why Wolverhampton → Why through KVC → Learning format → Target audience → Benefits → Registration process → Contact CTA → Programs (BA, MBA, MSc)

## Redirect Implementation

```tsx
// app/(site)/khoa-hoc-online/page.tsx
import { redirect } from "next/navigation"

export default function KhoaHocOnlinePage() {
  redirect("/khoa-hoc-online/ossd")
}
```

## Active State Detection

In `site-header-nav.tsx`, update `isActive()`:
- `/khoa-hoc-online` or any child path → parent dropdown item is active
- Specific sub-page → individual dropdown link is active

## Edge Cases
- Direct URL access to `/khoa-hoc-online` without trailing path → redirect to OSSD
- Browser back/forward between sub-pages → normal Next.js client navigation
- Mobile accordion state resets on pathname change (existing behavior via `useEffect`)
- Dropdown closes when navigating (inherent via link click)
