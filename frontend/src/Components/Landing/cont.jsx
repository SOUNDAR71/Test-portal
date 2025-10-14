import React from 'react';

const Cont = () => {
  return (
    <div className="bg-gray-300 py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        
        {/* Card 1 */}
        <div className="hover:-translate-y-2 transition transform bg-white w-full max-w-xs h-auto rounded-xl shadow-lg flex flex-col items-center justify-start p-6">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded mb-2">
              <span className="text-2xl">📝</span>
            </div>
            <p className="mt-1 text-base md:text-lg font-semibold text-center">Smart Test Creation</p>
          </div>
          <div className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 text-center">
            Design custom MCQ tests with intelligent question randomization and automatic grading system.
          </div>
        </div>

        {/* Card 2 */}
        <div className="hover:-translate-y-2 transition transform bg-white w-full max-w-xs h-auto rounded-xl shadow-lg flex flex-col items-center justify-start p-6">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded mb-2">
              <span className="text-2xl">⏱️</span>
            </div>
            <p className="mt-1 text-base md:text-lg font-semibold text-center">Real-Time</p>
          </div>
          <div className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 text-center">
            Take timed tests with live progress tracking and automatic submission when time expires.
          </div>
        </div>

        {/* Card 3 */}
        <div className="hover:-translate-y-2 transition transform bg-white w-full max-w-xs h-auto rounded-xl shadow-lg flex flex-col items-center justify-start p-6">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded mb-2">
              <span className="text-2xl">📊</span>
            </div>
            <p className="mt-1 text-base md:text-lg font-semibold text-center">Advance Analytics</p>
          </div>
          <div className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 text-center">
            Get instant detailed results with performance insights and comprehensive question review.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cont;
