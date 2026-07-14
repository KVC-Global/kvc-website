<<<<<<< HEAD
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
=======
<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **kvc-website** (116 symbols, 185 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/kvc-website/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/kvc-website/context` | Codebase overview, check index freshness |
| `gitnexus://repo/kvc-website/clusters` | All functional areas |
| `gitnexus://repo/kvc-website/processes` | All execution flows |
| `gitnexus://repo/kvc-website/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

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
>>>>>>> 10532b6e90a4065c45f916773769659d1135f375
