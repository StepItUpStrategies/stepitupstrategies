import { Link, createFileRoute } from '@tanstack/react-router'
import { SERVICES } from '../data/services'
import { SiteHeader, SiteFooter } from '../components/PageChrome'
import { SITE, ogImage, pageMeta } from '../utils/seo'

const TITLE = 'Our Services — Step It Up Strategies'
const DESCRIPTION =
  'The full range of Step It Up Strategies capabilities: restaurant consulting, retail strategy, entertainment venues, menu and food cost analysis, beverage programs, kitchen design, permitting, website design, and full scale accounting.'

export const Route = createFileRoute('/services/')({
  component: ServicesIndex,
  head: () => ({
    meta: pageMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: `${SITE}/services`,
      image: ogImage('/services/restaurant-consulting.jpg'),
      imageAlt: 'Step It Up Strategies consulting services',
    }),
    links: [{ rel: 'canonical', href: `${SITE}/services` }],
  }),
})

function ServicesIndex() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Our Services',
      description: DESCRIPTION,
      url: `${SITE}/services`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: SERVICES.map((service, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: service.title,
          url: `${SITE}/services/${service.slug}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
      ],
    },
  ]

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader />

      <section className="hero-bg relative overflow-hidden" style={{ padding: '4rem 2rem 4.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
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
            <span style={{ color: 'var(--color-orange)' }}>Services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-20 items-end">
            <div className="animate-reveal">
              <span className="section-label">What We Do</span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 4.4vw, 3.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.08,
                  color: 'var(--color-blue)',
                  margin: '1.25rem 0 0',
                  letterSpacing: '-0.015em',
                }}
              >
                Full-Spectrum{' '}
                <span style={{ color: 'var(--color-orange)' }}>Business Strategy</span>
              </h1>
            </div>
            <p
              className="animate-reveal delay-200"
              style={{
                color: 'var(--color-ink-soft)',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                maxWidth: '580px',
                margin: 0,
              }}
            >
              Nine disciplines, one operating philosophy. We specialize in restaurant, retail, and
              entertainment — but our expertise extends to any business that demands operational
              clarity, financial discipline, and a compelling guest experience. Choose a category
              to see exactly what we do inside it.
            </p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4.5rem 2rem 5.5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="service-card"
              style={{
                background: '#fff',
                padding: '2.25rem',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
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
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '0 0 0.875rem',
                  lineHeight: 1.2,
                  letterSpacing: '-0.005em',
                }}
              >
                {service.title}
              </h2>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  margin: '0 0 1.5rem',
                }}
              >
                {service.cardBody}
              </p>
              <span
                style={{
                  marginTop: 'auto',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                }}
              >
                Explore capabilities →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '3.5rem' }}>
          <a
            href="https://form.jotform.com/261257161071046"
            className="btn-primary inline-block"
            style={{ fontSize: '1.03rem' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Begin your FREE Business Assessment Today!
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
