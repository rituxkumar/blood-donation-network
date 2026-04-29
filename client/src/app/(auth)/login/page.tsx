"use client";
import Link from "next/link";

import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-red-50 px-4">
      
      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-2xl border border-gray-100 p-8 rounded-2xl"
      >
        
        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Welcome Back ❤️
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Login to continue saving lives
        </p>

        {/* FORM */}
        <form className="mt-6 space-y-5">
          
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right text-sm text-red-500 cursor-pointer hover:underline">
            Forgot password?
          </div>

          {/* LOGIN BUTTON */}
          <button 
            type="submit"
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-lg hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* GOOGLE BUTTON */}
        <button className="w-full border border-gray-200 py-3 rounded-lg bg-white hover:bg-gray-100 transition font-medium text-gray-700">
          Continue with Google
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/register"><span className="text-red-500 cursor-pointer font-medium hover:underline">
            Register
          </span></Link>
          
        </p>
      </motion.div>
    </div>
  );
}