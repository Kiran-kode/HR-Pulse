import React from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiCalendar, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import CheckinStatus from './CheckinStatus';
import {getDashboardOverview} from '../../../service'
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
     const [stats, setStats] = useState({
        totalEmployees: 0,
        presentToday: 0,
        absentToday: 0,
        onLeaveToday: 0,
        halfDayToday: 0,
        lateArrivalsToday: 0,
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                setLoading(true);
                const response = await getDashboardOverview();
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching dashboard overview:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOverview();
    }, []);
    const overviewStats = [
        {
            title: 'Total Employees',
            value: stats.totalEmployees,
            icon: <FiUsers />,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Present Today',
            value: stats.presentToday,
            icon: <FiUserCheck />,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: 'Absent Today',
            value: stats.absentToday,
            icon: <FiUserX />,
            bgColor: 'bg-red-100',
            iconColor: 'text-red-600',
        },
        {
            title: 'On Leave',
            value: stats.onLeaveToday,
            icon: <FiCalendar />,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
        },
        {
            title: 'Half Day',
            value: stats.halfDayToday,
            icon: <FiClock />,
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: 'Late Arrivals',
            value: stats.lateArrivalsToday,
            icon: <FiAlertTriangle />,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600',
        },
    ];
 if (loading) {
        return <div className="text-center py-10">Loading overview...</div>;
    }
    console.log("stats are", stats);
    
    return (
        <>
        <CheckinStatus/>
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