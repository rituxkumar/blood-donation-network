"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function DonorLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500";

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/donor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "donor");
      localStorage.setItem("bloodGroup", data.donor.bloodGroup);
      router.push("/donor-dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 px-4 transition-colors duration-500">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-white/5 shadow-2xl dark:shadow-none rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/5 backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🩸</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Donor Login
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium italic">Welcome back, Hero! ❤️</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative group">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-red-500/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all"
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute top-4 left-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-red-500/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-200 dark:shadow-none hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 font-medium">
          New to the network?{" "}
          <Link
            href="/donor-register"
            className="text-red-600 dark:text-red-500 font-bold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}