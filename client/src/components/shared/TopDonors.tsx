"use client";

import { motion } from "framer-motion";

const donors = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    units: 25,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Priya Singh",
    location: "Mumbai",
    units: 20,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Amit Verma",
    location: "Lucknow",
    units: 18,
    image: "https://i.pravatar.cc/100?img=13",
  },
  {
    name: "Sneha Gupta",
    location: "Jaipur",
    units: 15,
    image: "https://i.pravatar.cc/100?img=14",
  },
  {
    name: "Rohit Kumar",
    location: "Patna",
    units: 12,
    image: "https://i.pravatar.cc/100?img=15",
  },
];

export default function TopDonors() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white relative">
      
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Top Blood Donors ❤️
        </h2>
        <p className="text-gray-500 mt-3">
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
            whileHover={{ scale: 1.05 }}
            className={`relative p-6 rounded-2xl text-center shadow-lg border border-gray-100 bg-white/80 backdrop-blur-lg ${
              i === 0 ? "ring-2 ring-red-500" : ""
            }`}
          >
            
            {/* TOP BADGE */}
            {i === 0 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
                Top Donor 🏆
              </span>
            )}

            {/* AVATAR */}
            <img
              src={donor.image}
              alt={donor.name}
              className="w-16 h-16 mx-auto rounded-full border-4 border-red-100 shadow"
            />

            {/* NAME */}
            <h3 className="mt-4 font-semibold text-gray-900">
              {donor.name}
            </h3>

            {/* LOCATION */}
            <p className="text-sm text-gray-500">{donor.location}</p>

            {/* UNITS */}
            <p className="mt-3 text-red-600 font-bold text-lg">
              {donor.units} Units
            </p>

            {/* LABEL */}
            <p className="text-xs text-gray-400">Donated</p>
          </motion.div>
        ))}
      </div>

      {/* DECOR */}
      <div className="absolute top-10 left-10 text-red-300 text-3xl animate-bounce">🩸</div>
      <div className="absolute bottom-10 right-10 text-red-400 text-2xl animate-pulse">🩸</div>

    </section>
  );
}