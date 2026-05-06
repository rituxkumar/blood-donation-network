import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 px-6 md:px-12 py-16 border-t dark:border-white/5 transition-colors duration-500">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* LOGO + ABOUT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            BloodConnect <span className="text-red-600">❤️</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting donors with those in need. Saving lives through
            real-time blood donation network.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li className="hover:text-red-500 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Find Donors</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Request Blood</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">About Us</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Services</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li className="hover:text-red-500 cursor-pointer transition-colors">Emergency Request</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Donor Registration</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Live Chat</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Notifications</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact Us</h3>
          <div className="space-y-3 text-sm font-medium">
            <p className="flex items-center gap-2">📍 <span className="text-gray-400">Mithapur, India</span></p>
            <p className="flex items-center gap-2">📧 <span className="text-gray-400">support@bloodconnect.com</span></p>
            <p className="flex items-center gap-2">📞 <span className="text-gray-400">+91 9876543210</span></p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-8 text-xl">
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-red-600 hover:text-white transition-all">
              <FaFacebook />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-red-600 hover:text-white transition-all">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-red-600 hover:text-white transition-all">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/5 mt-16 pt-8 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
        © 2026 BloodConnect. All rights reserved. <br className="md:hidden"/> Made with ❤️ for Humanity
      </div>
    </footer>
  );
}