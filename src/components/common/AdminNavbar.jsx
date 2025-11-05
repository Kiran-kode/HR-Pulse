import React from 'react';
import { CiUser } from "react-icons/ci";
import { FiMenu } from 'react-icons/fi';

const AdminNavbar = ({ toggleSidebar }) => {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const currentDate = today.toLocaleDateString("en-US", options);
  const userName = "Admin";

  return (
    <header className='w-full py-4 bg-white shadow-sm flex justify-between items-center px-6'>
      <div className='flex items-center gap-4'>
        {/* Hamburger — always visible on mobile */}
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600 md:hidden">
          <FiMenu className="h-7 w-7" />
        </button>

        {/* Sidebar toggle for desktop */}
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600 hidden md:block">
          <FiMenu className="h-6 w-6" />
        </button>

        <p className='text-gray-500 hidden sm:block'>{currentDate}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium">{userName}</span>
        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
          <CiUser className='text-xl text-blue-700' />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
