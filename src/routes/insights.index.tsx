import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/insights/')({
  component: Insights,
})

const archivePosts = [
  {
    slug: 'how-to-reduce-food-cost-without-cutting-quality',
    title: 'How to Reduce Food Cost Without Cutting Quality',
    summary: 'Learn how to reduce food cost with practical restaurant strategies for purchasing, prep, pricing, portion control, and waste reduction.',
  },
  {
    slug: 'bar-menu-consulting-services-that-sell',
    title: 'Bar Menu Consulting Services That Sell',
    summary: 'Bar menu consulting services help operators build profitable, efficient beverage programs that fit the concept, staff, and guest demand.',
  },
  {
    slug: 'restaurant-concept-development-consultant',
    title: 'Restaurant Concept Development Consultant',
    summary: 'A restaurant concept development consultant helps turn ideas into profitable operations with sharper positioning, smarter systems, and cleaner execution.',
  },
]

export default function Insights() {
  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById('soro-blog')
      if (!container) return
      container.innerHTML = ''
      const script = document.createElement('script')
      script.src = 'https://app.trysoro.com/api/embed/3cc0116b-c696-4d4d-8f15-cdd7c40c1db6'
      script.async = true
      container.appendChild(script)
    }, 1000)
  }, [])

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav
        className="px-8 flex items-center justify-between h-28 md:h-36"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <a href="/" className="flex items-center no-underline" aria-label="Step It Up Strategies — home">
          <img
            src="/logo.png"
            alt="Step It Up Strategies"
            className="h-[99px] md:h-[132px]"
            style={{ width: 'auto', display: 'block' }}
          />
        </a>
        <Link
          to="/"
          className="nav-link text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-blue)', textDecoration: 'none' }}
        >
          &larr; Back to Home
        </Link>
      </nav>

      {/* Hero Section with Watermark */}
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

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
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
            Operational intelligence for restaurants, bars, and hospitality brands.
          </p>
        </div>
      </section>

      {/* Soro Blog Embed */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem 4rem' }}>
        <div id="soro-blog" style={{ minHeight: '200px' }} />
      </section>

      {/* Archive Section */}
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

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ color: 'var(--color-orange-light)', marginBottom: '1.25rem', display: 'inline-flex' }}>
            Archive
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#fff',
              margin: '1.25rem 0 3rem',
              letterSpacing: '-0.01em',
            }}
          >
            Published{' '}
            <span style={{ color: 'var(--color-orange)' }}>Articles</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {archivePosts.map((post) => (
              <a
                key={post.slug}
                href={`/insights?post=${post.slug}`}
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
                  }}
                >
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
                    {post.title}
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
                    {post.summary}
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
                    Read article &rarr;
                  </span>
                </div>
              </a>
            ))}
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
          &copy; {new Date().getFullYear()} Step It Up Strategies. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
