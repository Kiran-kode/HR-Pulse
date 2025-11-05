import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false); // mobile

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // mobile screen
      setMobileSidebarOpen(prev => !prev);
    } else {
      // desktop screen
      setSidebarCollapsed(prev => !prev);
    }
  };

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
