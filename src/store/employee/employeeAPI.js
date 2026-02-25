import api from "../../services/axios";

export const getMyTasks = (page = 1) =>
  api.get(`/tasks/my?page=${page}&limit=5`);
export const updateTask = (id, status) =>
  api.put(`/tasks/status/${id}`, status);

export const checkIn = () => api.post("/attendance/check-in");
export const checkOut = () => api.post("/attendance/check-out");
export const myAttendance = (page = 1) =>
  api.get(`/attendance/my?page=${page}&limit=10`);

export const applyLeave = (data) => api.post("/leave/apply", data);
export const myLeaves = (page = 1) => api.get(`/leave/my?page=${page}`);

export const myPerformance = () => api.get("/performance/my");

export const getAnnouncements = (page = 1) =>
  api.get(`/announcement/all?pages=${page}&limit=5`);
