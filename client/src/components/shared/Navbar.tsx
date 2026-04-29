const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Left side - Logo */}
      <h1 className="text-xl font-bold text-red-600">
        BloodConnect
      </h1>

      {/* Right side - Buttons */}
      <div className="space-x-4">
        <button className="text-gray-700">Login</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </div>

    </nav>
  );
};

export default Navbar;