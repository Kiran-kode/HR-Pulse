import React from 'react'
import { useState, useEffect } from 'react'
import FilterStatus from './FilterStatus'
import SearchBar from '../employees/SearchBar'
import FilterDepartment from '../employees/FilterDepartment'
import TableLayout from '../employees/TableLayout'


const AllLeaves = () => {
    const initialLeaves = [
        {
            id: 1,
            employeeName: 'John Doe',
            department: 'Development',
            leaveType: 'Sick Leave',
            startDate: '2-11-2025',
            endDate: '11-11-2025',
            reason: 'Fever and headache',
            status: 'Pending'
        },
        {
            id: 2,
            employeeName: 'Jane Smith',
            department: 'Design',
            leaveType: 'Vacation',
            startDate: '20-12-2025',
            endDate: '28-12-2025',
            reason: 'Family trip',
            status: 'Approved'
        },
        {
            id: 3,
            employeeName: 'Peter Jones',
            department: 'Management',
            leaveType: 'Personal',
            startDate: '5-11-2025',
            endDate: '5-11-2025',
            reason: 'Bank appointment',
            status: 'Approved'
        },
        {
            id: 4,
            employeeName: 'Sam Wilson',
            department: 'Development',
            leaveType: 'Sick Leave',
            startDate: '2-11-2025',
            endDate: '3-11-2025',
            reason: 'Stomach flu',
            status: 'Rejected'
        },
        {
            id: 5,
            employeeName: 'Maria Garcia',
            department: 'Design',
            leaveType: 'Vacation',
            startDate: '15-11-2025',
            endDate: '20-11-2025',
            reason: 'Holiday travel',
            status: 'Pending'
        },
    ];

    const [leaves, setLeaves] = useState(initialLeaves);
    const [filteredLeaves, setFilteredLeaves] = useState(initialLeaves);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const departments = [...new Set(leaves.map(leave => leave.department))];
    const statuses = ['Pending', 'Approved', 'Rejected'];

    useEffect(() => {
        let filtered = leaves.filter(leave =>
            leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (selectedDepartment) {
            filtered = filtered.filter(leave => leave.department === selectedDepartment);
        }

        if (selectedStatus) {
            filtered = filtered.filter(leave => leave.status === selectedStatus);
        }

        setFilteredLeaves(filtered);
    }, [searchQuery, selectedDepartment, selectedStatus, leaves]);

    const handleStatusChange = (leaveId, newStatus) => {
        setLeaves(leaves.map(leave =>
            leave.id === leaveId ? { ...leave, status: newStatus } : leave
        ));
        // In a real app, you would make an API call here.
    };

    const leavesColumns = [
        { header: 'Employee Name', accessor: 'employeeName' },
        { header: 'Department', accessor: 'department' },
        { header: 'Leave Type', accessor: 'leaveType' },
        { header: 'Start Date', render: (row) => `${row.startDate}` },
        { header: 'End Date', render: (row) => `${row.endDate}` },
        { header: 'Reason', accessor: 'reason' },
        {
            header: 'Status',
            render: (row) => (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${row.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                (row.status === 'Pending' || row.status === 'Rejected' || row.status === 'Approved') && (
                    <div className="flex items-center space-x-3">
                        <button onClick={() => handleStatusChange(row.id, 'Approved')} className="text-green-600 hover:text-green-800" title="Approve">
                            <span className='py-1 border border-blue-600 text-white px-3 bg-blue-600 hover:bg-blue-500 rounded font-semibold cursor-pointer'>Accept</span>
                        </button>
                        <button onClick={() => handleStatusChange(row.id, 'Rejected')} className="text-red-600 hover:text-red-800" title="Reject">
                            <span className='py-1 border border-red-700 text-red-700 px-3 hover:bg-red-50 font-semibold cursor-pointer'>Reject</span>
                        </button>
                    </div>
                )
            )
        }
    ];

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <FilterDepartment
                        departments={departments}
                        selectedDepartment={selectedDepartment}
                        onChange={setSelectedDepartment}
                    />
                    <FilterStatus
                        statuses={statuses}
                        selectedStatus={selectedStatus}
                        onChange={setSelectedStatus}
                    />
                </div>
            </div>
            <TableLayout
                title="Leave Requests"
                columns={leavesColumns}
                data={filteredLeaves}
            />
        </div>
    );
};
export default AllLeaves;