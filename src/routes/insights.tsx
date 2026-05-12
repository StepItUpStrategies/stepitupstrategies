import { Link, createFileRoute } from '@tanstack/react-router'
import FeaturedPost from '@/components/Insights/FeaturedPost'
import TrendingCarousel from '@/components/Insights/TrendingCarousel'
import InsightCard from '@/components/Insights/InsightCard'

const posts = [
  {
    slug: 'reduce-food-cost-8-percent',
    title: 'How to Reduce Food Cost by 8%',
    category: 'Operations',
  },
  {
    slug: 'staffing-playbook-to-lower-labor-costs',
    title: 'Staffing Playbook to Lower Labor Costs',
    category: 'People',
  },
  {
    slug: 'menu-engineering-for-higher-margin',
    title: 'Menu Engineering for Higher Margin',
    category: 'Finance',
  },
  {
    slug: 'revenue-boosting-hospitality-layouts',
    title: 'Revenue-Boosting Hospitality Layouts',
    category: 'Design',
  },
  {
    slug: 'smart-cash-flow-for-restaurants',
    title: 'Smart Cash Flow for Restaurants',
    category: 'Accounting',
  },
  {
    slug: 'brand-positioning-for-enterprise-growth',
    title: 'Brand Positioning for Enterprise Growth',
    category: 'Strategy',
  },
]

export const Route = createFileRoute('/insights')({
  component: Insights,
})

export default function Insights() {
  return (
    <div className="bg-[#F7F3EC] min-h-screen text-blue-950">
      <section className="bg-[#F7F3EC] px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="inline-block uppercase text-orange-500 tracking-[0.24em] text-sm mb-6">
              Insights & Strategy
            </p>
            <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-6 text-blue-950">
              Frameworks for smarter hospitality operations.
            </h1>
            <p className="text-lg text-blue-800 max-w-3xl mb-8">
              Actionable articles, workflows, and financial guidance designed to help restaurants, retail, and entertainment brands grow profitably.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/insights"
                className="inline-flex items-center justify-center rounded-full bg-blue-950 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
              >
                View All Insights
              </Link>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-orange-500 bg-transparent px-8 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition"
              >
                Schedule a Strategy Call
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-blue-100">
            <FeaturedPost />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <TrendingCarousel />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between gap-6 mb-8 md:flex-row flex-col">
          <div>
            <p className="text-orange-500 uppercase text-sm tracking-[0.24em] mb-2">Explore Insights</p>
            <h2 className="text-3xl font-serif text-blue-950">Latest strategy, finance, and operations stories.</h2>
          </div>
          <Link
            to="/insights"
            className="inline-flex items-center justify-center rounded-full border border-blue-950 px-5 py-3 text-sm font-semibold text-blue-950 hover:bg-blue-50 transition"
          >
            See all posts
          </Link>
        </div>

  <div className="mt-12">
  <div id="soro-blog"></div>
</div>

      </section>

      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-orange-500 uppercase tracking-[0.24em] text-sm mb-4">Need a custom plan?</p>
          <h2 className="text-3xl md:text-4xl font-serif text-blue-950 mb-4">
            Build an operation that scales reliably.
          </h2>
          <p className="text-blue-800 mb-8">
            Our insights are a preview of how we help operators turn systems into measurable growth.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition"
          >
            Book a Strategy Call
          </Link>
        </div>
      </section>
    </div>
  )
}
