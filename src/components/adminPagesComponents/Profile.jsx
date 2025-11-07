import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCamera, FiEdit2, FiSave, FiX, FiUser, FiBriefcase, FiShield } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    employeeId: 'HR001',
    dateOfBirth: '1985-06-15',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'John Johnson - +1 (555) 987-6543',
    
    // Professional Information
    company: 'Qubit Labs',
    designation: 'HR Manager',
    joiningDate: '2020-03-15',
    reportingTo: 'CEO - Majid ',
    workLocation: 'Head Office',
    employmentType: 'Full Time',
    profileImage: 'https://via.placeholder.com/150'
  });

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: profileData
  });

  const watchedImage = watch('profileImage');

  const handleEdit = () => {
    setIsEditing(true);
    reset(profileData); 
  };

  const onSubmit = (data) => {
    setProfileData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(profileData); 
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // Update the form data
      reset({ ...watch(), profileImage: imageUrl });
    }
  };

  const inputClasses = "block w-full mt-1 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal and professional information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Cover Section */}
          <div className="bg-linear-to-r from-blue-500 to-purple-600 h-32 relative">
            <div className="absolute -bottom-16 left-6">
              <div className="relative">
                <img
                  src={isEditing ? watchedImage : profileData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
                    <FiCamera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            {/* Edit Button */}
            <div className="absolute top-4 right-4 ">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-white cursor-pointer bg-opacity-20 text-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-30"
                >
                  <FiEdit2 size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-green-100"
                  >
                    <FiSave size={16} />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-red-100"
                  >
                    <FiX size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 p-6">
            {/* Basic Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isEditing ? (
                  <div>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="text-2xl font-bold border border-gray-300 rounded px-2 py-1 w-full"
                    />
                    {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                  </div>
                ) : (
                  profileData.name
                )}
              </h2>
              <p className="text-lg text-blue-600 font-semibold">{profileData.designation}</p>
              <p className="text-gray-600">{profileData.company}</p>
            </div>

            {/* Information Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-2 md:p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FiUser className="text-blue-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email *</label>
                    {isEditing ? (
                      <div>
                        <input
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Please enter a valid email'
                            }
                          })}
                          type="email"
                          className={`${inputClasses}  ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
                      </div>
                    ) : (
                      <p className="text-gray-800">{profileData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone *</label>
                    {isEditing ? (
                      <div>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          type="tel"
                          className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
                      </div>
                    ) : (
                      <p className="text-gray-800">{profileData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    {isEditing ? (
                      <input
                        {...register('dateOfBirth')}
                        type="date"
                        className={inputClasses}
                      />
                    ) : (
                      <p className="text-gray-800">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    {isEditing ? (
                      <textarea
                        {...register('address')}
                        className={inputClasses}
                        rows="3"
                      />
                    ) : (
                      <p className="text-gray-800">{profileData.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                    {isEditing ? (
                      <input
                        {...register('emergencyContact')}
                        type="text"
                        className={inputClasses}
                      />
                    ) : (
                      <p className="text-gray-800">{profileData.emergencyContact}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiBriefcase className="text-green-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Professional Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Employee ID</label>
                    <p className="text-gray-800 font-mono">{profileData.employeeId}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Joining Date</label>
                    <p className="text-gray-800">{new Date(profileData.joiningDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Reporting To</label>
                    <p className="text-gray-800">{profileData.reportingTo}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Work Location</label>
                    {isEditing ? (
                      <input
                        {...register('workLocation')}
                        type="text"
                        className={inputClasses}
                      />
                    ) : (
                      <p className="text-gray-800">{profileData.workLocation}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Employment Type</label>
                    <p className="text-gray-800">{profileData.employmentType}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;