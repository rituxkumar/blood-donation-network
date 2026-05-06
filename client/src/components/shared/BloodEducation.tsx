"use client";

import { motion } from "framer-motion";
import { 
  FaHeartbeat, FaCheckCircle, FaTimesCircle, FaChartPie, 
  FaInfoCircle, FaHandHoldingHeart, FaPlusCircle, FaMinusCircle 
} from "react-icons/fa";

export default function BloodEducation() {
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const compatibilityData = [
    { type: "O-", give: "All", receive: "O-" },
    { type: "O+", give: "O+, A+, B+, AB+", receive: "O+, O-" },
    { type: "A-", give: "A+, A-, AB+, AB-", receive: "A-, O-" },
    { type: "A+", give: "A+, AB+", receive: "A+, A-, O+, O-" },
    { type: "B-", give: "B+, B-, AB+, AB-", receive: "B-, O-" },
    { type: "B+", give: "B+, AB+", receive: "B+, B-, O+, O-" },
    { type: "AB-", give: "AB+, AB-", receive: "AB-, A-, B-, O-" },
    { type: "AB+", give: "AB+", receive: "All" },
  ];

  return (
    <div className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 🌟 HEADER */}
        <motion.div {...fadeIn} className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
            Learn About <span className="text-red-600">Blood Donation</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Everything you need to know about saving lives through blood donation.
          </p>
        </motion.div>

        {/* 🩸 IMPORTANCE & BENEFITS */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div {...fadeIn} className="bg-red-50 dark:bg-red-950/20 p-10 rounded-[2.5rem] border border-red-100 dark:border-red-900/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-200 dark:shadow-none">
                <FaHandHoldingHeart size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Why It's Important?</h2>
            </div>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>One single donation can save up to <strong>three lives</strong>.</span>
              </li>
              <li className="flex gap-3">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>Blood is needed every <strong>two seconds</strong> for surgeries, cancer treatments, and chronic illnesses.</span>
              </li>
              <li className="flex gap-3">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>It strengthens the community and provides hope to families in crisis.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-blue-50 dark:bg-blue-950/20 p-10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none">
                <FaHeartbeat size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Health Benefits for You</h2>
            </div>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <FaCheckCircle className="text-blue-500 mt-1 shrink-0" />
                <span><strong>Free Health Checkup:</strong> Your pulse, blood pressure, and hemoglobin are tested before donation.</span>
              </li>
              <li className="flex gap-3">
                <FaCheckCircle className="text-blue-500 mt-1 shrink-0" />
                <span><strong>Reduced Iron Levels:</strong> Helps prevent iron overload, reducing the risk of heart disease.</span>
              </li>
              <li className="flex gap-3">
                <FaCheckCircle className="text-blue-500 mt-1 shrink-0" />
                <span><strong>Cell Regeneration:</strong> After donation, your body works to replace the lost blood, stimulating the production of <strong>new blood cells</strong>.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 🔬 HOW BLOOD CELLS INCREASE */}
        <motion.div {...fadeIn} className="bg-gradient-to-br from-gray-900 to-black dark:from-[#111] dark:to-black text-white p-10 rounded-[3rem] shadow-2xl mb-24 relative overflow-hidden border border-white/5">
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6">The Regeneration Process 🧬</h2>
              <p className="text-gray-300 leading-relaxed mb-6 font-medium">
                When you donate, your body immediately starts replenishing the lost volume. 
                The plasma is replaced within 24 hours, while red blood cells are replaced 
                within a few weeks by your bone marrow.
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                  <span className="font-black text-red-500 uppercase tracking-widest text-xs block mb-1">Plasma</span> 
                  Replaced in 24-48 hours.
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                  <span className="font-black text-red-500 uppercase tracking-widest text-xs block mb-1">Red Cells</span> 
                  Bone marrow starts working within hours.
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="w-48 h-48 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)]"
              >
                <span className="text-6xl">🩸</span>
              </motion.div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-10 blur-[100px]"></div>
        </motion.div>

        {/* ✅ ELIGIBILITY */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div {...fadeIn} className="bg-white dark:bg-white/5 border border-green-100 dark:border-green-900/20 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all">
            <h3 className="text-xl font-black text-green-700 dark:text-green-500 flex items-center gap-2 mb-6 uppercase tracking-widest text-sm">
              <FaCheckCircle /> Who Can Donate?
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 font-medium">
              <li>• Age: Between 18 to 65 years.</li>
              <li>• Weight: Minimum 45-50 kg.</li>
              <li>• Health: Good physical condition.</li>
              <li>• Hemoglobin: Minimum 12.5 g/dL.</li>
              <li>• Frequency: Every 3 months (90 days).</li>
            </ul>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-white dark:bg-white/5 border border-red-100 dark:border-red-900/20 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all">
            <h3 className="text-xl font-black text-red-700 dark:text-red-500 flex items-center gap-2 mb-6 uppercase tracking-widest text-sm">
              <FaTimesCircle /> Who Should Not?
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 font-medium">
              <li>• People with active infections (Cold/Flu).</li>
              <li>• Those with chronic diseases like HIV, Hepatitis, etc.</li>
              <li>• Pregnant or breastfeeding women.</li>
              <li>• Tattoo or piercing in the last 6 months.</li>
              <li>• Consumed alcohol in the last 24 hours.</li>
            </ul>
          </motion.div>
        </div>

        {/* 📊 COMPATIBILITY CHART */}
        <motion.div {...fadeIn} className="bg-gray-50 dark:bg-white/5 p-10 rounded-[3rem] border dark:border-white/5">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Blood Compatibility Chart 🩸</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Find out who you can help and who can help you.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-white/10">
                  <th className="py-5 font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest text-xs">Blood Type</th>
                  <th className="py-5 font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest text-xs">Can Give To</th>
                  <th className="py-5 font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest text-xs">Can Receive From</th>
                </tr>
              </thead>
              <tbody>
                {compatibilityData.map((data, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/5 transition group">
                    <td className="py-5">
                      <span className="bg-red-600 text-white px-4 py-1.5 rounded-xl font-black shadow-lg shadow-red-200 dark:shadow-none group-hover:scale-110 transition inline-block">
                        {data.type}
                      </span>
                    </td>
                    <td className="py-5 text-gray-700 dark:text-gray-300 font-bold">{data.give}</td>
                    <td className="py-5 text-gray-700 dark:text-gray-300 font-bold">{data.receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-10 p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl flex items-start gap-4 border border-yellow-100 dark:border-yellow-900/20">
            <FaInfoCircle className="text-yellow-600 mt-1 shrink-0" size={20} />
            <p className="text-sm text-yellow-800 dark:text-yellow-500 font-medium leading-relaxed">
              <strong>O Negative</strong> is the universal donor, meaning they can give to anyone. 
              <strong>AB Positive</strong> is the universal recipient, meaning they can receive from anyone.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
