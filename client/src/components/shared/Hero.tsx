"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="w-full min-h-[85vh] flex items-center justify-between px-10 bg-gradient-to-br from-white to-red-50">
      
      {/* LEFT CONTENT */}
      <div className="max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-gray-900 leading-tight"
        >
          Save Lives, <span className="text-red-600">Donate Blood</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 text-lg"
        >
          Connect instantly with nearby donors during emergencies. 
          Your one action can save someone's life.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex gap-4"
        >
          <button className="px-6 py-3 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition">
            Request Blood
          </button>

          <button className="px-6 py-3 border border-gray-300 rounded-full hover:border-red-600 hover:text-red-600 transition">
            Become Donor
          </button>
        </motion.div>
      </div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966487.png"
          alt="Ambulance"
          className="w-[400px]"
        />
      </motion.div>

    </section>
  );
};

export default Hero;