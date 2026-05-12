export default function InsightCard({ post }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-blue-100 hover:border-orange-400 transition">
      <span className="text-xs uppercase text-orange-500">
        {post.category}
      </span>

      <h3 className="mt-2 font-semibold text-blue-900">
        {post.title}
      </h3>
    </div>
  );
}
