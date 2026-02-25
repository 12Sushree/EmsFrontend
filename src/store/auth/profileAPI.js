import api from "../../services/axios";

export const updateProfile = (data) => api.put("/user/update", data);

export const changePassword = (data) => api.put("/user/change-pwd", data);
