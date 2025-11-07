import React, { useState, useMemo, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import AddNewTask from './AddNewTask';
import { FaCircle } from "react-icons/fa6";


const UpcommingTasks = ({ allTasks, onAddTask }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const getPriorityLabelStyles = (priority) => {
    const priorityLower = priority?.toLowerCase();
    return priorityLower === 'high' ? ' text-red-700'
      : priorityLower === 'medium' ? 'text-blue-700'
      : priorityLower === 'low' ? 'text-green-700'
      : 'bg-gray-500 text-white';
  };

  // Filter tasks to show only today's tasks
  const todaysTasks = useMemo(() => {
    let filtered = allTasks.filter(task => task.startDate === today);

    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [allTasks, searchQuery]);
  
 const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleClearSearch = () => setSearchQuery('');

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <h1 className="text-black font-bold text-xl">Today's Tasks</h1>
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search today's tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button onClick={handleClearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
            )}
          </div>
          {/* The AddNewTask component now calls the function from the parent */}
          <AddNewTask onAddTask={onAddTask} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {todaysTasks.length > 0 ? (
          todaysTasks.map((task) => (
            <div key={task.id} className="bg-linear-to-r from-blue-400 to-blue-500 rounded-xl p-4 shadow-lg flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 items-start justify-between">
                {/* <span className={`${getPriorityLabelStyles(task.priority)} font-semibold py-1 px-3 rounded-md text-xs`}>
                  {task.priority} Priority
                </span> */}
                <FaCircle className={`${getPriorityLabelStyles(task.priority)}`} />
                <span className="bg-black text-white font-semibold py-1 px-3 rounded-md text-xs">{task.status}</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">{task.title}</h1>
                <p className="text-white font-semibold text-sm">{task.project}</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Start:</h3>
                <p className="text-sm font-semibold text-white">{task.startDate} | {formatTime(task.startTime)}</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">End:</h3>
                <p className="text-sm font-semibold text-white">{task.endDate} | {formatTime(task.endTime)}</p>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Assign to: <span className="font-semibold">{task.assignedTo}</span></p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tasks for today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcommingTasks;