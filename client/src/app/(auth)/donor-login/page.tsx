"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";

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
      router.push("/donor-dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-red-600">
          Donor Login ❤️
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}