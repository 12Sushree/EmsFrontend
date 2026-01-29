import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import EmpDashboard from "../pages/employee/Dashboard";
import MngDashboard from "../pages/manager/Dashboard";
import Leave from "../pages/employee/Leave";
import Attendance from "../pages/employee/Attendance";
import Monitor from "../pages/manager/Monitor";
import AddEmployee from "../pages/manager/AddEmployee";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Announcement from "../pages/manager/Announcements";

export default function AppRoutes() {
  const { user } = useSelector((state) => state.auth);

  if (!user)
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );

  return (
    <Routes>
      {user.role === "Employee" && (
        <>
          <Route path="/" element={<EmpDashboard />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/attendance" element={<Attendance />} />
        </>
      )}
      {user.role === "Manager" && (
        <>
          <Route path="/" element={<MngDashboard />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/add-emp" element={<AddEmployee />} />
          <Route path="/announcement" element={<Announcement />} />
        </>
      )}
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
