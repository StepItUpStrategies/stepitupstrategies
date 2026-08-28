# AGENTS.md

This document describes the architecture, conventions, and non-obvious decisions for the Step It Up Strategies landing page. It is intended for AI agents and developers working in future sessions.

## Project Overview

A single-page marketing/landing site for **Step It Up Strategies**, a business management and consulting company specializing in restaurant, retail, and entertainment. Built with TanStack Start and deployed on Netlify. The site has no backend logic, no AI chat, and no product catalog — it is a pure informational/branding site.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS custom properties |
| Fonts | Bai Jamjuree (display) + DM Sans (body), self-hosted woff2 in `public/fonts/` |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
src/
├── routes/
│   ├── __root.tsx        # Root shell: font preloads, SEO meta, HTML structure
│   ├── index.tsx         # Landing page — all sections in one component
│   ├── services.index.tsx  # /services — overview grid of the nine categories
│   └── services.$slug.tsx  # /services/:slug — service detail page (one per category)
├── components/
│   └── PageChrome.tsx    # Shared nav + footer for interior pages
├── data/
│   └── services.ts       # Content for the nine service categories (single source of truth)
├── styles.css            # Tailwind CSS 4 import + @theme tokens + animations
└── router.tsx            # TanStack Router config (scroll restoration)
public/
├── favicon.ico
└── placeholder.png
```

**Note:** `src/routes/products/` and `src/data/products.ts` are scaffolding leftovers from the original marketing template. They are unused but harmless.

## Key Architectural Decisions

### Single-file Landing Page
The entire site lives in `src/routes/index.tsx`. This is intentional — the site is a single marketing page. Breaking it into many component files would add indirection without benefit at this scale.

### Service Detail Pages
The nine "What We Do" cards on the landing page are rendered from `src/data/services.ts` and each
links to `/services/<slug>`. That page is a single dynamic route (`services.$slug.tsx`) rather than
nine files — the layout is identical, only the content differs. `/services` renders the same nine
cards as a standalone overview.

To edit or add a category, edit `src/data/services.ts` only. The homepage grid, the overview page,
the footer service list, the sitemap-worthy URL, and the page's schema.org markup all derive from it.
Slugs are public URLs — do not rename one without adding a redirect. Note that the `Service`
JSON-LD block inside the `#services` section of `index.tsx` is still hand-maintained and is not
generated from this data.

Each detail page sets its own `<title>`, meta description, Open Graph tags, and canonical URL via the
route's `head()`. Canonical URLs are per-route (the homepage sets its own in `index.tsx`) — the root
route deliberately does not set one, or every page would canonicalize to the homepage.

### Self-hosted Fonts
Both families are served from `public/fonts/` rather than fonts.googleapis.com. The
`@font-face` blocks live at the top of `src/styles.css` and are a copy of Google's own CSS —
same woff2 files, same `unicode-range` subsetting, same `font-display: swap` — so rendering is
unchanged while the critical path loses a third-party stylesheet and two extra origins. Only
the `latin` and `latin-ext` subsets are kept (no Thai or Vietnamese copy on the site).

`__root.tsx` preloads the two files that cover first paint (`dm-sans-latin.woff2` and
`bai-jamjuree-700-latin.woff2`). Font filenames are not content-hashed but are served
`immutable` for a year, so **rename the file if you ever replace a font**.

### Design System via CSS Custom Properties
All design tokens are defined in `src/styles.css` using `@theme` (Tailwind CSS 4 syntax) and standard CSS `--custom-property` variables:
- `--color-obsidian` / `--color-charcoal` / `--color-surface` — dark backgrounds
- `--color-cream` / `--color-cream-dim` — text colors
- `--color-gold` / `--color-gold-light` / `--color-gold-pale` — accent colors
- `--font-display` (Bai Jamjuree) / `--font-body` (DM Sans)

### Scroll Reveal Animations
The `useScrollReveal` hook uses `IntersectionObserver` to add `in-view` to `.reveal` elements. CSS transitions animate opacity and translateY. Delay variants: `.reveal-delay-1` through `.reveal-delay-6`. No JS animation library is used.

### Logo
The official logo lives at `public/logo.png` and is served through the Netlify Image CDN. The `BrandLogo` component in `index.tsx` renders it; `PageChrome.tsx` and `insights.index.tsx` carry near-identical inline copies for their own headers.

Two non-obvious details:

- The source PNG has ~30% transparent bands above and below the artwork. Requesting it with `&w=880&h=222&fit=cover` trims those bands, so the mark renders large inside a fixed box. Callers that pass `boxClass` (nav, footers) get this cropped variant; the plain height-scaled variant leaves most of its box empty.
- The "BUSINESS ADVISORS & ACCOUNTING SPECIALISTS" tagline (`.logo-tagline`) appears **only in the top nav**. Footers render the mark alone (`showTagline={false}` on `BrandLogo`, tagline omitted in `SiteFooter`) so it fills its white card with uniform padding on all sides.

### Article Artwork

Article images come from the Soro feed's Supabase storage — a third-party origin — and are rendered
through `ArticleImage` (`src/components/ArticleImage.tsx`), which wraps `sizedImage()` from
`src/utils/images.ts`. Always use `ArticleImage` for article artwork rather than a bare `<img>` with
`sizedImage()`.

The reason is reliability, not tidiness. An Image CDN transform of a remote image has to fetch the
full-resolution original before it can resize it, and the insights archive asks for dozens of those
at once. Cold transforms in a batch that size occasionally lose the race and return 504 (the CDN
gives up after 30s), which leaves a blank card. Which cards it hits is random, so the page can look
fine on one device and have a hole in a different place on the next. `ArticleImage` catches that and
re-points the same element at the untransformed original, which serves fine on its own — including
the case where the transform failed before React hydrated and the error event was lost (it checks for
a finished image with no intrinsic width on mount).

### BBB Accredited Business Seal

The floating Better Business Bureau seal (bottom-right, on every page) comes from an inline script in
`__root.tsx`. Two constraints that are easy to break:

- `var bbb` must stay a global — BBB's `badge.min.js` reads `window.bbb` for its config, so the
  config cannot move into a module.
- `badge.min.js` does not draw anything when it executes. It assigns a `window.onload` handler and
  draws from there. We deliberately delay fetching it until after the page has loaded, which means
  that handler would never fire, so the inline script calls it directly once the badge script's own
  `load` event fires (and restores the previous `window.onload`). **Remove that shim and the seal
  silently disappears from every page** — nothing errors, it just never renders.

`styles.css` keeps the footer's last row clear of the seal's fixed 160×61 slot; those rules assume
the seal is present.

### Contact Form
The contact form is client-side only with a `window.alert` confirmation — it does not submit data anywhere. To enable real form handling, integrate Netlify Forms (see `.agents/skills/netlify-forms-tanstack/SKILL.md`) or a server function endpoint.

### No External State Management
Only React `useState` is used:
- `mobileMenuOpen` — mobile nav drawer toggle
- `scrolled` — nav background on scroll
- `open` per `AccordionItem` — accordion expand/collapse

## Page Sections (in DOM order)

1. **Nav** — Fixed, transparent → solid on scroll. Logo + desktop nav links + mobile hamburger
2. **Hero** — Full-viewport, two-column: headline copy left, animated stat counters right
3. **Credentials Ticker** — CSS marquee of expertise keywords (pauses on hover)
4. **Services** (`#services`) — 9 service cards in a CSS grid, each linking to `/services/<slug>`
5. **Expertise** (`#expertise`) — 4 credential cards in a 2×2 grid
6. **Financial Services** (`#financial`) — Accordion covering 7 accounting/controller functions
7. **About / Philosophy** (`#about`) — Three philosophy cards + sector tag cloud
8. **Contact** (`#contact`) — Two-column: copy + inquiry form
9. **Footer** — Logo, nav links, copyright year (dynamic)

## Styling Conventions

- Tailwind utility classes for structural layout
- Inline `style` props for design-token references and complex one-offs
- Custom CSS classes in `styles.css` for reusable patterns: `btn-gold`, `btn-outline`, `service-card`, `section-label`, `accordion-*`, `marquee-*`, `hero-bg`, `gold-rule`
- Mobile grid collapse is handled by a `<style>` block at bottom of `index.tsx`

## Development Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build → dist/client/
netlify dev      # Start dev server with Netlify feature emulation (port 8888)
```

## Deployment

Netlify auto-deploys from the `main` branch. Build command: `vite build`. Publish directory: `dist/client`. See `netlify.toml` for full config.
