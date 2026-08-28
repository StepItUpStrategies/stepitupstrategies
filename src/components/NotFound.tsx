// Router-level 404 page. Without one, TanStack Router renders its built-in
// fallback — a bare, unstyled "Not Found" with no branding and no way back —
// and logs a warning on every mismatched URL.
//
// This is deliberately self-contained rather than reusing PageChrome: the
// component is referenced from router.tsx, which is in the entry bundle, so
// importing the shared chrome would pull the whole services dataset into the
// initial download for every visitor on every page.
import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div
      style={{
        background: 'var(--color-cream)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <a href="/" aria-label="Step It Up Strategies — home">
        <img
          src="/.netlify/images?url=/logo.png&w=880&h=222&fit=cover&q=80"
          alt="Step It Up Strategies"
          width={880}
          height={222}
          className="h-[88px] w-[192px] md:h-[110px] md:w-[280px]"
          style={{ objectFit: 'contain', display: 'block' }}
        />
      </a>

      <span className="section-label" style={{ marginTop: '2.5rem' }}>
        404
      </span>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
          fontWeight: 700,
          color: 'var(--color-blue)',
          margin: '1.25rem 0 1rem',
        }}
      >
        We could not find that page
      </h1>
      <p
        style={{
          color: 'var(--color-ink-soft)',
          lineHeight: 1.8,
          maxWidth: '32rem',
          marginBottom: '2.25rem',
        }}
      >
        The link may be out of date or the page may have moved. Everything we do
        is a click away from the homepage.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a href="/" className="btn-primary inline-block">
          Back to Home
        </a>
        <Link
          to="/services"
          className="no-underline text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-blue)' }}
        >
          View All Services
        </Link>
      </div>
    </div>
  )
}
