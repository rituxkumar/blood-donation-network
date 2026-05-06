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

  const inputStyle =
    "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition";

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
    <div className= "text-black min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-white px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Become a Donor ❤️
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* NAME */}
          <Input icon={<FaUser />} name="name" placeholder="Full Name" onChange={handleChange} />

          {/* EMAIL */}
          <Input icon={<FaEnvelope />} name="email" placeholder="Email" onChange={handleChange} />

          {/* PASSWORD */}
          <Input icon={<FaLock />} name="password" type="password" placeholder="Password" onChange={handleChange} />

          {/* PHONE */}
          <Input icon={<FaPhone />} name="phone" placeholder="Phone Number" onChange={handleChange} />

          {/* BLOOD GROUP */}
          <select
            name="bloodGroup"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>

          {/* LOCATION */}
          <Input icon={<FaMapMarkerAlt />} name="location" placeholder="Location" onChange={handleChange} />

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-lg cursor-pointer"
          >
            {loading ? "Creating..." : "Register as Donor"}
          </motion.button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-4">
          Already a donor?{" "}
          <span
            onClick={() => router.push("/donor-login")}
            className="text-red-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

// 🔥 reusable input
const Input = ({ icon, ...props }: any) => (
  <div className="relative">
    <span className="absolute top-4 left-3 text-gray-400">{icon}</span>
    <input {...props} className="w-full pl-10 pr-4 py-3 border rounded-xl" />
  </div>
);