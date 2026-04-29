"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyDonate() {
  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-br from-red-50 to-white overflow-hidden">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Donate Blood?
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Every drop of blood you donate can save a life. In emergencies,
            blood is not manufactured — it can only come from generous donors like you.
          </p>

          {/* POINTS */}
          <div className="mt-6 space-y-4">
            <p className="text-gray-700">❤️ One donation can save up to 3 lives</p>
            <p className="text-gray-700">⏱️ Every 2 seconds someone needs blood</p>
            <p className="text-gray-700">🏥 Helps patients during surgery & accidents</p>
          </div>

          {/* CTA */}
          <button className="mt-8 px-7 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-lg hover:scale-105 transition">
            Become a Donor
          </button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1615461066159-fea0960485d5"
            alt="blood donation"
            className="rounded-2xl shadow-lg"
          />

          {/* overlay glow */}
          <div className="absolute inset-0 rounded-2xl bg-red-200 opacity-20 blur-xl"></div>
        </motion.div>
      </div>

      {/* floating drops (light animation) */}
      <div className="absolute top-10 left-10 animate-bounce text-red-400 text-3xl">🩸</div>
      <div className="absolute bottom-10 right-10 animate-pulse text-red-500 text-2xl">🩸</div>

    </section>
  );
}