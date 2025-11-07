import React, { useState } from 'react';
import UpcommingTasks from './UpcommingTasks';
import MyTaskList from './MyTaskList';

const AllTasks = () => {
  const today = new Date().toISOString().split('T')[0];

  // Master list of all tasks, managed by the parent component
  const [allTasks, setAllTasks] = useState([
    {
      id: 1,
      title: 'Daily Standup',
      project: 'Project Phoenix',
      priority: 'High',
      status: 'To Do',
      startDate: '2025-11-06',
      startTime: '09:00',
      endDate: '2025-11-06',
      endTime: '09:30',
      createdAt: 'Nov 6, 2025',
      assignedTo: 'John Doe',
    },
    {
      id: 2,
      title: 'Develop Login Page',
      project: 'Web App',
      priority: 'Medium',
      status: 'In Progress',
      startDate: '2025-11-07', 
      startTime: '10:00',
      endDate: '2025-11-11',
      endTime: '17:00',
      createdAt: 'Nov 5, 2025',
      assignedTo: 'Kiran',
      day: 'Upcoming'
    },
    {
      id: 3,
      title: 'Fix API Bug',
      project: 'Mobile App',
      priority: 'High',
      status: 'Pending',
      startDate: '2025-11-07', 
      startTime: '14:00',
      endDate: '2025-11-12',
      endTime: '16:00',
      createdAt: 'Nov 4, 2025',
      assignedTo: 'Jane Smith',
    },
  ]);

  // Function to add a new task to the master list
  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: allTasks.length + 1,
      ...newTaskData,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      day: newTaskData.startDate === today ? 'Today' : 'Upcoming',
    };
    setAllTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="space-y-8 p-4">
      {/* Pass the addTask function and the full task list to UpcomingTasks */}
      <UpcommingTasks allTasks={allTasks} onAddTask={handleAddTask} />
      
      {/* Pass the full task list to MyTaskList */}
      <MyTaskList allTasks={allTasks} />
    </div>
  );
};

export default AllTasks;