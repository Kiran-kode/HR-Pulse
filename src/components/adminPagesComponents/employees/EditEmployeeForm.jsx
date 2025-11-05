import React from 'react';
import { useForm } from 'react-hook-form';

const EditEmployeeForm = ({ employee, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: employee.name,
      email: employee.email,
      id: employee.id,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      status: employee.status,
    },
  });

  const onSubmit = (data) => {
    onSave({ ...employee, ...data });
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input 
            {...register('name', { required: 'Full Name is required' })}
            type="text" 
            className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
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
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input 
            {...register('id')}
            type="text" 
            disabled
            className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input 
            {...register('phone', { required: 'Phone is required' })}
            type="tel" 
            className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input 
            {...register('department', { required: 'Department is required' })}
            type="text" 
            className={`${inputClasses} ${errors.department ? 'border-red-500' : ''}`}
          />
          {errors.department && <p className={errorClasses}>{errors.department.message}</p>}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Designation</label>
          <input 
            {...register('designation', { required: 'Designation is required' })}
            type="text" 
            className={`${inputClasses} ${errors.designation ? 'border-red-500' : ''}`}
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditEmployeeForm;