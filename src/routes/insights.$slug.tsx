import { Link, createFileRoute } from '@tanstack/react-router'
import { getArticleBySlug } from '../server/articles'

export const Route = createFileRoute('/insights/$slug')({
  component: InsightPost,
  loader: async ({ params }) => {
    return getArticleBySlug({ data: params.slug })
  },
})

export default function InsightPost() {
  const post = Route.useLoaderData()

  return (
    <div className="min-h-screen text-blue-950 px-6 py-16" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-sm text-blue-950 font-semibold hover:text-orange-500"
        >
          ← Back to Insights
        </Link>

        <div className="rounded-[2rem] bg-white shadow-xl border border-blue-100 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              height: '360px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div className="p-10">
            <h1 className="text-4xl font-serif text-blue-950 mb-4">{post.title}</h1>
            <p className="text-lg text-blue-800 mb-10 italic">{post.summary}</p>
            <div
              className="article-content space-y-6 text-blue-800 leading-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
