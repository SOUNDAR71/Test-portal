import React from "react";
import { Link } from "react-router-dom";



const Navbar = () => {
  

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black p-4 flex items-center justify-between rounded shadow-md">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <div className="font-bold text-lg">T</div>
        </div>
        <h1 className="text-black text-xl font-bold">Test Portal</h1>
      </div>

      <ul className="hidden md:flex space-x-6">
        <li><Link to="/" className="text-black hover:text-blue-400">Home</Link></li>
        <li><Link to="/about" className="text-black hover:text-blue-400">About</Link></li>
        <li><Link to="/test" className="text-black hover:text-blue-400">Test</Link></li>
        <li><Link to="/results" className="text-black hover:text-blue-400">Results</Link></li>
      </ul>

      <div className="flex items-center gap-5">
        <Link to="/login" className="hover:text-blue-400">Login</Link>
        <Link
          to="/register"
          className="bg-blue-200 text-black px-4 py-2 rounded hover:bg-blue-300"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
