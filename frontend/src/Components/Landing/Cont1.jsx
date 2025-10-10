import React from 'react'

const Cont1 = () => {
  return (
    <div>
    <div className=' flex flex-col items-center p-8   bg-gray-300'>
        <div className="mt-10 text-center">
            <h1 className="font-extrabold text-xl">Popular Test Categories</h1>
            <span className="text-sm block mt-2">Choose from our wide range of practice tests.</span>
        </div>

        <div className=' grid grid-cols-1 gap-12 sm:grid-cols-1 lg:grid-cols-4 gap-12 mt-[90px] flex justify-center gap-6'>
           
            <div className='   bg-orange-500  w-[250px] h-[150px] rounded-xl '>
                <h1 className=' mt-4 text-center text-3xl'>🧮</h1>
                <h1 className='text-center mt-3 font-bold text-lg'>Aptitude Test</h1>
                <p className='text-center'>Numerical & logical Reasoning</p>
            </div>
            <div className='   bg-blue-500 w-[250px] h-[150px] rounded-xl '>
                <h1 className='text-center mt-2 text-3xl'>🧠</h1>
                 <h1 className='text-center mt-3 font-bold text-lg'>Reasoning Test</h1>
                 <p className='text-center text-base'>Critical thinking & analysis</p>
            </div>
            <div className='bg-green-500 w-[250px] h-[150px] rounded-xl'>
                <h1 className='text-center mt-2 text-3xl'>📚</h1>
                <h1 className='text-center font-bold text-lg mt-3'>Verbal Test</h1>
                <p className='text-center text-base'>Language & comprehension</p>
            </div>
            <div className='bg-rose-300 w-[250px] h-[150px] rounded-xl'>
                <h1 className='text-center text-2xl mt-2'>💻</h1>
                <h1 className='text-center font-bold text-lg mt-3'>Technical MCQs</h1>
                <p className='text-center text-base'>Programming & Technology</p>
            </div>

            
        </div>
        <div className="mt-10 w-full max-w-[1000px] bg-gray-100 text-black flex flex-col sm:flex-row justify-around items-center rounded-lg shadow p-4">           
             <div className='text-center m-2'>
                <h1 className='font-bold text-xl text-blue-600'>1000+</h1>
                <p className='text-sm'>Tests Taken</p>
            </div>
            <div className='text-center'>
                <h1 className='font-bold text-xl text-green-600 '>5,000+</h1>
                <p className='text-sm'>Active Users</p>
            </div>
            <div className='text-center'>
                <h1 className='font-bold text-xl text-blue-400'>500+</h1>
                <p className='text-sm'>Test Categores</p>
            </div>
            <div className='text-center'>
                <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl text-orange-500'>98%</h1>
                <p className='text-sm'>Success Rate</p>
            </div>
        </div>
      
    </div>
    </div>
  )
}

export default Cont1
