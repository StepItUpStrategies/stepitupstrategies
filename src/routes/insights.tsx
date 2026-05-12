import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const localOnlyArticles = [
  { title: 'How to Reduce Food Cost by 8% Without Sacrificing Quality', slug: 'reduce-food-cost-8-percent' },
  { title: 'Staffing Playbook to Lower Labor Costs', slug: 'staffing-playbook-to-lower-labor-costs' },
]

export const Route = createFileRoute('/insights')({
  component: Insights,
})

export default function Insights() {
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [soroArticles, setSoroArticles] = useState<
    Array<{ title: string; slug: string }>
  >([])

  useEffect(() => {
    const container = document.getElementById('soro-blog')
    if (!container) return

    const extractArticles = () => {
      const cards =
        container.querySelectorAll<HTMLAnchorElement>('.soro-blog-card')
      const articles: Array<{ title: string; slug: string }> = []
      cards.forEach((card) => {
        const titleEl = card.querySelector('h2')
        const slug = card.getAttribute('data-slug')
        if (titleEl && slug) {
          articles.push({ title: titleEl.textContent?.trim() || '', slug })
        }
      })
      if (articles.length > 0) {
        setSoroArticles((prev) => (prev.length === 0 ? articles : prev))
      }
    }

    const observer = new MutationObserver(extractArticles)
    observer.observe(container, { childList: true, subtree: true })

    setTimeout(() => {
      container.innerHTML = ''
      const script = document.createElement('script')
      script.src =
        'https://app.trysoro.com/api/embed/3cc0116b-c696-4d4d-8f15-cdd7c40c1db6'
      script.async = true
      container.appendChild(script)
    }, 1000)

    return () => observer.disconnect()
  }, [])

  const handleSoroArticleClick = (slug: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('post', slug)
    history.pushState({ post: slug }, '', url.pathname + url.search)
    window.dispatchEvent(
      new PopStateEvent('popstate', { state: { post: slug } }),
    )
    setArchiveOpen(false)
  }

  const year = new Date().getFullYear()

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
        >
          ← Back to Home
        </a>
      </header>

      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '4rem 1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          className="section-label"
          style={{ marginBottom: '1rem', display: 'inline-flex' }}
        >
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
            maxWidth: 600,
            marginBottom: '2.5rem',
          }}
        >
          Operational intelligence for restaurants, bars, and hospitality
          brands.
        </p>

        <div
          className="archive-layout"
          style={{
            marginTop: '3rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
          }}
        >
          <div
            className="archive-sidebar"
            style={{
              width: 260,
              flexShrink: 0,
              background: '#fff',
              border: '1.5px solid var(--color-line)',
              borderRadius: 16,
              padding: '1.75rem 1.5rem',
              boxShadow: '0 8px 32px -16px rgba(20, 24, 90, 0.12)',
              position: 'sticky',
              top: '8rem',
            }}
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
                background: 'var(--color-orange)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                padding: '0.7rem 1.4rem',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 999,
                width: '100%',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                boxShadow: '0 6px 18px -8px rgba(245, 130, 32, 0.4)',
              }}
            >
              Articles {archiveOpen ? '▲' : '▼'}
            </button>

            {archiveOpen && (
              <div style={{ marginTop: '1rem' }}>
                {soroArticles.map((article) => (
                  <button
                    key={article.slug}
                    onClick={() => handleSoroArticleClick(article.slug)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid var(--color-line)',
                      padding: '0.75rem 0',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      lineHeight: 1.4,
                      color: 'var(--color-blue)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--color-orange)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--color-blue)')
                    }
                  >
                    {article.title}
                  </button>
                ))}

                {localOnlyArticles.map((article) => (
                  <div
                    key={article.slug}
                    style={{
                      borderBottom: '1px solid var(--color-line)',
                      padding: '0.75rem 0',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        background:
                          'linear-gradient(135deg, #d97706, #b45309)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '0.35rem',
                      }}
                    >
                      EXAMPLE
                    </span>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        lineHeight: 1.4,
                        color: 'var(--color-muted)',
                      }}
                    >
                      {article.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div id="soro-blog"></div>
          </div>
        </div>
      </section>

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
          style={{ maxWidth: 1280, margin: '0 auto' }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0"
        >
          <div
            style={{
              background: '#fff',
              padding: '1.25rem 1.75rem',
              borderRadius: 14,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <a
              href="/"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <img
                src="/logo.png"
                alt="Step It Up Strategies"
                className="h-[99px] md:h-[132px]"
                style={{ width: 'auto', display: 'block' }}
              />
            </a>
          </div>
          <nav
            style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}
          >
            {['Services', 'Insights', 'Expertise', 'Financial', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Insights' ? '/insights' : `/#${item.toLowerCase()}`}
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
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: '2.5rem auto 0',
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.6)',
          }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
        >
          <div>
            &copy; {year} Step It Up Strategies. All rights reserved.&emsp;&emsp;&emsp;&emsp;&emsp;Certified &amp; Insured.
          </div>
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--color-orange-light)')}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            Privacy Policy
          </a>
          <span
            className="brand-tagline"
            style={{ color: 'var(--color-orange-light)' }}
          >
            Clarify{' '}
            <span
              className="dot"
              style={{ background: 'var(--color-orange-light)' }}
            ></span>{' '}
            Prioritize{' '}
            <span
              className="dot"
              style={{ background: 'var(--color-orange-light)' }}
            ></span>{' '}
            Grow
          </span>
        </div>
      </footer>

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
    </div>
  )
}
