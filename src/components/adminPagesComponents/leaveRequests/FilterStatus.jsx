import React from 'react';

const FilterStatus = ({ statuses, selectedStatus, onChange }) => {
  return (
    <div className="relative w-full max-w-xs ">
      <select
        value={selectedStatus}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full appearance-none rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      >
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterStatus;