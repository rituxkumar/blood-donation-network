"use client";

import { motion } from "framer-motion";

const FloatingDrops = () => {
  const drops = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: ["0%", "110%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute text-red-500 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          🩸
        </motion.div>
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-red-50 to-white flex items-center px-6 md:px-12">

      {/* BLOOD DROPS */}
      <FloatingDrops />

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:block absolute right-0 top-0 h-full w-[50%]"
      >
        <img
          src="https://images.unsplash.com/photo-1587745416684-47953f16f02f"
          alt="ambulance"
          className="w-full h-full object-cover"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/70 to-white"></div>
      </motion.div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 max-w-xl">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-full mb-6"
        >
          ❤️ Every Drop Counts
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
        >
          Together, We Can{" "}
          <span className="text-red-600">Save Lives</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-lg text-gray-600"
        >
          Donate Blood. <span className="text-red-600 font-semibold">Save Lives.</span>
        </motion.p>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-gray-500"
        >
          Connect instantly with nearby donors during emergencies.
          Your one action can bring hope to someone’s life.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <button className="px-7 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:scale-105 transition">
            Request Blood →
          </button>

          <button className="px-7 text-black py-3 rounded-full border border-gray-300 bg-white/70 backdrop-blur-md hover:border-red-500 hover:text-red-600 transition">
            ❤️ Become a Donor
          </button>
        </motion.div>

        {/* USERS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            <img className="w-9 h-9 rounded-full border-2 border-white" src="https://i.pravatar.cc/40?img=1" />
            <img className="w-9 h-9 rounded-full border-2 border-white" src="https://i.pravatar.cc/40?img=2" />
            <img className="w-9 h-9 rounded-full border-2 border-white" src="https://i.pravatar.cc/40?img=3" />
          </div>

          <p className="text-sm text-gray-600">
            <span className="font-semibold">1000+</span> people already joined
          </p>
        </motion.div>
      </div>

      {/* STATS */}
      <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
        {[
          { title: "1000+", sub: "Donors" },
          { title: "2500+", sub: "Donations" },
          { title: "300+", sub: "Lives Saved" },
          { title: "24/7", sub: "Support" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-md text-center"
          >
            <h2 className="text-lg font-bold text-red-600">{item.title}</h2>
            <p className="text-gray-600 text-xs">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* WAVE */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" className="w-full h-28">
          <path
            fill="#ffe4e6"
            d="M0,256L60,240C120,224,240,192,360,176C480,160,600,160,720,176C840,192,960,224,1080,224C1200,224,1320,192,1380,176L1440,160V320H0Z"
          />
        </svg>
      </div>

    </section>
  );
}