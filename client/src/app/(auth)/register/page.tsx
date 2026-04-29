"use client";
import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      return setError("All fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");
    console.log("Form Data:", form);

    // 👉 future: API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-red-50 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-2xl border border-gray-100 p-8 rounded-2xl"
      >
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Create Account 🩸
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Join us and start saving lives
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-lg hover:scale-105 transition"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login">
          <span className="text-red-500 cursor-pointer font-medium hover:underline">
            Login
          </span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
}