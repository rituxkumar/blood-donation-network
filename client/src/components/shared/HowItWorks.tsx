"use client";

import { motion } from "framer-motion";
import { FaSearch, FaPaperPlane, FaHeartbeat } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={28} />,
    title: "Find Donors",
    desc: "Search for nearby blood donors based on your location instantly.",
  },
  {
    icon: <FaPaperPlane size={28} />,
    title: "Send Request",
    desc: "Send emergency blood requests with just one click.",
  },
  {
    icon: <FaHeartbeat size={28} />,
    title: "Save Lives",
    desc: "Connect quickly and help save lives in critical situations.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#0a0a0a] relative transition-colors duration-500">
      
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium text-lg">
          Simple steps to save lives in emergencies
        </p>
      </div>

      {/* STEPS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-xl dark:shadow-none rounded-[2.5rem] p-10 text-center relative overflow-hidden group transition-all"
          >
            
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-red-100 to-transparent dark:from-red-900/10 dark:to-transparent"></div>

            {/* ICON */}
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-lg group-hover:scale-110 transition-transform">
              {step.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-3">
              {step.title}
            </h3>

            {/* DESC */}
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
              {step.desc}
            </p>

            {/* STEP NUMBER */}
            <span className="absolute -bottom-4 -right-2 text-gray-100 dark:text-white/5 text-8xl font-black italic select-none">
              {i + 1}
            </span>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM DECOR */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-red-50 to-transparent dark:from-red-950/10 dark:to-transparent"></div>
    </section>
  );
}