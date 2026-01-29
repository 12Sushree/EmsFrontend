import api from "../../services/axios";

export const getMyTasks = () => api.get("/tasks/my");
export const updateTask = (id, status) =>
  api.put(`/tasks/status/${id}`, { status });

export const checkIn = () => api.post("/attendance/checkin");
export const checkOut = () => api.post("/attendance/checkout");
export const myAttendance = () => api.get("/attendance/my");

export const applyLeave = (data) => api.post("/leave/apply", data);
export const myLeaves = () => api.get("/leave/my");

export const myPerformance = () => api.get("/performance/me");

export const getAnnouncements = () => api.get("/announcement/all");
