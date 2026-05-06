"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const FloatingDrops = () => {
  const [drops, setDrops] = useState<{ left: string; duration: number }[]>([]);

  useEffect(() => {
    setDrops(
      Array.from({ length: 6 }).map(() => ({
        left: `${Math.random() * 100}%`,
        duration: 4 + Math.random() * 2,
      }))
    );
  }, []);



  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((drop, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: ["0%", "110%"], opacity: [0, 1, 0] }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute text-red-500 text-2xl"
          style={{
            left: drop.left,
          }}
        >
          🩸
        </motion.div>
      ))}
    </div>
  );
};

export default function Hero() {
  const router = useRouter();

  const handleRequestBlood = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 🔥 Check if logged in AND is a hospital
    if (token && role === "hospital") {
      router.push("/dashboard");
    } else {
      router.push("/login"); // 🏥 Go to Hospital Login
    }
  };

  const handleBecomeDonor = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 🔥 Check if logged in AND is a donor
    if (token && role === "donor") {
      router.push("/donor-dashboard");
    } else {
      router.push("/donor-login"); // 🩸 Go to Donor Login
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-red-50 to-white dark:from-[#0a0a0a] dark:via-red-950/10 dark:to-[#0a0a0a] flex items-center px-6 md:px-12 transition-colors duration-500">

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
          className="w-full h-full object-cover grayscale-[20%] dark:grayscale-[50%] brightness-100 dark:brightness-[0.7]"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/70 to-white dark:via-[#0a0a0a]/80 dark:to-[#0a0a0a]"></div>
      </motion.div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 max-w-xl">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex cursor-pointer items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full mb-6 font-bold text-sm"
        >
          ❤️ Every Drop Counts...
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black leading-tight text-gray-900 dark:text-white"
        >
          Together, We Can{" "}
          <span className="text-red-600">Save Lives</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-xl text-gray-600 dark:text-gray-400"
        >
          Donate Blood. <span className="text-red-600 font-bold uppercase tracking-widest">Save Lives.</span>
        </motion.p>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-gray-500 dark:text-gray-500 max-w-lg"
        >
          Connect instantly with nearby donors during emergencies.
          Your one action can bring hope to someone’s life.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={handleRequestBlood}
            className="px-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-red-600 to-red-800 shadow-[0_10px_30px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            Request Blood →
          </button>

          <button
            onClick={handleBecomeDonor}
            className="px-8 py-4 rounded-2xl text-gray-900 dark:text-white font-bold border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md hover:border-red-500 hover:text-red-600 transition cursor-pointer"
          >
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
            <img className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" src="https://i.pravatar.cc/100?img=1" />
            <img className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" src="https://i.pravatar.cc/100?img=2" />
            <img className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" src="https://i.pravatar.cc/100?img=3" />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white">1,000+</span> people already joined
          </p>
        </motion.div>
      </div>

      {/* STATS */}
      <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
        {[
          { title: "1,000+", sub: "Donors" },
          { title: "2,500+", sub: "Donations" },
          { title: "300+", sub: "Lives Saved" },
          { title: "24/7", sub: "Support" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-[1.5rem] shadow-sm border border-white/20 dark:border-white/5 text-center transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-black text-red-600">{item.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* WAVE */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 320" className="w-full h-28">
          <path
            className="fill-red-50 dark:fill-red-950/20 transition-colors duration-500"
            d="M0,256L60,240C120,224,240,192,360,176C480,160,600,160,720,176C840,192,960,224,1080,224C1200,224,1320,192,1380,176L1440,160V320H0Z"
          />
        </svg>
      </div>

    </section>
  );
}