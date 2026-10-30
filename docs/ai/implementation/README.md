---
phase: implementation
title: Implementation Guide
description: Technical implementation notes, patterns, and code guidelines
---

# Implementation Guide

## Development Setup
**How do we get started?**

- Prerequisites and dependencies
- Environment setup steps
- Configuration needed

## Code Structure
**How is the code organized?**

- Directory structure
- Module organization
- Naming conventions

## Implementation Notes
**Key technical details to remember:**

### Core Features
- Feature 1: Implementation approach
- Feature 2: Implementation approach
- Feature 3: Implementation approach

### Locale switching

- `SiteHeaderActions` uses document navigation for language changes, preserving
  the current page path and query parameters.
- `/vi` and `/en` rewrite to the same internal route. Client-side navigation can
  retain the previous locale's server-rendered content and shared layout.
  Document navigation loads the requested locale together, without a manual reload.
- This resets unsaved client state. SPA-only language switching requires
  locale-specific route segments rather than reusing the same layout.
- Smoke check: switch VI → EN → VI on the home and contact pages; verify the
  content, navigation labels, document language, and query parameters after each click.

### Contact form CMS

- Edit each language under **Contact page → Form section** in Sanity Studio.
- `servicePlaceholder` controls the disabled service prompt; `serviceOptions`
  controls the selectable labels/values. Existing blank-value prompts remain
  supported; keep service values aligned with `app/actions/submit-lead.ts`.
- `messageLabel` and `messagePlaceholder` control the message field.
- Consent is split into `consentLabel` (before the privacy link), `privacyLabel`
  (link text), and `consentSuffix` (after the link). The privacy URL and required
  consent validation are not editable.
- `submitLabel`, `pendingLabel`, and `responseNote` control the submit button,
  its sending state, and the response-time note.
- Empty CMS fields retain the existing Vietnamese fallback copy.
- Schema source: `../studio-kvc-global/schemaTypes/objects/pageSections.ts`.
  Frontend pipeline: `CONTACT_PAGE_QUERY` → `ContactPageData.form` → `ContactForm`.

### About page client reviews CMS

- Edit each language under **About page → Social proof → Client reviews**.
- `eyebrow`, `title`, `titleLine2` (gold accent), and `description` control the
  central message. An existing `title` without `titleLine2` stays single-part;
  when no title is set, the original two-line Vietnamese heading is the fallback.
- `reviews` controls the background cards: name, role, quote, photo, rating, and
  ordering. An empty list retains the built-in reviews.
- Schema source: `../studio-kvc-global/schemaTypes/objects/pageSections.ts`.
  Frontend pipeline: `ABOUT_PAGE_QUERY` → `AboutPageData.testimonials` → `AboutPage`.

### Patterns & Best Practices
- Design patterns being used
- Code style guidelines
- Common utilities/helpers

## Integration Points
**How do pieces connect?**

- API integration details
- Database connections
- Third-party service setup

## Error Handling
**How do we handle failures?**

- Error handling strategy
- Logging approach
- Retry/fallback mechanisms

## Performance Considerations
**How do we keep it fast?**

- Optimization strategies
- Caching approach
- Query optimization
- Resource management

## Security Notes
**What security measures are in place?**

- Authentication/authorization
- Input validation
- Data encryption
- Secrets management

