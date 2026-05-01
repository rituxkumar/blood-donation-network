"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const [hospital, setHospital] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [requestForm, setRequestForm] = useState({
    bloodGroup: "",
    units: "",
    urgency: "normal",
  });

  // 🔥 REUSABLE FETCH FUNCTION
  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/request/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      setRequests(data.requests); // ✅ correct
    }
  };

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const updateStatus = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/request/update-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        requestId: id,
        status: newStatus,
      }),
    });

    const data = await res.json();

    if (data.success) {
      // 🔥 instant UI update
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req,
        ),
      );
    } else {
      alert(data.error);
    }
  };

  // 🏥 FETCH HOSPITAL DATA
  useEffect(() => {
    const fetchHospital = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/hospital/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setHospital(data.hospital);
      }
    };

    fetchHospital();
  }, []);

  // 📦 FETCH REQUESTS
  useEffect(() => {
    fetchRequests();
  }, []);

  // 🚀 SUBMIT REQUEST
  const handleRequestSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    setLoader(true);

    const res = await fetch("/api/request/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestForm),
    });

    const data = await res.json();

    if (data.success) {
      setShowModal(false);

      // ⚡ instant UI update
      setRequests((prev) => [data.request, ...prev]);

      // 🔄 sync with DB
      await fetchRequests();

      setRequestForm({
        bloodGroup: "",
        units: "",
        urgency: "normal",
      });
    } else {
      alert(data.error);
    }

    setLoader(false);
  };

  if (!hospital) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard 🏥</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* PROFILE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow p-6 border"
        >
          <div className="flex justify-center">
            <img
              src={hospital.image?.url || "/default.png"}
              className="w-40 h-40 rounded-xl object-cover border"
            />
          </div>

          <h2 className="text-xl font-semibold text-center mt-4">
            {hospital.name}
          </h2>

          <p className="text-gray-500 text-center text-sm">{hospital.email}</p>

          <div className="mt-4 text-sm text-gray-700 space-y-2">
            <p>📍 {hospital.address}</p>
            <p>📞 {hospital.contactNumbers?.join(", ")}</p>
          </div>
        </motion.div>

        {/* REQUESTS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-white rounded-3xl shadow p-6 border"
        >
          <h2 className="text-xl font-semibold mb-6">Blood Requests 🩸</h2>

          {requests.length === 0 ? (
            <p>No requests yet</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req, i) => {
                if (!req) return null;

                return (
                  <div
                    key={i}
                    className="flex justify-between p-4 bg-gray-50 rounded-xl border"
                  >
                    <div>
                      <p className="font-semibold">
                        {req?.bloodGroup || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {req?.units ?? 0} units needed
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        req?.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {req?.status}
                    </span>

                    <div className="flex items-center gap-3">
                      {/* 🔥 BUTTON */}
                      {req?.status === "pending" && (
                        <button
                          onClick={() => updateStatus(req._id, "fulfilled")}
                          className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                        >
                          Mark Done
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          + Request Blood
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Request Blood</h2>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <select
                value={requestForm.bloodGroup}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    bloodGroup: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
              </select>

              <input
                type="number"
                placeholder="Units"
                value={requestForm.units}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    units: Number(e.target.value),
                  })
                }
                className="w-full p-3 border rounded-lg"
              />

              <select
                value={requestForm.urgency}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    urgency: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              >
                <option value="normal">Normal</option>
                <option value="emergency">Emergency</option>
              </select>

              <button className="w-full bg-red-600 text-white py-3 rounded-lg">
                {loader ? "Submitting..." : "Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
