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

**Note:** `src/routes/products/` and `src/data/products.ts` were scaffolding leftovers from the
marketing template this site started as. Nothing linked to them, but `/products/$productId` was a
live, crawlable route with no `head()` of its own, so it inherited the sitewide `index, follow` and
the homepage's title — every product id was an indexable page impersonating the homepage. The route
and its data file have been deleted. `public/placeholder.png` was only ever referenced by that data
and is now unused; it is left in place because nothing depends on it either way.

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
Slugs are public URLs — do not rename one without adding a redirect. The `Service` JSON-LD block
inside the `#services` section of `index.tsx` is generated from this data too, so adding a category
gives it a schema.org node automatically.

Each detail page sets its own `<title>`, meta description, Open Graph tags, and canonical URL via the
route's `head()`. Canonical URLs are per-route (the homepage sets its own in `index.tsx`) — the root
route deliberately does not set one, or every page would canonicalize to the homepage.

### SEO, Structured Data & the Entity Graph

`src/utils/seo.ts` is the single source of truth for the canonical origin, the
name/address/phone triple, the geo coordinates, and the Open Graph image pipeline.
Six routes import from it. **Do not retype the phone number or address in a route** —
local ranking depends on the NAP triple matching exactly across every page, the Google
Business Profile, and the BBB listing, and a number that differs between two pages
reads as two different businesses.

Alongside the NAP triple, three more values in that file exist so they cannot drift:
`AREA_SERVED` (the one `areaServed` list every schema node uses — it had already
forked before this was centralised, with the service pages quietly omitting
Florida), `SOCIAL_PROFILES` (the Organization's `sameAs`; **only ever add a profile
verified to be this business** — a wrong URL merges this company's entity with
someone else's, which is worse than having none), and `serviceId()`.

`serviceId(slug)` is load-bearing rather than cosmetic. The homepage grid and the
service's own detail page both describe the same nine services, so both emit nodes
under that shared `@id`. Drop it and each page mints an anonymous node instead: the
detail page's capabilities and FAQs attach to one copy of the service, the
homepage's description to another, and neither inherits the other's authority.

`pageMeta()` returns the full title/description/robots/OG/Twitter block for a page.
Every indexable route calls it. TanStack Router resolves head meta deepest-match-first
and dedupes on `name`/`property`, so `__root.tsx` can carry sitewide fallbacks and a
route silently overrides them by setting the same key — which is why there is exactly
one of each tag in the rendered head, not two.

Structured data is one **entity graph**, not a pile of independent nodes:

- `__root.tsx` emits the `Organization` (typed `ProfessionalService` as well, so its
  address and geo are eligible for local results) at `@id` `${SITE}/#organization`, and
  the `WebSite` at `${SITE}/#website`.
- Every page-level node references those `@id`s rather than restating the company.
  Restating it creates duplicate entities and dilutes both.

Two things deliberately absent: the root sets **no canonical** (or every page would
canonicalize to the homepage — see Service Detail Pages), and there is **no
`SearchAction`/sitelinks searchbox**, because the site has no search endpoint and
declaring one that 404s is a spam signal.

`public/sitemap.xml` lists only real URLs. Fragment links such as `/#services` are
deliberately excluded — Google discards the fragment, so they collapse into the
homepage and register as duplicates.

Insights is outside this system by request: no canonical, no share card, no sitemap
entry, no article markup. It does still carry a robots directive of its own, because
having no `head()` at all meant `/insights` and every `/insights/:slug` inherited the
sitewide `index, follow` **and the homepage's title and description** — dozens of
indexable pages presenting as copies of the homepage. Both routes now send
`noindex, follow`.

Two parts of that are deliberate. `follow` stays because these articles link to the
service pages that are meant to rank. And there is **no robots.txt `Disallow` for
/insights** — a disallowed URL is never fetched, so the noindex would never be read
and the page could still be indexed from an external link. Noindex only works if the
crawler is allowed in to see it, which is the opposite of the belt-and-braces
treatment the form stubs get below.

The two hidden Netlify Forms stubs (`public/contact-form.html`, `public/notary-form.html`)
are kept out of the index by *both* a `robots.txt` `Disallow` and an `X-Robots-Tag:
noindex` header in `netlify.toml`; the header is what covers the case where an external
link gets one indexed without it ever being crawled.

### Notary Page Local SEO

`/notary` is the one page tuned for proximity queries ("notary public near me"), so it
carries machinery the other pages do not:

- Its schema node is typed `['Notary', 'LocalBusiness', 'ProfessionalService']`.
  `Notary` is a real schema.org type (LocalBusiness > LegalService > Notary) and is what
  classifies the page as a notary rather than a consultancy that mentions notary work.
  **Dropping it costs the notary-category classification.**
- `geo` and `serviceArea` are two separate claims and both are required. `geo` fixes the
  office on the map; `serviceArea` is a `GeoCircle` describing how far the mobile notary
  travels from it (48,280 m ≈ 30 miles). Omit the second and the travel radius is
  assumed to be zero, which is the whole proximity story.
- `SERVICE_AREAS` in `notary.tsx` drives three things at once: the visible "Notary public
  service area" section, the `areaServed` list in the markup, and the `containedInPlace`
  county nesting that connects a town name a crawler does not know to a county it does.
  **Only list areas we will actually travel to** — ranking for a town we then decline is
  worse than not ranking there.
- The title, H1, and the service-area copy all carry "notary public" and the place name
  on purpose. That is the query shape, not filler.

Business hours are **not** in the markup. The service is appointment-only and no
verified hours exist; inventing an `openingHoursSpecification` that contradicts the
Google Business Profile is worse than omitting it. Add one only from confirmed hours.
The geo coordinates are derived from the street address and are accurate to the block —
replace them with the Business Profile's own pin if you have it.

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

### Credential Card Hover Photos

The six "Who We Are" cards in the `#expertise` section each swap their copy for a full-bleed
photograph of that role while the pointer is over the card (`.credential-card` in `styles.css`,
photos in `public/expertise/`). It is a stronger version of the `.card-swap` effect the service
cards use — there the heading stays and only the body copy is replaced; here the heading fades too,
so the whole box reads as the picture.

Three things not to break:

- The swap is gated behind `@media (hover: hover) and (pointer: fine)`. On a touchscreen `:hover`
  sticks after a tap, which would leave a card stranded as a photo with its text hidden until the
  visitor tapped something else. **Remove the gate and the cards break on phones**, not desktops,
  so it will not show up in ordinary testing.
- The copy is faded with `opacity`, not `display` or conditional rendering. It stays in the flow, so
  the card keeps its height and the equal-height rows from `md:[grid-auto-rows:1fr]` on the grid
  container do not shift on hover. It also stays in the accessibility tree, which is why the photo
  is `alt=""` / `aria-hidden`.
- Filenames are slugs of the role they belong to. The mapping lives in the `image` field of each
  card object in `index.tsx`; there is no automatic matching, so renaming a file means editing that
  field.

### Financial Services Photo Fan

The `#financial` section renders two photographs (`public/financial/`) behind its copy, centered in
the section and rotated in opposite directions from a shared pivot below their bottom edge
(`transform-origin: 50% 118%`) so they overlap like a pair of playing cards held in one hand. The
rules live in `.card-fan*` in `styles.css`.

It is decorative: `aria-hidden`, `alt=""`, `pointer-events: none`, and the section's content grid
carries `position: relative; z-index: 1` to sit above it. The accordion column has a transparent
background, so the fan shows through under both columns by design.

The opacity (0.24, dropping to 0.16 under 768px where the columns stack) is the load-bearing value —
the body copy and accordion labels sit directly on top of these images, so raising it trades
readability for the photos. The radial mask on `.card-fan-inner` is what keeps the fan from ending
on a hard rectangle.

### Contact Photo Backdrop

The CTA copy in `#contact` sits on a faded photograph (`public/contact/inventory-review.jpg`)
cropped to mirror the form card opposite it — same 20px radius, same height. The rules live in
`.contact-copy` / `.contact-photo` in `styles.css`.

Two load-bearing details:

- The heights match because the section's grid uses `align-items: stretch` (not `center`, as it
  did before the photo existed) and `.contact-copy` re-centres its own copy with flexbox. Switch
  the grid back to `center` and the photo shrinks to the height of the text.
- The photo is decorative (`aria-hidden`, `alt=""`, `pointer-events: none`) and the copy sits
  directly on top of it. It is rendered close to its true colour on purpose, so what keeps the
  headline and contact links readable is the light cream wash in `.contact-photo::after`, the
  cream `text-shadow` halo on the copy, and the copy's darker-than-usual colours (`--color-blue-deep`
  and `--color-ink`, set inline in `index.tsx`, where the rest of the page uses `--color-blue` and
  `--color-ink-soft`). Removing any of the three means dropping the image opacity a long way to
  compensate. The crop is done by `object-fit: cover` in CSS rather than in the Image CDN request,
  per the note in `src/utils/images.ts`.

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
5. **Expertise** (`#expertise`) — 6 credential cards in a two-column grid, each swapping to a photo on hover
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
