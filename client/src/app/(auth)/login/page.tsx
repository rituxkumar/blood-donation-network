"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition";

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      // store token
      localStorage.setItem("token", data.token);

      alert("Login successful 🚀");

      // redirect
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Hospital Login 🔐
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
          {/* EMAIL */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={inputStyle}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-4 right-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
  Don’t have an account?{" "}
  <Link
    href="/register"
    className="text-red-600 font-semibold hover:underline"
  >
    Register
  </Link>
</p>
      </motion.div>
    </div>
  );
}