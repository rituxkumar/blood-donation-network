"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { useTheme } from "next-themes";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend 
} from "recharts";
import { 
  FaHeart, FaUserCheck, FaClock, FaHistory, FaHospital, 
  FaPhoneAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaExclamationTriangle 
} from "react-icons/fa";

let socket: any;

export default function DonorDashboard() {
  const router = useRouter();
  const { theme } = useTheme();

  const [requests, setRequests] = useState<any[]>([]);
  const [donor, setDonor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  // 🔐 auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/donor-login");
  }, []);

  // 🧑 fetch donor
  const fetchDonor = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/donor/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.success) {
      setDonor(data.donor);
    }
  };

  // 🩸 fetch matching requests (IMPORTANT FIX)
  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/request/match", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.success) {
      setRequests(data.requests);
    } else {
      setError(data.error || "Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchDonor();
    fetchRequests();

    // 🔥 Initialize Socket
    socket = io("http://localhost:5000");

    socket.on("notification", (data: any) => {
      setNotification(data);
      // Automatically refresh requests list
      fetchRequests();
      
      // Auto-hide notification after 10 seconds
      setTimeout(() => setNotification(null), 10000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 🔥 Join room when donor data is loaded
  useEffect(() => {
    if (donor && socket) {
      socket.emit("join-blood-group", donor.bloodGroup);
    }
  }, [donor]);

  // 🔥 toggle availability
  const toggleAvailability = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/donor/toggle", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.success) {
      setDonor((prev: any) => ({
        ...prev,
        isAvailable: data.isAvailable,
      }));
    }
  };

  // ❤️ accept request
  const handleDonate = async (id: string) => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const res = await fetch("/api/request/accept", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestId: id }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      // remove accepted request
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } else {
      alert(data.error);
    }
  };

  if (!donor) return <div className="p-6">Loading...</div>;

  // 📊 STATS
  const stats = {
    donations: 5, // Mock data or calculate if you have history
    accepted: 2,
    availability: donor.isAvailable ? "Active" : "Paused",
  };

  const chartData = [
    { name: "Donated", value: stats.donations, color: "#ef4444" },
    { name: "Available Requests", value: requests.length, color: "#fbbf24" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 p-6 md:p-10 transition-colors duration-500">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Donor Dashboard <span className="text-red-600">❤️</span>
        </h1>
        <div className="bg-white dark:bg-white/5 px-4 py-2 rounded-2xl shadow-sm border dark:border-white/5 flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${donor.isAvailable ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></span>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{donor.isAvailable ? "Accepting Requests" : "Offline"}</span>
        </div>
      </div>

      {/* 🚀 STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Donations", val: stats.donations, icon: <FaHeart />, color: "bg-red-500" },
          { label: "Accepted Requests", val: stats.accepted, icon: <FaUserCheck />, color: "bg-blue-500" },
          { label: "Pending Matches", val: requests.length, icon: <FaClock />, color: "bg-yellow-500" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white dark:border-white/5 flex items-center gap-5"
          >
            <div className={`${s.color} text-white p-4 rounded-2xl text-2xl shadow-lg shadow-${s.color.split('-')[1]}-100 dark:shadow-none`}>
              {s.icon}
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{s.label}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{s.val}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 REAL-TIME NOTIFICATION POPUP */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-20 right-6 z-50 bg-red-600 text-white p-6 rounded-2xl shadow-2xl max-w-sm border-2 border-white/20 backdrop-blur-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">🚨 New Request!</h3>
              <button onClick={() => setNotification(null)} className="text-white/60 hover:text-white cursor-pointer">✕</button>
            </div>
            <p className="text-sm leading-relaxed">
              {notification.message}
            </p>
            <button 
              onClick={() => {
                setNotification(null);
                fetchRequests();
              }}
              className="mt-4 w-full bg-white text-red-600 py-2 rounded-xl font-bold hover:bg-red-50 transition cursor-pointer"
            >
              View Requests
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* PROFILE & ANALYTICS */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden"
          >
            <div className="relative z-10 text-center">
              <div className="inline-block p-1 bg-red-50 dark:bg-red-900/10 rounded-[2rem] mb-4">
                <div className="bg-red-600 text-white w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-3xl font-black shadow-xl shadow-red-200 dark:shadow-none">
                  {donor.bloodGroup}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{donor.name}</h2>
              <p className="text-gray-400 text-sm mb-6 font-medium italic">Verified Hero</p>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-sm text-gray-600 dark:text-gray-400 font-medium">
                  <span>📍</span> {donor.location}
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-sm text-gray-600 dark:text-gray-400 font-medium">
                  <span>📞</span> {donor.phone}
                </div>
              </div>

              {/* 🔥 TOGGLE */}
              <button
                onClick={toggleAvailability}
                className={`mt-6 w-full py-4 rounded-2xl text-white font-bold transition-all shadow-lg cursor-pointer ${
                  donor.isAvailable
                    ? "bg-green-500 hover:bg-green-600 shadow-green-100 dark:shadow-none"
                    : "bg-gray-400 hover:bg-gray-500 shadow-gray-100 dark:shadow-none"
                }`}
              >
                {donor.isAvailable ? "🟢 You are Available" : "🔴 You are Offline"}
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 dark:bg-red-900/10 rounded-full -mr-16 -mt-16"></div>
          </motion.div>

          {/* 📊 MINI CHART */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-white dark:bg-white/5 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5"
          >
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FaHistory className="text-red-500" /> Contribution
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none',
                      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                      color: theme === 'dark' ? '#fff' : '#000'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* REQUESTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Matching Requests 🩸
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">LIVE</span>
            </h2>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl mb-6 text-sm flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          {requests.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
              <p className="text-gray-400 italic font-medium">
                No matching requests found right now. <br/>
                We'll notify you when someone needs {donor.bloodGroup}!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {requests.map((req) => (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* HOSPITAL IMAGE */}
                    <div className="relative shrink-0">
                      <img 
                        src={req.hospitalId?.image?.url || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop"} 
                        alt="hospital" 
                        className="w-full md:w-32 h-32 rounded-2xl object-cover shadow-inner dark:opacity-80"
                      />
                      <div className={`absolute -top-2 -left-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-lg ${
                        req.urgency === 'emergency' ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white'
                      }`}>
                        {req.urgency}
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                            <FaHospital className="text-red-600" /> {req.hospitalId?.name || "Private Hospital"}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-400" /> {req.hospitalId?.address || "Location not provided"}
                          </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-2xl flex flex-col items-center border dark:border-red-900/30">
                          <span className="text-2xl font-black">{req.bloodGroup}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest">{req.units} Units</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-white/5 p-3 rounded-2xl font-medium">
                          <FaPhoneAlt className="text-red-500" /> 
                          <span className="font-bold">{req.hospitalId?.contactNumbers?.[0] || "N/A"}</span>
                        </div>
                        
                        {req.hospitalId?.location && (
                          <a 
                            href={req.hospitalId.location} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 p-3 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition font-bold"
                          >
                            <FaExternalLinkAlt /> 
                            <span>Google Maps</span>
                          </a>
                        )}
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => handleDonate(req._id)}
                          disabled={loading}
                          className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-700 cursor-pointer shadow-lg shadow-red-100 dark:shadow-none transition-all flex items-center gap-2 group"
                        >
                          {loading ? "Processing..." : <>I am ready to help <FaHeart className="group-hover:scale-125 transition-transform" /></>}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}