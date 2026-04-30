"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();

  const [hospital, setHospital] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    // TEMP DATA
    setHospital({
      name: "Paras Hospital",
      email: "paras@gmail.com",
      address: "Patna",
      contactNumbers: ["9876543210", "9123456780"],
      image: {
        url: "https://ik.imagekit.io/ritu/blood_TH8mcWcrN.png",
      },
    });

    setRequests([
      { bloodGroup: "A+", units: 2, status: "pending" },
      { bloodGroup: "O-", units: 1, status: "fulfilled" },
    ]);
  }, []);

  if (!hospital) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 p-6 md:p-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Dashboard 🏥
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100"
        >
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={hospital.image?.url}
              className="w-64 h-64 rounded-2xl  shadow-md border"
            />
          </div>

          {/* NAME */}
          <h2 className="text-xl font-semibold text-center mt-5 text-gray-900">
            {hospital.name}
          </h2>

          <p className="text-gray-500 text-center text-sm">
            {hospital.email}
          </p>

          {/* DETAILS */}
          <div className="mt-5 space-y-2 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              📍 <span>{hospital.address}</span>
            </p>

            <p className="flex items-center gap-2">
              📞 <span>{hospital.contactNumbers.join(", ")}</span>
            </p>
          </div>
        </motion.div>

        {/* REQUEST SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Blood Requests 🩸
          </h2>

          {requests.length === 0 ? (
            <p className="text-gray-500">No requests yet</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl border border-gray-200"
                >
                  {/* LEFT */}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {req.bloodGroup}
                    </p>
                    <p className="text-sm text-gray-500">
                      {req.units} units needed
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      req.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}