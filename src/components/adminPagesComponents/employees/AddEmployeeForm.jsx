import React from 'react';
import { useForm } from 'react-hook-form';

const AddEmployeeForm = ({ onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      status: 'Active',
    },
  });

  const onSubmit = (data) => {
    const employeeId = `EMP${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    
    const newEmployee = {
      ...data,
      id: employeeId,
      imageUrl: 'https://via.placeholder.com/40',
    };
    
    onSave(newEmployee);
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input 
            {...register('name', { required: 'Full Name is required' })}
            type="text" 
            className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter full name"
          />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email'
              }
            })}
            type="email" 
            className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter email address"
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone *</label>
          <input 
            {...register('phone', { required: 'Phone is required' })}
            type="tel" 
            className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Department *</label>
          <input 
            {...register('department', { required: 'Department is required' })}
            type="text" 
            className={`${inputClasses} ${errors.department ? 'border-red-500' : ''}`}
            placeholder="e.g., Development, Design, Management"
          />
          {errors.department && <p className={errorClasses}>{errors.department.message}</p>}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Designation *</label>
          <input 
            {...register('designation', { required: 'Designation is required' })}
            type="text" 
            className={`${inputClasses} ${errors.designation ? 'border-red-500' : ''}`}
            placeholder="e.g., Software Engineer, Designer"
          />
          {errors.designation && <p className={errorClasses}>{errors.designation.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select 
            {...register('status')}
            className={inputClasses}
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Info Text */}
      <p className="mt-4 text-xs text-gray-500">
        Employee ID will be auto-generated upon creation.
      </p>

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
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;