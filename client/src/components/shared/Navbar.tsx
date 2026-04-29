import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left side - Logo */}
      <Link href="/"><h1 className="text-xl font-bold text-red-600">BloodConnect</h1></Link>
      

      {/* Right side - Buttons */}
      <div className="space-x-4">
        <Link href="/login"><button  className="px-5 py-2 rounded-full bg-red-600 text-white">Login</button></Link>
        {/* <Link href="/register">
          <button className="px-5 py-2 rounded-full bg-red-600 text-white">
            Register
          </button>
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
