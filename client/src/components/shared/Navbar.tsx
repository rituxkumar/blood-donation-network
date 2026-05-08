"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBell, FaSignOutAlt, FaUser, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Right side - Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/education" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 font-bold transition">
          Why Donate?
        </Link>
        
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

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#111] shadow-2xl rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden z-100"
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
          <div className="flex gap-4 bg-black">
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

      {/* MOBILE MENU TOGGLE */}
      <div className="flex items-center gap-4 md:hidden  ">
        {/* {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-yellow-400"
          >
            {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
        )} */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-600 dark:text-white cursor-pointer"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence >
    
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-[73px] bg-zinc-900 h-[calc(100vh-73px)] z-40 p-8 flex flex-col gap-6 md:hidden"
          >
            <Link 
              href="/education" 
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-black text-white border-b border-white/10 pb-4"
            >
              Why Donate?
            </Link>

            {isLoggedIn ? (
              <>
                <Link 
                  href={localStorage.getItem("role") === "donor" ? "/donor-dashboard" : "/dashboard"} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black text-white border-b border-white/10 pb-4"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-center cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4 h-full bg-transparent">
                <Link href="/donor-login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-4 rounded-2xl border-2 border-red-500 text-red-500 font-black uppercase tracking-widest bg-transparent hover:bg-red-600 hover:text-white transition cursor-pointer">
                    Donor Login 
                  </button>
                </Link>

                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest shadow-lg hover:bg-red-700 transition cursor-pointer">
                    Hospital Login
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


