import { Link, createFileRoute } from '@tanstack/react-router'

const posts = [
  {
    slug: 'reduce-food-cost-8-percent',
    title: 'How to Reduce Food Cost by 8% Without Sacrificing Quality',
    category: 'Operations',
    summary:
      'Proven methods to increase profitability while maintaining guest experience and menu standards.',
    content: [
      'Restaurants can improve margins by focusing on accurate portion control, supplier negotiation, and real-time inventory insights. This article shows practical steps to lower cost without reducing quality.',
      'Start with a simple audit of your top-selling items, track inventory shrinkage, and align purchasing with daily covers. The most reliable savings come when teams follow consistent operating procedures.',
      'Use menu mix analysis to identify high-cost items and redesign plates around core ingredients. Small menu changes can drive meaningful savings while preserving guest satisfaction.',
    ],
  },
  {
    slug: 'staffing-playbook-to-lower-labor-costs',
    title: 'Staffing Playbook to Lower Labor Costs',
    category: 'People',
    summary:
      'A staffing strategy that balances service standards with controlled scheduling and labor forecasting.',
    content: [
      'Labor is one of the largest controllable expenses in hospitality. The right staffing playbook includes role definitions, budgeted labor targets, and data-driven scheduling.',
      'Build staffing plans around shifts, demand patterns, and experience levels. Train leaders to track labor performance daily and reassign resources before wage overruns occur.',
    ],
  },
]

export const Route = createFileRoute('/insights/$slug')({
  component: InsightPost,
  loader: async ({ params }) => {
    const post = posts.find((item) => item.slug === params.slug)
    if (!post) {
      throw new Error('Insight not found')
    }
    return post
  },
})

export default function InsightPost() {
  const post = Route.useLoaderData()

  return (
    <div
      style={{
        background: 'var(--color-cream)',
        minHeight: '100vh',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Header with logo */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-line)',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '7rem',
        }}
      >
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Step It Up Strategies"
            style={{ height: '66px', width: 'auto', display: 'block' }}
          />
        </a>
        <Link
          to="/insights"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-blue)',
            textDecoration: 'none',
          }}
        >
          ← Back to Insights
        </Link>
      </header>

      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div
          style={{
            background: '#fff',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1.5px solid var(--color-line)',
            boxShadow: '0 24px 60px -32px rgba(20, 24, 90, 0.18)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-orange)',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            {post.category}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--color-blue)',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              lineHeight: 1.75,
              color: 'var(--color-ink-soft)',
              marginBottom: '2.5rem',
            }}
          >
            {post.summary}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'var(--color-ink-soft)',
                  margin: 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
