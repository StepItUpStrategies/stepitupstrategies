import type { ReactNode } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { SERVICES } from '../data/services'
import { SiteHeader, SiteFooter } from '../components/PageChrome'
import { SITE, ogImage, pageMeta } from '../utils/seo'

const TITLE = 'By the Numbers — Why a Strategic Partner Pays For Itself | Step It Up Strategies'
const DESCRIPTION =
  'The research behind professional business mentoring, disciplined accounting, and deliberate concept development — and how Step It Up Strategies turns those findings into measurable growth for restaurant, retail, and entertainment operators.'

export const Route = createFileRoute('/by-the-numbers')({
  component: ByTheNumbers,
  head: () => ({
    meta: pageMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: `${SITE}/by-the-numbers`,
      type: 'article',
      image: ogImage('/financial/accounting-inventory.jpg'),
      imageAlt: 'The research behind strategic business partnership',
    }),
    links: [{ rel: 'canonical', href: `${SITE}/by-the-numbers` }],
  }),
})

/* The three figures shown in the homepage hero panel. Repeated here so the page
   the panel links to opens on the same numbers the visitor just clicked. */
const FIRM_STATS: Array<{ number: string; label: string }> = [
  { number: '40+', label: 'Years Combined Industry Experience' },
  { number: '3', label: 'Core Sectors: Restaurant, Retail & Entertainment' },
  { number: '360°', label: 'End-to-End Business Launch & Growth Services' },
]

type ResearchStat = { figure: string; headline: string; body: string }

const MENTORING_STATS: ResearchStat[] = [
  {
    figure: '12%',
    headline: 'More likely to survive year one',
    body: 'Businesses that received professional mentoring outperformed their unmentored peers through the most fragile stretch of their lifecycle — the first twelve months.',
  },
  {
    figure: '5×',
    headline: 'More likely to launch successfully',
    body: 'Entrepreneurs with access to a mentor were five times more likely to get a viable business off the ground than founders working without guidance.',
  },
  {
    figure: '5+',
    headline: 'Interactions move the needle',
    body: 'Owners who engaged in five or more mentoring interactions reported meaningfully higher business growth than those who stopped after a single conversation.',
  },
]

const FINANCIAL_STATS: ResearchStat[] = [
  {
    figure: '90%',
    headline: 'Of financially healthy firms budget',
    body: 'Nine in ten organizations rated in excellent financial health prepare budgets consistently and maintain disciplined financial controls. Health follows the habit, not the other way around.',
  },
  {
    figure: '49%',
    headline: 'Are held back by weak financial management',
    body: 'Nearly half of small-business owners name poor financial or resource management as a factor actively limiting their business — a solvable constraint, not a fixed ceiling.',
  },
  {
    figure: '67%',
    headline: 'Already use a qualified accountant',
    body: 'Two thirds of businesses retain professional financial guidance. Among growing companies, expert oversight of the books is the norm — not the exception.',
  },
]

/* The levers clear concept work actually moves. Drawn from the same disciplines
   the service pages cover: menu engineering, labor modeling, kitchen flow. */
const CONCEPT_LEVERS: Array<{ title: string; body: string }> = [
  {
    title: 'Market Positioning',
    body: 'Who you are for, what you are worth, and why a guest chooses you over the option next door.',
  },
  {
    title: 'Revenue Strategy',
    body: 'The mix of dayparts, channels, and revenue streams that carries the concept through a full calendar year.',
  },
  {
    title: 'Labor Model',
    body: 'An org chart and staffing framework sized to real volume, so payroll scales with sales instead of ahead of them.',
  },
  {
    title: 'Menu Profitability',
    body: 'Costed recipes, tested yields, and engineered pricing — margin designed in at the recipe, not chased later.',
  },
  {
    title: 'Kitchen Efficiency',
    body: 'Flow-optimized layout and station design that shortens ticket times and reduces the labor needed per cover.',
  },
  {
    title: 'Guest Experience',
    body: 'Service standards and touchpoints defined on paper before they are improvised on a Friday night.',
  },
  {
    title: 'Capital Spending',
    body: 'Build-out and equipment decisions weighed against the returns they have to produce, before the first nail is driven.',
  },
]

/* Mirrors the "Our Philosophy" pillars on the homepage, framed here around the
   research above. */
const PARTNER_PILLARS: Array<{ heading: string; body: string }> = [
  {
    heading: 'Industry-First',
    body: 'Every recommendation is grounded in real operational experience — not theoretical frameworks. Certified sommeliers, spirit experts, food and beverage directors, district and general managers, and owner-operators who have carried the same risk, capital, and accountability you carry. We do not consult from the sidelines. We have led these operations firsthand.',
  },
  {
    heading: 'Numbers-Driven',
    body: 'Beautiful concepts fail without financial discipline. We pair creative vision with rigorous financial management — food cost percentages, prime cost control, labor models, and cash flow projections — supported by certified bookkeepers and controller-level oversight that keeps your books clean and your business audit-ready.',
  },
  {
    heading: 'End-to-End',
    body: 'From concept development and permit acquisition through menu creation, staff training, website presence, and ongoing financial oversight — one accountable partner for the entire lifecycle of your business, rather than a roster of vendors who never speak to each other.',
  },
]

/* The mentoring research is clear that repeat engagement, not a single
   conversation, is what correlates with growth. This is that cadence. */
const ENGAGEMENT_STEPS: Array<{ label: string; title: string; body: string }> = [
  {
    label: 'Step 01',
    title: 'Discovery On Site',
    body: 'We walk the operation, pull the numbers, and observe real service — no assessment built from a questionnaire alone.',
  },
  {
    label: 'Step 02',
    title: 'Findings & Priorities',
    body: 'A clear-eyed read on what is working, what is costing you, and the sequence that produces the fastest measurable return.',
  },
  {
    label: 'Step 03',
    title: 'Build & Implement',
    body: 'Systems, SOPs, costed menus, budgets, and controls installed alongside your team — built to be run without us in the room.',
  },
  {
    label: 'Step 04',
    title: 'Measure & Hand Off',
    body: 'Performance tracked against the baseline we established, with ownership transferred to your managers and reporting they can maintain.',
  },
]

function ByTheNumbers() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'By the Numbers',
      headline: 'Why a Strategic Partner Pays For Itself',
      description: DESCRIPTION,
      url: `${SITE}/by-the-numbers`,
      '@id': `${SITE}/by-the-numbers#webpage`,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE}/#website` },
      about: [
        { '@type': 'Thing', name: 'Business Consulting' },
        { '@type': 'Thing', name: 'Business Mentoring' },
        { '@type': 'Thing', name: 'Financial Management' },
        { '@type': 'Thing', name: 'Restaurant Concept Development' },
      ],
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'By the Numbers',
          item: `${SITE}/by-the-numbers`,
        },
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

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="hero-bg relative overflow-hidden"
        style={{ padding: '4rem 2rem 4.5rem' }}
      >
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
            <span style={{ color: 'var(--color-orange)' }}>By the Numbers</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-20 items-end">
            <div className="animate-reveal">
              <span className="section-label">By the Numbers</span>
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
                Why the Right Partner{' '}
                <span style={{ color: 'var(--color-orange)' }}>Pays For Itself</span>
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
              Hiring an advisor should not be an act of faith. The research on business
              mentoring, financial management, and concept development is consistent and
              measurable — and it points to the same conclusion every operator eventually
              reaches on their own. Here is what the numbers say, and how we put them to
              work in your business.
            </p>
          </div>

          {/* Firm stats — the same three figures as the homepage panel */}
          <div
            className="animate-fade delay-300 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            style={{ marginTop: '3.5rem' }}
          >
            {FIRM_STATS.map(({ number, label }) => (
              <div
                key={number}
                style={{
                  background: '#fff',
                  border: '1.5px solid var(--color-line)',
                  borderRadius: '18px',
                  padding: '1.75rem 2rem',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '1.25rem',
                  alignItems: 'center',
                  boxShadow: '0 18px 44px -32px rgba(20, 24, 90, 0.22)',
                }}
              >
                <span
                  className="stat-number"
                  style={{ minWidth: '4.5rem', fontSize: 'clamp(2.1rem, 3.4vw, 3rem)' }}
                >
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
      </section>

      {/* ── MENTORING RESEARCH ─────────────────────────────────────────────── */}
      <ResearchSection
        label="Consulting & Mentoring"
        heading={
          <>
            Guidance Changes the{' '}
            <span style={{ color: 'var(--color-orange)' }}>Odds.</span>
          </>
        }
        intro="Studies conducted by SCORE, the nation's largest network of business mentors, found that businesses receiving professional mentoring were measurably more durable and more likely to launch successfully than those going it alone. The effect compounds with contact: owners who kept the relationship going saw more growth than those who treated advice as a one-time transaction."
        stats={MENTORING_STATS}
        closing="Read together, these findings describe a working relationship rather than a single engagement — which is exactly how we structure ours. We embed with your team, revisit the numbers on a cadence, and stay accountable to the results long after the initial recommendations are delivered."
      />

      {/* ── FINANCIAL RESEARCH ─────────────────────────────────────────────── */}
      <ResearchSection
        tinted
        label="Accounting & Financial Management"
        heading={
          <>
            Financial Discipline{' '}
            <span style={{ color: 'var(--color-orange)' }}>Predicts Growth.</span>
          </>
        }
        intro="A Federal Reserve–cited analysis of business financial health found that budgeting and internal controls are not paperwork — they are the clearest dividing line between businesses that grow and businesses that stall. Firms with stronger financial health were substantially more likely to achieve higher annual revenues."
        stats={FINANCIAL_STATS}
        closing="Financial clarity is not a luxury — it is the foundation on which every successful hospitality business is built. Our principals bring the discipline of seasoned controllers to operators who often have no internal accounting depth: accurate records, monthly statements you can actually read, budgets tied to operational reality, tax compliance, internal controls that prevent theft and waste, and payroll handled correctly the first time."
      />

      {/* ── CONCEPT DEVELOPMENT ────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-24 items-end">
          <div className="animate-reveal">
            <span className="section-label">Concept Development</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              Successful Concepts Are{' '}
              <span style={{ color: 'var(--color-orange)' }}>Rarely Accidental.</span>
            </h2>
          </div>
          <p
            className="animate-reveal delay-200"
            style={{
              color: 'var(--color-ink-soft)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              maxWidth: '620px',
              margin: 0,
            }}
          >
            In hospitality, the evidence is extensive: poor planning, unclear positioning, and
            weak financial modeling are among the largest contributors to business failure. The
            decisions made before opening — menu engineering, operational workflow, financial
            modeling, guest experience design — set the ceiling on profitability and
            scalability for years afterward. Concept development is where that ceiling gets
            raised.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          style={{ marginTop: '3.5rem' }}
        >
          {CONCEPT_LEVERS.map(({ title, body }, i) => (
            <div
              key={title}
              className="service-card"
              style={{
                background: '#fff',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                padding: '2rem',
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
                  fontSize: '0.85rem',
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
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '1rem 0 0.75rem',
                  lineHeight: 1.25,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY STEP IT UP ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-blue-deep)',
          padding: '6.5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <div style={{ maxWidth: '760px', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ color: 'var(--color-orange-light)' }}>
              Why Step It Up Strategies
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#fff',
                margin: '1.25rem 0 1.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              We Don&apos;t Just Advise.{' '}
              <span style={{ color: 'var(--color-orange-light)' }}>We Operate.</span>
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              The research says mentoring, financial discipline, and deliberate planning
              produce measurably better outcomes. What it cannot tell you is who to hire. Four
              decades of combined experience across restaurant, retail, and entertainment —
              every strategy we recommend and every system we install, we have executed
              ourselves in high-volume, high-pressure environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PARTNER_PILLARS.map(({ heading, body }) => (
              <div
                key={heading}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: '18px',
                  padding: '2rem',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '3px',
                    background: 'var(--color-orange)',
                    marginBottom: '1.5rem',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0 0 0.875rem',
                  }}
                >
                  {heading}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.72)',
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
        </div>
      </section>

      {/* ── ENGAGEMENT CADENCE ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem 5rem' }}>
        <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
          <span className="section-label">How the Work Runs</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--color-blue)',
              margin: '1.25rem 0 1.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            Built Around{' '}
            <span style={{ color: 'var(--color-orange)' }}>Measurable Milestones.</span>
          </h2>
          <p
            style={{
              color: 'var(--color-ink-soft)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            The growth effect in the mentoring research belongs to owners who stayed engaged.
            Our engagements are structured the same way — a baseline, a sequence, and a
            handoff, with progress measured against numbers we agreed on at the start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ENGAGEMENT_STEPS.map(({ label, title, body }) => (
            <div
              key={label}
              style={{
                background: 'var(--color-cream)',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                padding: '2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                }}
              >
                {label}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '0.875rem 0 0.75rem',
                  lineHeight: 1.25,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Service cross-links */}
        <div style={{ marginTop: '3.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              display: 'block',
              marginBottom: '1.25rem',
            }}
          >
            Where This Shows Up in Our Work
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="tag-pill"
                style={{ textDecoration: 'none' }}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section
        className="hero-bg"
        style={{ padding: '5rem 2rem', borderTop: '1px solid var(--color-line)' }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>
            Ready to Step It Up?
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              color: 'var(--color-blue)',
              margin: '1.25rem 0 1.25rem',
              letterSpacing: '-0.01em',
            }}
          >
            Find Out Where You Stand.
          </h2>
          <p
            style={{
              color: 'var(--color-ink-soft)',
              fontSize: '1.02rem',
              lineHeight: 1.8,
              margin: '0 0 2.25rem',
            }}
          >
            Every engagement starts with an honest assessment — the numbers, the operation, and
            the gap between where your business is and what it is capable of. No obligation,
            and no generic playbook.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://form.jotform.com/261257161071046"
              className="btn-primary"
              style={{ fontSize: '1.03rem' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Begin your FREE Business Assessment Today!
            </a>
            <a href="/#contact" className="btn-outline">
              Start a Conversation
            </a>
          </div>

          <p
            style={{
              marginTop: '3rem',
              fontSize: '0.78rem',
              lineHeight: 1.7,
              color: 'var(--color-muted)',
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Figures cited on this page are drawn from published research by SCORE, the nation&apos;s
            largest network of volunteer business mentors, a Federal Reserve–cited analysis of
            business financial health, and recent small-business survey research. They describe
            industry-wide findings and are not a projection of results for any individual
            business.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

/* Shared layout for the two statistics sections: header, three figure cards,
   and a closing paragraph tying the research back to what we do. */
function ResearchSection({
  label,
  heading,
  intro,
  stats,
  closing,
  tinted = false,
}: {
  label: string
  heading: ReactNode
  intro: string
  stats: ResearchStat[]
  closing: string
  tinted?: boolean
}) {
  return (
    <section
      style={{
        background: tinted ? 'var(--color-shell)' : 'var(--color-paper)',
        borderTop: '1px solid var(--color-line)',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-24 items-end">
          <div>
            <span className="section-label">{label}</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-blue)',
                margin: '1.25rem 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              {heading}
            </h2>
          </div>
          <p
            style={{
              color: 'var(--color-ink-soft)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              maxWidth: '620px',
              margin: 0,
            }}
          >
            {intro}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          style={{ marginTop: '3.5rem' }}
        >
          {stats.map(({ figure, headline, body }) => (
            <div
              key={figure}
              style={{
                background: '#fff',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                padding: '2.25rem 2rem',
                boxShadow: '0 18px 44px -32px rgba(20, 24, 90, 0.2)',
              }}
            >
              <span className="stat-number" style={{ display: 'block' }}>
                {figure}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '1.25rem 0 0.75rem',
                  lineHeight: 1.35,
                }}
              >
                {headline}
              </h3>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.93rem',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: '3rem',
            maxWidth: '860px',
            color: 'var(--color-ink-soft)',
            fontSize: '1.02rem',
            lineHeight: 1.85,
            paddingLeft: '1.5rem',
            borderLeft: '3px solid var(--color-orange)',
          }}
        >
          {closing}
        </p>
      </div>
    </section>
  )
}
