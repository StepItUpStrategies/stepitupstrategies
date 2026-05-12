import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Step It Up Strategies' },
    ],
  }),
})

function PrivacyPolicy() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-blue-deep)',
        color: 'rgba(255,255,255,0.88)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          width: '100%',
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-orange-light)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.65rem 1.5rem',
              border: '1.5px solid var(--color-orange-light)',
              borderRadius: '8px',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-orange-light)'
              e.currentTarget.style.color = 'var(--color-blue-deep)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-orange-light)'
            }}
          >
            &larr; Back to Main Page
          </a>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#fff',
            marginBottom: '1.5rem',
          }}
        >
          Privacy Policy
        </h1>

        <div
          style={{
            flex: 1,
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            minHeight: '80vh',
          }}
        >
          <iframe
            src="/Step_It_Up_Strategies_Privacy_Policy.pdf"
            title="Step It Up Strategies Privacy Policy"
            style={{
              width: '100%',
              height: '80vh',
              border: 'none',
              display: 'block',
            }}
          />
        </div>

        <div
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          &copy; {new Date().getFullYear()} Step It Up Strategies. All rights reserved.
        </div>
      </div>
    </div>
  )
}
