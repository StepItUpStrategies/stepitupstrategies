import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const archivedArticles = [
  {
    slug: 'reduce-food-cost-8-percent',
    title: 'How to Reduce Food Cost by 8% Without Sacrificing Quality',
    category: 'Operations',
    date: '2025-04-15',
  },
  {
    slug: 'staffing-playbook-to-lower-labor-costs',
    title: 'Staffing Playbook to Lower Labor Costs',
    category: 'People',
    date: '2025-04-10',
  },
]

function getArticlesOlderThanDays(days: number) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return archivedArticles.filter((a) => new Date(a.date) < cutoff)
}

export const Route = createFileRoute('/insights')({
  component: Insights,
})

export default function Insights() {
  const [archiveOpen, setArchiveOpen] = useState(false)
  const olderArticles = getArticlesOlderThanDays(10)

  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById('soro-blog')

      if (!container) return

      container.innerHTML = ''

      const script = document.createElement('script')
      script.src =
        'https://app.trysoro.com/api/embed/3cc0116b-c696-4d4d-8f15-cdd7c40c1db6'
      script.async = true

      container.appendChild(script)
    }, 1000)
  }, [])

  return (
    <div
      style={{
        background: 'var(--color-cream)',
        minHeight: '100vh',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-body)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Brand-icon watermark */}
      <img
        src="/brand-icon.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'calc(9rem + 1mm - 1in / 3)',
          left: 'calc(75% - 1in)',
          transform: 'translateX(-50%)',
          width: 'min(90vw, 1440px)',
          height: 'auto',
          opacity: 0.09,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      />
      {/* Header with logo */}
      <header
        className="h-28 md:h-36 px-8 flex items-center justify-between"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-line)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Step It Up Strategies"
            className="h-[99px] md:h-[132px]"
            style={{ width: 'auto', display: 'block' }}
          />
        </a>
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-blue)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = 'var(--color-orange)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'var(--color-blue)')
          }
        >
          ← Back to Home
        </a>
      </header>

      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
          Content Library
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--color-blue)',
            marginBottom: '1rem',
            letterSpacing: '-0.01em',
          }}
        >
          Insights &amp; Strategy
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'var(--color-ink-soft)',
            maxWidth: '600px',
            marginBottom: '2.5rem',
          }}
        >
          Operational intelligence for restaurants, bars, and hospitality
          brands.
        </p>

        <div
          style={{ marginTop: '3rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
          className="archive-layout"
        >
          {/* Archive sidebar */}
          <div
            style={{
              width: '260px',
              flexShrink: 0,
              background: '#fff',
              border: '1.5px solid var(--color-line)',
              borderRadius: '16px',
              padding: '1.75rem 1.5rem',
              boxShadow: '0 8px 32px -16px rgba(20, 24, 90, 0.12)',
              position: 'sticky',
              top: '8rem',
            }}
            className="archive-sidebar"
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-blue)',
                lineHeight: 1.4,
                margin: '0 0 0.25rem 0',
              }}
            >
              Step It Up
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-orange)',
                margin: '0 0 1.25rem 0',
              }}
            >
              –article archive
            </p>

            <button
              onClick={() => setArchiveOpen(!archiveOpen)}
              style={{
                background: archiveOpen ? 'var(--color-blue)' : 'var(--color-orange)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                padding: '0.7rem 1.4rem',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '999px',
                width: '100%',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                boxShadow: archiveOpen
                  ? '0 6px 18px -8px rgba(31, 42, 140, 0.4)'
                  : '0 6px 18px -8px rgba(245, 130, 32, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Articles {archiveOpen ? '▲' : '▼'}
            </button>

            {archiveOpen && olderArticles.length > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {olderArticles.map((article) => (
                  <a
                    key={article.slug}
                    href={`/insights/${article.slug}`}
                    style={{
                      display: 'block',
                      padding: '0.75rem 0.85rem',
                      background: 'var(--color-cream)',
                      border: '1px solid var(--color-line)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s ease, background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-orange)'
                      e.currentTarget.style.background = 'var(--color-orange-soft)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-line)'
                      e.currentTarget.style.background = 'var(--color-cream)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--color-orange)',
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--color-blue)',
                        lineHeight: 1.35,
                        display: 'block',
                      }}
                    >
                      {article.title}
                    </span>
                  </a>
                ))}
              </div>
            )}

            {archiveOpen && olderArticles.length === 0 && (
              <p
                style={{
                  marginTop: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--color-muted)',
                  textAlign: 'center',
                }}
              >
                No archived articles yet.
              </p>
            )}
          </div>

          {/* Main blog content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div id="soro-blog"></div>
          </div>
        </div>
      </section>

      {/* Responsive styles for archive layout */}
      <style>{`
        @media (max-width: 768px) {
          .archive-layout {
            flex-direction: column !important;
          }
          .archive-sidebar {
            width: 100% !important;
            position: static !important;
          }
        }
      `}</style>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: 'var(--color-blue-deep)',
          color: 'rgba(255,255,255,0.78)',
          padding: '3.5rem 2rem 2.25rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0"
        >
          <div
            style={{
              background: '#fff',
              padding: '1.25rem 1.75rem',
              borderRadius: '14px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img
                src="/logo.png"
                alt="Step It Up Strategies"
                className="h-[99px] md:h-[132px]"
                style={{ width: 'auto', display: 'block' }}
              />
            </a>
          </div>

          <nav style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
            {([
              ['Services', '/#services'],
              ['Insights', '/insights'],
              ['Expertise', '/#expertise'],
              ['Financial', '/#financial'],
              ['About', '/#about'],
              ['Contact', '/#contact'],
            ] as const).map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.78)')}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div
          style={{
            maxWidth: '1280px',
            margin: '2.5rem auto 0',
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.6)',
          }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
        >
          <div>
            &copy; {new Date().getFullYear()} Step It Up Strategies. All rights reserved.
          </div>
          <span className="brand-tagline" style={{ color: 'var(--color-orange-light)' }}>
            Clarify <span className="dot" style={{ background: 'var(--color-orange-light)' }} />{' '}
            Prioritize <span className="dot" style={{ background: 'var(--color-orange-light)' }} />{' '}
            Grow
          </span>
        </div>
      </footer>
    </div>
  )
}
