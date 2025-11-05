import React from 'react';
import { useForm } from 'react-hook-form';

const AddTaskForm = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      project: '',
      priority: 'Medium',
      status: 'To Do',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '09:00',
      assignedTo: '',
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-4">
        {/* Row 1: Task Title and Project */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Title *</label>
            <input
              {...register('title', { required: 'Task title is required' })}
              type="text"
              className={`${inputClasses} ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter task title"
            />
            {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project *</label>
            <input
              {...register('project', { required: 'Project name is required' })}
              type="text"
              className={`${inputClasses} ${errors.project ? 'border-red-500' : ''}`}
              placeholder="Enter project name"
            />
            {errors.project && <p className={errorClasses}>{errors.project.message}</p>}
          </div>
        </div>

        {/* Row 2: Priority and Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority *</label>
            <select
              {...register('priority', { required: 'Priority is required' })}
              className={`${inputClasses} ${errors.priority ? 'border-red-500' : ''}`}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && <p className={errorClasses}>{errors.priority.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status *</label>
            <select
              {...register('status', { required: 'Status is required' })}
              className={`${inputClasses} ${errors.status ? 'border-red-500' : ''}`}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && <p className={errorClasses}>{errors.status.message}</p>}
          </div>
        </div>

        {/* Row 3: Due Date and Due Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date *</label>
            <input
              {...register('dueDate', { required: 'Due date is required' })}
              type="date"
              className={`${inputClasses} ${errors.dueDate ? 'border-red-500' : ''}`}
            />
            {errors.dueDate && <p className={errorClasses}>{errors.dueDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Time *</label>
            <input
              {...register('dueTime', { required: 'Due time is required' })}
              type="time"
              className={`${inputClasses} ${errors.dueTime ? 'border-red-500' : ''}`}
            />
            {errors.dueTime && <p className={errorClasses}>{errors.dueTime.message}</p>}
          </div>
        </div>

        {/* Row 4: Assigned To */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Assigned To *</label>
          <input
            {...register('assignedTo', { required: 'Assignee is required' })}
            type="text"
            className={`${inputClasses} ${errors.assignedTo ? 'border-red-500' : ''}`}
            placeholder="Enter assignee name"
          />
          {errors.assignedTo && <p className={errorClasses}>{errors.assignedTo.message}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;