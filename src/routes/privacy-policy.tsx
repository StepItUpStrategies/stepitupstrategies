import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
})

export default function PrivacyPolicy() {
  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
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

      <section
        style={{
          maxWidth: '880px',
          margin: '0 auto',
          padding: '4rem 2rem 6rem',
        }}
      >
        <span className="section-label" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
          Legal
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--color-blue)',
            margin: '1.25rem 0 1rem',
            letterSpacing: '-0.01em',
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '3rem' }}>
          Last updated: May 12, 2026
        </p>

        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid var(--color-line)',
            padding: '3rem 2.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--color-ink-soft)', lineHeight: 1.75, fontSize: '0.95rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                1. Information We Collect
              </h2>
              <p>
                When you use our website or submit an inquiry through our contact form, we may collect personal information such as your name, email address, company name, and the content of your message. We also collect standard technical data such as browser type, device information, and pages visited through analytics tools.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to respond to your inquiries, provide the consulting services you request, improve our website experience, and communicate with you about our services. We do not sell, trade, or rent your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                3. Cookies &amp; Tracking
              </h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience and gather usage analytics. You can adjust your browser settings to refuse cookies, though some features of the site may not function as intended.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                4. Data Security
              </h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                5. Third-Party Services
              </h2>
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                6. Your Rights
              </h2>
              <p>
                You may request access to, correction of, or deletion of your personal information at any time by contacting us at the email address below. We will respond to your request within a reasonable timeframe.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. Continued use of our website following changes constitutes your acceptance of those changes.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                8. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please contact us at{' '}
                <a
                  href="mailto:brian@stepitupstrategies.com"
                  style={{ color: 'var(--color-orange)', textDecoration: 'none', fontWeight: 500 }}
                >
                  brian@stepitupstrategies.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

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
