import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import empReducer from "./features/employee/employeeSlice";
import managerReducer from "./features/manager/managerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: empReducer,
    manager: managerReducer,
  },
});
