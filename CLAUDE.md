# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server (Next.js 16)
pnpm build      # production build
pnpm start      # run the production build
pnpm lint       # eslint (flat config in eslint.config.mjs)
pnpm typecheck  # tsc --noEmit
pnpm format     # prettier --write on **/*.{ts,tsx}
```

Package manager is **pnpm** (`pnpm-workspace.yaml` present, `pnpm-lock.yaml` committed). There is no test framework configured — `pnpm typecheck` + `pnpm lint` are the verification gates.

Add shadcn/ui components with `npx shadcn@latest add <name>` (registry config in `components.json`, style `base-nova`, icon library `lucide`).

## This is NOT the Next.js you know

Per `AGENTS.md`: this uses **Next.js 16.2.6** with breaking changes vs. training data. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices. Do not assume App Router conventions from older versions.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict, `@/*` → repo root).
- **Tailwind CSS v4** via `@tailwindcss/postcss`. Tokens live in `app/globals.css` using `@theme`/`@theme inline` — there is **no `tailwind.config`**. New colors/fonts/radii are added as CSS variables there.
- **shadcn/ui** (`base-nova` style) on top of **`@base-ui/react`** primitives (not Radix). UI components go in `components/ui/` and import from `@base-ui/react`, not `@radix-ui/*`.
- **next-themes** for dark/light (`attribute="class"`, `.dark` variant defined in `globals.css`). A `d` hotkey toggles the theme (`components/theme-provider.tsx`).
- Prettier: `semi: false`, `singleQuote: false`, `trailingComma: "es5"`, 2-space, LF. `prettier-plugin-tailwindcss` sorts classes against `app/globals.css` (and recognizes `cn`/`cva`).

## Architecture

This is the **KVC Global** marketing site — a single landing page (`app/page.tsx`) composed of `Site*` section components. There are no routes beyond `/`; `NAV_LINKS` in `components/site-header-nav.tsx` lists future routes (`/gioi-thieu`, `/du-hoc`, etc.) that do not yet have route segments.

Layout shell (`app/layout.tsx`): loads three Google fonts (`Inter`, `Montserrat`, `Be Vietnam Pro`, all with `vietnamese` subset since content is Vietnamese, `<html lang="vi">`) and exposes them as CSS variables, wraps everything in `ThemeProvider` → `SiteHeader` / `main` / `SiteFooter`. `app/page.tsx` just stacks section components.

Component conventions:
- **`components/site-*.tsx`** are the actual page sections (hero, partners, about, header, footer). The header is split into a shell + sub-parts (`site-header-shell.tsx` orchestrates `site-header-logo`, `site-header-actions`, `site-header-nav`, `site-header-mobile-toggle`; `site-header.tsx` just re-exports the shell as `SiteHeader`).
- **`components/ui/*`** are shadcn primitives. Prefer composing `site-*` sections over editing `ui/*` directly.
- **`lib/utils.ts`** exports `cn` (clsx + tailwind-merge). Use it for conditional classes.
- **`hooks/`** is currently empty — reserved for `use-*` hooks.

## Brand & design system

`DESIGN.md` is the source of truth for brand identity and is reflected verbatim in `app/globals.css` tokens. Key constraints to respect when building UI:

- **Colors:** Dark Blue `#0A2540` (primary, structural bookends only — Header, Footer, dark sections), KVC Gold `#C8913C` (accent/active highlights), Pure White `#FFFFFF`, Soft Light Blue `#F4F7FA` (alternate section bg), Charcoal Black `#1A202C` (body text). Section rows **alternate White ↔ Soft Light Blue**; Dark Blue is reserved for bookends, not generic sections.
- **No red or generic orange accents anywhere.** Grid card active/highlighted state flips to Dark Blue bg with Gold links.
- **Typography:** `font-heading` (Montserrat) for `h1`–`h4` and nav (applied globally in `@layer base`); `font-body`/`font-sans` (Be Vietnam Pro) for paragraphs/forms. Body line-height ≥ 1.5 (`leading-relaxed`, also applied globally).
- **Radius:** brand default `--radius: 1.25rem` (`rounded-2xl`-ish); the scale (`sm`/`md`/`lg`/…`4xl`) is derived from it in `@theme inline`.
- **Icons:** outlined/stroke style only (lucide). Inherit Dark Blue on light bg, Gold/White on dark.
- **Logo:** no drop shadows, never stretch/warp, never recolor. Horizontal variant on desktop headers (with tagline "BEGIN SOMETHING GREATER"), icon-only on mobile. All-white silhouette on dark backgrounds.

When adding colors/fonts, add them as tokens in `app/globals.css` `@theme` and reference via Tailwind utilities — do not hardcode hex values in components.
