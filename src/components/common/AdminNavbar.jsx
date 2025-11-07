import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { FiMenu, FiLogOut, FiUserPlus } from 'react-icons/fi';

const AdminNavbar = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const currentDate = today.toLocaleDateString("en-US", options);
  const userName = "Admin";

  const handleSignup = () => {
    navigate('/signup');
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: localStorage.removeItem('token');
    // navigate('/login');
    setShowDropdown(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest('.user-menu')) return;
    setShowDropdown(false);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className='w-full py-4 bg-white shadow-sm flex justify-between items-center px-6'>
      <div className='flex items-center gap-4'>
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600 md:hidden">
          <FiMenu className="h-7 w-7" />
        </button>

        <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600 hidden md:block">
          <FiMenu className="h-6 w-6" />
        </button>

        <p className='text-gray-500 hidden sm:block'>{currentDate}</p>
      </div>

      <div className="flex items-center gap-3 relative user-menu">
        <span className="text-gray-700 font-medium">{userName}</span>
        
        {/* User Icon Button */}
        <button
          onClick={handleDropdownToggle}
          className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 cursor-pointer relative"
        >
          <CiUser className='text-xl text-blue-700' />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-14 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
            {/* Create Account Option */}
            <button
              onClick={handleSignup}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 flex items-center gap-3 transition-colors duration-200"
            >
              <FiUserPlus size={18} className="text-blue-600" />
              <span className="font-medium">Create Account</span>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200"
            >
              <FiLogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;