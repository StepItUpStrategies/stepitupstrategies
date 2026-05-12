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

import { useEffect } from "react";

export default function Insights() {

  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById("soro-blog");

      if (!container) return;

      container.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://app.trysoro.com/api/embed/3cc0116b-c696-4d4d-8f15-cdd7c40c1db6";
      script.async = true;

      container.appendChild(script);
    }, 1000);
  }, []);

  return (
    <div className="bg-[#F7F3EC] min-h-screen text-blue-900">

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-serif mb-6">
          Insights & Strategy
        </h1>

        <p className="text-lg max-w-2xl mb-10">
          Operational intelligence for restaurants, bars, and hospitality brands.
        </p>

        <div className="mt-12">
          <div id="soro-blog"></div>
        </div>
      </section>

    </div>
  );
}
