import api from "../../services/axios";

export const addEmployee = (id) =>
  api.post("/manager/add-emp", { employeeId: id });

export const createAnnouncement = (data) =>
  api.post("/announcement/create", data);

export const getAllLeaves = () => api.get("/leave/all");
export const updateLeave = (id, status) =>
  api.put(`leave/status/${id}`, { status });

export const teamDetails = () => api.get("/manager/team-mems");
export const monitorProgress = () => api.get("/manager/monitor");

export const assignTask = (data) => api.post("/tasks/create", data);
export const getAllTasks = () => api.get("/tasks/all");

export const getProfileByName = (userName) =>
  api.get(`/user/profilebyname?userName=${userName}`);
