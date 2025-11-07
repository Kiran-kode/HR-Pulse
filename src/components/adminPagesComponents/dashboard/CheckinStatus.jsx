import React from 'react'
import { FiBell } from 'react-icons/fi';

const CheckinStatus = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-between gap-6 lg:gap-4 mb-4'>
      {/* Left Section - Daily Status */}
      <div className='w-full lg:w-1/2 bg-white rounded-lg shadow-sm p-6'>
        <h1 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-4'>My Daily Status</h1>
        
        <div className='mb-6'>
          <p className='font-semibold text-gray-700 mb-3'>Status:</p>
          <div className='flex flex-wrap gap-3 items-center'>
            <button className='bg-green-500 hover:bg-green-600 text-white cursor-pointer rounded-lg px-4 py-2 font-semibold transition-colors duration-200'>
              Checked In
            </button>
            <button className='bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-lg px-4 py-2 font-semibold transition-colors duration-200'>
              Checked Out
            </button>
          </div>
        </div>

        <div className='space-y-2 text-gray-700'>
          <p className='text-base'><span className='font-semibold'>Check in Time:</span> 9:00 AM</p>
          <p className='text-base'><span className='font-semibold'>Today Work Hours:</span> 8 hrs</p>
        </div>
      </div>

      {/* Right Section - Notifications */}
      <div className='w-full lg:w-1/2 bg-red-50 border border-red-300 rounded-lg shadow-sm p-6'>
      <div className='flex gap-2 flex-wrap'>
        <div className='flex gap-3 items-start border border-gray-400 p-2 rounded-lg'>
          <FiBell size={24} color="#ef4444" className='shrink-0 mt-1' />
          <div className='flex-1 '>
            <p className='text-gray-800 font-medium'>kiran checked in at 4:00 PM</p>
          </div>
        </div>
        <div className='flex gap-3 items-start border border-gray-400 p-2 rounded-lg'>
          <FiBell size={24} color="#ef4444" className='shrink-0 mt-1' />
          <div className='flex-1 '>
            <p className='text-gray-800 font-medium'>Ali just updated the daily report</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CheckinStatus