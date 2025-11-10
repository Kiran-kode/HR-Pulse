import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../api.js'
const AddEmployeeForm = ({ onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      status: 'Active',
      password: '',
      confirmPassword: '',
      image: null,
    },
  });
  // useEffect(async () => {
  //   try {
  //    let response =  await axiosInstance.post('/employees/add', {
  //      name: watch('name'),
  //       email: watch('email'),
  //       phone: watch('phone'),
  //       department: watch('department'),
  //       designation: watch('designation'),
  //       status: watch('status'),
  //       password: watch('password'),
  //       image: watch('image'),
  //     });
  //     console.log(response.data);
      
  //   } catch (error) {
  //     console.error('Error adding employee:', error.message);
  //   }
  // }, [watch]);

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    const employeeId = `EMP${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    
try {
     let response =  await axiosInstance.post('/employees/add', {
       name: watch('name'),
        email: watch('email'),
        phone: watch('phone'),
        department: watch('department'),
        designation: watch('designation'),
        status: watch('status'),
        password: watch('password'),
        image: watch('image'),
      });
      console.log(response.data);
      
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }

    // In a real app, you would handle file upload to a server here.
    // For now, we'll create a local URL if a file is selected.
    const imageUrl = data.image && data.image[0] 
      ? URL.createObjectURL(data.image[0]) 
      : 'https://via.placeholder.com/40';

    const newEmployee = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      designation: data.designation,
      status: data.status,
      id: employeeId,
      imageUrl: imageUrl,
      // Note: Do not pass the raw password to the save function in a real app.
      // This should be securely handled and hashed on the backend.
    };
    
    onSave(newEmployee);
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="w-full max-h-[90vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-4">
          {/* Row 1: Full Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          {/* Row 2: Phone and Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Department *</label>
              <input 
                {...register('department', { required: 'Department is required' })}
                type="text" 
                className={`${inputClasses} ${errors.department ? 'border-red-500' : ''}`}
                placeholder="e.g., Development, Design"
              />
              {errors.department && <p className={errorClasses}>{errors.department.message}</p>}
            </div>
          </div>

          {/* Row 3: Designation and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation *</label>
              <input 
                {...register('designation', { required: 'Designation is required' })}
                type="text" 
                className={`${inputClasses} ${errors.designation ? 'border-red-500' : ''}`}
                placeholder="e.g., Software Engineer"
              />
              {errors.designation && <p className={errorClasses}>{errors.designation.message}</p>}
            </div>

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

          {/* Row 4: Password and Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input 
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' }
                })}
                type="password" 
                className={`${inputClasses} ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter password"
              />
              {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
              <input 
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === passwordValue || 'Passwords do not match'
                })}
                type="password" 
                className={`${inputClasses} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Row 5: Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Image</label>
            <input 
              {...register('image')}
              type="file" 
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          {/* Info Text */}
          <p className="pt-2 text-xs text-gray-500">
            Employee ID will be auto-generated upon creation.
          </p>
        </div>

        {/* Buttons - Sticky on mobile */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-3 sticky bottom-0 bg-white sm:relative sm:border-t-0 sm:pt-0 sm:mt-6">
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full sm:w-auto rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-full sm:w-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;