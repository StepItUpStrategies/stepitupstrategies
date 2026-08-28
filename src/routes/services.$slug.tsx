import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SERVICES, getServiceBySlug } from '../data/services'
import { SiteHeader, SiteFooter } from '../components/PageChrome'
import { getArticlesBySlugs } from '../server/articles'

const SITE = 'https://www.stepitupstrategies.com'

export const Route = createFileRoute('/services/$slug')({
  component: ServiceDetailPage,
  loader: async ({ params }) => {
    const service = getServiceBySlug(params.slug)
    if (!service) return { relatedArticles: [] }
    return {
      relatedArticles: await getArticlesBySlugs({ data: service.relatedArticles }),
    }
  },
  head: ({ params }) => {
    const service = getServiceBySlug(params.slug)
    if (!service) {
      return { meta: [{ title: 'Service Not Found — Step It Up Strategies' }] }
    }
    const url = `${SITE}/services/${service.slug}`
    return {
      meta: [
        { title: service.metaTitle },
        { name: 'description', content: service.metaDescription },
        { property: 'og:title', content: service.metaTitle },
        { property: 'og:description', content: service.metaDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: service.metaTitle },
        { name: 'twitter:description', content: service.metaDescription },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
})

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <svg
          className={`accordion-icon${open ? ' open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className={`accordion-content${open ? ' open' : ''}`}>
        <p
          style={{
            color: 'var(--color-ink-soft)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            margin: '0 0 1.4rem',
            paddingRight: '2rem',
          }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-orange)"
      strokeWidth="2.5"
      style={{ flexShrink: 0, marginTop: '3px' }}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function NotFoundPanel() {
  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <SiteHeader />
      <section
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '6rem 2rem',
          textAlign: 'center',
        }}
      >
        <span className="section-label">Not Found</span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--color-blue)',
            margin: '1.25rem 0 1rem',
          }}
        >
          We could not find that service
        </h1>
        <p style={{ color: 'var(--color-ink-soft)', lineHeight: 1.8, marginBottom: '2rem' }}>
          The page may have moved. Everything we do is listed on the services overview.
        </p>
        <Link to="/services" className="btn-primary inline-block">
          View All Services
        </Link>
      </section>
      <SiteFooter />
    </div>
  )
}

function ServiceDetailPage() {
  const { slug } = Route.useParams()
  const { relatedArticles } = Route.useLoaderData()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFoundPanel />

  const related = service.related
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s))

  const url = `${SITE}/services/${service.slug}`

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.metaDescription,
      serviceType: service.serviceType,
      url,
      provider: {
        '@type': 'Organization',
        name: 'Step It Up Strategies',
        url: SITE,
      },
      areaServed: 'United States',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${service.title} Capabilities`,
        itemListElement: service.capabilities.map((c) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: c.title, description: c.body },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
        { '@type': 'ListItem', position: 3, name: service.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden" style={{ padding: '4rem 2rem 5rem' }}>
        <img
          src="/.netlify/images?url=/brand-icon.png&w=800&q=60"
          alt=""
          aria-hidden="true"
          width={800}
          height={578}
          loading="lazy"
          style={{
            position: 'absolute',
            top: '-4rem',
            right: '-6rem',
            width: 'min(46vw, 520px)',
            opacity: 0.06,
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="animate-fade"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '2.5rem',
            }}
          >
            <a href="/" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>
              Home
            </a>
            <span style={{ color: 'var(--color-line)' }}>/</span>
            <Link to="/services" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>
              Services
            </Link>
            <span style={{ color: 'var(--color-line)' }}>/</span>
            <span style={{ color: 'var(--color-orange)' }}>{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-20 items-start">
            <div className="animate-reveal">
              <span className="section-label">Service / {service.number}</span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 4.6vw, 3.6rem)',
                  fontWeight: 700,
                  lineHeight: 1.07,
                  color: 'var(--color-blue)',
                  margin: '1.25rem 0 0',
                  letterSpacing: '-0.015em',
                }}
              >
                {service.headline}{' '}
                <span style={{ color: 'var(--color-orange)' }}>{service.headlineAccent}</span>
              </h1>
              <span className="brand-rule" style={{ width: '96px', margin: '1.75rem 0' }} />
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '1.15rem',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                  margin: 0,
                }}
              >
                {service.lede}
              </p>
              <div className="flex flex-wrap gap-4" style={{ marginTop: '2.25rem' }}>
                <a
                  href="https://form.jotform.com/261257161071046"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Free Business Assessment
                </a>
                <a href="/#contact" className="btn-outline">
                  Talk to Us
                </a>
              </div>
            </div>

            {/* "This is for you if" panel */}
            <aside
              className="animate-reveal delay-200"
              style={{
                background: '#fff',
                border: '1.5px solid var(--color-line)',
                borderTop: '4px solid var(--color-orange)',
                borderRadius: '18px',
                padding: '2rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '0 0 1.25rem',
                }}
              >
                This is for you if…
              </h2>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.9rem' }}>
                {service.signals.map((signal) => (
                  <li
                    key={signal}
                    style={{
                      display: 'flex',
                      gap: '0.7rem',
                      color: 'var(--color-ink-soft)',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckIcon />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5.5rem 2rem 0',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-20 items-start">
          <div>
            <span className="section-label">The Approach</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                fontWeight: 700,
                lineHeight: 1.12,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              What this{' '}
              <span style={{ color: 'var(--color-orange)' }}>actually involves</span>
            </h2>
          </div>
          <div>
            {service.overview.map((para) => (
              <p
                key={para.slice(0, 32)}
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '1.05rem',
                  lineHeight: 1.85,
                  margin: '0 0 1.4rem',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5.5rem 2rem',
        }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-label">Capabilities</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              color: 'var(--color-blue)',
              margin: '1.25rem 0 0',
              letterSpacing: '-0.01em',
            }}
          >
            Where we <span style={{ color: 'var(--color-orange)' }}>go to work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {service.capabilities.map((capability, i) => (
            <div
              key={capability.title}
              className="service-card"
              style={{
                background: '#fff',
                padding: '2rem',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '56px',
                  height: '4px',
                  background: 'var(--color-orange)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  color: 'var(--color-orange)',
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                }}
              >
                / {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.22rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '0.85rem 0 0.75rem',
                  lineHeight: 1.25,
                }}
              >
                {capability.title}
              </h3>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.94rem',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {capability.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-line)',
          borderBottom: '1px solid var(--color-line)',
          padding: '5.5rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span className="section-label">How It Works</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                fontWeight: 700,
                lineHeight: 1.12,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              A working <span style={{ color: 'var(--color-orange)' }}>engagement</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {service.process.map((step) => (
              <div key={step.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'var(--color-orange)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.label}
                </div>
                <span
                  className="brand-rule-solid"
                  style={{ width: '40px', margin: '1rem 0 1.1rem' }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--color-blue)',
                    margin: '0 0 0.7rem',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'var(--color-ink-soft)',
                    fontSize: '0.92rem',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES + FAQ ───────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5.5rem 2rem',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="section-label">What You Get</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
                fontWeight: 700,
                lineHeight: 1.14,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 1.75rem',
                letterSpacing: '-0.01em',
              }}
            >
              Deliverables
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '1rem',
              }}
            >
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    color: 'var(--color-ink-soft)',
                    fontSize: '0.98rem',
                    lineHeight: 1.65,
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--color-line)',
                  }}
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="section-label">Questions</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
                fontWeight: 700,
                lineHeight: 1.14,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 1.25rem',
                letterSpacing: '-0.01em',
              }}
            >
              Frequently asked
            </h2>
            <div>
              {service.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ─────────────────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section
          style={{
            background: '#fff',
            borderTop: '1px solid var(--color-line)',
            borderBottom: '1px solid var(--color-line)',
            padding: '5rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
              style={{ marginBottom: '3rem' }}
            >
              <div>
                <span className="section-label">Knowledge Center</span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
                    fontWeight: 700,
                    lineHeight: 1.14,
                    color: 'var(--color-blue)',
                    margin: '1.25rem 0 0.75rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Related Articles
                </h2>
                <p
                  style={{
                    color: 'var(--color-ink-soft)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    maxWidth: '540px',
                    margin: 0,
                  }}
                >
                  Further reading from our insights archive on {service.title.toLowerCase()}.
                </p>
              </div>
              <Link
                to="/insights"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                View All Insights →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  to="/insights/$slug"
                  params={{ slug: article.slug }}
                  className="service-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--color-cream)',
                    border: '1.5px solid var(--color-line)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      padding: '1.5rem',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.08rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: 'var(--color-blue)',
                        margin: '0 0 0.6rem',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        color: 'var(--color-ink-soft)',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
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
                        marginTop: 'auto',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-orange)',
                      }}
                    >
                      Read Article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED + CTA ────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-blue)',
          padding: '5rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-orange-light)',
              marginBottom: '1.5rem',
            }}
          >
            Related Services
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                to="/services/$slug"
                params={{ slug: item.slug }}
                className="service-card"
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  borderRadius: '18px',
                  padding: '2rem',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    color: 'var(--color-orange-light)',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                  }}
                >
                  / {item.number}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0.75rem 0 0.6rem',
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: '0.93rem',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.lede}
                </p>
              </Link>
            ))}
          </div>

          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '3rem',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 1rem',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              Ready to step it up?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: '1.02rem',
                lineHeight: 1.75,
                maxWidth: '560px',
                margin: '0 auto 2rem',
              }}
            >
              Start with a free business assessment. We will tell you what we see, in plain
              language, before anyone talks about scope.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://form.jotform.com/261257161071046"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Begin Your Free Assessment
              </a>
              <Link to="/services" className="btn-outline btn-on-dark">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
