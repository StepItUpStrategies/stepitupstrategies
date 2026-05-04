# Step It Up Strategies

A professional landing page for **Step It Up Strategies**, a business management and consulting firm specializing in restaurant, retail, and entertainment industries.

## About the Site

The site presents Step It Up Strategies' full service offering across:
- Restaurant, retail, and entertainment consulting
- Menu creation and food cost analysis
- Beverage program development and bar/kitchen layout design
- Business permitting and licensing
- Controller-level accounting and financial services

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000` (or `http://localhost:8888` via Netlify CLI).

### With Netlify CLI (recommended)

```bash
netlify dev
```

This emulates all Netlify features locally, including redirects and edge functions.

## Building for Production

```bash
npm run build
```

Output is placed in `dist/client/` and served by Netlify on deploy.

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx      # Root layout with font imports and meta tags
│   └── index.tsx       # Full landing page (single-page)
├── styles.css          # Global styles, design tokens, animations
└── router.tsx          # TanStack Router setup
```

## Design Notes

- **Color palette**: Obsidian/charcoal dark background with warm gold (#c49a3c) accents and cream text
- **Typography**: Cormorant Garamond (display/headings) + DM Sans (body)
- **Logo**: A custom SVG staircase/arrow motif representing the "step up" concept. Replace the `LogoMark` component in `index.tsx` with the actual company logo when available.
