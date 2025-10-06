import React from 'react'

const cont = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12  justify-items-center  gap-8  bg-gray-300">
      <div className=" hover:-translate-y-3 bg-white w-[250px] h-[150px] rounded-xl shadow-lg flex flex-col items-center justify-center text-lg font-semibold p-4 ">
        <div className='flex flex-col items-center'>
          <diV className='bg-blue-500 w-[44px] h-[40px] flex items-center justify-center rounded'>
            <span className='text-blue-600 text-2xl '>📝</span>
          </diV>
          
          <p className='mt-1'>SmartTestCreation </p>
        </div>
        <div className='mt-2 text-sm  '>
          <p>Lorem ipsum dolor sit.</p>
        </div>
      </div>
      <div className=" hover:-translate-y-3 bg-white w-[250px] h-[150px] rounded-xl shadow-lg flex items-center justify-center text-lg font-semibold">
        <div className="bg-white w-[250px] h-[150px] rounded-xl shadow-lg flex flex-col items-center justify-center text-lg font-semibold p-4">
        <div className='flex flex-col items-center'>
          <diV className='bg-blue-500 w-[44px] h-[40px] flex items-center justify-center rounded'>
            <span className='text-blue-600 text-2xl '>⏱️</span>
          </diV>
          
          <p className='mt-1'>Real-Time</p>
        </div>
        <div className='mt-2 text-sm  '>
          <p>Lorem ipsum dolor sit.</p>
        </div>
      </div>
      </div>
      <div className=" hover:-translate-y-3 bg-white w-[250px] h-[150px] rounded-xl shadow-lg flex items-center justify-center text-lg font-semibold">
        <div className="bg-white w-[250px] h-[150px] rounded-xl shadow-lg flex flex-col items-center justify-center text-lg font-semibold p-4">
        <div className='flex flex-col items-center'>
          <diV className='bg-blue-500 w-[44px] h-[40px] flex items-center justify-center rounded'>
            <span className='text-blue-600 text-2xl '>📊</span>
          </diV>
          
          <p className='mt-1'>Advance Analytics</p>
        </div>
        <div className='mt-2 text-sm  '>
          <p>Lorem ipsum dolor sit.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default cont
