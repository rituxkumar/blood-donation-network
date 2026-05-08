"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TopDonors() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDonors = async () => {
      try {
        const res = await fetch("/api/donor/top");
        const data = await res.json();
        if (data.success) {
          setDonors(data.donors);
        }
      } catch (error) {
        console.error("Failed to fetch top donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDonors();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-[#0a0a0a] text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-64 bg-gray-200 dark:bg-white/5 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-100 dark:bg-white/5 rounded-full"></div>
        </div>
      </section>
    );
  }

  if (donors.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#0a0a0a] relative transition-colors duration-500">
      
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
          Top Blood Donors ❤️
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium text-lg">
          Heroes who have saved lives through their donations
        </p>
      </div>

      {/* DONORS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        
        {donors.map((donor, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`relative p-8 rounded-[2.5rem] text-center shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-xl transition-all ${
              i === 0 ? "ring-4 ring-red-500 dark:ring-red-600 shadow-red-100 dark:shadow-none" : ""
            }`}
          >
            
            {/* TOP BADGE */}
            {i === 0 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Top Donor 🏆
              </span>
            )}

            {/* AVATAR (FIRST LETTER LOGO) */}
            <div className="w-20 h-20 mx-auto rounded-full border-4 border-red-500/20 dark:border-red-500/30 shadow-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-3xl select-none">
              {donor.name ? donor.name.charAt(0).toUpperCase() : "D"}
            </div>

            {/* NAME */}
            <h3 className="mt-5 font-black text-gray-900 dark:text-white uppercase tracking-widest text-[10px]">
              {donor.name}
            </h3>

            {/* LOCATION */}
            <p className="text-xs text-yellow-400 font-bold mt-1 uppercase">{donor.location}</p>

            {/* UNITS */}
            <p className="mt-4 text-red-600 dark:text-red-500 font-black text-2xl ">
              {donor.totalUnitsDonated || 0}
            </p>

            {/* LABEL */}
            <p className="text-[10px] text-white font-bold uppercase tracking-tighter">Units Donated</p>

            {/* VIEW HISTORY BUTTON */}
            <Link 
              href={`/donor-history?donorId=${donor._id}`}
              className="mt-6 block w-full py-2.5 rounded-2xl bg-red-50 hover:bg-red-600 dark:bg-white/5 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-transparent hover:shadow-lg shadow-red-100 dark:shadow-none"
            >
              View History 🩸
            </Link>
          </motion.div>
        ))}
      </div>

      {/* DECOR */}
      <div className="absolute top-10 left-10 text-red-300 dark:text-red-900/20 text-3xl animate-bounce">🩸</div>
      <div className="absolute bottom-10 right-10 text-red-400 dark:text-red-900/20 text-2xl animate-pulse">🩸</div>

    </section>
  );
}