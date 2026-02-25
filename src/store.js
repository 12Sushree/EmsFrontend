import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/auth/authSlice";
import empReducer from "./store/employee/employeeSlice";
import managerReducer from "./store/manager/managerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: empReducer,
    manager: managerReducer,
  },
});
