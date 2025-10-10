import React from "react";
import { useNavigate } from "react-router-dom";

const Boady = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      navigate("/mcq"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="bg-gray-300 mt-20 shadow-lg flex flex-col items-center p-6">
      <div className="bg-blue-600 w-full max-w-[900px] h-[300px] flex flex-col items-center justify-center text-3xl md:text-5xl font-extrabold text-white rounded-xl p-6">
        <div className="mb-6 text-center">
          Welcome to <span className="text-yellow-200 font-extrabold">TestPortal</span>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleTakeTest}
            className="bg-yellow-400 text-base text-black px-6 py-2 rounded-lg hover:bg-red-500 transition"
          >
            🚀 Take a Test Now
          </button>
          <button onClick={handleTakeTest} className="border border-white text-base text-black px-6 py-2 rounded-lg hover:bg-white transition">
            Get Started Free
          </button>
        </div>
      </div>

      <div className="mt-10 w-full max-w-[900px] text-center px-4">
        <h1 className="text-2xl md:text-3xl mb-2 font-bold">Why Choose TestPortal?</h1>
        <h5 className="text-sm md:text-base text-gray-600">
          Experience the most advanced online testing platform designed for success
        </h5>
      </div>
    </div>
  );
};

export default Boady;
