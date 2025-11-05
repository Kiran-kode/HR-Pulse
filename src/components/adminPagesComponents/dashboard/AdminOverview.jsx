import React from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiCalendar, FiClock, FiAlertTriangle } from 'react-icons/fi';

const StatCard = ({ icon, title, value, bgColor, iconColor }) => {
    return (
        <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center">
                <div className={`flex h-12 w-12 shrink items-center justify-center rounded-full ${bgColor}`}>
                    {React.cloneElement(icon, { className: `h-6 w-6 ${iconColor}` })}
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
};

const AdminOverview = () => {
    const overviewStats = [
        {
            title: 'Total Employees',
            value: 150,
            icon: <FiUsers />,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Present Today',
            value: 135,
            icon: <FiUserCheck />,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: 'Absent Today',
            value: 5,
            icon: <FiUserX />,
            bgColor: 'bg-red-100',
            iconColor: 'text-red-600',
        },
        {
            title: 'On Leave',
            value: 10,
            icon: <FiCalendar />,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
        },
        {
            title: 'Half Day',
            value: 3,
            icon: <FiClock />,
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: 'Late Arrivals',
            value: 7,
            icon: <FiAlertTriangle />,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600',
        },
    ];

    return (
        <>
            <h1 className='text-xl font-bold mb-2'>Admin Overview</h1>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {overviewStats.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        title={stat.title}
                        value={stat.value}
                        bgColor={stat.bgColor}
                        iconColor={stat.iconColor}
                    />
                ))}
            </div>
        </>
    );
};

export default AdminOverview;