"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DonorDashboard() {
  const router = useRouter();

  const [requests, setRequests] = useState<any[]>([]);
  const [donor, setDonor] = useState<any>(null);

  // 🔐 auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/donor-login");
  }, []);

  // 🧑 fetch donor data (IMPORTANT)
  useEffect(() => {
    const fetchDonor = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/donor/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setDonor(data.donor);
      }
    };

    fetchDonor();
  }, []);

  // 📦 fetch requests (optional)
  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch("/api/request/all");
      const data = await res.json();

      if (data.success) {
        setRequests(data.requests);
      }
    };

    fetchRequests();
  }, []);

  // 🔥 toggle
  const toggleAvailability = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/donor/toggle", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      setDonor((prev: any) => ({
        ...prev,
        isAvailable: data.isAvailable,
      }));
    }
  };

  if (!donor) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-6">

      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Donor Dashboard ❤️
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            {donor.name}
          </h2>

          <p className="text-gray-600 mt-2">
            Blood Group:{" "}
            <span className="text-red-600 font-bold">
              {donor.bloodGroup}
            </span>
          </p>

          <p className="text-gray-600">📍 {donor.location}</p>

          {/* ✅ TOGGLE BUTTON */}
          <button
            onClick={toggleAvailability}
            className={`mt-4 w-full py-2 rounded-xl text-white font-medium transition ${
              donor.isAvailable
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {donor.isAvailable ? "🟢 Available" : "🔴 Not Available"}
          </button>
        </motion.div>

        {/* REQUEST LIST */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-white p-6 rounded-3xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">
            Blood Requests 🩸
          </h2>

          {requests.length === 0 ? (
            <p>No requests available</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-xl flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{req?.bloodGroup}</p>
                    <p className="text-sm">
                      {req?.units ?? 0} units needed
                    </p>
                  </div>

                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    Donate
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}