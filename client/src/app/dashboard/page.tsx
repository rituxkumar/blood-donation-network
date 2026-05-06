"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUserCheck,
} from "react-icons/fa";

let socket: any;

export default function Dashboard() {
  const router = useRouter();
  const { theme } = useTheme();

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

    // 🔥 Initialize Socket
    socket = io("http://localhost:5000");

    return () => {
      socket.disconnect();
    };
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

      // 🔥 REAL-TIME NOTIFICATION
      if (socket) {
        socket.emit("new-request", {
          bloodGroup: data.request.bloodGroup,
          hospitalName: hospital.name,
          units: data.request.units,
        });
      }
    } else {
      alert(data.error);
    }

    setLoader(false);
  };

  if (!hospital) return null;

  // 📊 STATS CALCULATION
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    fulfilled: requests.filter((r) => r.status === "fulfilled").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
  };

  // 📈 CHART DATA CALCULATION
  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
  const chartData = bloodGroups
    .map((group) => ({
      name: group,
      requested: requests.filter((r) => r.bloodGroup === group).length,
      fulfilled: requests.filter(
        (r) => r.bloodGroup === group && r.status === "fulfilled",
      ).length,
    }))
    .filter((d) => d.requested > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-red-950/10 p-6 md:p-10 transition-colors duration-500">
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          Hospital Dashboard 🏥
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-18 md:px-6 py-3 rounded-xl hover:bg-red-700 cursor-pointer shadow-lg shadow-red-200 dark:shadow-none font-bold transition flex items-center gap-2 "
        >
          + Create New Request
        </button>
      </div>

      {/* 🚀 STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Requests",
            val: stats.total,
            icon: <FaClipboardList />,
            color: "bg-blue-500",
          },
          {
            label: "Pending",
            val: stats.pending,
            icon: <FaClock />,
            color: "bg-yellow-500",
          },
          {
            label: "Accepted",
            val: stats.accepted,
            icon: <FaUserCheck />,
            color: "bg-green-500",
          },
          {
            label: "Fulfilled",
            val: stats.fulfilled,
            icon: <FaCheckCircle />,
            color: "bg-purple-500",
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-white/5 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5 flex items-center gap-5"
          >
            <div
              className={`${s.color} text-white p-4 rounded-2xl text-2xl shadow-lg`}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                {s.label}
              </p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                {s.val}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 📈 ANALYTICS CHART */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white dark:bg-white/5 rounded-[2.5rem] shadow-sm p-8 border border-gray-100 dark:border-white/5 w-[95%]"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            📊 Blood Requirement Analytics
          </h2>
          <div className="h-80 w-[90%] md:w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={theme === "dark" ? "#333" : "#eee"}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme === "dark" ? "#999" : "#666" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme === "dark" ? "#999" : "#666" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
                    color: theme === "dark" ? "#fff" : "#000",
                  }}
                />
                <Legend iconType="circle" />
                <Bar
                  dataKey="requested"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                  barSize={30}
                />
                <Bar
                  dataKey="fulfilled"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* PROFILE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-white/5 rounded-[2.5rem] shadow-sm p-8 border border-gray-100 dark:border-white/5 w-[95%]"
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={hospital.image?.url || "/default.png"}
                className="w-32 h-32 rounded-[2rem] object-cover border-4 border-red-50 dark:border-red-900/20 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-[#1a1a1a]"></div>
            </div>

            <h2 className="text-xl font-bold mt-6 text-gray-900 dark:text-white">
              {hospital.name}
            </h2>
            <p className="text-gray-400 text-sm">{hospital.email}</p>

            <div className="mt-8 w-full space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <span className="text-red-500">📍</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 leading-tight font-medium">
                  {hospital.address}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <span className="text-red-500">📞</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {hospital.contactNumbers?.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* REQUESTS LIST */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-white dark:bg-white/5 rounded-[2.5rem] shadow-sm p-8 border border-gray-100 dark:border-white/5 w-[95%]"
        >
          <div className="flex justify-between items-center mb-8 ">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Blood Requests 🩸
            </h2>
            <span className="text-sm text-gray-400 font-medium">
              Showing last {requests.length} entries
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
              <p className="text-gray-400 italic">
                No active requests. Create one to find donors.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {requests.map((req, i) => {
                if (!req) return null;

                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5 flex justify-between items-center shadow-sm hover:shadow-md transition transition-colors"
                  >
                    <div className="flex items-center gap-5 text-black">
                      <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl bg-black">
                        {req.bloodGroup}
                      </div>
                      <div>
                        <p
                          className={`text-[10px] uppercase font-black tracking-[0.2em] ${req.urgency === "emergency" ? "text-red-500 animate-pulse" : "text-blue-500"}`}
                        >
                          {req.urgency}
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">
                          {req.units} Units Required
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                          req.status === "pending"
                            ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500"
                            : req.status === "fulfilled"
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500"
                              : "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-500"
                        }`}
                      >
                        {req.status}
                      </span>

                      {req.status === "pending" && (
                        <button
                          onClick={() => updateStatus(req._id, "fulfilled")}
                          className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-green-700 cursor-pointer shadow-lg shadow-green-100 dark:shadow-none"
                        >
                          Mark Done
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center w-[95%] p-5 ml-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-black">Request Blood</h2>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <select
                value={requestForm.bloodGroup}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    bloodGroup: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg text-black"
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

              <input
                type="number"
                placeholder="Units"
                value={requestForm.units}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    units: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg text-black"
              />

              <select
                value={requestForm.urgency}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    urgency: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg text-black"
              >
                <option value="normal">Normal</option>
                <option value="emergency">Emergency</option>
              </select>

              <button className="w-full bg-red-600 text-white py-3 rounded-lg cursor-pointer">
                {loader ? "Submitting..." : "Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
