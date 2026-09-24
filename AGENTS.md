<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Guidelines

Bilingual (vi default / en) marketing site for **KVC Global** — Singapore study-abroad, work-pass, and online-degree consultancy. Next.js 16 App Router + React 19 + Tailwind v4 + shadcn (base-nova) + Sanity v5 (via `next-sanity`). Production: `https://kvcglobal.com`.

> `README.md` is stale (describes an unrelated "lazyssh" project) — ignore it. `ARCHITECTURE.md` predates the Sanity CMS integration (claims "no backend"); its layout/motion conventions below are still authoritative. `DESIGN.md` is the authoritative brand spec.

## Architecture & Data Flow

**Locale routing is prefix-based via `proxy.ts`** (Next 16's replacement for `middleware.ts` — there is no `middleware.ts`):

- `/vi/*` and `/en/*` → internal rewrite to the un-prefixed route + `x-locale` request header + `?lang=` param. Un-prefixed URLs redirect to `/vi{path}`.
- Server components read locale via `getLocale()` (`lib/i18n-server.ts`, reads `x-locale` header → makes every page **dynamic**). Client components use `useLocale()` (`lib/i18n-client.ts`, sniffs `usePathname().startsWith('/en')`).
- `app/(site)/` route tree contains only un-prefixed routes. Static dictionaries: `messages/vi.json` / `messages/en.json`, accessed by direct property path (`t.nav.home`) — there is no `t(key)` function.

**Content flow (CMS-first with hardcoded fallbacks):**

```
app/(site)/{route}/page.tsx (RSC)
  → getLocale()
  → sanityFetch({ query: X_PAGE_QUERY, params: { lang: locale } })   // sanity/live.ts
  → cast to hand-written all-optional type (sanity/{page}-page.ts)
  → <XComponent content={page || undefined} />                        // components/**
```

- GROQ queries live in `sanity/queries.ts` (`defineQuery`). Per-locale singletons: `*[_type == "xPage" && language == $lang][0]`. Shared collections (services/partners/testimonials): `(!defined(language) || language == $lang)`.
- Types are **hand-written and all-optional** (`title?: string`), one module per page family in `sanity/`. `sanity.types.ts` is generated (`sanity typegen generate`) and only covers the 4 shared queries — don't hand-edit it.
- **No try/catch in pages.** Missing CMS data → `null` → components render module-level fallback constants or dictionary values (`content?.title || t.about.title`). `try/catch` exists only in `sanity/site-settings.ts`, `app/actions/submit-lead.ts`, `theme-provider.tsx`.
- Site settings: `getSiteSettings(locale)` deep-merges CMS over `fallbackSiteSettings(locale)` (`lib/site-settings.ts`); consumed once in `app/(site)/layout.tsx`.
- `generateMetadata()` duplicates the page's fetch (no de-dup abstraction); SEO fallback ladder: `page.seo.title` → inline `locale === 'en' ? ... : ...` → fallback const; OG image via `urlFor(seo.image)` (`sanity/image.ts`) else `/images/thumb-sharing.png`.

**Writes go through exactly one server action**: `app/actions/submit-lead.ts` — `submitLead(prev, formData)` for React 19 `useActionState`. Contract: honeypot field, per-IP in-memory rate limit (5/hr), server-side Vietnamese validation → `{status:'error', fieldErrors}`, spam patterns silently fake-succeed, persists via `sanity/write-client.ts` (`SANITY_API_WRITE_TOKEN`; server-actions only — never import from client components). **Never throws — always returns a `LeadFormState`** (`lib/lead-form-state.ts`). Consumed by `components/contact-form.tsx`.

## Key Directories

| Path | Purpose |
|---|---|
| `app/(site)/` | All public pages (route group, site chrome). Vietnamese slugs: `/du-hoc` family, `/khoa-hoc-online/{ossd,othm,qualifi,wolverhampton}`, `/dich-vu`, `/work-pass`, `/gioi-thieu`, `/lien-he` |
| `app/actions/` | Server actions (only `submit-lead.ts`) |
| `components/` | Page sections — `site-*` (home), `study-abroad/`, `work-pass/`, `dich-vu/`, `online-*`, `about-page.tsx`, `contact-page.tsx`; `ui/` primitives |
| `sanity/` | Client (`client.ts`), live fetch (`live.ts`), write client, GROQ queries, hand-written result types |
| `lib/` | i18n, site-settings fallbacks + href resolution, seo, icons, lead-form-state, `utils.ts` (`cn`) |
| `messages/` | vi/en static dictionaries |
| `hooks/` | Empty — no custom hooks; state lives inline in components |

## Development Commands

```bash
pnpm dev        # next dev
pnpm build      # next build (exercises every route's Sanity fetch — de-facto integration check)
pnpm start      # next start
pnpm lint       # eslint (flat config, zero custom rules)
pnpm format     # prettier --write "**/*.{ts,tsx}"  (ts/tsx only)
pnpm typecheck  # tsc --noEmit (strict)
```

Env vars (`.env.example`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, `NEXT_PUBLIC_GA_ID` (empty = analytics off), `NEXT_PUBLIC_SITE_URL`.

## Code Conventions & Common Patterns

- **Thin server pages, fat components.** `page.tsx` files only fetch data and compose section components. Never inline section markup in a route file. Almost everything in `components/` is `'use client'` (framer-motion/state); exceptions are async server components reading the dictionary (`site-hero.tsx`, `site-about.tsx`, etc.).
- **One `Container` per section** (`components/ui/container.tsx`): sections are full-bleed `<section>` owning bg + vertical padding; never add `mx-auto`/`max-w-*`/`px-*` to sections directly.
- **Absolute header → padded heroes**: header is `absolute top-0`, so heroes need `pt-28 sm:pt-32 md:pt-36` (or equivalent) to clear it.
- **Brand tokens, not raw hex**: `bg-brand-blue-mid`, `text-brand-gold`, etc. from the `@theme` block in `app/globals.css` (`--color-brand-blue`, `--color-brand-blue-mid`, `--color-brand-gold`, `--color-brand-gold-light`, `--color-brand-dark`, `--color-brand-light`; `--font-heading` Montserrat, `--font-body` Be Vietnam Pro). Backgrounds alternate White ↔ Soft Light Blue; Dark Blue is for header/footer/primary CTAs; gold is the only accent — **no red or generic orange**. Icons: outlined lucide stroke style only.
- **Motion**: framer-motion `fadeUpVariants`/`staggerContainer` consts + `whileInView` + `viewport={{ once: true, margin: "-80px" }}`. When mixing motion with Tailwind `translate-*` positioning, split into a static outer wrapper (positioning) + inner `motion.div` (entrance).
- **Icons from CMS strings**: `lib/icons.ts getIcon(name, fallback)` or per-page `{page}-icons.ts` maps (`Record<string, LucideIcon>`).
- **CMS links**: `lib/site-settings.ts` `resolveSiteHref` maps `destination` enum → route; `sanitizeHref` allowlists `/`, `#`, `https`, `mailto`, `tel`; `prefixHref` adds the locale prefix.
- **Naming**: kebab-case files, named PascalCase exports. Page sections: `{page}-hero/-intro/-why/-requirements/-faqs/-details.tsx`. Props: `content?: XPageContent` (or `data?:`), `className?`, `cn()` on root.
- **Forms**: server-authoritative validation, `noValidate`, `useActionState` + `pending`, inline `Field`/`SubmitButton` helpers, success state replaces the form.
- **Prettier**: no semicolons, double quotes, printWidth 80, trailing comma es5, `prettier-plugin-tailwindcss` (sorts classes inside `cn()`/`cva()`). Some legacy files deviate — match file-local style when touching them, run `pnpm format` on new files.
- **shadcn**: `components.json` style `base-nova`, aliases `@/components`, `@/lib`, `@/components/ui`, `@/hooks`; extra registry `@magicui`. Tailwind v4 is CSS-first — no `tailwind.config.js`; tokens live in `app/globals.css`.
- Path alias: `@/* → ./*` (root-level, no `src/`).

## Important Files

| File | Role |
|---|---|
| `proxy.ts` | Locale router (Next 16 middleware replacement) |
| `app/(site)/layout.tsx` | Fonts, ThemeProvider, header/footer, `<SanityLive />`, GA |
| `app/globals.css` | Tailwind v4 `@theme` brand tokens + shadcn variables |
| `sanity/queries.ts` | All GROQ queries (22KB) |
| `sanity/live.ts` | `sanityFetch` + `SanityLive` |
| `lib/i18n-server.ts` / `lib/i18n-client.ts` | Locale resolution (server header / client pathname) |
| `lib/site-settings.ts` | Settings fallbacks, `resolveSiteHref`, `sanitizeHref`, `prefixHref` |
| `app/actions/submit-lead.ts` | The only server action (lead capture) |
| `components/ui/container.tsx` | Section width wrapper — required for all sections |
| `DESIGN.md` / `ARCHITECTURE.md` | Brand spec / layout conventions (see staleness note above) |
| `next.config.ts` | Image remotePatterns: unsplash, pexels, cdn.sanity.io; qualities [75,100] |

## Runtime/Tooling Preferences

- **Package manager: pnpm** (≥10). `pnpm-lock.yaml` is canonical; `package-lock.json` is a stale leftover — ignore it (do not run `npm install`).
- **Node ≥ 20.19 or ≥ 22.12** (sanity's engine range; next requires ≥ 20.9). No Bun.
- next 16.2.6 and react 19.2.4 are exact-pinned; keep `eslint-config-next` version-matched to `next`.
- Dual animation libs installed (framer-motion 12 + motion 13) — existing code uses `framer-motion`; stick with it for consistency.
- No `engines`/`packageManager` fields, no `.nvmrc` — the Node floor is implicit from deps.

## Testing & QA

**No test suite exists** — no test files, frameworks, CI workflows, or git hooks. The verification loop is:

1. `pnpm typecheck` (strict `tsc --noEmit`)
2. `pnpm lint`
3. `pnpm build` — full build exercises every route's Sanity data fetching, catching query/type regressions
4. Visual check via `pnpm dev` (chrome-devtools MCP is configured in `.mcp.json`)

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **kvc-website** (1054 symbols, 2454 relationships, 81 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "staging"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — run `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/kvc-website/context` | Codebase overview, check index freshness |
| `gitnexus://repo/kvc-website/clusters` | All functional areas |
| `gitnexus://repo/kvc-website/processes` | All execution flows |
| `gitnexus://repo/kvc-website/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
