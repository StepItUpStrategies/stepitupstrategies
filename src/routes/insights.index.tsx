import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getCurrentArticles, getArchiveArticles } from '../server/articles'

export const Route = createFileRoute('/insights/')({
  component: Insights,
  loader: async () => {
    const [currentArticles, archiveArticles] = await Promise.all([
      getCurrentArticles(),
      getArchiveArticles(),
    ])
    return { currentArticles, archiveArticles }
  },
})

export default function Insights() {
  const { currentArticles, archiveArticles } = Route.useLoaderData()
  const [articlesVisible, setArticlesVisible] = useState(false)

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

      {/* Current Articles */}
      <section
        style={{
          background: 'var(--color-cream)',
          padding: '5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-80px',
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
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
          INSIGHTS
        </div>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--color-blue)',
              margin: '1.25rem 0 2.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            Current{' '}
            <span style={{ color: 'var(--color-orange)' }}>Articles</span>
          </h2>

          {currentArticles.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {currentArticles.map((article) => (
                <Link
                  key={article.slug}
                  to="/insights/$slug"
                  params={{ slug: article.slug }}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="current-article-card"
                    style={{
                      background: '#fff',
                      borderRadius: '1.25rem',
                      overflow: 'hidden',
                      border: '1px solid var(--color-line)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '220px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>
                    <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                          color: 'var(--color-blue)',
                          margin: '0 0 0.75rem',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {article.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          lineHeight: 1.6,
                          color: 'var(--color-ink-soft)',
                          margin: '0 0 1.25rem',
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.summary}
                      </p>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: 'var(--color-orange)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        Read Article
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              style={{
                background: '#fff',
                borderRadius: '1.25rem',
                border: '1px solid var(--color-line)',
                padding: '3rem 2rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'var(--color-blue)',
                  margin: '0 0 0.5rem',
                }}
              >
                New articles coming soon
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: 'var(--color-ink-soft)',
                  margin: 0,
                }}
              >
                Check back shortly — the latest insights will appear here
                automatically.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Divider between Current Articles and Archive */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245, 130, 32, 0.3), transparent)',
        }}
      />

      {/* Archive / Published Articles */}
      <section
        id="archive"
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
              gap: '0.75rem',
              margin: '1.25rem 0 2rem',
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
              onClick={() => setArticlesVisible((v) => !v)}
              aria-expanded={articlesVisible}
              aria-label={articlesVisible ? 'Hide articles' : 'Show articles'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                transform: articlesVisible ? 'rotate(0deg)' : 'rotate(-90deg)',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          <div
            style={{
              maxHeight: articlesVisible ? '5000px' : '0',
              overflow: 'hidden',
              opacity: articlesVisible ? 1 : 0,
              transition: 'max-height 0.5s ease, opacity 0.3s ease',
            }}
          >
            {archiveArticles.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '2rem',
                }}
              >
                {archiveArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to="/insights/$slug"
                    params={{ slug: article.slug }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      className="current-article-card"
                      style={{
                        background: '#fff',
                        borderRadius: '1.25rem',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.15)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '220px',
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.4s ease',
                          }}
                        />
                      </div>
                      <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            lineHeight: 1.25,
                            color: 'var(--color-blue)',
                            margin: '0 0 0.75rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {article.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.92rem',
                            lineHeight: 1.6,
                            color: 'var(--color-ink-soft)',
                            margin: '0 0 1.25rem',
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {article.summary}
                        </p>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: 'var(--color-orange)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                          }}
                        >
                          Read Article
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '1.25rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: '#fff',
                    margin: '0 0 0.5rem',
                  }}
                >
                  No archived articles yet
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    color: 'rgba(255,255,255,0.6)',
                    margin: 0,
                  }}
                >
                  Published articles will appear here.
                </p>
              </div>
            )}
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
