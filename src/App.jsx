import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/common/AdminLayout';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import Leaves from './pages/adminPages/Leaves';
import TotalEmployees from './pages/adminPages/TotalEmployees';
import DailyReports from './pages/adminPages/DailyReports';
import Tasks from './pages/adminPages/Tasks';

const App = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<TotalEmployees />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="reports" element={<DailyReports />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
};

export default App;