import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getArticles } from '../server/articles'

export const Route = createFileRoute('/insights/')({
  loader: () => getArticles(),
  component: Insights,
})

export default function Insights() {
  const articles = Route.useLoaderData()
  const recentArticles = articles.slice(0, 3)
  const [archiveOpen, setArchiveOpen] = useState(false)

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Nav */}
      <nav
        className="px-8 flex items-center justify-between h-28 md:h-36"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <a
          href="/"
          className="flex items-center no-underline"
          aria-label="Step It Up Strategies — home"
        >
          <img
            src="/logo.png"
            alt="Step It Up Strategies"
            className="h-[99px] md:h-[132px]"
            style={{ width: 'auto', display: 'block' }}
          />
        </a>
        <a
          href="/"
          style={{ color: 'var(--color-blue)', textDecoration: 'none' }}
          className="nav-link text-xs font-semibold uppercase tracking-wider"
        >
          ← Back to Home
        </a>
      </nav>

      {/* Hero */}
      <section
        className="hero-bg relative overflow-hidden"
        style={{ padding: '5rem 2rem 4rem' }}
      >
        <img
          src="/brand-icon.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            right: '-5%',
            transform: 'translateY(-50%)',
            width: 'min(70vw, 900px)',
            height: 'auto',
            opacity: 0.07,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            className="section-label"
            style={{ marginBottom: '1.25rem', display: 'inline-flex' }}
          >
            Knowledge Center
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              color: 'var(--color-blue)',
              margin: '1.25rem 0 1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Insights &amp;{' '}
            <span style={{ color: 'var(--color-orange)' }}>Strategy</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              color: 'var(--color-ink-soft)',
              maxWidth: '600px',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Operational intelligence for restaurants, bars, and hospitality
            brands.
          </p>
        </div>
      </section>

      {/* Knowledge Center — Most Recent Full Articles */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '3rem 2rem 4rem',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 700,
            color: 'var(--color-blue)',
            marginBottom: '2rem',
            letterSpacing: '-0.01em',
          }}
        >
          Current Articles
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {recentArticles.map((article) => (
            <Link
              key={article.slug}
              to="/insights/$slug"
              params={{ slug: article.slug }}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <article
                style={{
                  background: '#fff',
                  border: '1px solid var(--color-line)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '320px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '2.5rem 2rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--color-orange)',
                      marginBottom: '0.75rem',
                      display: 'inline-block',
                    }}
                  >
                    {article.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                      fontWeight: 700,
                      color: 'var(--color-blue)',
                      marginTop: 0,
                      marginBottom: '0.75rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--color-ink-soft)',
                      lineHeight: 1.65,
                      margin: '0 0 1.5rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {article.summary}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--color-orange)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontWeight: 600,
                    }}
                  >
                    Read full article →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Archive / Published Articles */}
      <section
        style={{
          background: 'var(--color-blue)',
          padding: '5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-80px',
            top: '50%',
            transform: 'translateY(-50%) rotate(90deg)',
            fontFamily: 'var(--font-display)',
            fontSize: '13rem',
            fontWeight: 700,
            color: 'var(--color-orange)',
            opacity: 0.06,
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.04em',
          }}
        >
          STEP IT UP
        </div>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            className="section-label"
            style={{
              color: 'var(--color-orange-light)',
              marginBottom: '1.25rem',
              display: 'inline-flex',
            }}
          >
            Archive
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1.25rem 0 1.5rem',
              gap: '0.75rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#fff',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Published{' '}
              <span style={{ color: 'var(--color-orange)' }}>Articles</span>
            </h2>
            <button
              onClick={() => setArchiveOpen((prev) => !prev)}
              aria-expanded={archiveOpen}
              aria-label={archiveOpen ? 'Hide published articles' : 'Show published articles'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                transform: archiveOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-orange)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {/* All Article Summaries */}
          <div
            style={{
              overflow: 'hidden',
              maxHeight: archiveOpen ? '10000px' : '0',
              opacity: archiveOpen ? 1 : 0,
              transition: 'max-height 0.5s ease, opacity 0.4s ease',
              marginTop: archiveOpen ? '1.5rem' : '0',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to="/insights/$slug"
                  params={{ slug: article.slug }}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="service-card"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '14px',
                      padding: '2rem 1.75rem',
                      cursor: 'pointer',
                      height: '100%',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: 'var(--color-orange)',
                        marginBottom: '0.75rem',
                        display: 'inline-block',
                      }}
                    >
                      {article.category}
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#fff',
                        marginTop: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {article.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.55,
                        margin: '0.75rem 0 1rem',
                      }}
                    >
                      {article.summary}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        color: 'var(--color-orange)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: 'var(--color-blue-deep)',
          color: 'rgba(255,255,255,0.78)',
          padding: '2.25rem 2rem',
          textAlign: 'center',
          fontSize: '0.78rem',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>
          © {new Date().getFullYear()} Step It Up Strategies. All rights
          reserved.
        </p>
      </footer>
    </div>
  )
}
