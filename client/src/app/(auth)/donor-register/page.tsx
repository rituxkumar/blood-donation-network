"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function DonorRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bloodGroup: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/donor/signup", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 px-4 py-12 transition-colors duration-500">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white dark:bg-white/5 shadow-2xl dark:shadow-none rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-white/5 backdrop-blur-xl"
      >
        <div className="text-center mb-10">
          <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❤️</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
            Become a <span className="text-red-600">Donor</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium italic">Join our network of life-savers today! 🩸</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input icon={<FaUser />} name="name" placeholder="Full Name" onChange={handleChange} />
            <Input icon={<FaEnvelope />} name="email" type="email" placeholder="Email Address" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input icon={<FaLock />} name="password" type="password" placeholder="Password" onChange={handleChange} />
            <Input icon={<FaPhone />} name="phone" placeholder="Phone Number" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <select
                name="bloodGroup"
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-red-500/50 rounded-2xl text-gray-900 dark:text-white appearance-none focus:outline-none transition-all cursor-pointer"
              >
                <option value="" className="dark:bg-gray-900">Select Blood Group</option>
                <option className="dark:bg-gray-900">A+</option>
                <option className="dark:bg-gray-900">B+</option>
                <option className="dark:bg-gray-900">O+</option>
                <option className="dark:bg-gray-900">AB+</option>
                <option className="dark:bg-gray-900">A-</option>
                <option className="dark:bg-gray-900">B-</option>
                <option className="dark:bg-gray-900">O-</option>
                <option className="dark:bg-gray-900">AB-</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
            <Input icon={<FaMapMarkerAlt />} name="location" placeholder="Your Location" onChange={handleChange} />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-200 dark:shadow-none hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Registering..." : "Create Donor Account"}
          </motion.button>

        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10 font-medium">
          Already registered?{" "}
          <Link
            href="/donor-login"
            className="text-red-600 dark:text-red-500 font-bold hover:underline"
          >
            Sign In Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// 🔥 reusable input
const Input = ({ icon, ...props }: any) => (
  <div className="relative group">
    <span className="absolute top-4 left-4 text-gray-400 group-focus-within:text-red-500 transition-colors">{icon}</span>
    <input {...props} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-red-500/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all" />
  </div>
);