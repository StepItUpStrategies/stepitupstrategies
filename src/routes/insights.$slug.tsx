import { Link, createFileRoute } from '@tanstack/react-router'

const posts = [
  {
    slug: 'reduce-food-cost-8-percent',
    title: 'How to Reduce Food Cost by 8% Without Sacrificing Quality',
    category: 'Operations',
    summary: 'Proven methods to increase profitability while maintaining guest experience and menu standards.',
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
    summary: 'A staffing strategy that balances service standards with controlled scheduling and labor forecasting.',
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
    <div className="bg-[#F7F3EC] min-h-screen text-blue-950 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-sm text-blue-950 font-semibold hover:text-orange-500"
        >
          ← Back to Insights
        </Link>

        <div className="rounded-[2rem] bg-white p-10 shadow-xl border border-blue-100">
          <span className="inline-block uppercase text-orange-500 text-xs tracking-[0.3em] mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl font-serif text-blue-950 mb-4">{post.title}</h1>
          <p className="text-lg text-blue-800 mb-10">{post.summary}</p>
          <div className="space-y-6 text-blue-800 leading-8">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
