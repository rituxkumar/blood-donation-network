import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-12 py-12">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* LOGO + ABOUT */}
        <div>
          <h2 className="text-2xl font-bold text-white">BloodConnect</h2>
          <p className="mt-3 text-sm text-gray-400">
            Connecting donors with those in need. Saving lives through
            real-time blood donation network.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 cursor-pointer">Home</li>
            <li className="hover:text-red-400 cursor-pointer">Find Donors</li>
            <li className="hover:text-red-400 cursor-pointer">Request Blood</li>
            <li className="hover:text-red-400 cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 cursor-pointer">Emergency Request</li>
            <li className="hover:text-red-400 cursor-pointer">Donor Registration</li>
            <li className="hover:text-red-400 cursor-pointer">Live Chat</li>
            <li className="hover:text-red-400 cursor-pointer">Notifications</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">📍 Mithapur, India</p>
          <p className="text-sm mt-2">📧 support@bloodconnect.com</p>
          <p className="text-sm mt-2">📞 +91 9876543210</p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebook className="hover:text-red-400 cursor-pointer" />
            <FaInstagram className="hover:text-red-400 cursor-pointer" />
            <FaTwitter className="hover:text-red-400 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © 2026 BloodConnect. All rights reserved.
      </div>
    </footer>
  );
}