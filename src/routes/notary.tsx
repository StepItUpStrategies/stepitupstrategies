import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SiteHeader, SiteFooter } from '../components/PageChrome'
import { NotaryBadge } from '../components/NotaryBadge'

const SITE = 'https://www.stepitupstrategies.com'
const URL = `${SITE}/notary`

const META_TITLE = 'Notary Public — Winter Garden, Central Florida & Online | Step It Up Strategies'
const META_DESCRIPTION =
  'Certified, licensed and bonded notary public serving Winter Garden and the greater Central Florida area, with remote online notarization available anywhere in the United States. By appointment only.'

export const Route = createFileRoute('/notary')({
  component: NotaryPage,
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: 'description', content: META_DESCRIPTION },
      {
        name: 'keywords',
        content:
          'notary public Winter Garden FL, mobile notary Central Florida, online notary, remote online notarization, Orlando notary, licensed bonded notary, notary near me',
      },
      { property: 'og:title', content: META_TITLE },
      { property: 'og:description', content: META_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: URL },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: META_TITLE },
      { name: 'twitter:description', content: META_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
})

// ─── Content ─────────────────────────────────────────────────────────────────

const FORMATS: Array<{
  label: string
  title: string
  body: string
  points: string[]
}> = [
  {
    label: 'In Office',
    title: 'At our Winter Garden office',
    body:
      'Meet us at 504 W Plant St. in historic downtown Winter Garden. Convenient for single signatures, small document packages, and anything you would rather hand over in person.',
    points: [
      'Downtown Winter Garden, easy parking nearby',
      'Ideal for individual and small-business documents',
      'Scheduled appointment slots, no waiting room',
    ],
  },
  {
    label: 'Mobile',
    title: 'We travel to you across Central Florida',
    body:
      'We come to your home, office, hospital, title company, or job site anywhere in the greater Central Florida area — Orange, Lake, Osceola, Seminole, and surrounding counties.',
    points: [
      'Winter Garden, Orlando, Ocoee, Clermont, Windermere and beyond',
      'Closings, estate documents, and multi-signer packages',
      'After-hours and weekend appointments on request',
    ],
  },
  {
    label: 'Online',
    title: 'Remote online notarization, nationwide',
    body:
      'Sign and notarize from anywhere in the United States over a secure audio-video session. Identity is verified electronically and the notarized document is returned digitally.',
    points: [
      'Available to signers anywhere in the U.S.',
      'No travel, no printing, no shipping',
      'Secure identity verification and a recorded session',
    ],
  },
]

const DOCUMENTS = [
  'Affidavits and sworn statements',
  'Powers of attorney',
  'Deeds and property transfers',
  'Wills, trusts, and estate documents',
  'Loan and refinance packages',
  'Business contracts and operating agreements',
  'Vehicle and vessel title transfers',
  'Parental and travel consent forms',
  'Bills of sale and lien releases',
  'Certified copy acknowledgments',
  'Oaths and affirmations',
  'Corporate resolutions and LLC filings',
]

const STEPS: Array<{ label: string; title: string; body: string }> = [
  {
    label: '01',
    title: 'Request an appointment',
    body:
      'Send us the form below, call, or email. Tell us what needs notarizing, how many signers are involved, and whether you would prefer our office, a mobile visit, or an online session.',
  },
  {
    label: '02',
    title: 'We confirm the details',
    body:
      'We confirm a time, the meeting location or the online session link, what identification each signer needs to bring, and the fee before anything is scheduled.',
  },
  {
    label: '03',
    title: 'Signing and notarization',
    body:
      'Every signer presents valid, unexpired government-issued photo identification. We witness the signature, complete the notarial certificate, and apply the seal.',
  },
  {
    label: '04',
    title: 'You leave with a completed document',
    body:
      'In-person documents are handed back finished. Online sessions return a digitally notarized document with a tamper-evident electronic seal.',
  },
]

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Do I need an appointment?',
    a: 'Yes. Notary services are by appointment only so that a commissioned notary is present, the correct paperwork is ready, and every signer can be properly identified. Reach out through the form below and we will confirm a time — same-day appointments are often possible.',
  },
  {
    q: 'What identification do I need to bring?',
    a: 'Each signer must present valid, unexpired government-issued photo identification — a driver license, state ID card, U.S. passport, or military ID. The name on the identification must match the name on the document. For remote online notarization, identity is verified electronically during the session.',
  },
  {
    q: 'How far will you travel?',
    a: 'We travel throughout the greater Central Florida area, including Orange, Lake, Osceola, Seminole, and neighboring counties — Winter Garden, Orlando, Ocoee, Windermere, Clermont, Apopka, Kissimmee, and the surrounding communities. If you are outside that radius, ask us and we will let you know what is workable, or set up an online session instead.',
  },
  {
    q: 'Can you notarize for someone outside of Florida?',
    a: 'Yes, through remote online notarization. A Florida commissioned online notary can notarize documents for signers located anywhere in the United States over a secure audio-video connection, so long as the document itself may lawfully be notarized in Florida.',
  },
  {
    q: 'Do all signers need to be present?',
    a: 'Yes. Every person whose signature is being notarized must personally appear before the notary — in person for office and mobile appointments, or on camera for an online session. We cannot notarize a signature that was made beforehand.',
  },
  {
    q: 'Can you tell me which document I need or how to fill it out?',
    a: 'No. A notary public verifies identity and witnesses signatures; we cannot draft documents, choose a form for you, or give legal advice. Please have your document complete and unsigned before the appointment, and consult an attorney if you need guidance on its contents.',
  },
  {
    q: 'Are you bonded and insured?',
    a: 'Yes. We are a commissioned, licensed and bonded notary public. Our bonding is verifiable through the badge displayed on this page.',
  },
  {
    q: 'What does it cost?',
    a: 'Notarial acts are charged at the rate permitted under Florida law, per notarized signature. Mobile appointments add a travel fee based on distance, and online sessions are quoted per session. We confirm the full fee when we confirm your appointment — there are no surprises at signing.',
  },
]

// ─── Small building blocks ───────────────────────────────────────────────────

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

function SectionHeading({
  label,
  children,
  accent,
}: {
  label: string
  children: React.ReactNode
  accent?: string
}) {
  return (
    <>
      <span className="section-label">{label}</span>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: 'var(--color-blue)',
          margin: '1.25rem 0 1.25rem',
          letterSpacing: '-0.01em',
        }}
      >
        {children} {accent && <span style={{ color: 'var(--color-orange)' }}>{accent}</span>}
      </h2>
    </>
  )
}

// ─── Appointment request form ────────────────────────────────────────────────

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')

const EMPTY_FIELDS = {
  name: '',
  email: '',
  phone: '',
  'service-format': '',
  'document-type': '',
  'preferred-time': '',
  message: '',
}

function AppointmentForm() {
  const [fields, setFields] = useState<Record<string, string>>({ ...EMPTY_FIELDS })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFields({ ...fields, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      // Must post to the static skeleton in public/, not "/" — a POST to "/" is
      // swallowed by the SSR catch-all and never reaches Netlify's form handler.
      await fetch('/notary-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'notary-appointment', 'bot-field': '', ...fields }),
      })
      setStatus('success')
      setFields({ ...EMPTY_FIELDS })
    } catch {
      setStatus('error')
    }
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--color-blue)',
    fontWeight: 700,
  }

  const textInputs: Array<{
    name: keyof typeof EMPTY_FIELDS
    label: string
    type: string
    placeholder: string
    required?: boolean
  }> = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your@email.com',
      required: true,
    },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(321) 555-0100' },
    {
      name: 'document-type',
      label: 'Document Type',
      type: 'text',
      placeholder: 'Power of attorney, deed, affidavit…',
    },
    {
      name: 'preferred-time',
      label: 'Preferred Date & Time',
      type: 'text',
      placeholder: 'e.g. Thursday morning, or ASAP',
    },
  ]

  return (
    <div>
      {/* Netlify registers this form from the static skeleton at
          public/notary-form.html, which the build scans. No hidden mirror is
          needed here — Netlify never sees React-rendered markup. */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          border: '1.5px solid var(--color-line)',
          borderTop: '4px solid var(--color-orange)',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 24px 60px -32px rgba(20, 24, 90, 0.18)',
        }}
      >
        <input type="hidden" name="form-name" value="notary-appointment" />
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-blue)',
            margin: '0 0 0.5rem',
          }}
        >
          Request a Notary Appointment
        </h3>
        <p
          style={{
            color: 'var(--color-muted)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            margin: '0 0 1.75rem',
          }}
        >
          Notary services are by appointment only. Send us the details and we will confirm a
          time, the fee, and what to bring.
        </p>

        {status === 'success' && (
          <p style={{ color: 'var(--color-orange)', marginBottom: '1rem', fontWeight: 600 }}>
            Thank you — your appointment request is in. We will be in touch shortly to confirm.
          </p>
        )}
        {status === 'error' && (
          <p style={{ color: '#c81e1e', marginBottom: '1rem', fontWeight: 600 }}>
            Something went wrong. Please try again, or call us at (321) 513-0479.
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {textInputs.map((field) => (
            <div
              key={field.name}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}
            >
              <label htmlFor={`notary-${field.name}`} style={labelStyle}>
                {field.label}
              </label>
              <input
                id={`notary-${field.name}`}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={fields[field.name]}
                onChange={handleChange}
                required={field.required}
                className="form-input"
              />
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <label htmlFor="notary-service-format" style={labelStyle}>
              How Would You Like to Meet?
            </label>
            <select
              id="notary-service-format"
              name="service-format"
              value={fields['service-format']}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select one…</option>
              <option value="In our Winter Garden office">In our Winter Garden office</option>
              <option value="Mobile — travel to me in Central Florida">
                Mobile — travel to me in Central Florida
              </option>
              <option value="Online remote notarization">Online remote notarization</option>
              <option value="Not sure — please advise">Not sure — please advise</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <label htmlFor="notary-message" style={labelStyle}>
              Anything Else We Should Know?
            </label>
            <textarea
              id="notary-message"
              name="message"
              rows={4}
              placeholder="Number of signers, location, deadline, or any special requirements…"
              value={fields.message}
              onChange={handleChange}
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Request Appointment'}
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function NotaryPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': URL,
      name: 'Step It Up Strategies — Notary Public',
      description: META_DESCRIPTION,
      url: URL,
      telephone: '+1-321-513-0479',
      email: 'brian@stepitupstrategies.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '504 W Plant St',
        addressLocality: 'Winter Garden',
        addressRegion: 'FL',
        postalCode: '34787',
        addressCountry: 'US',
      },
      parentOrganization: {
        '@type': 'Organization',
        name: 'Step It Up Strategies',
        url: SITE,
      },
      areaServed: [
        { '@type': 'City', name: 'Winter Garden' },
        { '@type': 'City', name: 'Orlando' },
        { '@type': 'AdministrativeArea', name: 'Central Florida' },
        { '@type': 'Country', name: 'United States' },
      ],
      availableService: {
        '@type': 'Service',
        name: 'Notary Public Services',
        serviceType: 'Notary Public',
        description:
          'In-office, mobile and remote online notarization for affidavits, powers of attorney, deeds, estate documents, loan packages, and business filings.',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Notary Public', item: URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
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
            <span style={{ color: 'var(--color-orange)' }}>Notary Public</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-20 items-start">
            <div className="animate-reveal">
              <span className="section-label">Notary Public Duties</span>
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
                A certified, licensed notary public{' '}
                <span style={{ color: 'var(--color-orange)' }}>you can actually get an appointment with</span>
              </h1>
              <span className="brand-rule" style={{ width: '96px', margin: '1.75rem 0' }} />
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '1.15rem',
                  lineHeight: 1.7,
                  maxWidth: '620px',
                  margin: 0,
                }}
              >
                Step It Up Strategies is a commissioned, licensed and bonded notary public serving
                Winter Garden and the greater Central Florida area — and, through remote online
                notarization, signers anywhere in the United States. Signatures witnessed, oaths
                administered, documents sealed, on your schedule.
              </p>

              <div className="flex flex-wrap gap-4" style={{ marginTop: '2.25rem' }}>
                <a href="#notary-contact" className="btn-primary">
                  Request an Appointment
                </a>
                <a href="tel:+13215130479" className="btn-outline">
                  Call (321) 513-0479
                </a>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginTop: '2rem',
                  padding: '0.6rem 1.1rem',
                  background: 'var(--color-orange-soft)',
                  border: '1px solid rgba(245, 130, 32, 0.35)',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#a4500b',
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M12 7v5l3 2" />
                </svg>
                By appointment only
              </div>
            </div>

            {/* Credentials panel */}
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
                Credentials &amp; coverage
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                {[
                  'Commissioned, licensed and bonded notary public',
                  'Office appointments in Winter Garden, Florida',
                  'Mobile service across the Central Florida area',
                  'Remote online notarization nationwide',
                  'Evening and weekend appointments on request',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      color: 'var(--color-ink-soft)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--color-line)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <NotaryBadge width={92} />
                <span
                  style={{
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    color: 'var(--color-muted)',
                  }}
                >
                  Bonded notary public. Verify our bonding through the badge.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── THREE WAYS TO GET NOTARIZED ──────────────────────────────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '720px' }}>
          <SectionHeading label="How It Works" accent="that fits your day">
            Three ways to get notarized
          </SectionHeading>
          <p style={{ color: 'var(--color-ink-soft)', lineHeight: 1.8, fontSize: '1.02rem' }}>
            Come to us, let us come to you, or handle it entirely online. Every option is a full
            notarial act performed by a commissioned Florida notary public.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: '3rem' }}>
          {FORMATS.map((format) => (
            <div
              key={format.label}
              className="service-card"
              style={{
                background: '#fff',
                border: '1.5px solid var(--color-line)',
                borderRadius: '18px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                }}
              >
                {format.label}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                {format.title}
              </h3>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {format.body}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0.25rem 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                {format.points.map((point) => (
                  <li
                    key={point}
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      color: 'var(--color-muted)',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                    }}
                  >
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE NOTARIZE ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-cream)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-20 items-start">
            <div>
              <SectionHeading label="Scope of Work" accent="routinely notarize">
                Documents we
              </SectionHeading>
              <p style={{ color: 'var(--color-ink-soft)', lineHeight: 1.8, fontSize: '1.02rem' }}>
                If your document requires an acknowledgment, a jurat, an oath, or a witnessed
                signature, we can almost certainly handle it. Not sure? Ask — we will tell you
                before you book.
              </p>
              <p
                style={{
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                  fontSize: '0.9rem',
                  marginTop: '1.5rem',
                }}
              >
                A notary public verifies identity and witnesses signatures. We do not draft
                documents, select forms, or provide legal advice — for that, please consult an
                attorney.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    color: 'var(--color-ink-soft)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                  }}
                >
                  <CheckIcon />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '720px' }}>
          <SectionHeading label="The Appointment" accent="start to finish">
            What to expect,
          </SectionHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" style={{ marginTop: '3rem' }}>
          {STEPS.map((step) => (
            <div
              key={step.label}
              style={{
                borderTop: '3px solid var(--color-orange)',
                paddingTop: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-blue-tint)',
                  lineHeight: 1,
                }}
              >
                {step.label}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.12rem',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  margin: '0.75rem 0 0.6rem',
                  lineHeight: 1.3,
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
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-cream)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <SectionHeading label="Questions" accent="asked">
            Frequently
          </SectionHeading>
          <div style={{ marginTop: '2.5rem' }}>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / APPOINTMENT ────────────────────────────────────────── */}
      <section id="notary-contact" style={{ padding: '6rem 2rem' }}>
        <div
          style={{ maxWidth: '1280px', margin: '0 auto' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start"
        >
          <div>
            <SectionHeading label="Book a Notary" accent="an appointment">
              Reach out to make
            </SectionHeading>
            <p
              style={{
                color: 'var(--color-ink-soft)',
                lineHeight: 1.8,
                fontSize: '1.02rem',
                maxWidth: '520px',
              }}
            >
              Notary work is by appointment only. Tell us what you need notarized and how you
              would like to meet, and we will confirm a time — often the same day.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '2.25rem',
              }}
            >
              <a
                href="mailto:brian@stepitupstrategies.com?subject=Notary%20Appointment%20Request"
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
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                brian@stepitupstrategies.com
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
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                (321) 513-0479
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=504+W+Plant+St,+Winter+Garden,+FL+34787"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  color: 'var(--color-blue)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.02em',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  504 W Plant St.
                  <br />
                  Winter Garden, FL 34787
                </span>
              </a>
            </div>

            <div
              style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                background: 'var(--color-blue-tint)',
                borderRadius: '14px',
                borderLeft: '4px solid var(--color-blue)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-blue)',
                  marginBottom: '0.6rem',
                }}
              >
                Before your appointment
              </div>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: '0.92rem',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                Bring valid, unexpired government-issued photo identification for every signer,
                and leave the document unsigned — a notary must witness the signature itself.
              </p>
            </div>

            <p style={{ marginTop: '2.5rem' }}>
              <Link
                to="/services"
                style={{
                  color: 'var(--color-blue)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '2px solid var(--color-orange)',
                  paddingBottom: '0.15rem',
                }}
              >
                Explore our other services →
              </Link>
            </p>
          </div>

          <AppointmentForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
