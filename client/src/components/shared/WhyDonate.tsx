"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyDonate() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-gradient-to-br from-red-50 to-white dark:from-[#0a0a0a] dark:to-[#111] overflow-hidden transition-colors duration-500">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
            Why Donate <br className="hidden md:block"/> Blood?
          </h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 text-xl font-medium leading-relaxed">
            Every drop of blood you donate can save a life. In emergencies,
            blood is not manufactured — it can only come from generous donors like you.
          </p>

          {/* POINTS */}
          <div className="mt-8 space-y-5">
            <p className="text-gray-700 dark:text-gray-300 font-bold flex items-center gap-3">
              <span className="text-2xl">❤️</span> One donation can save up to 3 lives
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-bold flex items-center gap-3">
              <span className="text-2xl">⏱️</span> Every 2 seconds someone needs blood
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-bold flex items-center gap-3">
              <span className="text-2xl">🏥</span> Helps patients during surgery & accidents
            </p>
          </div>

          {/* CTA */}
          <button className="mt-10 px-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-red-600 to-red-800 shadow-xl shadow-red-200 dark:shadow-none hover:scale-105 active:scale-95 transition cursor-pointer">
            Become a Donor Today
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
            className="rounded-[3rem] shadow-2xl dark:opacity-80"
          />

          {/* overlay glow */}
          <div className="absolute inset-0 rounded-[3rem] bg-red-200 dark:bg-red-950/20 opacity-20 blur-3xl"></div>
        </motion.div>
      </div>

      {/* floating drops */}
      <div className="absolute top-10 left-10 animate-bounce text-red-400 text-3xl">🩸</div>
      <div className="absolute bottom-10 right-10 animate-pulse text-red-500 text-2xl">🩸</div>

    </section>
  );
}