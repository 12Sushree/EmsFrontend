import api from "../../services/axios";

export const verifyEmail = (token) => api.get(`/auth/verify-email/${token}`);

export const forgotPassword = (data) => api.post("/auth/forgot-password", data);

export const resetPassword = (token, data) =>
  api.put(`/auth/reset-password/${token}`, data);

export const resendVerifyEmail = (data) => api.post("/auth/resend-mail", data);
