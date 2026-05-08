"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FaArrowLeft, FaHospital, FaCalendarAlt, FaTint, FaPhoneAlt, 
  FaMapMarkerAlt, FaMedal, FaQuoteRight 
} from "react-icons/fa";

function DonorHistoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const donorId = searchParams.get("donorId");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!donorId) {
      setError("No donor ID provided");
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/donor/history?donorId=${donorId}`);
        const result = await res.json();
        if (result.success) {
          setData(result);
        } else {
          setError(result.error || "Failed to fetch donor history");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [donorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 flex flex-col items-center justify-center p-6">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <span className="absolute text-2xl animate-pulse">🩸</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-6 font-bold uppercase tracking-widest text-sm animate-pulse">
          Fetching Hero Details...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 flex flex-col items-center justify-center p-6">
        <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-xl border border-red-100 dark:border-white/5 text-center max-w-md">
          <span className="text-6xl mb-4 block">⚠️</span>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Error Occurred</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{error || "Could not load data"}</p>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition shadow-lg cursor-pointer flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft /> Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const { donor, history } = data;

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 py-16 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-bold transition group cursor-pointer"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        {/* HERO PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-xl border border-white dark:border-white/5 relative overflow-hidden mb-12"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 dark:bg-red-500/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            {/* AVATAR WITH BADGE */}
            <div className="relative shrink-0">

 <div className="w-20 h-20 mx-auto rounded-full border-4 border-red-500/20 dark:border-red-500/30 shadow-lg   flex items-center justify-center text-white font-black text-3xl select-none bg-grey-600">
              {donor.name ? donor.name.charAt(0).toUpperCase() : "D"}
            </div>


              
              <span className="absolute -bottom-2 -right-2 bg-red-600 text-white p-3 rounded-2xl shadow-xl flex items-center justify-center text-lg">
                <FaMedal />
              </span>
            </div>

            {/* DETAILS */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <div>
                  <span className="bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-2 inline-block">
                    Super Donor 🏆
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {donor.name}
                  </h1>
                </div>

                {/* BLOOD GROUP BADGE */}
                <div className="bg-gradient-to-br from-red-500 to-red-700 text-white w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center font-black shadow-lg shadow-red-500/20 mt-4 md:mt-0 mx-auto md:mx-0">
                  <FaTint className="text-xl mb-0.5" />
                  <span className="text-2xl leading-none">{donor.bloodGroup}</span>
                </div>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-wider">Total Contributed</p>
                  <h3 className="text-2xl font-black text-red-600 mt-1">{donor.totalUnitsDonated || 0} Units</h3>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-wider">Times Donated</p>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{donor.donationsCount || 0} Times</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DONATION HISTORY TIMELINE */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Donation History Timeline
            </h2>
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full">
              {history.length} Saved
            </span>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-24 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/10 p-8">
              <span className="text-5xl block mb-4">❤️</span>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                No past donations recorded yet.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                Once this hero accepts and fulfills blood requests, their contributions will appear here.
              </p>
            </div>
          ) : (
            <div className="relative pl-6 md:pl-8 border-l-2 border-red-500/30 space-y-8">
              {history.map((record: any, index: number) => {
                const formattedDate = new Date(record.updatedAt || record.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <motion.div
                    key={record._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] shadow-md border border-white dark:border-white/5 group hover:border-red-500/40 transition-all"
                  >
                    {/* TIMELINE POINT */}
                    <div className="absolute -left-[35px] md:-left-[43px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-600 border-4 border-white dark:border-[#0a0a0a] shadow-lg group-hover:scale-125 transition-transform flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* LEFT: Hospital Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">
                          <FaCalendarAlt /> {formattedDate}
                        </div>

                        <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                          <FaHospital className="text-red-600" /> {record.hospitalId?.name || "Hospital Partner"}
                        </h3>

                        {record.hospitalId?.address && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-400 shrink-0" /> {record.hospitalId.address}
                          </p>
                        )}
                        
                        {record.hospitalId?.contactNumbers?.[0] && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 font-bold flex items-center gap-2 uppercase">
                            <FaPhoneAlt className="text-gray-400" /> Contact: {record.hospitalId.contactNumbers[0]}
                          </p>
                        )}
                      </div>

                      {/* RIGHT: Blood Units */}
                      <div className="text-center md:text-right shrink-0">
                        <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-6 py-4 rounded-[2rem] border border-red-100 dark:border-red-500/10 inline-block">
                          <span className="text-3xl font-black block">{record.units} Units</span>
                          <span className="text-[10px] font-black uppercase tracking-wider block mt-0.5">Blood Group {record.bloodGroup}</span>
                        </div>
                        <span className="block mt-3 text-xs text-green-600 dark:text-green-400 font-black uppercase tracking-widest bg-green-50 dark:bg-green-950/20 px-4 py-1.5 rounded-full border border-green-200/50 dark:border-green-500/10 w-fit mx-auto md:ml-auto">
                          Successfully Donated ✅
                        </span>
                      </div>
                    </div>

                    {/* Optional Note left by hospital/system */}
                    {record.note && (
                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 text-sm text-gray-500 dark:text-gray-400 italic flex gap-2 items-start bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
                        <FaQuoteRight className="text-red-400 text-xs mt-1 shrink-0" />
                        <span>"{record.note}"</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function DonorHistoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-[#0a0a0a] dark:via-[#111] dark:to-red-950/10 flex flex-col items-center justify-center p-6">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <span className="absolute text-2xl animate-pulse">🩸</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-6 font-bold uppercase tracking-widest text-sm">
          Loading Page Content...
        </p>
      </div>
    }>
      <DonorHistoryContent />
    </Suspense>
  );
}
