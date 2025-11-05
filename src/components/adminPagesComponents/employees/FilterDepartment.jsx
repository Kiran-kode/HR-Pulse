import React from 'react';

const FilterDepartment = ({ departments, selectedDepartment, onChange }) => {
  return (
    <div className="relative w-full max-w-xs  cursor-pointer">
      <select
        value={selectedDepartment}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full appearance-none rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-700 focus:outline-none focus:ring-blue-700 sm:text-sm cursor-pointer"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDepartment;