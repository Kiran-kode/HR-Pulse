import React from 'react'
import { CiUser } from "react-icons/ci";


const Navbar = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const currentDate = today.toLocaleDateString("en-US", options);
  const userName = "John Doe";
  return (
    <>
      <div className='w-full h-16 bg-gray-100 flex justify-between items-center px-4'>
        <div className='text-center'>
          <h1 className='text-xl font-bold'>Hello, {userName}</h1>
          <p className='text-gray-600'> {currentDate}</p>
        </div>
        <div>

          <CiUser className='text-2xl' />
        </div>
      </div>
    </>
  )
}

export default Navbar