'use client'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SERVICES } from '../data/services'
import { sizedImage } from '../utils/images'
import { NotaryBadge } from '../components/NotaryBadge'

/** Shared by both service-card body variants (plain copy, and copy under a photo). */
const SERVICE_CARD_BODY_STYLE = {
  color: 'var(--color-ink-soft)',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  margin: '0 0 1.5rem',
}

export const Route = createFileRoute('/')({
  component: StepItUpLanding,
  head: () => ({
    links: [{ rel: 'canonical', href: 'https://www.stepitupstrategies.com/' }],
  }),
})

// ─── Brand Logo ──────────────────────────────────────────────────────────────
// Uses the official Step It Up Strategies logo asset.
function BrandLogo({
  alt = 'Step It Up Strategies',
  className = '',
  heightClass = 'h-[99px] lg:h-[132px]',
  // The source PNG carries ~30% transparent padding above and below the artwork, so a
  // plain height-scaled render wastes most of its box. Pass boxClass to serve the asset
  // pre-cropped to its artwork bounds and letterbox it inside a fixed box instead: the
  // box keeps the same footprint in the layout while the mark itself renders much larger.
  boxClass,
  loading = 'eager' as 'eager' | 'lazy',
  fetchPriority = 'auto' as 'high' | 'low' | 'auto',
  // The "BUSINESS ADVISORS & ACCOUNTING SPECIALISTS" line under the mark. Kept in the
  // top nav, dropped in the footers so the mark alone fills its white card.
  showTagline = true,
}: {
  alt?: string
  className?: string
  heightClass?: string
  boxClass?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  showTagline?: boolean
}) {
  const cropped = Boolean(boxClass)
  return (
    <span className="logo-lockup">
      <img
        src={
          cropped
            ? '/.netlify/images?url=/logo.png&w=880&h=222&fit=cover&q=80'
            : '/.netlify/images?url=/logo.png&w=440&q=80'
        }
        alt={alt}
        width={cropped ? 880 : 440}
        height={cropped ? 222 : 264}
        className={`${boxClass ?? heightClass} ${className}`}
        style={
          cropped
            ? { objectFit: 'contain', display: 'block' }
            : { width: 'auto', display: 'block' }
        }
        loading={loading}
        fetchPriority={fetchPriority}
      />
      {showTagline && (
        <span className="logo-tagline">
          BUSINESS ADVISORS &amp; ACCOUNTING SPECIALISTS
        </span>
      )}
    </span>
  )
}

// Footer mark: no tagline, and served pre-cropped to the artwork bounds so the logo
// fills its white card instead of sitting inside the source PNG's transparent bands.
function BrandLogoCompact() {
  return (
    <BrandLogo
      showTagline={false}
      loading="lazy"
      boxClass="h-[62px] w-[246px] sm:h-[104px] sm:w-[412px]"
    />
  )
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

// ─── Credentials Ticker Terms ─────────────────────────────────────────────────
// Each term links to the section of this page where that capability is actually
// covered, so the ribbon works as navigation rather than decoration. Declared
// once and rendered twice by the marquee: the track slides exactly -50%, so the
// two halves must stay identical for the loop to appear seamless.
const TICKER_TERMS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Certified Sommeliers', href: '#expertise' },
  { label: 'Spirit Experts', href: '#expertise' },
  { label: 'Food & Beverage Directors', href: '#expertise' },
  { label: 'District Managers', href: '#expertise' },
  { label: 'General Managers', href: '#expertise' },
  { label: 'Menu Development', href: '#services' },
  { label: 'Beverage Program Creation', href: '#services' },
  { label: 'Food Cost Analysis', href: '#services' },
  { label: 'Bar & Kitchen Layout', href: '#services' },
  { label: 'Business Permitting', href: '#services' },
  { label: 'Financial Strategy', href: '#financial' },
  { label: 'Accounting', href: '#financial' },
]

// ─── Main Component ───────────────────────────────────────────────────────────
function StepItUpLanding() {
  useScrollReveal()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formFields, setFormFields] = useState({ name: '', email: '', company: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle navigation link clicks with offset for desktop
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target && target.getAttribute('href')?.startsWith('#')) {
        // Only apply offset on desktop (screen width > 768px)
        if (window.innerWidth >= 1024) {
          const href = target.getAttribute('href')
          // "#" on its own is not a valid selector, and querySelector throws on it,
          // which would leave the click both cancelled and unhandled. Anything that
          // does not resolve to an element is left to the browser's own behaviour.
          if (href && href.length > 1) {
            const element = document.querySelector(href)
            if (element) {
              e.preventDefault()
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
              // Offset by 51px (approximately 1/2 + 1/3 + 1/4 inch total) to account for fixed nav
              const offsetPosition = elementPosition - 51

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
            }
          }
        }
        // On mobile, let the default behavior work (no offset needed)
      }
    }

    // Add event listeners to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick)
    })

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick)
      })
    }
  }, [])

  const encode = (data: Record<string, string>) => {
    return Object.entries(data)
      .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      .join('&')
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', 'bot-field': '', ...formFields }),
      })
      setFormStatus('success')
      setFormFields({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      setFormStatus('error')
    }
  }

  const navLinks: Array<[string, string]> = [
    ['Services', '#services'],
    ['Insights', '/insights'],
    ['Expertise', '#expertise'],
    ['Financial', '#financial'],
    ['About', '#about'],
  ]

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] px-8 flex items-center justify-between h-28 lg:h-36"
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
          <BrandLogo
            fetchPriority="high"
            boxClass="h-[88px] w-[192px] lg:h-[120px] lg:w-[304px]"
          />
        </a>

        {/* Desktop Nav */}
        <div
          className="nav-links hidden lg:flex gap-9 items-center"
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
          className="flex lg:hidden w-11 h-11 items-center justify-center bg-transparent border-none cursor-pointer p-2"
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
          className="fixed top-28 lg:top-36 inset-x-0 bg-white z-[99] px-8 py-6 flex flex-col gap-1 shadow-lg"
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
        className="hero-bg pt-28 lg:pt-36 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Brand-icon watermark — arrow tip sits 1mm below the top banner */}
        <img
          src="/.netlify/images?url=/brand-icon.png&w=800&q=60"
          alt=""
          aria-hidden="true"
          width={800}
          height={578}
          loading="eager"
          // Decorative watermark at 9% opacity. Still requested immediately, but
          // marked low priority so it queues behind the logo, fonts and hydration
          // bundle instead of competing with them for the first connections.
          fetchPriority="low"
          decoding="async"
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
        >
          {/* Left: Main copy */}
          <div>
            <div
              className="animate-fade"
              style={{ marginBottom: '1.75rem' }}
            >
              <span className="section-label">
                Business Management, Consulting, Comprehensive Accounting &amp; Analysis
              </span>
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

            {/* Service-area line. Local-intent signal for search and for
                visitors deciding whether we cover them — Florida on the ground,
                the rest of the country remotely.

                The wrapper is a query container so the line's font-size can be
                sized against the width of this copy column rather than the
                viewport — see .hero-service-area, which keeps the sentence on a
                single line instead of orphaning "States". */}
            <div className="hero-service-area-box">
              <p
                className="animate-fade delay-400 hero-service-area"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginTop: '2rem',
                  marginBottom: 0,
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  color: 'var(--color-ink-soft)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-orange)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  Proudly serving clients across{' '}
                  <strong style={{ color: 'var(--color-blue)', fontWeight: 600 }}>Florida</strong>{' '}
                  and throughout the{' '}
                  <strong style={{ color: 'var(--color-blue)', fontWeight: 600 }}>
                    United States
                  </strong>
                  .
                </span>
              </p>
            </div>
          </div>

          {/* Right: Stats panel — links to /by-the-numbers, the research page
              behind these figures. Uses .service-card for the shared hover lift. */}
          <div style={{ position: 'relative' }}>
            <Link
              to="/by-the-numbers"
              aria-label="By the Numbers — see the research behind the partnership"
              className="animate-fade delay-200 service-card"
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
                textDecoration: 'none',
                cursor: 'pointer',
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
                aria-hidden="true"
                className="pulse-arrow"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-orange)',
                  fontSize: '1.85rem',
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

            {/* Read-more cue so the panel reads as a link, not just a stat card */}
            <span
              style={{
                marginTop: '0.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-line)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-orange)',
              }}
            >
              See the research behind the partnership →
            </span>
            </Link>
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
          {[...TICKER_TERMS, ...TICKER_TERMS].map(({ label, href }, i) => {
            // Second pass is the visual duplicate that makes the loop seamless;
            // hide it from assistive tech and the tab order so the same twelve
            // links are not announced or tabbed through twice.
            const isDuplicate = i >= TICKER_TERMS.length
            return (
              <a
                key={i}
                href={href}
                className="marquee-link"
                aria-hidden={isDuplicate || undefined}
                tabIndex={isDuplicate ? -1 : undefined}
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
                {label}
                <span
                  aria-hidden="true"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-orange)',
                    flexShrink: 0,
                  }}
                />
              </a>
            )
          })}
        </div>
      </div>

      {/* ── NOTARY PUBLIC STRIP ────────────────────────────────────────────
          Additive band only — sits between the credentials ticker and the
          services grid so the notary offering is visible without altering the
          composition of any existing section. The notaries.com badge links to
          its own bonding verification; the CTA is the link to /notary. */}
      <div className="notary-strip">
        <div className="notary-strip-inner">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <NotaryBadge width={104} />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                  marginBottom: '0.35rem',
                }}
              >
                New Service
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  lineHeight: 1.25,
                }}
              >
                Notary Public Duties &mdash; Bonded, Licensed &amp; Commissioned
              </div>
              <div
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginTop: '0.3rem',
                }}
              >
                In our Winter Garden office, mobile throughout Central Florida, and
                online nationwide. By appointment only.
              </div>
            </div>
          </div>

          <Link to="/notary" className="notary-strip-cta">
            Notary Public Services
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
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
        {/* Structured Data for Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Restaurant Consulting",
                "description": "From concept to grand opening and beyond — operational systems, menu engineering, staff structure, and profitability modeling tailored to your concept and market.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Business Consulting",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Retail Strategy Consulting",
                "description": "Merchandise planning, floor layout optimization, vendor relationships, shrinkage control, and customer experience design for retail environments.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Business Consulting",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Entertainment Venue Consulting",
                "description": "Multi-revenue-stream operations including bar programs, event logistics, staffing frameworks, and the financial controls that keep entertainment businesses healthy.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Business Consulting",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Menu Creation & Food Cost Analysis",
                "description": "Recipe development, costing, and menu engineering for profit maximization. We analyze every line item so your kitchen runs with precision — and profitability.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Food Service Consulting",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Beverage Programs & Bar Layout Design",
                "description": "Certified sommeliers and spirit experts design your wine list, cocktail program, and spirits selection from scratch. We also consult on bar layout for optimal speed-of-service and revenue per square foot.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Beverage Consulting",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Kitchen Layout & Design Consulting",
                "description": "Flow-optimized kitchen designs that reduce labor costs and improve ticket times. We work with your architects and equipment vendors to get it right before the first nail is driven.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Design Consulting",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Permitting & Licensing Services",
                "description": "Liquor licenses, health permits, occupancy certificates, entertainment licenses — we acquire and maintain all permits required for opening new businesses and sustaining operational readiness.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Regulatory Compliance",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Website Design & Development",
                "description": "Professional website design and development services to establish your online presence and drive business growth.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Digital Services",
                "areaServed": "United States"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Full Scale Business Accounting",
                "description": "End-to-end accounting built for hospitality and retail — bookkeeping, payroll, accounts payable and receivable, financial reporting, and controller-level oversight. We keep your books clean, your cash flow clear, and your business audit-ready.",
                "provider": {
                  "@type": "Organization",
                  "name": "Step It Up Strategies"
                },
                "serviceType": "Accounting Services",
                "areaServed": "United States"
              }
            ])
          }}
        />

        {/* Section header */}
        <div
          style={{
            display: 'grid',
            alignItems: 'end',
            marginBottom: '4rem',
          }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-24"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="service-card reveal"
              aria-label={`${service.title} — view full capabilities`}
              style={{
                background: '#fff',
                padding: '2.25rem',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
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
              {/* Card body. A category with a photograph layers it over the copy
                  and cross-fades the two on hover (see .card-swap in styles.css);
                  the photo is decorative here, so it is hidden from assistive tech
                  and the copy it covers stays readable to it. */}
              {service.image ? (
                <div className="card-swap">
                  <p className="card-swap-copy" style={SERVICE_CARD_BODY_STYLE}>
                    {service.cardBody}
                  </p>
                  <img
                    className="card-swap-media"
                    src={sizedImage(service.image, 720)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <p style={SERVICE_CARD_BODY_STYLE}>{service.cardBody}</p>
              )}
              <span
                style={{
                  marginTop: 'auto',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                Explore capabilities →
              </span>
            </Link>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-8">
          <a
            href="https://form.jotform.com/261257161071046"
            className="btn-primary inline-block"
            style={{ fontSize: '1.03rem' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Begin your{' '}
            <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              FREE Business Assessment
            </span>{' '}
            Today!
          </a>
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
            className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-24"
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-9 md:[grid-auto-rows:1fr]"
            >
              {[
                {
                  role: 'Owner Operators',
                  image: '/expertise/owner-operators.jpg',
                  desc: 'First-hand ownership and operating experience — we have built, opened, and run our own concepts, carrying the same risk, capital, and accountability our clients face every day.',
                  delay: 'reveal-delay-1',
                },
                {
                  role: 'Certified Bookkeepers & Accountants',
                  image: '/expertise/certified-bookkeepers-accountants.jpg',
                  desc: 'Certified bookkeeping and accounting expertise — from day-to-day ledgers and payroll to financial reporting and controller-level oversight, keeping the numbers accurate and the business audit-ready.',
                  delay: 'reveal-delay-2',
                },
                {
                  role: 'Food & Beverage Directors',
                  image: '/expertise/food-beverage-directors.jpg',
                  desc: 'Overseen full-service F&B operations at scale, managing multi-outlet programs, vendor negotiations, and P&L accountability.',
                  delay: 'reveal-delay-3',
                },
                {
                  role: 'District & General Managers',
                  image: '/expertise/district-general-managers.jpg',
                  desc: 'Multi-unit district management and single-unit GM experience — operations, HR, budgeting, and brand standards execution.',
                  delay: 'reveal-delay-4',
                },
                {
                  role: 'Spirit Experts',
                  image: '/expertise/spirit-experts.jpg',
                  desc: 'Advanced spirits knowledge spanning whiskey, rum, agave, and craft distillates — applied to cocktail program design and staff training.',
                  delay: 'reveal-delay-5',
                },
                {
                  role: 'Certified Sommeliers',
                  image: '/expertise/certified-sommeliers.jpg',
                  desc: 'Formal sommelier certification with deep expertise across Old World and New World wine programs, cellar management, and guest education.',
                  delay: 'reveal-delay-6',
                },
              ].map(({ role, desc, delay, image }) => (
                <div
                  key={role}
                  className={`reveal ${delay} credential-card`}
                  style={{
                    padding: '2rem',
                    background: '#fff',
                    border: '1.5px solid var(--color-line)',
                    borderRadius: '16px',
                    borderTop: '4px solid var(--color-orange)',
                  }}
                >
                  {/* Role and description cross-fade out under the photograph on
                      hover (see .credential-card in styles.css). The copy stays in
                      flow and in the accessibility tree; the photo is decorative,
                      so it is hidden from assistive tech. */}
                  <div className="credential-card-copy">
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
                  <img
                    className="credential-card-media"
                    src={sizedImage(image, 720)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Our Services Button */}
          <div className="text-center mt-8">
            <a href="#services" className="btn-primary inline-block">
              Our Services
            </a>
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9"
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
              flexDirection: 'column',
              gap: '1.25rem',
              alignItems: 'stretch',
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
              }}
            >
              Sectors Served
            </span>
            <div
              className="sector-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
            >
              {[
                'Full-Service Restaurants',
                'Quick Service & Fast Casual',
                'Hotels & Resorts',
                'Bars & Nightclubs',
                'Retail Boutiques',
                'Entertainment Complexes',
                'Specialty Food & Beverage Retail',
                'Event Venues',
                'Pop-ups & Concepts',
                'And Beyond',
              ].map((sector) => (
                <span
                  key={sector}
                  style={{
                    height: '3.25rem',
                    padding: '0 1rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    color: 'rgba(255, 255, 255, 0.92)',
                    letterSpacing: '0.02em',
                    fontWeight: 500,
                    fontFamily: 'var(--font-body)',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  {sector}
                </span>
              ))}
            </div>
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20"
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
              We work on-site with clients across Florida and remotely with clients
              anywhere in the country. Reach out and let's start the conversation.
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
              <a
                href="https://www.instagram.com/stepitupstrategies/"
                target="_blank"
                rel="noopener noreferrer"
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Follow Us on Instagram
              </a>
              <a
                href="tel:+13215130479"
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>
                  Have Questions? Call us at{' '}
                  <span className="block md:inline">(321) 513-0479</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="reveal reveal-delay-2">
            {/* Hidden form for Netlify detection */}
            <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="text" name="company" />
              <textarea name="message"></textarea>
              <input type="text" name="bot-field" hidden />
            </form>
            <form
              onSubmit={handleFormSubmit}
              style={{
                background: '#fff',
                border: '1.5px solid var(--color-line)',
                padding: '2.5rem',
                borderRadius: '20px',
                boxShadow: '0 24px 60px -32px rgba(20, 24, 90, 0.18)',
              }}
            >
              <input type="hidden" name="form-name" value="contact" />
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
              {formStatus === 'success' && (
                <p style={{ color: 'var(--color-orange)', marginBottom: '1rem' }}>
                  Thank you! We'll be in touch shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p style={{ color: 'red', marginBottom: '1rem' }}>
                  Something went wrong. Please try again.
                </p>
              )}
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
                      value={formFields[field.name as keyof typeof formFields]}
                      onChange={handleFormChange}
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
                    value={formFields.message}
                    onChange={handleFormChange}
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', textAlign: 'center' }}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
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
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            className="items-center md:items-start"
          >
            <div
              style={{
                background: '#fff',
                // Uniform padding only — the mark fills the card and stays centred in it.
                padding: '0.75rem',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <a
                href="#top"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BrandLogoCompact />
              </a>
            </div>
            {/* Width matches the logo card above it (image width + its 0.75rem padding on
                each side), so the address spans exactly the same footprint with its text
                centred under the mark. */}
            <address
              style={{
                fontStyle: 'normal',
                fontSize: '1.02rem',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.78)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.04em',
              }}
              className="w-[270px] sm:w-[436px] max-w-full text-center"
            >
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=504+W+Plant+St,+Winter+Garden,+FL+34787"
                target="_blank"
                rel="noopener noreferrer"
                className="pulse-address"
                title="Get driving directions to our office"
                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
              >
                504 W Plant St. Winter Garden, FL 34787
              </a>
            </address>
          </div>

          <nav style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['Services', '#services'],
              ['Insights', '/insights'],
              ['Notary', '/notary'],
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
            margin: '1.5rem auto 0',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.08em',
            fontWeight: 600,
          }}
        >
          Certified &amp; Insured
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
          className="footer-bottom-bar flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
        >
          <div>
            &copy; {new Date().getFullYear()} Step It Up Strategies. All rights reserved.
          </div>
          <a
            href="/privacy-policy"
            style={{
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: '0.78rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            Privacy Policy
          </a>
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
