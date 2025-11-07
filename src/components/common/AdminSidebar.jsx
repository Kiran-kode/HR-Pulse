import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiUsers, FiCalendar, FiFileText, FiX } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const AdminSidebar = ({ isCollapsed, isMobileOpen, closeMobileSidebar }) => {
  const linkClasses =
    "relative flex items-center px-4 py-3 mt-2 text-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 group";
  const activeLinkClasses = "bg-blue-700 text-white";

  const links = [
    { to: "/dashboard", icon: <FiGrid />, label: "Dashboard" },
    { to: "/employees", icon: <FiUsers />, label: "Employees" },
    { to: "/leaves", icon: <FiCalendar />, label: "Leaves" },
    { to: "/reports", icon: <FiFileText />, label: "Reports" },
    { to: "/tasks", icon: <FaTasks />, label: "Tasks" },
    { to: "/profile", icon: <CgProfile  />, label: "Profile" },
  ];

  return (  
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex h-screen flex-col bg-gray-50 text-blue-700 z-10 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 text-center">
          <h1
            className={`text-2xl font-bold transition-opacity duration-300 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            Admin
          </h1>
        </div>

        <nav className="mt-5 grow px-2">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
              title={isCollapsed ? label : ""}
            >
              <div className="flex items-center">
                <div className="text-xl">{icon}</div>
                <span
                  className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${
                    isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
                  }`}
                >
                  {label}
                </span>
              </div>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col animate-slideIn">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={closeMobileSidebar}
              className="text-3xl text-blue-700"
            >
              <FiX />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center grow">
            {links.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `${linkClasses} text-lg w-3/4 text-center justify-center ${
                    isActive ? activeLinkClasses : ""
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span>{label}</span>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
