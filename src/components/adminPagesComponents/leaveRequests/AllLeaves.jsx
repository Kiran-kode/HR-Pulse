import React from 'react'
import { useState, useEffect } from 'react'
import FilterStatus from './FilterStatus'
import SearchBar from '../employees/SearchBar'
import FilterDepartment from '../employees/FilterDepartment'
import TableLayout from '../employees/TableLayout'
import { getAllLeaves, updateLeaveStatus } from '../../../service'


const AllLeaves = () => {
   
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
 useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getAllLeaves();
                console.log('Leaves Response:', response.data);
                
                // Map the response data to match your columns
                const mappedLeaves = response.data.map(leave => ({
                    _id: leave._id,
                    employeeName: leave.employeeId?.name || 'N/A',
                    department: leave.employeeId?.department || 'N/A',
                    leaveType: leave.leaveType,
                    startDate: new Date(leave.startDate).toLocaleDateString('en-GB'),
                    endDate: new Date(leave.endDate).toLocaleDateString('en-GB'),
                    reason: leave.reason,
                    status: leave.status,
                    employeeId: leave.employeeId?._id,
                }));

                setLeaves(mappedLeaves);
                setFilteredLeaves(mappedLeaves);
            } catch (error) {
                console.error('Error fetching leaves:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
console.log(leaves);

    const departments = [...new Set(leaves.map(leave => leave.department))];
    const statuses = ['Pending', 'Approved', 'Rejected'];

    useEffect(() => {
        let filtered = leaves.filter(leave =>
            leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (selectedDepartment) {
            filtered = filtered.filter(leave => leave.employeeId.department === selectedDepartment);
        }

        if (selectedStatus) {
            filtered = filtered.filter(leave => leave.status === selectedStatus);
        }

        setFilteredLeaves(filtered);
    }, [searchQuery, selectedDepartment, selectedStatus, leaves]);

     const handleStatusChange = async (id, newStatus) => {
        try {
            console.log(id);
            
            await updateLeaveStatus(id, { 
                status: newStatus,
            });

            // Update local state
            setLeaves(leaves.map(leave =>
                leave._id === id ? { ...leave, status: newStatus } : leave
            ));

            alert(`Leave request ${newStatus.toLowerCase()} successfully`);
        } catch (error) {
            console.error('Error updating leave status:', error);
            alert('Failed to update leave status');
        }
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
                        <button onClick={() => handleStatusChange(row._id, 'Approved')} className="text-green-600 hover:text-green-800" title="Approve">
                            <span className='py-1 border border-blue-600 text-white px-3 bg-blue-600 hover:bg-blue-500 rounded font-semibold cursor-pointer'>Accept</span>
                        </button>
                        <button onClick={() => handleStatusChange(row._id, 'Rejected')} className="text-red-600 hover:text-red-800" title="Reject">
                            <span className='py-1 border border-red-700 text-red-700 px-3 hover:bg-red-50 font-semibold cursor-pointer'>Reject</span>
                        </button>
                    </div>
                )
            )
        }
    ];

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center grow sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center grow gap-4">
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