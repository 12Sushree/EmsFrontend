import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { AuthGuard } from "./components/AuthGuard.jsx";
import Profile from "./pages/Profile.jsx";
import { RoleGuard } from "./components/RoleGuard.jsx";
import MngDashboard from "./pages/manager/Dashboard.jsx";
import Monitor from "./pages/manager/Monitor.jsx";
import AddEmployee from "./pages/manager/AddEmployee.jsx";
import Announcement from "./pages/manager/Announcements.jsx";
import EmpDashboard from "./pages/employee/Dashboard.jsx";
import Leave from "./pages/employee/Leave.jsx";
import Attendance from "./pages/employee/Attendance.jsx";
import RoleRedirect from "./components/RoleRedirect.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "verify-email/:token",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            index: true,
            element: <RoleRedirect />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "update-profile",
            element: <UpdateProfile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "manager",
            element: <RoleGuard role="Manager" />,
            children: [
              {
                index: true,
                element: <MngDashboard />,
              },
              {
                path: "monitor",
                element: <Monitor />,
              },
              {
                path: "add-emp",
                element: <AddEmployee />,
              },
              {
                path: "announcement",
                element: <Announcement />,
              },
            ],
          },
          {
            path: "employee",
            element: <RoleGuard role="Employee" />,
            children: [
              {
                index: true,
                element: <EmpDashboard />,
              },
              {
                path: "leave",
                element: <Leave />,
              },
              {
                path: "attendance",
                element: <Attendance />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
