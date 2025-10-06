import React from "react";
import { Link } from "react-router-dom";

const MCQ = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full  bg-gray-100">
      <div>
        <h1 className="text-center mt-20 font-bold text-2xl mt-5  ">Avaliable Tests</h1>
        <div className="mt-10 bg-white fixed top-40 left-10 w-[350px] h-[170px] rounded-2xl bg-orange-400">
          <h1 className="text-center mt-7 font-bold text-lg ">Aptitude Test</h1>
          {/* <label>Duration 30 minutes</label> */}
          <Link to= "/test">
          <button type="button" className="mt-8 mx-auto block  bg-blue-600 text-white px-5 py-3 rounded-3xl hover:bg-blue-700 font-bold text-lg">
            
              Start
          </button>
          </Link>
          

        </div>
      </div>
    </div>
  );
};

export default MCQ;
