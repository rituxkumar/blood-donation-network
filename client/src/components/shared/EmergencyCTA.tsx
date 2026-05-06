"use client";

import { motion } from "framer-motion";

export default function EmergencyCTA() {
  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">

      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-red-500 opacity-20 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        
        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Need Blood <span className="text-white/80">Urgently?</span>
        </h2>

        {/* SUBTEXT */}
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          Don’t wait. Send a request instantly and connect with nearby donors in seconds.
          Your life-saving help is just one click away.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          
          {/* PRIMARY CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-white text-red-600 font-semibold shadow-lg hover:bg-gray-100 transition cursor-pointer"
          >
            🚑 Request Blood Now
          </motion.button>

          {/* SECONDARY CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 rounded-full border border-white/50 text-white backdrop-blur-md hover:bg-white/10 transition cursor-pointer"
          >
            ❤️ Become a Donor
          </motion.button>
        </div>

        {/* TRUST LINE */}
        <p className="mt-6 text-sm text-white/70">
          Trusted by 1000+ donors across the community
        </p>
      </motion.div>

      {/* FLOATING BLOOD ICONS */}
      <div className="absolute top-10 left-10 text-3xl animate-bounce">🩸</div>
      <div className="absolute bottom-10 right-10 text-2xl animate-pulse">🩸</div>

    </section>
  );
}