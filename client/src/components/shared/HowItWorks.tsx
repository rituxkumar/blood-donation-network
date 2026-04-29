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
    <section className="py-20 px-6 md:px-12 bg-white relative">
      
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="text-gray-500 mt-3">
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
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8 text-center relative overflow-hidden group"
          >
            
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-red-100 to-transparent"></div>

            {/* ICON */}
            <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-full bg-red-100 text-red-600 shadow-md group-hover:scale-110 transition">
              {step.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-gray-900">
              {step.title}
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-2">
              {step.desc}
            </p>

            {/* STEP NUMBER */}
            <span className="absolute top-4 right-4 text-gray-200 text-5xl font-bold">
              {i + 1}
            </span>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM DECOR (optional premium touch) */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-red-50 to-transparent"></div>
    </section>
  );
}