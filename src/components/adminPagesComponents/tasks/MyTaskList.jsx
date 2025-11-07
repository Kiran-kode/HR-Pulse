import React, { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';

const MyTaskList = ({ allTasks }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
const today = new Date().toISOString().split('T')[0];


  const getPriorityLabelStyles = (priority) => {
    const priorityLower = priority?.toLowerCase();
    return priorityLower === 'high'
      ? 'bg-red-500 text-white'
      : priorityLower === 'medium'
        ? 'bg-blue-500 text-white'
        : priorityLower === 'low'
          ? 'bg-green-500 text-white'
          : 'bg-gray-500 text-white';
  };

  const getStatusStyles = (status) => {
    const statusLower = status?.toLowerCase();
    return statusLower === 'pending'
      ? 'text-black'
      : statusLower === 'in progress'
        ? 'text-yellow-500'
        : statusLower === 'completed'
          ? 'text-green-500'
          : 'text-gray-500';
  };

  const getBorderColor = (priority) => {
    const priorityLower = priority?.toLowerCase();
    return priorityLower === 'high'
      ? 'border-l-4 border-red-500'
      : priorityLower === 'medium'
        ? 'border-l-4 border-blue-500'
        : priorityLower === 'low'
          ? 'border-l-4 border-green-500'
          : 'border-l-4 border-gray-500';
  };

  // Format time from 24-hour to 12-hour format
  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const filteredTasks = useMemo(() => {
    let filtered = allTasks || [];

     switch (activeFilter) {
      case 'upcoming':
        // Show tasks where the start date is in the future
        filtered = filtered.filter(task => task.startDate > today);
        break;
      case 'pending':
        filtered = filtered.filter(task => task.status.toLowerCase() === 'pending');
        break;
      case 'completed':
        filtered = filtered.filter(task => task.status.toLowerCase() === 'completed');
        break;
      case 'all':
      default:
        // 'all' now means all tasks EXCEPT today's
        filtered = filtered.filter(task => task.startDate !== today);
        break;
     }

    // Apply status filter
    if (activeFilter === 'pending') {
      filtered = filtered.filter(task => task.status.toLowerCase() === 'pending');
    } else if (activeFilter === 'completed') {
      filtered = filtered.filter(task => task.status.toLowerCase() === 'completed');
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeFilter, searchQuery, allTasks]);

  return (
    <div className="w-full">
      {/* Header with Title, Search, and Filter Buttons */}
      <div className="flex flex-col gap-4 m-4">
        {/* Title and Filter Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <h1 className="text-black font-bold text-xl mr-4">My Task List</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 font-semibold rounded-lg cursor-pointer transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-gray-400 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1 font-semibold rounded-lg cursor-pointer transition-all duration-200 ${
                activeFilter === 'pending'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1 font-semibold rounded-lg cursor-pointer transition-all duration-200 ${
                activeFilter === 'completed'
                  ? 'bg-orange-400 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full sm:w-96">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by task title or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Search Result Info */}
        {searchQuery && (
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold">{filteredTasks.length}</span> task(s)
          </p>
        )}
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 px-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const priorityLabelStyles = getPriorityLabelStyles(task.priority);
            const statusStyles = getStatusStyles(task.status);
            const borderColor = getBorderColor(task.priority);

            return (
              <div
                key={task.id}
                className={`bg-white ${borderColor} rounded-md p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3`}
              >
                {/* Priority and Status Labels */}
                <div className="flex flex-wrap gap-2 items-start justify-between">
                  <span className={`${priorityLabelStyles} font-semibold py-1 px-3 rounded-md text-xs whitespace-nowrap`}>
                    {task.priority} Priority
                  </span>
                  <span className={`${statusStyles} font-semibold py-1 px-3 rounded-md text-xs whitespace-nowrap border border-current`}>
                    {task.status}
                  </span>
                </div>

                {/* Task Title and Day */}
                <div>
                  <h1 className="text-black font-bold text-lg">{task.title}</h1>
                  <p className="text-gray-500 font-semibold text-sm">{task.day}</p>
                </div>

                {/* Start & End Date/Time */}
                <div className="space-y-2 text-sm">
                  <div>
                    <h3 className="text-xs text-gray-500">Start</h3>
                    <p className="font-semibold text-black">{task.startDate} | {formatTime(task.startTime)}</p>
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500">End</h3>
                    <p className="font-semibold text-black">{task.endDate} | {formatTime(task.endTime)}</p>
                  </div>
                </div>

                {/* Assigned To */}
                <div>
                  <p className="text-black font-bold text-sm">
                    Assign to: <span className="font-semibold">{task.assignedTo}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTaskList;