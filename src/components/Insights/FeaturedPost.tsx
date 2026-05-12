import { motion } from "framer-motion";

export default function FeaturedPost() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-8 rounded-2xl border border-blue-100 shadow-md"
    >
      <span className="text-orange-500 text-sm uppercase">Featured</span>

      <h2 className="text-3xl font-serif mt-4">
        How to Structure a High-Profit Restaurant Operation
      </h2>

      <p className="text-blue-700 mt-3">
        A framework designed for operators looking to scale efficiently.
      </p>
    </motion.div>
  );
}
