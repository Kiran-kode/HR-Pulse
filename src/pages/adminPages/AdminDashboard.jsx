import React from 'react'
import AdminOverview from '../../components/adminPagesComponents/dashboard/AdminOverview'
import AttendanceTrend from '../../components/adminPagesComponents/dashboard/AttendanceTrend'
import LeaveTypeDistribution from '../../components/adminPagesComponents/dashboard/LeaveTypeDistribution'

const AdminDashboard = () => {
  return (
    <>
    <AdminOverview/>
    <div className='flex flex-col lg:flex-row gap-2 grow mt-4  '>

    <AttendanceTrend/>
    <LeaveTypeDistribution/>
    </div>
    </>
  )
}

export default AdminDashboard