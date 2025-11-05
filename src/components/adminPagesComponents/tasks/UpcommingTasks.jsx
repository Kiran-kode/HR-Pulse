import React, { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import AddNewTask from './AddNewTask';

const UpcommingTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Task 1',
      project: 'Web App',
      priority: 'High',
      status: 'To Do',
      dueDate: '2025-11-10',
      dueTime: '12:15 PM - 4:30 PM',
      createdAt: 'Nov 1, 2025',
      assignedTo: 'John Doe',
    },
    {
      id: 2,
      title: 'Task 2',
      project: 'Web App',
      priority: 'Medium',
      status: 'To Do',
      dueDate: '2025-11-15',
      dueTime: '12:15 PM - 4:30 PM',
      createdAt: 'Sep 8, 2024',
      assignedTo: 'Kiran',
    },
    {
      id: 3,
      title: 'Task 3',
      project: 'Mobile App',
      priority: 'Low',
      status: 'To Do',
      dueDate: '2025-11-05',
      dueTime: '10:00 AM - 2:00 PM',
      createdAt: 'Nov 2, 2025',
      assignedTo: 'Jane Smith',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const getPriorityLabelStyles = (priority) => {
    const priorityLower = priority?.toLowerCase();

    return priorityLower === 'high'
      ? 'bg-red-500 text-white'
      : priorityLower === 'medium'
        ? 'bg-blue-700 text-white'
        : priorityLower === 'low'
          ? 'bg-green-500 text-white'
          : 'bg-gray-500 text-white';
  };

  // Filter tasks based on active filter and search query
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [ searchQuery, tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Title, Filters, and Add Button Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <h1 className="text-black font-bold text-xl">Upcomming Tasks</h1>

        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-2   w-full">

          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
                                <AddNewTask onAddTask={handleAddTask} />

        </div>

        {/* Search Result Info */}
        {searchQuery && (
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold">{filteredTasks.length}</span> task(s)
          </p>
        )}
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const priorityLabelStyles = getPriorityLabelStyles(task.priority);

            return (
              <div
                key={task.id}
                className="bg-linear-to-r from-blue-400 to-blue-500 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3"
              >
                {/* Priority and Status Labels */}
                <div className="flex flex-wrap gap-2 items-start justify-between">
                  <span className={`${priorityLabelStyles} font-semibold py-1 px-3 rounded-md text-xs whitespace-nowrap`}>
                    {task.priority} Priority
                  </span>
                  <span className={`bg-black text-white font-semibold py-1 px-3 rounded-md text-xs whitespace-nowrap`}>
                    {task.status}
                  </span>
                </div>

                {/* Task Title and Project */}
                <div>
                  <h1 className="text-white font-bold text-lg">{task.title}</h1>
                  <p className="text-white font-semibold text-sm">{task.project}</p>
                </div>

                {/* Due Date and Time */}
                <div>
                  <h3 className="text-white font-bold text-sm">Due Date:</h3>
                  <div className="flex flex-col sm:flex-row gap-2 font-semibold text-xs sm:text-sm">
                    <p className="text-white">{task.dueDate}</p>
                    <p className="text-white">{task.dueTime}</p>
                  </div>
                </div>

                {/* Created At */}
                <div>
                  <h3 className="text-white font-bold text-sm">Created at:</h3>
                  <p className="text-white font-semibold text-sm">{task.createdAt}</p>
                </div>

                {/* Assigned To */}
                <div>
                  <p className="text-white font-bold text-sm">
                    Assign to: <span className="font-semibold text-white">{task.assignedTo}</span>
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

export default UpcommingTasks;