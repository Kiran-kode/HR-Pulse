import React, { useEffect, useState } from 'react';
import TableLayout from './TableLayout';
import Modal from './Modal';
import AddEmployeeForm from './AddEmployeeForm';
import EditEmployeeForm from './EditEmployeeForm';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import SearchBar from './SearchBar';
import FilterDepartment from './FilterDepartment';

const Table = () => {
  const initialUsers = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      designation: 'Software Engineer',
      department: 'Development',
      id: 'EMP001',
      phone: '123-456-7890',
      status: 'Active',
      imageUrl: 'https://via.placeholder.com/40',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      designation: 'UI/UX Designer',
      department: 'Design',
      id: 'EMP002',
      phone: '987-654-3210',
      status: 'On Leave',
      imageUrl: 'https://via.placeholder.com/40',
    },
    {
      name: 'Peter Jones',
      email: 'peter.jones@example.com',
      designation: 'Project Manager',
      department: 'Management',
      id: 'EMP003',
      phone: '555-555-5555',
      status: 'Active',
      imageUrl: 'https://via.placeholder.com/40',
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [selectedDepartment, setSelectedDepartment] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = [...new Set(users.map(user => user.department))];

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(lowercasedQuery) ||
      user.email.toLowerCase().includes(lowercasedQuery) ||
      user.id.toLowerCase().includes(lowercasedQuery)
    );

    if (selectedDepartment) {
      filtered = filtered.filter(user => user.department === selectedDepartment);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, selectedDepartment, users]);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setUsers(users.filter(user => user.id !== employeeId));
      console.log(`Deleted employee with ID: ${employeeId}`);
    }
  };

  const handleSave = (updatedEmployee) => {
    console.log('Saving employee:', updatedEmployee);
    setUsers(users.map(user => user.id === updatedEmployee.id ? updatedEmployee : user));
    setIsModalOpen(false);
  };
  const handleAddEmployee = (newEmployee) => {
    console.log('Adding employee:', newEmployee);
    setUsers([...users, newEmployee]);
    setIsAddModalOpen(false);
  };

  const usersColumns = [
    {
      header: 'Name',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.imageUrl}
            alt="employee"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p>{row.name}</p>
        </div>
      ),
    },
    { header: 'Employee ID', accessor: 'id' },
    { header: 'Department', accessor: 'department' },
    { header: 'Designation', accessor: 'designation' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 text-sm font-semibold rounded-full ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' :
          row.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <button onClick={() => handleEdit(row)} className="text-blue-600 hover:text-blue-800">
            <FiEdit size={18} />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-800">
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between grow">
        <div className="flex flex-col sm:flex-row sm:items-center w-full max-w-3xl grow gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterDepartment
            departments={departments}
            selectedDepartment={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
          <FiPlus size={16} 
/>
          Add Employee
        </button>
      </div>

      <TableLayout
        title="Employees"
        columns={usersColumns}
        data={filteredUsers}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Employee"
      >
        {selectedEmployee && (
          <EditEmployeeForm
            employee={selectedEmployee}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>

        {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Employee"
      >
        <AddEmployeeForm
          onSave={handleAddEmployee}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Table;