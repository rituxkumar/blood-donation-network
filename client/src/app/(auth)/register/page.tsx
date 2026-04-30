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

  const inputStyle =
    "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition";

  // handle input
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // phone change
  const handlePhoneChange = (value: string, index: number) => {
    const updated = [...form.contactNumbers];
    updated[index] = value;
    setForm({ ...form, contactNumbers: updated });
  };

  // add phone
  const addPhone = () => {
    setForm({
      ...form,
      contactNumbers: [...form.contactNumbers, ""],
    });
  };

  // upload image
  const uploadImage = async (file: File) => {
    setUploading(true);
    console.log("img");

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setUploading(false);
    console.log("res", result);

    return result;
  };

  // submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    alert(data.success ? "Signup successful 🚀" : data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 border"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Hospital Account 🏥
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* NAME */}
          <div className="relative">
            <FaUser className="absolute top-4 left-3 text-gray-400" />
            <input
              name="name"
              placeholder="Hospital Name"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

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

          {/* PHONE NUMBERS */}
          <div>
            <label className="text-sm font-medium text-black">
              Contact Numbers
            </label>

            <div className="space-y-2 mt-2">
              {form.contactNumbers.map((phone, i) => (
                <div key={i} className="relative">
                  <FaPhone className="absolute top-4 left-3 text-gray-400" />
                  <input
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value, i)}
                    placeholder="Enter number"
                    className={inputStyle}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addPhone}
              className="text-red-500 text-sm mt-2 hover:underline"
            >
              + Add another number
            </button>
          </div>

          {/* ADDRESS */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-4 left-3 text-gray-400" />
            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* LOCATION */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-4 left-3 text-gray-400" />
            <input
              name="location"
              placeholder="Google Map Link"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm font-medium text-black">
              Upload Hospital Image
            </label>

            <input
              type="file"
              className="mt-2 text-black"
              onChange={async (e: any) => {
                const file = e.target.files[0];
                if (!file) return;

                const uploaded = await uploadImage(file);

                setForm((prev: any) => ({
                  ...prev,
                  image: {
                    url: uploaded.url,
                    public_id: uploaded.fileId,
                  },
                }));
              }}
            />

            {uploading && (
              <p className="text-sm text-gray-500 mt-2 ">Uploading...</p>
            )}

            {form.image?.url && (
              <img
                src={form.image.url}
                className="w-24 h-24 object-cover rounded-xl mt-3 border shadow"
              />
            )}
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-lg"
          >
            {loading ? "Creating..." : "Create Account"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
