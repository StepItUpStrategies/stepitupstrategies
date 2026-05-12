import { motion } from "framer-motion";

export default function TrendingCarousel() {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Trending Now →</h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {[1,2,3,4].map((item) => (
          <motion.div
            key={item}
            whileHover={{ y: -4 }}
            className="min-w-[260px] bg-white p-6 rounded-xl border border-blue-100"
          >
            <span className="text-xs text-orange-500 uppercase">Strategy</span>
            <h3 className="mt-2 font-semibold">
              Bar Design Mistakes That Cost You Revenue
            </h3>
          </motion.div>
        ))}
      </div>
    </>
  );
}
