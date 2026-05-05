'use client'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: StepItUpLanding,
})

// ─── Brand Logo ──────────────────────────────────────────────────────────────
// Uses the official Step It Up Strategies logo asset.
function BrandLogo({
  height = 44,
  alt = 'Step It Up Strategies',
}: {
  height?: number
  alt?: string
}) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      style={{ height, width: 'auto', display: 'block' }}
    />
  )
}

// Compact mark used where the full wordmark would be too wide (footer column, mobile nav)
function BrandLogoCompact({ height = 36 }: { height?: number }) {
  return <BrandLogo height={height} />
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <svg
          className={`accordion-icon ${open ? 'open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div
          style={{
            paddingBottom: '1.4rem',
            color: 'var(--color-ink-soft)',
            lineHeight: 1.75,
            fontSize: '0.95rem',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Main Component ───────────────────────────────────────────────────────────
function StepItUpLanding() {
  useScrollReveal()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks: Array<[string, string]> = [
    ['Services', '#services'],
    ['Expertise', '#expertise'],
    ['Financial', '#financial'],
    ['About', '#about'],
  ]

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Inline reveal styles */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in-view { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal-left.in-view { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal-right.in-view { opacity: 1; transform: translateX(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }
        .reveal-delay-6 { transition-delay: 0.6s; }
      `}</style>

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed inset-0 z-[100] px-8 flex items-center justify-between h-36"
        style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled
            ? '1px solid var(--color-line)'
            : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center no-underline"
          aria-label="Step It Up Strategies — home"
        >
          <BrandLogo height={264} />
        </a>

        {/* Desktop Nav */}
        <div
          className="nav-links hidden md:flex gap-9 items-center"
        >
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="nav-link text-blue no-underline text-xs font-semibold uppercase tracking-wider"
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ fontSize: '0.72rem', padding: '0.7rem 1.4rem' }}>
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden w-11 h-11 items-center justify-center bg-transparent border-none cursor-pointer p-2"
          style={{
            color: 'var(--color-blue)',
          }}
          aria-label="Toggle menu"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed top-36 inset-x-0 bg-white z-[99] px-8 py-6 flex flex-col gap-1 shadow-lg"
          style={{
            borderBottom: '1px solid var(--color-line)',
            boxShadow: '0 18px 40px -24px rgba(20, 24, 90, 0.25)',
          }}
        >
          {[...navLinks, ['Get in Touch', '#contact'] as [string, string]].map(
            ([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-blue no-underline text-lg font-semibold leading-6 tracking-wide py-4 border-b border-line"
              >
                {label}
              </a>
            )
          )}
        </div>
      )}

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        id="top"
        className="hero-bg pt-36 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Brand-icon watermark — arrow tip sits 1mm below the top banner */}
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

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '5rem 2rem 6rem',
            width: '100%',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
        >
          {/* Left: Main copy */}
          <div>
            <div
              className="animate-fade"
              style={{ marginBottom: '1.75rem' }}
            >
              <span className="section-label">Business Management &amp; Consulting</span>
            </div>

            <h1
              className="animate-reveal"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 5.4vw, 4.75rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                color: 'var(--color-blue)',
                margin: '0 0 1.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Built by Operators.
              <br />
              Designed for{' '}
              <span style={{ color: 'var(--color-orange)' }}>Growth.</span>
            </h1>

            <div
              className="animate-fade delay-200"
              style={{ marginBottom: '1.75rem' }}
            >
              <span className="brand-tagline">
                Clarify <span className="dot" /> Prioritize <span className="dot" /> Grow
              </span>
            </div>

            <p
              className="animate-reveal delay-200"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--color-ink-soft)',
                maxWidth: '500px',
                marginBottom: '2.5rem',
              }}
            >
              Step It Up Strategies brings decades of hands-on hospitality, retail,
              and entertainment leadership to your most complex business challenges —
              from concept development to operational excellence.
            </p>

            <div
              className="animate-reveal delay-300"
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a href="#services" className="btn-primary">
                Our Services
              </a>
              <a href="#contact" className="btn-outline">
                Start a Conversation
              </a>
            </div>
          </div>

          {/* Right: Stats panel */}
          <div style={{ position: 'relative' }}>
            <div
              className="animate-fade delay-200"
              style={{
                position: 'relative',
                zIndex: 1,
                background: '#fff',
                border: '1.5px solid var(--color-line)',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 24px 60px -32px rgba(20, 24, 90, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-line)',
              }}
            >
              <span className="section-label">By the Numbers</span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-orange)',
                  fontSize: '1.5rem',
                }}
              >
                ↗
              </span>
            </div>
            {[
              {
                number: '40+',
                label: 'Years Combined Industry Experience',
              },
              {
                number: '3',
                label: 'Core Sectors: Restaurant, Retail & Entertainment',
              },
              {
                number: '360°',
                label: 'End-to-End Business Launch & Growth Services',
              },
            ].map(({ number, label }) => (
              <div
                key={number}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '1.25rem',
                  alignItems: 'center',
                }}
              >
                <span className="stat-number" style={{ minWidth: '5.5rem' }}>
                  {number}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.04em',
                    color: 'var(--color-ink-soft)',
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS TICKER ─────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: '1px solid var(--color-line)',
          borderBottom: '1px solid var(--color-line)',
          background: 'var(--color-blue)',
          padding: '1.1rem 0',
          overflow: 'hidden',
        }}
      >
        <div className="marquee-track">
          {[
            'Certified Sommeliers',
            'Spirit Experts',
            'Food & Beverage Directors',
            'District Managers',
            'General Managers',
            'Menu Development',
            'Beverage Program Creation',
            'Food Cost Analysis',
            'Bar & Kitchen Layout',
            'Business Permitting',
            'Financial Strategy',
            'Certified Sommeliers',
            'Spirit Experts',
            'Food & Beverage Directors',
            'District Managers',
            'General Managers',
            'Menu Development',
            'Beverage Program Creation',
            'Food Cost Analysis',
            'Bar & Kitchen Layout',
            'Business Permitting',
            'Financial Strategy',
          ].map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '0 1.75rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: i % 3 === 0 ? 'var(--color-orange-light)' : '#fff',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-orange)',
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section
        id="services"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '7rem 2rem',
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: 'grid',
            alignItems: 'end',
            marginBottom: '4rem',
          }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-24"
        >
          <div className="reveal">
            <span className="section-label">What We Do</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              Full-Spectrum{' '}
              <span style={{ color: 'var(--color-orange)' }}>Business Strategy</span>
            </h2>
          </div>
          <div className="reveal reveal-delay-2">
            <p
              style={{
                color: 'var(--color-ink-soft)',
                lineHeight: 1.8,
                fontSize: '1.05rem',
                maxWidth: '560px',
              }}
            >
              We specialize in restaurant, retail, and entertainment — but our expertise
              extends to any business that demands operational clarity, financial discipline,
              and a compelling guest experience. We don't consult from the sidelines. We've
              led these operations firsthand.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div
          style={{
            display: 'grid',
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {[
            {
              number: '01',
              title: 'Restaurant Consulting',
              body: 'From concept to grand opening and beyond — operational systems, menu engineering, staff structure, and profitability modeling tailored to your concept and market.',
            },
            {
              number: '02',
              title: 'Retail Strategy',
              body: 'Merchandise planning, floor layout optimization, vendor relationships, shrinkage control, and customer experience design for retail environments.',
            },
            {
              number: '03',
              title: 'Entertainment Venues',
              body: 'Multi-revenue-stream operations including bar programs, event logistics, staffing frameworks, and the financial controls that keep entertainment businesses healthy.',
            },
            {
              number: '04',
              title: 'Menu Creation & Food Cost Analysis',
              body: 'Recipe development, costing, and menu engineering for profit maximization. We analyze every line item so your kitchen runs with precision — and profitability.',
            },
            {
              number: '05',
              title: 'Beverage Programs & Bar Layout Design',
              body: 'Certified sommeliers and spirit experts design your wine list, cocktail program, and spirits selection from scratch. We also consult on bar layout for optimal speed-of-service and revenue per square foot.',
            },
            {
              number: '06',
              title: 'Kitchen Layout & Design Consulting',
              body: 'Flow-optimized kitchen designs that reduce labor costs and improve ticket times. We work with your architects and equipment vendors to get it right before the first nail is driven.',
            },
            {
              number: '07',
              title: 'Permitting & Licensing',
              body: 'Liquor licenses, health permits, occupancy certificates, entertainment licenses — we acquire and maintain all permits required for opening new businesses and sustaining operational readiness.',
            },
            {
              number: '08',
              title: 'Website Design',
              body: 'Modern, conversion-focused websites built to showcase your concept and drive bookings, orders, and inquiries. From brand-aligned visual design to mobile-first builds and ongoing content updates.',
            },
          ].map((service) => (
            <div
              key={service.number}
              className="service-card reveal"
              style={{
                background: '#fff',
                padding: '2.25rem',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top accent bar */}
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    color: 'var(--color-orange)',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                  }}
                >
                  / {service.number}
                </span>
              </div>
              <h3
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
              </h3>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERTISE / CREDENTIALS ────────────────────────────────────────── */}
      <section
        id="expertise"
        style={{
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-line)',
          borderBottom: '1px solid var(--color-line)',
          padding: '7rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              alignItems: 'start',
            }}
            className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12 md:gap-24"
          >
            <div className="reveal">
              <span className="section-label">Who We Are</span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: 'var(--color-blue)',
                  margin: '1.25rem 0 1.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Industry Veterans.{' '}
                <span style={{ color: 'var(--color-orange)' }}>Your Partners.</span>
              </h2>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.98rem',
                  lineHeight: 1.75,
                }}
              >
                Every strategy we recommend, every system we install — we've executed it
                ourselves in high-volume, high-pressure environments. Resumes available upon
                request.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-9"
            >
              {[
                {
                  role: 'Certified Sommeliers',
                  desc: 'Formal sommelier certification with deep expertise across Old World and New World wine programs, cellar management, and guest education.',
                  delay: 'reveal-delay-1',
                },
                {
                  role: 'Spirit Experts',
                  desc: 'Advanced spirits knowledge spanning whiskey, rum, agave, and craft distillates — applied to cocktail program design and staff training.',
                  delay: 'reveal-delay-2',
                },
                {
                  role: 'Food & Beverage Directors',
                  desc: 'Overseen full-service F&B operations at scale, managing multi-outlet programs, vendor negotiations, and P&L accountability.',
                  delay: 'reveal-delay-3',
                },
                {
                  role: 'District & General Managers',
                  desc: 'Multi-unit district management and single-unit GM experience — operations, HR, budgeting, and brand standards execution.',
                  delay: 'reveal-delay-4',
                },
                {
                  role: 'Owner Operators',
                  desc: 'First-hand ownership and operating experience — we have built, opened, and run our own concepts, carrying the same risk, capital, and accountability our clients face every day.',
                  delay: 'reveal-delay-5',
                },
              ].map(({ role, desc, delay }) => (
                <div
                  key={role}
                  className={`reveal ${delay}`}
                  style={{
                    padding: '2rem',
                    background: '#fff',
                    border: '1.5px solid var(--color-line)',
                    borderRadius: '16px',
                    borderTop: '4px solid var(--color-orange)',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--color-blue)',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {role}
                  </h4>
                  <p
                    style={{
                      color: 'var(--color-ink-soft)',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCIAL SERVICES ─────────────────────────────────────────────── */}
      <section
        id="financial"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '7rem 2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            alignItems: 'start',
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20"
        >
          {/* Left: Description */}
          <div>
            <div className="reveal">
              <span className="section-label">Financial Services</span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: 'var(--color-blue)',
                  margin: '1.25rem 0 1.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Controller &amp; Accounting{' '}
                <span style={{ color: 'var(--color-orange)' }}>Capabilities</span>
              </h2>
            </div>
            <div className="reveal reveal-delay-2">
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                  fontSize: '1rem',
                }}
              >
                Beyond operations, Step It Up Strategies provides comprehensive accounting
                and financial management services — from day-to-day bookkeeping to strategic
                financial planning. Our principals bring the financial discipline of seasoned
                controllers to businesses that often lack internal accounting depth.
              </p>
              <div
                style={{
                  padding: '1.75rem',
                  background: 'var(--color-orange-soft)',
                  borderLeft: '4px solid var(--color-orange)',
                  borderRadius: '12px',
                }}
              >
                <p
                  style={{
                    color: 'var(--color-blue-deep)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  "Financial clarity is not a luxury — it is the foundation on which every
                  successful hospitality business is built."
                </p>
              </div>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="reveal reveal-delay-2">
            <AccordionItem title="Financial Record-Keeping & Reporting">
              Maintain accurate, up-to-date financial records across all transactions.
              Produce monthly, quarterly, and annual financial statements — income statement,
              balance sheet, and cash flow — in compliance with GAAP/IFRS. Internal dashboards
              and management reports give you real-time operational clarity.
            </AccordionItem>
            <AccordionItem title="Budgeting, Forecasting & Cost Control">
              Develop annual and multi-year budgets tied to your operational reality.
              Build financial forecasts and scenario analyses to guide strategic decisions.
              Deep cost and overhead analysis — critical in hospitality where margins are thin
              and every percentage point counts.
            </AccordionItem>
            <AccordionItem title="Tax Compliance & Planning">
              Ensure full compliance with applicable tax laws and regulations. Prepare and
              file tax returns accurately and on time. Implement legal tax strategies to
              minimize liabilities and preserve working capital.
            </AccordionItem>
            <AccordionItem title="Internal Controls & Audit Coordination">
              Design and monitor internal control systems to prevent theft, waste, and
              financial mismanagement. Coordinate or conduct internal audits to identify
              risk areas and efficiency gaps — especially critical in cash-heavy hospitality
              environments.
            </AccordionItem>
            <AccordionItem title="Payroll, Compliance & Regulatory Reporting">
              Oversee payroll processing, tax withholdings, and benefits administration.
              Ensure adherence to accounting standards, labor laws, and industry-specific
              regulations. Prepare reports for regulators and external auditors.
            </AccordionItem>
            <AccordionItem title="Strategic Financial Planning & Risk Advisory">
              Provide financial insights that inform long-term strategic direction. Identify
              financial risks and recommend mitigation strategies. Advisory services spanning
              investment decisions, financing structures, and capital allocation.
            </AccordionItem>
            <AccordionItem title="Stakeholder Communication & Systems Management">
              Present financial performance to investors, board members, and partners in
              clear, actionable terms. Oversee accounting software and financial systems.
              Implement automation and analytics tools to improve reporting efficiency and
              accuracy.
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* ── ABOUT / PHILOSOPHY ─────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          background: 'var(--color-blue)',
          color: '#fff',
          padding: '7rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background watermark */}
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
          <div
            className="reveal"
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span className="section-label" style={{ color: 'var(--color-orange-light)' }}>
              Our Philosophy
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#fff',
                margin: '1.25rem auto 0',
                letterSpacing: '-0.01em',
                maxWidth: '760px',
              }}
            >
              We Don't Just Advise.{' '}
              <span style={{ color: 'var(--color-orange)' }}>We've Lived It.</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-9"
          >
            {[
              {
                heading: 'Industry-First',
                body: 'Every recommendation is grounded in real operational experience — not theoretical frameworks. We know what works on a Friday night service when covers are at 200 and the kitchen is down a cook.',
                delay: 'reveal-delay-1',
              },
              {
                heading: 'Numbers-Driven',
                body: 'Beautiful concepts fail without financial discipline. We combine creative vision with rigorous financial management — food cost percentages, labor models, and cash flow projections that keep your business solvent and growing.',
                delay: 'reveal-delay-2',
              },
              {
                heading: 'End-to-End',
                body: 'From business concept and permit acquisition through menu development, staff training, and ongoing financial oversight — we are a single trusted partner for the entire lifecycle of your business.',
                delay: 'reveal-delay-3',
              },
            ].map(({ heading, body, delay }) => (
              <div
                key={heading}
                className={`reveal ${delay}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(6px)',
                  padding: '2.5rem 2.25rem',
                  borderRadius: '18px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '4px',
                    background: 'var(--color-orange)',
                    marginBottom: '1.5rem',
                    borderRadius: '2px',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0 0 0.875rem',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {heading}
                </h3>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.78)',
                    fontSize: '0.95rem',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Sectors covered */}
          <div
            className="reveal"
            style={{
              marginTop: '4rem',
              padding: '2.25rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '18px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-orange-light)',
                fontWeight: 700,
                marginRight: '1rem',
              }}
            >
              Sectors Served
            </span>
            {[
              'Full-Service Restaurants',
              'Quick Service & Fast Casual',
              'Hotels & Resorts',
              'Bars & Nightclubs',
              'Entertainment Complexes',
              'Retail Boutiques',
              'Specialty Food & Beverage Retail',
              'Event Venues',
              'Pop-ups & Concepts',
              'And Beyond',
            ].map((sector) => (
              <span
                key={sector}
                style={{
                  padding: '0.55rem 1rem',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  color: 'rgba(255, 255, 255, 0.92)',
                  letterSpacing: '0.02em',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ──────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          background: 'var(--color-cream)',
          padding: '7rem 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            alignItems: 'center',
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20"
        >
          {/* Left: CTA copy */}
          <div className="reveal">
            <span className="section-label">Ready to Step It Up?</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 1.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Let's Build{' '}
              <span style={{ color: 'var(--color-orange)' }}>Something</span>{' '}
              Exceptional.
            </h2>
            <p
              style={{
                color: 'var(--color-ink-soft)',
                lineHeight: 1.8,
                maxWidth: '480px',
                marginBottom: '2rem',
                fontSize: '1rem',
              }}
            >
              Whether you're opening your first location, optimizing an existing operation,
              or need financial clarity on a struggling business — we're ready to get to work.
              Reach out and let's start the conversation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="mailto:brian@stepitupstrategies.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--color-blue)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-blue)')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                brian@stepitupstrategies.com
              </a>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="reveal reveal-delay-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const data = new FormData(form)
                alert(
                  `Thank you, ${data.get('name')}! We'll be in touch shortly.`
                )
                form.reset()
              }}
              style={{
                background: '#fff',
                border: '1.5px solid var(--color-line)',
                padding: '2.5rem',
                borderRadius: '20px',
                boxShadow: '0 24px 60px -32px rgba(20, 24, 90, 0.18)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '0 0 1.75rem',
                }}
              >
                Start a Conversation
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { name: 'company', label: 'Business / Concept', type: 'text', placeholder: 'Your business name' },
                ].map((field) => (
                  <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    <label
                      htmlFor={field.name}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-blue)',
                        fontWeight: 700,
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.name !== 'company'}
                      className="form-input"
                    />
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-blue)',
                      fontWeight: 700,
                    }}
                  >
                    Tell Us About Your Needs
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe your project, challenge, or goals..."
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: 'var(--color-blue-deep)',
          color: 'rgba(255,255,255,0.78)',
          padding: '3.5rem 2rem 2.25rem',
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
            <BrandLogoCompact height={240} />
          </div>

          <nav style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
            {[
              ['Services', '#services'],
              ['Expertise', '#expertise'],
              ['Financial', '#financial'],
              ['About', '#about'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
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
