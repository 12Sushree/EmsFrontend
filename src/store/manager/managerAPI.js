import api from "../../services/axios";

export const addEmployee = (empId) => api.post("/manager/add-emp", { empId });

export const createAnnouncement = (data) =>
  api.post("/announcement/create", data);

export const getAllLeaves = (page = 1) => api.get(`/leave/all?page=${page}`);
export const updateLeave = (id, status) =>
  api.patch(`leave/status/${id}`, { status });

export const teamDetails = (page = 1) =>
  api.get(`/manager/team-mems?page=${page}`);
export const monitorProgress = () => api.get("/manager/monitor");

export const assignTask = (data) => api.post("/tasks/create", data);
export const getAllTasks = () => api.get("/tasks/all");

export const searchEmployees = (query) =>
  api.get(`/user/search?query=${query}`);

export const updateEmploymentStatus = (id, employmentStatus) =>
  api.patch(`/user/update-emp-status/${id}`, employmentStatus);

export const updateEmployeeDesignation = (id, designation) =>
  api.patch(`/user/update-emp-designation/${id}`, designation);

export const removeEmployee = (id) => api.post(`/manager/remove-emp/${id}`);
