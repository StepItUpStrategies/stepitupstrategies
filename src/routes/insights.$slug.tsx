import { Link, createFileRoute } from '@tanstack/react-router'

const posts = [
  {
    slug: 'how-to-reduce-food-cost-without-cutting-quality',
    title: 'How to Reduce Food Cost Without Cutting Quality',
    summary: 'Learn how to reduce food cost with practical restaurant strategies for purchasing, prep, pricing, portion control, and waste reduction.',
    content: [
      'Learn how to reduce food cost with practical restaurant strategies for purchasing, prep, pricing, portion control, and waste reduction.',
    ],
  },
  {
    slug: 'bar-menu-consulting-services-that-sell',
    title: 'Bar Menu Consulting Services That Sell',
    summary: 'Bar menu consulting services help operators build profitable, efficient beverage programs that fit the concept, staff, and guest demand.',
    content: [
      'Bar menu consulting services help operators build profitable, efficient beverage programs that fit the concept, staff, and guest demand.',
    ],
  },
  {
    slug: 'restaurant-concept-development-consultant',
    title: 'Restaurant Concept Development Consultant',
    summary: 'A restaurant concept development consultant helps turn ideas into profitable operations with sharper positioning, smarter systems, and cleaner execution.',
    content: [
      'A restaurant concept development consultant helps turn ideas into profitable operations with sharper positioning, smarter systems, and cleaner execution.',
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
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Navigation */}
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
          to="/insights"
          className="nav-link text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-blue)', textDecoration: 'none' }}
        >
          &larr; Back to Insights
        </Link>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--color-blue)',
            margin: '0 0 1rem',
            letterSpacing: '-0.01em',
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.15rem',
            color: 'var(--color-ink-soft)',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
        >
          {post.summary}
        </p>

        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            border: '1px solid var(--color-line)',
            boxShadow: '0 4px 24px -8px rgba(31, 42, 140, 0.08)',
          }}
        >
          {post.content.map((paragraph: string, index: number) => (
            <p
              key={index}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--color-ink-soft)',
                margin: index === post.content.length - 1 ? 0 : '0 0 1.5rem',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

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
