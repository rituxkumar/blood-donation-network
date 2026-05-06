"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contactNumbers: [""],
    address: "",
    location: "",
    image: null as any,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string, index: number) => {
    const updated = [...form.contactNumbers];
    updated[index] = value;
    setForm({ ...form, contactNumbers: updated });
  };

  const addPhone = () => {
    setForm({
      ...form,
      contactNumbers: [...form.contactNumbers, ""],
    });
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setUploading(false);
    return result;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
        alert("Signup successful 🚀");
    } else {
        alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 px-4 py-16 transition-colors duration-500">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-white/5 shadow-2xl dark:shadow-none rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-white/5 backdrop-blur-xl"
      >
        <div className="text-center mb-10">
          <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏥</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
            Register <span className="text-red-600">Hospital</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium italic">Join our network to connect with life-savers 🩸</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AuthInput icon={<FaUser />} name="name" placeholder="Hospital Name" onChange={handleChange} />
            <AuthInput icon={<FaEnvelope />} name="email" type="email" placeholder="Official Email" onChange={handleChange} />
          </div>

          <div className="relative group">
            <FaLock className="absolute top-4 left-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Secure Password"
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-red-500/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* PHONE NUMBERS */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-2">
              Contact Numbers
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.contactNumbers.map((phone, i) => (
                <AuthInput
                  key={i}
                  icon={<FaPhone />}
                  value={phone}
                  onChange={(e: any) => handlePhoneChange(e.target.value, i)}
                  placeholder={`Phone #${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addPhone}
              className="text-red-600 dark:text-red-500 text-xs font-bold hover:underline ml-2"
            >
              + Add another line
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AuthInput icon={<FaMapMarkerAlt />} name="address" placeholder="Full Address" onChange={handleChange} />
            <AuthInput icon={<FaMapMarkerAlt />} name="location" placeholder="Google Maps Link (Optional)" onChange={handleChange} />
          </div>

          {/* IMAGE */}
          <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-dashed border-gray-200 dark:border-white/10">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 block mb-4">
              Hospital Profile Image
            </label>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <input
                type="file"
                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-red-50 file:text-red-700 dark:file:bg-red-950 dark:file:text-red-300 cursor-pointer"
                onChange={async (e: any) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const uploaded = await uploadImage(file);
                  setForm((prev: any) => ({
                    ...prev,
                    image: { url: uploaded.url, public_id: uploaded.fileId },
                  }));
                }}
              />

              {uploading && (
                <div className="flex items-center gap-2 text-xs text-red-500 font-bold animate-pulse">
                  <span>Uploading...</span>
                </div>
              )}

              {form.image?.url && (
                <div className="relative">
                  <img
                    src={form.image.url}
                    className="w-20 h-20 object-cover rounded-2xl border-2 border-red-500/50 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full text-[8px]">
                    ✓
                  </div>
                </div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-200 dark:shadow-none hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create Official Account"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10 font-medium">
          Already a partner?{" "}
          <Link
            href="/login"
            className="text-red-600 dark:text-red-500 font-bold hover:underline"
          >
            Login to Portal
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// 🔥 reusable input helper
const AuthInput = ({ icon, ...props }: any) => (
  <div className="relative group">
    <span className="absolute top-4 left-4 text-gray-400 group-focus-within:text-red-500 transition-colors">{icon}</span>
    <input {...props} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-red-500/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all" />
  </div>
);
