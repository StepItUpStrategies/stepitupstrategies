import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
})

export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#F7F3EC', minHeight: '100vh', color: '#1e293b' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#1e293b',
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: '2rem',
          }}
        >
          &larr; Back to Home
        </a>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2.5rem' }}>
          Step It Up Strategies &mdash; Business Management &amp; Consulting<br />
          Last updated: May 12, 2026
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '1rem', color: '#334155' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            When you use our website or submit an inquiry through our contact form, we may collect personal information such as your name, email address, company name, and the content of your message.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            We also automatically collect certain technical information, including your browser type, device information, and pages visited, through standard analytics tools.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We use the information we collect to respond to your inquiries, provide the consulting services you request, improve our website experience, and communicate with you about our services. We do not sell, trade, or rent your personal information to third parties.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            3. Cookies &amp; Tracking
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytical data. You can adjust your browser settings to refuse cookies, though doing so may limit certain site functionality.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            4. Data Security
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            5. Third-Party Services
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies separately.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            6. Your Rights
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            You may request access to, correction of, or deletion of your personal data at any time by contacting us.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            7. Changes to This Policy
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the site after changes constitutes acceptance of the revised policy.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' }}>
            8. Contact
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:brian@stepitupstrategies.com" style={{ color: '#c2410c' }}>
              brian@stepitupstrategies.com
            </a>.
          </p>
        </div>

        <footer style={{ marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Step It Up Strategies. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
