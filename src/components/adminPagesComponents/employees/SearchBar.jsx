import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative sm:w-full   bg-gray-200">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search by name, email, or ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
    
  );
};

export default SearchBar;