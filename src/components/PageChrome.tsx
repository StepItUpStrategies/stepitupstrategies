// Shared nav + footer for interior pages (service detail, service index).
// The homepage keeps its own scroll-aware nav; these are the static variants.
import { Link } from '@tanstack/react-router'
import { SERVICES } from '../data/services'

const HOME_LINKS: Array<[string, string]> = [
  ['Services', '/#services'],
  ['Insights', '/insights'],
  ['Expertise', '/#expertise'],
  ['Financial', '/#financial'],
  ['About', '/#about'],
]

export function SiteHeader() {
  return (
    <nav
      className="px-6 md:px-8 flex items-center justify-between h-28 md:h-36 gap-4"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-line)',
      }}
    >
      <a
        href="/"
        className="flex items-center no-underline shrink-0"
        aria-label="Step It Up Strategies — home"
      >
        <span className="logo-lockup">
          {/* Served pre-cropped to the artwork bounds (the source PNG has large transparent
              bands) and letterboxed inside a fixed box, so the mark fills the banner height
              without changing the lockup's footprint. Mirrors BrandLogo on the homepage. */}
          <img
            src="/.netlify/images?url=/logo.png&w=880&h=222&fit=cover&q=80"
            alt="Step It Up Strategies"
            width={880}
            height={222}
            className="h-[88px] w-[192px] md:h-[120px] md:w-[304px]"
            style={{ objectFit: 'contain', display: 'block' }}
          />
          <span className="logo-tagline">
            BUSINESS ADVISORS &amp; ACCOUNTING SPECIALISTS
          </span>
        </span>
      </a>

      <div className="hidden lg:flex gap-9 items-center">
        {HOME_LINKS.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="nav-link no-underline text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--color-blue)' }}
          >
            {label}
          </a>
        ))}
        <a
          href="/#contact"
          className="btn-primary"
          style={{ fontSize: '0.72rem', padding: '0.7rem 1.4rem' }}
        >
          Get in Touch
        </a>
      </div>

      <a
        href="/#services"
        className="lg:hidden nav-link no-underline text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
        style={{ color: 'var(--color-blue)' }}
      >
        ← All Services
      </a>
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer
      style={{
        background: 'var(--color-blue-deep)',
        color: 'rgba(255,255,255,0.78)',
        padding: '4rem 2rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
          <div>
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
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* No tagline in the footer, and served pre-cropped to the artwork bounds
                    so the mark fills the white card rather than the source PNG's
                    transparent bands. The top nav keeps the full lockup. */}
                <img
                  src="/.netlify/images?url=/logo.png&w=880&h=222&fit=cover&q=80"
                  alt="Step It Up Strategies"
                  width={880}
                  height={222}
                  loading="lazy"
                  className="h-[62px] w-[246px] sm:h-[84px] sm:w-[333px]"
                  style={{ objectFit: 'contain', display: 'block' }}
                />
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
                marginTop: '1.25rem',
              }}
              className="w-[270px] sm:w-[357px] max-w-full text-center"
            >
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=504+W+Plant+St,+Winter+Garden,+FL+34787"
                target="_blank"
                rel="noopener noreferrer"
                className="pulse-address"
                title="Get driving directions to our office"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                504 W Plant St. Winter Garden, FL 34787
              </a>
            </address>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-orange-light)',
                marginBottom: '1.25rem',
              }}
            >
              Our Services
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    lineHeight: 1.9,
                  }}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '2.5rem',
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
            }}
          >
            Privacy Policy
          </a>
          <span className="brand-tagline" style={{ color: 'var(--color-orange-light)' }}>
            Clarify <span className="dot" style={{ background: 'var(--color-orange-light)' }} />{' '}
            Prioritize <span className="dot" style={{ background: 'var(--color-orange-light)' }} />{' '}
            Grow
          </span>
        </div>
      </div>
    </footer>
  )
}
