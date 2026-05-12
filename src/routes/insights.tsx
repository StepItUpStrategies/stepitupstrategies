import FeaturedPost from "@/components/Insights/FeaturedPost";
import TrendingCarousel from "@/components/Insights/TrendingCarousel";
import InsightCard from "@/components/Insights/InsightCard";

export default function Insights() {
  const posts = Array(12).fill({
    title: "How to Reduce Food Cost by 8%",
    category: "Operations",
  });

  return (
    <div className="bg-[#F7F3EC] min-h-screen text-blue-900">

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-serif mb-6">Insights & Strategy</h1>
        <p className="text-lg max-w-2xl mb-10">
          Operational intelligence for restaurants, bars, and hospitality brands.
        </p>

        <FeaturedPost />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <TrendingCarousel />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-serif mb-8">Explore Insights</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <InsightCard key={i} post={post} />
          ))}
        </div>
      </section>

      <section className="text-center py-20">
        <h2 className="text-3xl font-serif mb-4">
          Ready to optimize your operation?
        </h2>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600">
          Schedule a Strategy Call →
        </button>
      </section>
    </div>
  );
}
