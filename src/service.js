import axiosInstance from './api.js'

// employees logic
export const getAllEmployees = async () => {
  try {
    const response = await axiosInstance.get('/employees/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axiosInstance.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axiosInstance.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// leaves logic
export const createLeave = async (leaveData) => {
  try {
    const response = await axiosInstance.post('/leaves', leaveData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllLeaves = async () => {
  try {
    const response = await axiosInstance.get('/leaves');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateLeaveStatus = async (id, statusData) => {
  try {
    const response = await axiosInstance.put(`/leaves/${id}`, statusData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// dashboard logic
export const getDashboardOverview = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/overview');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAttendanceTrend = async (range = '7days') => {
  try {
    const response = await axiosInstance.get(`/dashboard/attendance-trend?range=${range}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getLeaveDistribution = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/leave-distribution');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};