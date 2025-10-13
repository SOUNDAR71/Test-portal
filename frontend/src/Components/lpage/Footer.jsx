import React from 'react';

const Footer = () => {
  return (
    <div className="bg-blue-950 text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
    
        <div className="flex flex-col gap-4 md:w-1/3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
              <div className="font-bold text-lg">T</div>
            </div>
            <h1 className="font-bold text-xl">Test Portal</h1>
          </div>
          <p className="text-gray-300">
           Empowering learners worldwide with comprehensive online testing solutions. Take your skills to the next level with our advanced assessment platform.
          </p>
          <p>🦤 📧 📗 👜</p>
        </div>


       
        <div className="flex flex-col gap-2 md:w-1/3">
          <h2 className="font-bold text-lg">Contact Info</h2>
          <p>support@testportal.com</p>
          <p>+91 987654321</p>
          <p>123, Tiruppur</p>
          <p>24/7 Support Available</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
