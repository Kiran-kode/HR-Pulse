import React, { useState, useEffect } from 'react';
import TableLayout from '../employees/TableLayout';
import SearchBar from '../employees/SearchBar';
import FilterDepartment from '../employees/FilterDepartment';
import { FiDownload } from 'react-icons/fi';

const WorkReport = () => {
  const initialReports = [
    {
      id: 1,
      employeeName: 'John Doe',
      department: 'Development',
      reportDate: '2025-11-04',
      taskCompleted: 5,
      workSummary: 'Completed API integration for user authentication module',
      issues: 'Database connection timeout occurred twice',
      checkInTime: '09:05 AM',
      checkOutTime: '06:30 PM',
      attachments: [
        { name: 'api_documentation.pdf', url: '#' },
        { name: 'code_review.docx', url: '#' }
      ]
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      department: 'Design',
      reportDate: '2025-11-04',
      taskCompleted: 3,
      workSummary: 'Designed new dashboard UI and created wireframes for mobile version',
      issues: 'Client feedback required on color scheme',
      checkInTime: '08:50 AM',
      checkOutTime: '05:45 PM',
      attachments: [
        { name: 'wireframes.fig', url: '#' },
        { name: 'mockups.zip', url: '#' }
      ]
    },
    {
      id: 3,
      employeeName: 'Peter Jones',
      department: 'Management',
      reportDate: '2025-11-03',
      taskCompleted: 7,
      workSummary: 'Conducted team meetings and reviewed project timelines',
      issues: 'Resource allocation needs adjustment',
      checkInTime: '09:00 AM',
      checkOutTime: '06:00 PM',
      attachments: [
        { name: 'meeting_notes.txt', url: '#' }
      ]
    },
    {
      id: 4,
      employeeName: 'Sam Wilson',
      department: 'Development',
      reportDate: '2025-11-04',
      taskCompleted: 4,
      workSummary: 'Bug fixes and performance optimization in payment module',
      issues: 'None',
      checkInTime: '09:15 AM',
      checkOutTime: '06:45 PM',
      attachments: [
        { name: 'bug_report.pdf', url: '#' },
        { name: 'performance_metrics.xlsx', url: '#' },
        { name: 'test_results.json', url: '#' }
      ]
    },
  ];

  const [reports, setReports] = useState(initialReports);
  const [filteredReports, setFilteredReports] = useState(initialReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = [...new Set(reports.map(report => report.department))];

  useEffect(() => {
    let filtered = reports.filter(report =>
      report.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedDepartment) {
      filtered = filtered.filter(report => report.department === selectedDepartment);
    }

    setFilteredReports(filtered);
  }, [searchQuery, selectedDepartment, reports]);

  const handleDownloadAttachment = (attachment) => {
    console.log(`Downloading: ${attachment.name}`);
    // In a real app, this would trigger an actual download from your backend
    alert(`Downloading: ${attachment.name}`);
  };

  const reportsColumns = [
    { header: 'Employee Name', accessor: 'employeeName' },
    { header: 'Department', accessor: 'department' },
    { header: 'Report Date', accessor: 'reportDate' },
    { header: 'Tasks Completed', accessor: 'taskCompleted' },
    { header: 'Work Summary', accessor: 'workSummary' },
    {
      header: 'Issues',
      render: (row) => (
        <span className={`${row.issues === 'None' ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}`}>
          {row.issues}
        </span>
      )
    },
    { header: 'Check-in Time', accessor: 'checkInTime' },
    { header: 'Check-out Time', accessor: 'checkOutTime' },
    {
      header: 'Download Attachments',
      render: (row) => (
        <div className="flex flex-col gap-2">
          {row.attachments.length > 0 ? (
            <div className="space-y-1">
              {row.attachments.map((attachment, index) => (
                <button
                  key={index}
                  onClick={() => handleDownloadAttachment(attachment)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm transition-colors cursor-pointer "
                >
                  <FiDownload size={16} />
                  <span>Download</span>
                </button>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 text-sm italic">No attachments</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col sm:flex-row sm:items-center grow gap-4 max-w-3xl">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterDepartment 
            departments={departments}
            selectedDepartment={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        </div>
      </div>

      {/* Table */}
      <TableLayout
        title="Daily Work Reports"
        columns={reportsColumns}
        data={filteredReports}
      />
    </div>
  );
};

export default WorkReport;