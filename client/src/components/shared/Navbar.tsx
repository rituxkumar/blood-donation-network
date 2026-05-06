"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBell, FaSignOutAlt, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

let socket: any;

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const bloodGroup = localStorage.getItem("bloodGroup");
    
    setIsLoggedIn(!!token);

    if (token && role === "donor") {
      // 🔥 Initialize Socket
      socket = io("http://localhost:5000");

      if (bloodGroup) {
        socket.emit("join-blood-group", bloodGroup);
      }

      socket.on("notification", (data: any) => {
        setNotifications((prev) => [data, ...prev]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("bloodGroup");
    setIsLoggedIn(false);
    setNotifications([]);
    router.push("/");
  };

  return (
    <nav className="w-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100 dark:border-white/5 transition-colors">
      {/* Left side - Logo */}
      <Link href="/">
        <h1 className="text-xl font-black text-red-600 flex items-center gap-2">
          BloodConnect <span className="text-gray-900 dark:text-white">❤️</span>
        </h1>
      </Link>

      {/* Right side - Buttons */}
      <div className="space-x-6 flex items-center">
        <Link href="/education" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 font-bold transition">
          Why Donate?
        </Link>
        
        {/* THEME TOGGLE */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-yellow-400 hover:scale-110 transition cursor-pointer"
          >
            {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        )}

        {isLoggedIn ? (
          <>
            {/* NOTIFICATION BELL */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition cursor-pointer"
              >
                <FaBell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-[#0a0a0a] animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* DROPDOWN */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#111] shadow-2xl rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden z-[100]"
                  >
                    <div className="p-4 border-b dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
                      <span className="font-bold text-gray-800 dark:text-white">Notifications</span>
                      <button 
                        onClick={() => setNotifications([])}
                        className="text-xs text-red-600 hover:underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-8 text-center text-gray-400 text-sm italic">
                          No new notifications
                        </p>
                      ) : (
                        notifications.map((n, i) => (
                          <div
                            key={i}
                            className="p-4 border-b dark:border-white/5 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                          >
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">🚨 {n.hospitalName} needs help!</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{n.message}</p>
                            <p className="text-[10px] text-gray-400 mt-2">
                              {new Date(n.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href={localStorage.getItem("role") === "donor" ? "/donor-dashboard" : "/dashboard"} className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 font-bold flex items-center gap-2 transition">
              <FaUser /> Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-red-600 hover:text-white transition font-bold cursor-pointer"
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link href="/donor-login">
              <button className="px-6 py-2.5 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition font-bold cursor-pointer shadow-sm">
                Donor Login
              </button>
            </Link>
            <Link href="/login">
              <button className="px-6 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-bold shadow-lg cursor-pointer">
                Hospital Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


