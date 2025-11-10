import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateEmployee } from '../../../service';

const EditEmployeeForm = ({ employee, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: employee.name,
      email: employee.email,
      id: employee.id,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      status: employee.status,
      password: '',
      confirmPassword: '',
      image: null,
    },
  });

    const [loading, setLoading] = useState(false);
  // Watch the new password field for confirmation validation
  const newPassword = watch('password');

  const onSubmit = async(data) => {
    try {
      setLoading(true);
      const { confirmPassword, password, ...employeeData } = data;
      console.log("employee id", employee._id);
      console.log(employeeData);
      
      if (password) {
        employeeData.password = password;
      } 
      const response = await updateEmployee(employee._id, employeeData);
      alert('Employee updated successfully');
      if(onSave) onSave(response.data);
    } catch (error) {
      console.error('Error updating employee:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="w-full max-h-[90vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-4">
          {/* Current Image and Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src={employee.imageUrl || 'https://via.placeholder.com/80'} 
              alt={employee.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700">Change Profile Image</label>
              <input 
                {...register('image')}
                type="file" 
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Row 1: Full Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input 
                {...register('name', { required: 'Full Name is required' })}
                type="text" 
                className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input 
                {...register('email', { required: 'Email is required' })}
                type="email" 
                className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
            </div>
          </div>

          {/* Row 2: Employee ID and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input 
                {...register('id')}
                type="text" 
                disabled
                className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone *</label>
              <input 
                {...register('phone', { required: 'Phone is required' })}
                type="tel" 
                className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
            </div>
          </div>

          {/* Row 3: Department and Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Department *</label>
              <input 
                {...register('department', { required: 'Department is required' })}
                type="text" 
                className={`${inputClasses} ${errors.department ? 'border-red-500' : ''}`}
              />
              {errors.department && <p className={errorClasses}>{errors.department.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation *</label>
              <input 
                {...register('designation', { required: 'Designation is required' })}
                type="text" 
                className={`${inputClasses} ${errors.designation ? 'border-red-500' : ''}`}
              />
              {errors.designation && <p className={errorClasses}>{errors.designation.message}</p>}
            </div>
          </div>

          {/* Row 4: Change Password (Optional) */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Change Password (Optional)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input 
                  {...register('password', { 
                    minLength: { value: 8, message: 'Password must be at least 8 characters' }
                  })}
                  type="password" 
                  className={`${inputClasses} ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Leave blank to keep current password"
                />
                {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input 
                  {...register('confirmPassword', { 
                    validate: value => value === newPassword || 'Passwords do not match'
                  })}
                  type="password" 
                  className={`${inputClasses} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </div>

          {/* Row 5: Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status *</label>
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
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-3 sticky bottom-0 bg-white sm:relative sm:border-t-0 sm:pt-0 sm:mt-6">
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full sm:w-auto rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-full sm:w-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;