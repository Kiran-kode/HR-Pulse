import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiCheckSquare, FiSend, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  const linkClasses = 'flex items-center px-4 py-2 mt-2 text-gray-700 rounded-lg hover:bg-blue-400 hover:text-white transition-colors duration-200';
  const activeLinkClasses = 'bg-blue-700 text-white';

  return (
    <aside className="flex h-screen w-64 flex-col bg-gray-50 text-blue-700 z-10">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Admin Pannel</h1>
      </div>
      <nav className="mt-5 grow px-4">
        <NavLink
          to="/"
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FiGrid className="h-5 w-5" />
          <span className="mx-4 font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/checkin"
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FiCheckSquare className="h-5 w-5" />
          <span className="mx-4 font-medium">Check-in / Out</span>
        </NavLink>
        <NavLink
          to="/apply-leave"
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FiSend className="h-5 w-5" />
          <span className="mx-4 font-medium">Apply Leave</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FiUser className="h-5 w-5" />
          <span className="mx-4 font-medium">Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;